import { Bell, Pizza, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

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

  const navItems = [
    { href: "/", label: "Dashboard", active: pathname === "/" },
    { href: "/all-orders", label: "All Orders", active: pathname === "/all-orders" }
  ];

  return (
    <header className="relative z-50 bg-white/80 backdrop-blur-xl border-b border-orange-200/50 sticky top-0">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                <Pizza className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Welcome ,</h3>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  {session?.user?.name ? ` ${session.user.name}` : " Back"}!
                </h1>
                <p className="text-sm text-orange-600/70">
                  {currentTime.toLocaleString()}
                </p>
              </div>
            </div>

            <nav className="flex items-center space-x-2 bg-orange-100/50 rounded-lg p-1">
              {navItems.map(({ href, label, active }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
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

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
              />
            </div>
            {session && (
              <button
                onClick={() => signOut()}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-xl shadow-md transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
