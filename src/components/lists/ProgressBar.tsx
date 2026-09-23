import { SendHorizontal } from "lucide-react";

export default function ProgressBar() {
  const campaigns = [
    { name: "Euro Campaign", color: "#3B82F6", progress: "35%" },
    { name: "KSA Campaign", color: "#FF823A", progress: "60%" },
    { name: "USA Campaign", color: "#00C11A", progress: "100%" },
  ];

  return (
    <div className="w-full shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-gray-50 border border-gray-300 flex items-center px-4 py-3 mt-4">
      <div className="flex items-center">
        {campaigns.map((item, index) => (
          <div key={item.name} className="flex items-center">
            {/* Divider line between items */}
            {index > 0 && <div className="h-8 w-[1px] bg-gray-300 mx-4" />}

            <button className="flex items-center gap-3 text-[#10201C] font-medium text-sm hover:opacity-80 transition-opacity">
              <SendHorizontal className="w-5 h-5 text-[#4F46E5]" />
              <span>{item.name}</span>

              {/* Progress Bar Container */}
              <div className="relative w-12 h-[3px] bg-gray-300 rounded-full overflow-hidden ml-1">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: item.progress,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
