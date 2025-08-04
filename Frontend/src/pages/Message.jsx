import {
  CpuChipIcon,
  ExclamationTriangleIcon,
  ArchiveBoxIcon,
  UserCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

const groupedMessages = {
  "AI Alerts": [
    {
      id: 1,
      icon: CpuChipIcon,
      type: "info",
      title: "AI detected unusual stock pattern",
      message: "Inventory trend flagged for item #A-102: Sudden drop in 24h.",
      time: "Just now",
    },
    {
      id: 2,
      icon: CpuChipIcon,
      type: "success",
      title: "Forecast update",
      message: "AI model updated for Q4 demand forecasting.",
      time: "10 minutes ago",
    },
  ],
  "Inventory Notifications": [
    {
      id: 3,
      icon: ArchiveBoxIcon,
      type: "warning",
      title: "Low stock alert",
      message: "Item #B-205 has only 3 units left in warehouse.",
      time: "20 minutes ago",
    },
    {
      id: 4,
      icon: ArchiveBoxIcon,
      type: "success",
      title: "Restocked successfully",
      message: "25 units of item #C-330 have been added to inventory.",
      time: "2 hours ago",
    },
  ],
  "System & User Events": [
    {
      id: 5,
      icon: UserCircleIcon,
      type: "info",
      title: "New user added",
      message: "Inventory Manager role assigned to user: Clara.J",
      time: "Today, 9:10 AM",
    },
    {
      id: 6,
      icon: ExclamationTriangleIcon,
      type: "error",
      title: "Sync error",
      message: "Server failed to sync stock records at 4:00 AM.",
      time: "Today, 4:01 AM",
    },
  ],
};

const colorStyles = {
  success: "bg-green-50 text-green-800",
  info: "bg-blue-50 text-blue-800",
  warning: "bg-yellow-50 text-yellow-800",
  error: "bg-red-50 text-red-800",
};

export default function MessagesPage() {
  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        System Messages & Inventory Alerts
      </h1>

      <div className="space-y-10 max-h-[80vh] overflow-y-auto pr-1">
        {Object.entries(groupedMessages).map(([sectionTitle, messages]) => (
          <div key={sectionTitle}>
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-1">
              {sectionTitle}
            </h2>
            <div className="space-y-4">
              {messages.map((msg) => {
                const Icon = msg.icon;
                const color = colorStyles[msg.type];

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start p-4 border border-gray-200 rounded-lg shadow-sm ${color}`}
                  >
                    <Icon className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-medium">{msg.title}</h3>
                      <p className="text-sm text-gray-600">{msg.message}</p>
                      <span className="text-xs text-gray-400 block mt-1">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
