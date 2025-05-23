import { StatCardProps } from "@/types/props";
import { ArrowUp } from "lucide-react";

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color, trend }) => {
  return (
    <div className="group">
      <div className="bg-white/70 backdrop-blur-lg border border-orange-200/50 rounded-2xl p-6 shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-sm text-emerald-600 mb-1">
                <ArrowUp className="w-4 h-4" />
                <span>{trend}</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-sm text-orange-600/70">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
};