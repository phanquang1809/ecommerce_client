import * as React from "react";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
  endIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    return (
      <div className={cn("w-full relative", className)}>
        {StartIcon && (
          <div className="absolute left-1 top-1/2 transform -translate-y-1/2">
            <StartIcon className="text-muted-foreground ml-1 size-5" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex w-full text-muted-foreground rounded-md border border-input bg-background py-1.5 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-8" : "",
            endIcon ? "pr-8" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <button className="absolute right-1 top-1/2 transform -translate-y-1/2">
            <EndIcon className="text-muted-foreground rounded p-2 size-8" />
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
