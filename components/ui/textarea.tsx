import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-28 w-full rounded-control border border-border-strong bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40 focus-visible:border-accent-blue",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-red-200",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
