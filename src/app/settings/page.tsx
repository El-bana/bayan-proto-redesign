const features = ['Workspace name', 'Email notifications', 'Security', 'Team members'];

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-[1200px] mx-auto w-full flex flex-col gap-6">
      <h1 className="text-[25px] font-bold text-[#10201C]">Settings</h1>
      <div className="flex flex-col bg-[#ECF6F5] border border-[#D3DEDB] rounded-xl overflow-hidden">
        <div className="flex border-b border-[#D3DEDB]">
          {features.map((feature) => (
            <button
              key={feature}
              type="button"
              className="flex-1 px-4 py-3 text-sm font-medium text-[#7C8C87] hover:text-[#10201C] hover:bg-black/5 transition-colors"
            >
              {feature}
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center p-16 text-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#0D8C7C] to-[#6D5BD0] mb-6" aria-hidden="true" />
          <h2 className="text-xl font-bold text-[#10201C] mb-2">Settings are coming soon</h2>
          <p className="text-sm text-[#7C8C87] max-w-md">
            Account preferences, billing, and team management are part of the prototype flow.
          </p>
        </div>
      </div>
    </div>
  );
}