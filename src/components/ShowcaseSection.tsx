import { ArrowUpRight } from "lucide-react";

const showcaseItems = [
  {
    title: "Futuristik UI",
    category: "Dizayn",
    gradient: "from-primary/80 to-[hsl(35_95%_55%)]",
  },
  {
    title: "3D Animatsiya",
    category: "Motion",
    gradient: "from-accent to-[hsl(200_70%_50%)]",
  },
  {
    title: "Minimalist Brand",
    category: "Branding",
    gradient: "from-[hsl(280_60%_50%)] to-primary",
  },
];

const ShowcaseSection = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Bizning <span className="gradient-text">Ishlar</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md">
              Eng yaxshi loyihalarimizdan namunalar
            </p>
          </div>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 mt-4 md:mt-0"
          >
            Barchasini ko'rish
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Showcase grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {showcaseItems.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Background gradient */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
              />
              
              {/* Overlay pattern */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-xs uppercase tracking-wider text-foreground/60 mb-2">
                  {item.category}
                </span>
                <h3 className="font-display text-2xl font-bold text-foreground group-hover:translate-x-2 transition-transform duration-300">
                  {item.title}
                </h3>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Arrow */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 text-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
