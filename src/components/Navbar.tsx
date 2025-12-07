import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card rounded-2xl px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="font-display text-xl font-bold gradient-text">
            KREATIV
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Xizmatlar
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Portfolio
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Biz haqimizda
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Bog'lanish
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="default">
              Boshlash
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-2 glass-card rounded-2xl p-6 animate-fade-up">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Xizmatlar
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Portfolio
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Biz haqimizda
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Bog'lanish
              </a>
              <Button variant="hero" size="default" className="mt-2">
                Boshlash
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
