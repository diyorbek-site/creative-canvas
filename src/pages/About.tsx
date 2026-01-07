import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingShapes from "@/components/FloatingShapes";
import { Users, Target, Award, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Azizbek Karimov",
      role: "Asoschi & Kreativ Direktor",
      description: "10+ yillik tajriba, 500+ muvaffaqiyatli loyiha",
    },
    {
      name: "Nilufar Rahimova",
      role: "UI/UX Dizayner",
      description: "Foydalanuvchi tajribasini mukammallashtirish bo'yicha mutaxassis",
    },
    {
      name: "Javohir Toshmatov",
      role: "Senior Developer",
      description: "Full-stack dasturlash va AI integratsiya bo'yicha ekspert",
    },
    {
      name: "Madina Aliyeva",
      role: "Marketing Menejer",
      description: "Raqamli marketing va brend strategiyasi mutaxassisi",
    },
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovatsiya",
      description: "Har doim yangi g'oyalar va texnologiyalarni qo'llaymiz",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Aniqlik",
      description: "Har bir loyihada yuqori sifat va aniqlikni ta'minlaymiz",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Hamkorlik",
      description: "Mijozlarimiz bilan yaqin hamkorlikda ishlaymiz",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Sifat",
      description: "Har bir ish eng yuqori standartlarga javob beradi",
    },
  ];

  const stats = [
    { number: "500+", label: "Bajarilgan loyihalar" },
    { number: "150+", label: "Mamnun mijozlar" },
    { number: "10+", label: "Yillik tajriba" },
    { number: "25+", label: "Jamoa a'zolari" },
  ];

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
              Biz haqimizda
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Kreativ yechimlar</span>
              <br />
              sizning g'oyalaringiz uchun
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Biz 2014-yildan beri O'zbekistonning yetakchi kreativ dizayn studiyasimiz. 
              Bizning maqsadimiz - mijozlarimizning bizneslarini raqamli dunyoda 
              ajralib turishlariga yordam berish.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  Bizning <span className="gradient-text">tarix</span>imiz
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    2014-yilda kichik uy ofisidan boshlangan kompaniyamiz bugungi kunda 
                    O'zbekistonning eng yirik kreativ agentliklaridan biriga aylandi.
                  </p>
                  <p>
                    Biz har doim innovatsion yondashuvlar va zamonaviy texnologiyalarni 
                    qo'llash orqali mijozlarimizga eng yaxshi xizmat ko'rsatishga harakat qilamiz.
                  </p>
                  <p>
                    Bugun biz 25 dan ortiq kreativ mutaxassis bilan ishlayapmiz va 
                    O'zbekiston bo'ylab 150 dan ortiq kompaniyaga xizmat ko'rsatganmiz.
                  </p>
                </div>
              </div>
              <div className="glass-card rounded-3xl p-8 glow-effect">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-display text-6xl font-bold gradient-text mb-2">10+</div>
                    <div className="text-muted-foreground">Yillik tajriba</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Bizning <span className="gradient-text">qadriyatlarimiz</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Biz ushbu tamoyillarga amal qilib, har bir loyihada eng yaxshi natijalarni berishga intilamiz
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 group"
                >
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Bizning <span className="gradient-text">jamoa</span>miz
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional mutaxassislarimiz sizning g'oyalaringizni hayotga tatbiq etishga tayyor
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card rounded-3xl p-12 glow-effect">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Loyiha boshlashga <span className="gradient-text">tayyormisiz?</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Biz bilan bog'laning va g'oyalaringizni hayotga tatbiq etishni bugun boshlang
              </p>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate("/auth")}
                className="group"
              >
                Biz bilan bog'laning
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default About;
