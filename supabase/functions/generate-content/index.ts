import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const validTypes = ['headline', 'description', 'tagline', 'bio', 'cta', 'testimonial', 'features', 'valueProposition', 'socialProof'];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify the JWT and get user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      console.error("Auth error:", userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { type, context } = await req.json();

    // Input validation
    if (!type || !validTypes.includes(type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid content type' }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!context || typeof context !== 'string' || context.trim().length < 5) {
      return new Response(
        JSON.stringify({ error: 'Context must be at least 5 characters' }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (context.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Context too long (max 1000 characters)' }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Service configuration error. Please try again later." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating content for user: ${user.id}, type: ${type}`);

    const prompts: Record<string, string> = {
      headline: `Generate a compelling, punchy headline for a portfolio project. Context: "${context}". 
        Requirements:
        - Maximum 8 words
        - Be creative and memorable
        - Use strong action verbs
        - Make it unique and attention-grabbing
        Return ONLY the headline text, no quotes or extra formatting.`,
      
      description: `Write a concise, engaging project description for a portfolio. Context: "${context}".
        Requirements:
        - 2-3 sentences maximum
        - Highlight the value and impact
        - Use professional but approachable tone
        - Include what makes it unique
        Return ONLY the description text.`,
      
      tagline: `Create a memorable tagline/slogan. Context: "${context}".
        Requirements:
        - Maximum 6 words
        - Catchy and memorable
        - Captures the essence
        Return ONLY the tagline text.`,
      
      bio: `Write a professional bio for a portfolio. Context: "${context}".
        Requirements:
        - 2-3 sentences
        - Confident but not arrogant
        - Highlight expertise and passion
        Return ONLY the bio text.`,
      
      cta: `Generate a compelling call-to-action button text. Context: "${context}".
        Requirements:
        - 2-4 words maximum
        - Action-oriented
        - Creates urgency or curiosity
        Return ONLY the CTA text.`,

      testimonial: `Write a realistic, compelling client testimonial. Context: "${context}".
        Requirements:
        - 2-3 sentences from a satisfied client's perspective
        - Include specific results or benefits they experienced
        - Sound authentic and human, not generic
        - End with their name and role (make up a realistic one)
        Return ONLY the testimonial with attribution.`,

      features: `Generate a list of key features/benefits. Context: "${context}".
        Requirements:
        - Exactly 4 bullet points
        - Each point is 4-8 words
        - Focus on user benefits, not just features
        - Use action verbs at the start
        Format: Return each feature on a new line with a bullet point (•).`,

      valueProposition: `Write a compelling value proposition. Context: "${context}".
        Requirements:
        - One powerful sentence (max 15 words)
        - Clearly state the unique value
        - Address the target audience's main pain point
        Return ONLY the value proposition.`,

      socialProof: `Generate a social proof statement with stats. Context: "${context}".
        Requirements:
        - Include 2-3 impressive but realistic metrics
        - Format: "Trusted by X+ users | Y% satisfaction | Z awards"
        - Make numbers believable for the context
        Return ONLY the social proof line.`,
    };

    const systemPrompt = `You are an expert copywriter specializing in portfolio and marketing content. 
      You create concise, impactful, and memorable content that converts visitors into clients.
      Always respond with ONLY the requested content - no explanations, quotes, or formatting.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompts[type] || prompts.description },
        ],
        max_tokens: 200,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ error: "An error occurred. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const generatedContent = data.choices?.[0]?.message?.content?.trim() || "";

    console.log(`Content generated successfully for user: ${user.id}`);

    return new Response(
      JSON.stringify({ content: generatedContent }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-content function:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
