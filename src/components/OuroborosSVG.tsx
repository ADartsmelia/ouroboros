import Image from "next/image";

interface OuroborosSVGProps {
  size?: number;
  className?: string;
  glowing?: boolean;
}

export default function OuroborosSVG({ size = 320, className = "", glowing = true }: OuroborosSVGProps) {
  return (
    <Image
      src="/logo.svg"
      alt="Orabora"
      width={size}
      height={size}
      className={`${glowing ? "animate-pulse-glow" : ""} ${className}`}
      priority
    />
  );
}
