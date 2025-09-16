import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { 
      name: "Dashboard", 
      icon: LayoutDashboard, 
      href: "/dashboard", 
      active: true 
    },
    { 
      name: "Reports", 
      icon: FileText, 
      href: "/reports", 
      badge: "84"
    },
    { 
      name: "Analytics", 
      icon: BarChart3, 
      href: "/analytics" 
    },
    { 
      name: "Settings", 
      icon: Settings, 
      href: "/settings" 
    },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">FixMyCity</h1>
              <p className="text-xs text-muted-foreground">Government Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={item.active ? "default" : "ghost"}
                  className="relative"
                  size="sm"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                  {item.badge && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium">John Smith</span>
              <span className="text-xs text-muted-foreground">City Inspector</span>
            </div>
            <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant={item.active ? "default" : "ghost"}
                    className="w-full justify-start relative"
                    size="sm"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                    {item.badge && (
                      <Badge 
                        variant="destructive" 
                        className="ml-auto h-5 w-5 flex items-center justify-center text-xs p-0"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};