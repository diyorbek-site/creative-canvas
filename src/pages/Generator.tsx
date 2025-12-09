import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContentGenerator from "@/components/ContentGenerator";
import FloatingShapes from "@/components/FloatingShapes";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Generator = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out successfully" });
    navigate("/");
  };

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
        {/* Header with user info */}
        <div className="border-b border-border/50 bg-background/50 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-sm font-bold text-primary-foreground">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-muted-foreground">{user?.email}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <ContentGenerator />
      </div>
    </div>
  );
};

export default Generator;
