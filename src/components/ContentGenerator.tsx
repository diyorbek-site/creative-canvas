import { useState } from "react";
import { Sparkles, Copy, Check, Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contentTypes = [
  { id: "headline", label: "Headline", icon: "✨" },
  { id: "description", label: "Description", icon: "📝" },
  { id: "tagline", label: "Tagline", icon: "🎯" },
  { id: "bio", label: "Bio", icon: "👤" },
  { id: "cta", label: "CTA Button", icon: "🚀" },
  { id: "testimonial", label: "Testimonial", icon: "💬" },
  { id: "features", label: "Feature List", icon: "📋" },
  { id: "valueProposition", label: "Value Prop", icon: "💎" },
  { id: "socialProof", label: "Social Proof", icon: "📊" },
];

const ContentGenerator = () => {
  const [context, setContext] = useState("");
  const [selectedType, setSelectedType] = useState("headline");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateContent = async () => {
    if (!context.trim()) {
      toast({
        title: "Context required",
        description: "Please describe your project or what you need content for.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setGeneratedContent("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: { type: selectedType, context },
      });

      if (error) throw error;

      if (data?.content) {
        setGeneratedContent(data.content);
        toast({
          title: "Content generated!",
          description: "Your AI-powered content is ready.",
        });
      }
    } catch (error: any) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Content Generator</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Generate <span className="gradient-text">Portfolio Content</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powered by AI to create compelling headlines, descriptions, and more for your portfolio projects.
          </p>
        </div>

        {/* Generator Card */}
        <div className="glass-card rounded-2xl p-8 space-y-6">
          {/* Content Type Selector */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Content Type</label>
            <div className="flex flex-wrap gap-2">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedType === type.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-secondary/50 text-secondary-foreground hover:bg-secondary"
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Context Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Describe your project or context
            </label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g., A mobile app for tracking fitness goals with gamification elements..."
              className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary resize-none"
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateContent}
            disabled={isLoading}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-orange-500 hover:opacity-90 transition-opacity"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                Generate Content
              </>
            )}
          </Button>

          {/* Generated Content */}
          {generatedContent && (
            <div className="space-y-3 animate-fade-up">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Generated Content</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {copied ? (
                    <Check className="w-4 h-4 mr-1" />
                  ) : (
                    <Copy className="w-4 h-4 mr-1" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
                <p className="text-xl font-medium text-foreground leading-relaxed">
                  {generatedContent}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentGenerator;
