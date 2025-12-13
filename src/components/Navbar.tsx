import { Button } from "@/components/ui/button";
import { Menu, LogOut, Sparkles, LayoutDashboard, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out successfully" });
  };

  const handleGeneratorClick = () => {
    if (user) {
      navigate("/generator");
    } else {
      navigate("/auth");
    }
  };

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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleGeneratorClick}
              className="border-primary/50 text-primary hover:bg-primary/10"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Generator
            </Button>
            {user && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/dashboard")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/profile")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </>
            )}
            {user ? (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Button 
                variant="hero" 
                size="default"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            )}
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  handleGeneratorClick();
                  setIsOpen(false);
                }}
                className="border-primary/50 text-primary hover:bg-primary/10 mt-2"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Generator
              </Button>
              {user && (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      navigate("/dashboard");
                      setIsOpen(false);
                    }}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      navigate("/profile");
                      setIsOpen(false);
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </>
              )}
              {user ? (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button 
                  variant="hero" 
                  size="default"
                  onClick={() => {
                    navigate("/auth");
                    setIsOpen(false);
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
