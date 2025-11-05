import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const Layout = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // App-level state and methods to pass via outlet context
  const outletContextValue = {
    currentPath: location.pathname,
    sidebarCollapsed,
    setSidebarCollapsed,
    // Add any other app-level state or methods here
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: 'LayoutDashboard',
      current: location.pathname === '/'
    },
    {
      name: 'Contacts',
      href: '/contacts',
      icon: 'Users',
      current: location.pathname === '/contacts'
    },
    {
      name: 'Companies',
      href: '/companies',
      icon: 'Building2',
      current: location.pathname === '/companies'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
            <ApperIcon name="Zap" size={24} className="text-blue-600" />
            {!sidebarCollapsed && (
              <span className="ml-3 text-xl font-bold text-gray-900">CRM Pro</span>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col px-3 py-4">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive 
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <ApperIcon 
                      name={item.icon} 
                      size={20} 
                      className={cn(
                        "shrink-0 transition-colors",
                        item.current ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                      )}
                    />
                    {!sidebarCollapsed && (
                      <span className="ml-3">{item.name}</span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar toggle */}
          <div className="p-3 border-t border-gray-200">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <ApperIcon 
                name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"} 
                size={16}
              />
              {!sidebarCollapsed && <span className="ml-2">Collapse</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "transition-all duration-300",
        sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        <main className="min-h-screen">
          <Outlet context={outletContextValue} />
        </main>
      </div>
    </div>
  );
};

export default Layout;