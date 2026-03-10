import { useMemo } from "react";

interface StarItem {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export function StarField({ count = 80 }: { count?: number }) {
  const stars = useMemo<StarItem[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (i * 137.508 + 12.345) % 100,
      y: (i * 93.701 + 45.678) % 100,
      size: (i * 17.3) % 3 < 1 ? 1 : (i * 17.3) % 3 < 2 ? 1.5 : 2,
      delay: (i * 0.3) % 4,
      duration: 2 + ((i * 0.7) % 3),
      opacity: 0.3 + ((i * 0.13) % 0.6),
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-foreground animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}
