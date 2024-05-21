"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("scroll-mt-20", {
  variants: {
    type: {
      h1: "text-3xl font-semibold mb-10 lg:text-4xl",
      h2: "text-3xl font-medium mb-6",
      h3: "text-2xl font-medium mb-4",
      h4: "text-xl font-medium mb-2",
    },
    decoration: {
      default: "",
      underline: "pb-1 border-b",
    },
  },
  defaultVariants: {
    type: "h2",
    decoration: "default",
  },
});

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  noMarginBottom?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, type, decoration, noMarginBottom, ...props }, ref) => {
    let Comp: any = "h2";
    switch (type) {
      case "h1":
        Comp = "h1";
        break;
      case "h2":
        Comp = "h2";
        break;
      case "h3":
        Comp = "h3";
        break;
      case "h4":
        Comp = "h4";
        break;
    }
    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ type, decoration, className }), noMarginBottom && "mb-0")}
        {...props}
      >
        {props.title}
        {props.children}
      </Comp>
    );
  }
);

Heading.displayName = "Heading";

const headingDescriptionVariants = cva("text-sm text-muted-foreground pt-1 pb-2", {
  variants: {
    type: {
      // none: "",
      h1: "mb-10 font-semibold",
      h2: "mb-6 font-medium",
      h3: "mb-4 font-medium",
      h4: "mb-2 font-medium",
    },
    decoration: {
      default: "",
      underline: "border-b",
    },
  },
  defaultVariants: {
    // type: "none",
    decoration: "default",
  },
});

interface HeadingDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof headingDescriptionVariants> {}

const HeadingDescription: React.FC<React.PropsWithChildren<HeadingDescriptionProps>> = ({
  type,
  decoration,
  className,
  children,
  ...props
}) => {
  return <p className={cn(headingDescriptionVariants({ type, decoration, className }))}>{children}</p>;
};

export { Heading, HeadingDescription };
