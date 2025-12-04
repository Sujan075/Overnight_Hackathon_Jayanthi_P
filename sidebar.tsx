import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Shield,
  AlertTriangle,
  History,
  Network,
  QrCode,
  Settings,
  BookOpen,
  Bell,
  Users,
  Map,
  Play,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  Fingerprint,
  Mic,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const userNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Fraud Alerts', href: '/alerts', icon: AlertTriangle, badge: 3 },
  { name: 'Risk Score', href: '/risk-score', icon: Shield },
  { name: 'Transactions', href: '/transactions', icon: History },
  { name: 'UPI Sandbox', href: '/sandbox', icon: QrCode },
  { name: 'Trust Network', href: '/trust-graph', icon: Network },
  { name: 'Scam Stories', href: '/fraud-stories', icon: Play },
  { name: 'News & Alerts', href: '/scam-news', icon: Newspaper },
  { name: 'Voice Assistant', href: '/voice-assistant', icon: Mic },
];

const adminNavItems: NavItem[] = [
  { name: 'Admin Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Fraud Heatmap', href: '/admin/heatmap', icon: Map },
  { name: 'All Users', href: '/admin/users', icon: Users },
  { name: 'Patterns', href: '/admin/patterns', icon: Fingerprint },
  { name: 'Alerts Timeline', href: '/admin/timeline', icon: Bell },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-sidebar-foreground">FraudGuard</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {/* Home Link */}
          <Link
            to="/"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 mb-2 transition-colors',
              'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              isActive('/') && 'bg-sidebar-accent text-sidebar-primary'
            )}
          >
            <Home className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Home</span>}
          </Link>

          {/* User Section */}
          {!collapsed && (
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              User
            </div>
          )}
          <div className="space-y-1">
            {userNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors relative',
                  'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  isActive(item.href) && 'bg-sidebar-primary/10 text-sidebar-primary border-l-2 border-sidebar-primary'
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {collapsed && item.badge && (
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
                )}
              </Link>
            ))}
          </div>

          {/* Admin Section */}
          {!collapsed && (
            <div className="px-3 py-2 mt-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Admin
            </div>
          )}
          <div className="space-y-1 mt-2">
            {adminNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                  'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  isActive(item.href) && 'bg-sidebar-primary/10 text-sidebar-primary border-l-2 border-sidebar-primary'
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-2">
          <Link
            to="/settings"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
              'text-sidebar-foreground hover:bg-sidebar-accent'
            )}
          >
            <Settings className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </Link>
          <button
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors',
              'text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive'
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
