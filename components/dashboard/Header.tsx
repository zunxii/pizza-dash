import { HeaderProps } from "@/types/props";
import { Bell, Package, Pizza, Search, Users } from "lucide-react";

export const Header: React.FC<HeaderProps> = ({ 
  searchTerm, 
  onSearchChange, 
  currentTime, 
  viewMode, 
  onViewModeChange 
}) => {
  const notifications = [
    { id: 1, message: "New order PZA007 received", type: "info", time: "2 min ago" },
    { id: 2, message: "PZA002 delivered successfully", type: "success", time: "5 min ago" },
    { id: 3, message: "High priority order PZA001", type: "warning", time: "8 min ago" }
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Welcome Back User
                </h1>
                <p className="text-sm text-orange-600/70">
                  {currentTime.toLocaleString()}
                </p>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-orange-100/50 rounded-lg p-1">
              {[
                { mode: 'cards', icon: <Package className="w-4 h-4" />, label: 'Cards' },
                { mode: 'table', icon: <Users className="w-4 h-4" />, label: 'All orders' }
              ].map(({ mode, icon, label }) => (
                <button
                  key={mode}
                  onClick={() => onViewModeChange(mode as 'cards' | 'table')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    viewMode === mode
                      ? 'bg-white shadow-lg text-orange-600'
                      : 'text-orange-600/70 hover:text-orange-600'
                  }`}
                >
                  {icon}
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search and Notifications */}
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
            
            {/* Notifications */}
            <div className="relative group">
              <button className="p-2 text-orange-600 hover:bg-orange-100/50 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              
              {/* Notification Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-orange-200/50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-3">Recent Notifications</h3>
                  <div className="space-y-3">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="flex items-start space-x-3 p-3 bg-orange-50/50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notif.type === 'success' ? 'bg-green-500' :
                          notif.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{notif.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};