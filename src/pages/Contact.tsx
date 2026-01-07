import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingShapes from "@/components/FloatingShapes";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Ism kiritilishi shart").max(100, "Ism 100 ta belgidan kam bo'lishi kerak"),
  email: z.string().trim().email("Email noto'g'ri formatda").max(255, "Email 255 ta belgidan kam bo'lishi kerak"),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(1, "Xabar kiritilishi shart").max(1000, "Xabar 1000 ta belgidan kam bo'lishi kerak"),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Xabaringiz yuborildi!",
      description: "Biz tez orada siz bilan bog'lanamiz.",
    });
    
    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telefon",
      value: "+998 90 123 45 67",
      description: "Dushanba - Juma, 9:00 - 18:00",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "info@kreativ.uz",
      description: "24 soat ichida javob beramiz",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Manzil",
      value: "Toshkent sh., Chilonzor tumani",
      description: "Bunyodkor ko'chasi 15-uy",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Ish vaqti",
      value: "Dushanba - Juma",
      description: "09:00 - 18:00",
    },
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
              Bog'lanish
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Biz bilan <span className="gradient-text">bog'laning</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Loyihangiz haqida gaplashishga tayyormiz. Biz bilan bog'laning va 
              g'oyalaringizni hayotga tatbiq etishni bugun boshlang.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="pb-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="glass-card rounded-2xl p-5 text-center hover:scale-105 transition-transform duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {info.icon}
                  </div>
                  <h3 className="font-display text-sm font-semibold text-muted-foreground mb-1">{info.title}</h3>
                  <p className="font-medium mb-1">{info.value}</p>
                  <p className="text-muted-foreground text-xs">{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="glass-card rounded-3xl p-8 glow-effect">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Xabar yuboring</h2>
                    <p className="text-muted-foreground text-sm">Biz tez orada javob beramiz</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ismingiz *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Ismingizni kiriting"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-destructive text-xs">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-destructive text-xs">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon raqam</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+998 90 123 45 67"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Xabaringiz *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Loyihangiz haqida qisqacha yozing..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-destructive text-xs">{errors.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Yuborilmoqda..." : "Xabar yuborish"}
                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>

              {/* Map / Info */}
              <div className="space-y-6">
                <div className="glass-card rounded-3xl p-8 h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="font-display text-xl font-bold mb-2">Toshkent, O'zbekiston</h3>
                    <p className="text-muted-foreground">
                      Chilonzor tumani, Bunyodkor ko'chasi 15-uy
                    </p>
                  </div>
                </div>
                
                <div className="glass-card rounded-3xl p-8">
                  <h3 className="font-display text-xl font-bold mb-4">Tez-tez so'raladigan savollar</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Loyiha qancha vaqt oladi?</h4>
                      <p className="text-muted-foreground text-sm">
                        Loyiha murakkabligiga qarab 2-8 hafta.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Narxlar qanday?</h4>
                      <p className="text-muted-foreground text-sm">
                        Har bir loyiha uchun individual narx belgilanadi.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Bepul konsultatsiya bormi?</h4>
                      <p className="text-muted-foreground text-sm">
                        Ha, birinchi konsultatsiya bepul.
                      </p>
                    </div>
                  </div>
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

export default Contact;
