import { cn } from "@/lib/utils";

export function PrintMat({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={cn("bg-surface p-4 shadow-[var(--shadow-border)] sm:p-6", className)}>
      <div className="bg-paper p-2 sm:p-3">
        <img src={src} alt={alt} className="frame aspect-[3/2] w-full object-cover" />
      </div>
    </div>
  );
}
