import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden">
          {/* Background */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, hsl(230 30% 12%), hsl(260 25% 15%), hsl(230 25% 10%))',
            }}
          />
          
          {/* Glow effects */}
          <div 
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full animate-pulse-glow"
            style={{
              background: 'radial-gradient(circle, hsl(15 90% 60% / 0.2), transparent 70%)',
            }}
          />
          <div 
            className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full animate-pulse-glow"
            style={{
              background: 'radial-gradient(circle, hsl(175 60% 45% / 0.15), transparent 70%)',
              animationDelay: '-1.5s',
            }}
          />

          {/* Content */}
          <div className="relative p-12 md:p-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/5 backdrop-blur-sm mb-6">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Bepul konsultatsiya</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Loyihangizni{" "}
              <span className="gradient-text">Boshlang</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              G'oyangizni biz bilan baham ko'ring. Bepul konsultatsiya va loyiha tahlili sizni kutmoqda.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                Bog'lanish
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="glass" size="xl" className="w-full sm:w-auto">
                Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
