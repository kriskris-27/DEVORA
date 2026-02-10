import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2 active:scale-[0.98]",
    {
        variants: {
            variant: {
                primary: "bg-electric-600 text-white shadow-lg shadow-electric-500/30 hover:bg-electric-700 hover:shadow-electric-500/40 hover:-translate-y-0.5",
                secondary: "bg-white text-gray-900 border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300",
                ghost: "bg-transparent text-gray-600 hover:bg-electric-50 hover:text-electric-700",
                outline: "border-2 border-electric-600 text-electric-600 hover:bg-electric-50",
                destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
            },
            size: {
                sm: "h-9 px-3 rounded-lg",
                md: "h-11 px-5 rounded-xl",
                lg: "h-14 px-8 text-base rounded-2xl",
                icon: "h-10 w-10",
            },
            fullWidth: {
                true: "w-full",
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            fullWidth: false,
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    variant?: "primary" | "secondary" | "ghost" | "outline" | "destructive" | null;
    size?: "sm" | "md" | "lg" | "icon" | null;
    fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, fullWidth, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, fullWidth, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
