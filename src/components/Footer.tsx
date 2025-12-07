import { Github, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-16 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="font-display text-2xl font-bold gradient-text inline-block mb-4">
              KREATIV
            </a>
            <p className="text-muted-foreground max-w-sm mb-6">
              Kreativ dizayn va zamonaviy texnologiyalar orqali g'oyalaringizni hayotga tatbiq etamiz.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-card/60 transition-colors">
                <Twitter className="w-5 h-5 text-muted-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-card/60 transition-colors">
                <Instagram className="w-5 h-5 text-muted-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-card/60 transition-colors">
                <Github className="w-5 h-5 text-muted-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-card/60 transition-colors">
                <Linkedin className="w-5 h-5 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Xizmatlar</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Web Dizayn</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">UI/UX Dizayn</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Branding</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Development</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Kompaniya</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Biz haqimizda</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Jamoa</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Karyera</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Bog'lanish</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 KREATIV. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Maxfiylik siyosati
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Foydalanish shartlari
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
