import { cn } from "@/lib/utils"
import { Notification } from "@/types"
import { NotificationDot } from "./notification-dot"

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
}
interface NotificationItemProps {
    notification: Notification
    onMarkAsRead: (id: string) => void
  }
  
export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
    const { id, title, description, timestamp, read, type } = notification
  
    const handleClick = () => {
      if (!read) {
        onMarkAsRead(id)
      }
    }
  
    return (
      <div
        className={cn(
          "flex cursor-pointer items-start gap-3 border-b p-4 transition-colors hover:bg-muted/50",
          !read && "bg-muted/20",
        )}
        onClick={handleClick}
      >
        <NotificationDot type={type} read={read} />
        <div className="grid gap-1">
          <p className={cn("text-sm font-medium", !read && "font-semibold")}>{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
      </div>
    )
  }