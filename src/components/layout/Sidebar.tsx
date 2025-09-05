'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const itemSize = 'h-4 w-4';

const sidebarItems: SidebarItem[] = [
  {
    title: '戰情室',
    href: '/',
    icon: <LayoutDashboard className={itemSize} />,
  },
  {
    title: '用戶管理',
    href: '/users',
    icon: <Users className={itemSize} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  if (pathname !== '/login') {
    return (
      <TooltipProvider delayDuration={0}>
        <aside
          className={cn(
            'bg-gradient-to-b from-gray-50 to-white h-screen transition-all duration-300 flex flex-col border-r shadow-sm',
            collapsed ? 'w-20' : 'w-64'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            {!collapsed && (
              <h2 className="text-lg font-bold text-gray-900">管理後台</h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className={cn(
                'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
                collapsed && 'mx-auto'
              )}
              data-testid="sidebar-toggle"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 mb-6">
            <ul className="space-y-1 px-3">
              {sidebarItems.map(item => {
                const isActive = pathname === item.href;
                const linkContent = (
                  <Link
                    href={item.href}
                    className={cn(
                      'relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group',
                      isActive
                        ? 'bg-blue-50 text-blue-600 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100',
                      collapsed && 'justify-center px-0'
                    )}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute inset-y-0 left-0 w-1 bg-blue-600 rounded-r-full" />
                    )}

                    {/* Icon */}
                    <span
                      className={cn(
                        'flex items-center justify-center',
                        isActive
                          ? 'text-blue-600'
                          : 'text-gray-500 group-hover:text-gray-700',
                        collapsed && 'mx-auto'
                      )}
                    >
                      {item.icon}
                    </span>

                    {/* Title */}
                    {!collapsed && (
                      <span className="flex-1 text-sm font-medium">
                        {item.title}
                      </span>
                    )}
                  </Link>
                );

                return (
                  <li key={item.title}>
                    {collapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="flex items-center gap-2"
                        >
                          <span>{item.title}</span>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      linkContent
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </TooltipProvider>
    );
  } else {
    return null;
  }
}
