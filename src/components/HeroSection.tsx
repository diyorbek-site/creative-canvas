import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Yangi darajadagi dizayn</span>
        </div>

        {/* Main heading */}
        <h1 
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 animate-fade-up opacity-0"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="text-foreground">Kreativlik</span>
          <br />
          <span className="gradient-text">Chegarasiz</span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up opacity-0"
          style={{ animationDelay: '0.4s' }}
        >
          Oddiy dizaynlar davri tugadi. Biz bilan birga kelajakni yarating — 
          har bir pikselda hayot, har bir animatsiyada his.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0"
          style={{ animationDelay: '0.6s' }}
        >
          <Button variant="hero" size="xl" className="group">
            Boshlash
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="glass" size="xl">
            Ko'proq bilish
          </Button>
        </div>

        {/* Stats */}
        <div 
          className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto animate-fade-up opacity-0"
          style={{ animationDelay: '0.8s' }}
        >
          {[
            { value: "500+", label: "Loyihalar" },
            { value: "99%", label: "Mamnuniyat" },
            { value: "24/7", label: "Qo'llab-quvvatlash" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
