import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          {/* Mobile header with trigger */}
          <header className="lg:hidden flex items-center gap-3 p-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <SidebarTrigger className="p-2 rounded-lg hover:bg-muted">
              <Menu className="w-5 h-5" />
            </SidebarTrigger>
            <span className="font-semibold">Santa Command</span>
          </header>
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
