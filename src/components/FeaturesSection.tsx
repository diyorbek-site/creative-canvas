import { Layers, Zap, Palette, Globe } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Modular Dizayn",
    description: "Har bir element mustaqil va qayta ishlatish mumkin",
  },
  {
    icon: Zap,
    title: "Tezkor Ishlash",
    description: "Optimallashtirilgan kod va tez yuklanish tezligi",
  },
  {
    icon: Palette,
    title: "Noyob Uslub",
    description: "Maxsus ranglar va tipografiya kombinatsiyasi",
  },
  {
    icon: Globe,
    title: "Global Miqyos",
    description: "Har qanday til va mintaqa uchun moslashuvchan",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-32 px-6">
      {/* Section glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, hsl(175 60% 45% / 0.1), transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Nimani <span className="gradient-text">Taklif Qilamiz</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Eng zamonaviy texnologiyalar va kreativ yechimlar
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl glass-card hover:bg-card/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_hsl(var(--primary)/0.2)]"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
