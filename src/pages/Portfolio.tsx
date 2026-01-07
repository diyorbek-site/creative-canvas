import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingShapes from "@/components/FloatingShapes";
import { ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("Hammasi");

  const categories = ["Hammasi", "Web Dizayn", "Brending", "UI/UX", "Mobil Ilovalar"];

  const projects = [
    {
      id: 1,
      title: "TechStart Startup",
      category: "Web Dizayn",
      description: "Zamonaviy texnologiya startapi uchun to'liq veb-sayt dizayni",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tags: ["React", "Tailwind", "Figma"],
    },
    {
      id: 2,
      title: "Eco Brand Identity",
      category: "Brending",
      description: "Ekologik mahsulotlar brendi uchun to'liq brending paketi",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
      tags: ["Logo", "Brending", "Packaging"],
    },
    {
      id: 3,
      title: "FinTech Dashboard",
      category: "UI/UX",
      description: "Moliyaviy texnologiya ilovasi uchun foydalanuvchi interfeysi",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tags: ["Dashboard", "Analytics", "Figma"],
    },
    {
      id: 4,
      title: "FoodDelivery App",
      category: "Mobil Ilovalar",
      description: "Ovqat yetkazib berish xizmati uchun mobil ilova dizayni",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      tags: ["iOS", "Android", "UI Design"],
    },
    {
      id: 5,
      title: "Fashion E-commerce",
      category: "Web Dizayn",
      description: "Moda brendlari uchun zamonaviy elektron savdo platformasi",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      tags: ["E-commerce", "React", "Node.js"],
    },
    {
      id: 6,
      title: "Healthcare Portal",
      category: "UI/UX",
      description: "Tibbiyot xizmatlari uchun onlayn portal dizayni",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      tags: ["Healthcare", "UX Research", "Prototyping"],
    },
    {
      id: 7,
      title: "Restaurant Chain",
      category: "Brending",
      description: "Restoran tarmog'i uchun vizual identifikatsiya tizimi",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      tags: ["Identity", "Menu Design", "Signage"],
    },
    {
      id: 8,
      title: "Fitness Tracker",
      category: "Mobil Ilovalar",
      description: "Sport va sog'liq uchun kuzatish ilovasi",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop",
      tags: ["Fitness", "Wearables", "UI/UX"],
    },
  ];

  const filteredProjects = activeFilter === "Hammasi" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, hsl(230 30% 8%), hsl(260 25% 10%), hsl(230 25% 5%))',
        }}
      />
      
      <FloatingShapes />
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary mb-6">
              Bizning ishlarimiz
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Biz amalga oshirgan eng yaxshi loyihalar bilan tanishing. 
              Har bir ish - bu mijozlarimiz bilan hamkorlikdagi muvaffaqiyat hikoyasi.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="pb-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(category)}
                  className={activeFilter === category 
                    ? "bg-primary text-primary-foreground" 
                    : "border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id}
                  className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-3">
                      <Button size="sm" variant="secondary" className="gap-2">
                        <Eye className="w-4 h-4" />
                        Ko'rish
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2 border-white/20 text-white hover:bg-white/10">
                        <ExternalLink className="w-4 h-4" />
                        Sayt
                      </Button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-primary font-medium">{project.category}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 text-xs rounded-full bg-secondary/50 text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-8 md:p-12 glow-effect">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="font-display text-4xl font-bold gradient-text mb-1">500+</div>
                  <div className="text-muted-foreground text-sm">Loyihalar</div>
                </div>
                <div>
                  <div className="font-display text-4xl font-bold gradient-text mb-1">150+</div>
                  <div className="text-muted-foreground text-sm">Mijozlar</div>
                </div>
                <div>
                  <div className="font-display text-4xl font-bold gradient-text mb-1">98%</div>
                  <div className="text-muted-foreground text-sm">Mamnunlik</div>
                </div>
                <div>
                  <div className="font-display text-4xl font-bold gradient-text mb-1">15+</div>
                  <div className="text-muted-foreground text-sm">Mukofotlar</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
