"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Notification } from "@/types"
import { NotificationItem } from "./notification-items"




interface NotificationsProps {
  notifications?: Notification[]
  onMarkAsRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  className?: string
}
export function Notifications({
    notifications = defaultNotifications,
    onMarkAsRead = () => {},
    onMarkAllAsRead = () => {},
    className,
  }: NotificationsProps) {
    const [open, setOpen] = useState(false)
    const unreadCount = notifications.filter((notification) => !notification.read).length
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className={cn("relative rounded-full", className)}>
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute text-white -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] ">
                {unreadCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="md:w-80 w-full p-0" align="end">
          <Card className="border-0 shadow-none">
            <CardHeader className="border-b  pb-6">
              <div className="flex gap-2 flex-col ">
                <div>
                  <CardTitle className="text-base">Notificaciones</CardTitle>
                  <CardDescription>
                    {unreadCount > 0
                      ? `Tienes ${unreadCount} notificaciones sin leer`
                      : "No tienes notificaciones sin leer"}
                  </CardDescription>
                </div>
                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={onMarkAllAsRead}>
                    Marcar todas como leídas
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[350px] w-full" type="always">
                {notifications.length > 0 ? (
                  <div>
                    {notifications.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} onMarkAsRead={onMarkAsRead} />
                    ))}
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center">
                    <p className="text-sm text-muted-foreground">No hay notificaciones</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    )
  }

  const defaultNotifications: Notification[] = [
    {
      id: "1",
      title: "Nueva actualización disponible",
      description: "Se ha lanzado la versión 2.0 de la aplicación.",
      timestamp: "Hace 5 minutos",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Tarea completada",
      description: "Has completado todas tus tareas pendientes.",
      timestamp: "Hace 1 hora",
      read: false,
      type: "success",
    },
    {
      id: "3",
      title: "Recordatorio de reunión",
      description: "Tienes una reunión programada para mañana a las 10:00 AM.",
      timestamp: "Hace 3 horas",
      read: true,
      type: "warning",
    },
    {
      id: "4",
      title: "Error en el sistema",
      description: "Se ha detectado un error en el módulo de pagos.",
      timestamp: "Hace 1 día",
      read: true,
      type: "error",
    },
    {
      id: "5",
      title: "Nuevo comentario",
      description: "Juan ha comentado en tu publicación reciente.",
      timestamp: "Hace 2 días",
      read: true,
      type: "info",
    },
    {
      id: "6",
      title: "Actualización de seguridad",
      description: "Se ha aplicado una actualización de seguridad importante.",
      timestamp: "Hace 3 días",
      read: true,
      type: "warning",
    },
    {
      id: "7",
      title: "Pago recibido",
      description: "Has recibido un pago de $150 en tu cuenta.",
      timestamp: "Hace 4 días",
      read: true,
      type: "success",
    },
    {
      id: "8",
      title: "Nuevo seguidor",
      description: "María ha comenzado a seguirte.",
      timestamp: "Hace 5 días",
      read: true,
      type: "info",
    },
  ]
  
  