import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Icons, Icon } from '@/components/icons';
interface NavItem {
  title: string;
  href: string;
  icon: Icon;
}
const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: 'Dashboard' },
  { title: 'Targets', href: '/targets', icon: 'Targets' },
  { title: 'Reports', href: '/reports', icon: 'Reports' },
  { title: 'Settings', href: '/settings', icon: 'Settings' },
];
export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
      <div className="flex h-16 items-center border-b px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <Icons.Logo className="h-6 w-6 text-primary" />
          <span className="text-lg">PriceWise AI</span>
        </NavLink>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-4 py-4 text-sm font-medium">
          {navItems.map((item) => {
            const IconComponent = Icons[item.icon];
            return (
              <NavLink
                key={item.href}
                to={item.href}
                end
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted',
                    isActive && 'bg-primary/10 text-primary'
                  )
                }
              >
                <IconComponent className="h-4 w-4" />
                {item.title}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}