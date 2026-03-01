import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Sparkles,
  CalendarDays,
  Upload,
  MessageSquare,
  User,
  LifeBuoy,
  LogOut,
  Bell,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { creator } from "@/data/mockCreatorData";
import { useScheduling } from "@/context/SchedulingContext";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Overview", path: "/creator/dashboard", icon: LayoutDashboard },
  { label: "Opportunities", path: "/creator/opportunities", icon: Sparkles },
  { label: "Upcoming Visits", path: "/creator/visits", icon: CalendarDays },
  { label: "Submit Content", path: "/creator/submit", icon: Upload },
  { label: "Messages", path: "/creator/messages", icon: MessageSquare },
  { label: "Profile", path: "/creator/profile", icon: User },
  { label: "Support", path: "/creator/support", icon: LifeBuoy },
];

const NotificationBell = () => {
  const { notifications, unreadCount } = useScheduling();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(!open)}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-accent rounded-full" />
        )}
      </Button>
      {open && (
        <div className="absolute right-0 top-10 w-80 bg-popover border border-border rounded-lg shadow-lg z-50 p-2 space-y-1 max-h-64 overflow-y-auto">
          {notifications.slice(0, 6).map((n) => (
            <div
              key={n.id}
              className={cn(
                "text-sm p-2 rounded-md",
                n.read ? "text-muted-foreground" : "text-foreground bg-muted/50 font-medium"
              )}
            >
              <p>{n.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CreatorLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/creator/dashboard" className="text-2xl font-serif text-accent">
          Sufra
        </Link>
        <p className="text-xs text-sidebar-foreground/60 mt-1">Creator Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-accent"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-destructive transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden md:flex w-60 flex-col bg-sidebar border-r border-sidebar-border fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-foreground/40" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-sidebar z-50 shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="text-sm md:text-base font-medium text-foreground truncate">
              {creator.name}
            </h2>
          </div>
          <NotificationBell />
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CreatorLayout;
