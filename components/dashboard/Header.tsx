import { Bell, Pizza, Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentTime: Date;
}

export const Header: React.FC<HeaderProps> = ({ 
  searchTerm, 
  onSearchChange, 
  currentTime
}) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const navItems = [
    { href: "/", label: "Dashboard", active: pathname === "/" },
    { href: "/all-orders", label: "All Orders", active: pathname === "/all-orders" }
  ];

  return (
    <header className="relative z-50 bg-white/80 backdrop-blur-xl border-b border-orange-200/50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Main Header Row */}
        <div className="flex items-center justify-between">
          {/* Logo and Welcome Section */}
          <div className="flex items-center space-x-3 sm:space-x-6 min-w-0 flex-1">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl animate-pulse flex-shrink-0">
                <Pizza className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent truncate">
                  Welcome,
                </h3>
                <h1 className="text-base sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent truncate">
                  {session?.user?.name ? ` ${session.user.name}` : " Back"}!
                </h1>
                <p className="text-xs sm:text-sm text-orange-600/70 hidden sm:block">
                  {currentTime.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 bg-orange-100/50 rounded-lg p-1">
              {navItems.map(({ href, label, active }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium whitespace-nowrap ${
                    active
                      ? 'bg-white shadow-lg text-orange-600'
                      : 'text-orange-600/70 hover:text-orange-600 hover:bg-white/50'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 w-48 lg:w-64 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
              />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="md:hidden p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Logout Button */}
            {session && (
              <button
                onClick={() => signOut()}
                className="hidden sm:block bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 sm:px-4 py-2 rounded-xl shadow-md transition-colors"
              >
                Logout
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchExpanded && (
          <div className="md:hidden mt-3 pt-3 border-t border-orange-200/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Time Display for Mobile */}
        <div className="sm:hidden mt-2">
          <p className="text-xs text-orange-600/70">
            {currentTime.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-orange-200/50">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {/* Mobile Navigation */}
            {navItems.map(({ href, label, active }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  active
                    ? 'bg-orange-100 text-orange-600 shadow-sm'
                    : 'text-orange-600/70 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {label}
              </Link>
            ))}
            
            {/* Mobile Logout Button */}
            {session && (
              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md transition-colors font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};