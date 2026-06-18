import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asLink, href, children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center font-mono uppercase tracking-wider text-[11px] font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary cursor-pointer active:scale-[0.98]";
    
    const variantClasses = {
      primary: "btn-sweep btn-sweep-primary",
      secondary: "btn-sweep btn-sweep-secondary",
      ghost: "bg-transparent text-[var(--text-secondary)] hover:text-[#F6F5F0] hover:bg-white/[0.02]"
    };

    const sizeClasses = {
      sm: "px-4 py-2 h-9 rounded-[2px]",
      md: "px-6 py-3 h-11 rounded-[3px]",
      lg: "px-8 py-4.5 h-14 rounded-[4px] text-xs"
    };

    const combinedClasses = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

    const content = variant === "primary" || variant === "secondary" ? (
      <span className="btn-sweep-label relative z-10 inline-flex items-center justify-center gap-[inherit]">
        {children}
      </span>
    ) : (
      children
    );

    if (asLink && href) {
      return (
        <a href={href} className={combinedClasses} data-cursor="link">
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
