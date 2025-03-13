import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  startIcon?: LucideIcon; 
  endIcon?: LucideIcon;   
}

function Input({ className, type, startIcon: StartIcon, endIcon: EndIcon, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {StartIcon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <StartIcon className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          StartIcon && "pl-10", 
          EndIcon && "pr-10", 
          className
        )}
        {...props} 
      />
      {EndIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <EndIcon className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

export { Input };