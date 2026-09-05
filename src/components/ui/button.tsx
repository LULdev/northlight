import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage",
  {
    variants: {
      variant: {
        primary: "bg-sage text-sage-fg hover:bg-sage/90",
        sage: "bg-sage text-sage-fg hover:bg-sage/90",
        accent: "bg-accent text-accent-fg hover:bg-accent/90",
        ghost: "bg-transparent text-ink hover:bg-paper",
        outline: "bg-transparent text-ink shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] hover:bg-surface",
        quiet: "bg-paper text-ink hover:bg-line",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-sm",
        md: "h-11 px-5 text-sm rounded-md",
        icon: "size-11 rounded-md",
        iconSm: "size-9 rounded-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
