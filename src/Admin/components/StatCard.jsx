import { TrendingUp, Users, FileText, Eye } from "lucide-react";

const StatCard = ({ title, value }) => {
  const getIcon = (title) => {
    switch (title) {
      case "Total News":
        return <FileText size={24} className="text-blue-600" />;
      case "Categories":
        return <TrendingUp size={24} className="text-green-600" />;
      case "Reporters":
        return <Users size={24} className="text-purple-600" />;
      case "Views Today":
        return <Eye size={24} className="text-orange-600" />;
      default:
        return <FileText size={24} className="text-gray-600" />;
    }
  };

  const getGradient = (title) => {
    switch (title) {
      case "Total News":
        return "from-blue-500 to-blue-600";
      case "Categories":
        return "from-green-500 to-green-600";
      case "Reporters":
        return "from-purple-500 to-purple-600";
      case "Views Today":
        return "from-orange-500 to-orange-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(title)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

      {/* Icon */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${getGradient(title)} bg-opacity-10`}>
          {getIcon(title)}
        </div>
        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getGradient(title)}`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{value}</h2>
        <div className={`h-1 w-12 bg-gradient-to-r ${getGradient(title)} rounded-full`}></div>
      </div>
    </div>
  );
};

export default StatCard;
