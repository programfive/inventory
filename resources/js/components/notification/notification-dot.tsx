import { cn } from "@/lib/utils";

type NotificationType = "info" | "success" | "warning" | "error"


export function NotificationDot({ type, read }: { type: NotificationType; read: boolean }) {
    if (read) {
      return <div className="mt-1 h-2 w-2 rounded-full bg-muted" />
    }
  
    const colors = {
      info: "bg-blue-500",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      error: "bg-destructive",
    }
  
    return <div className={cn("mt-1 h-2 w-2 rounded-full", colors[type])} />
  }
  