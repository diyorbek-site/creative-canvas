const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary glow orb */}
      <div 
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full animate-float animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, hsl(15 90% 60% / 0.15), transparent 70%)',
        }}
      />
      
      {/* Secondary glow orb */}
      <div 
        className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full animate-float-delayed animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, hsl(175 60% 45% / 0.12), transparent 70%)',
        }}
      />
      
      {/* Morphing shape */}
      <div 
        className="absolute top-1/3 right-1/4 w-64 h-64 animate-morph animate-float"
        style={{
          background: 'linear-gradient(135deg, hsl(15 90% 60% / 0.08), hsl(35 95% 55% / 0.05))',
          filter: 'blur(1px)',
        }}
      />
      
      {/* Geometric elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-primary/30 rotate-45 animate-float" />
      <div className="absolute top-40 left-1/4 w-3 h-3 bg-accent/40 rounded-full animate-float-delayed" />
      <div className="absolute bottom-32 left-20 w-6 h-6 border border-primary/20 rotate-12 animate-float" />
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-foreground/20 rounded-full animate-float-delayed" />
      
      {/* Lines */}
      <div className="absolute top-1/2 left-10 w-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-16 w-32 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-pulse-glow" />
      
      {/* Large ring */}
      <div 
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-border/30 animate-spin-slow"
        style={{ animationDuration: '60s' }}
      />
    </div>
  );
};

export default FloatingShapes;
