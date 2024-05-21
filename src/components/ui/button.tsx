import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        "outline-destructive":
          "border border-destructive bg-background hover:bg-destructive/50 hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary:
          "disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white hover:bg-primary/90",
        "primary-link":
          "!rounded-none !px-0 !h-fit text-primary border-b hover:border-b-primary dark:hover:border-b-primary/80 dark:border-b-rose-600 border-b-rose-600",
        pro: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-primary-foreground border-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 rounded-sm px-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  pending?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, pending, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={pending || props.disabled}
      >
        {pending ? (
          <svg
            className={cn(
              "text-primary-foreground animate-spin h-5 w-5",
              size === "xs" && "h-3 w-3",
              size === "sm" && "h-4 w-4",
              size === "default" && "h-5 w-5",
              size === "lg" && "h-6 w-6",
              size === "icon" && "h-5 w-5"
            )}
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          children
        )}
        {/* {children} */}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
