export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="p-8 max-w-[1200px] mx-auto w-full flex flex-col gap-6">
      <h1 className="text-[25px] font-bold text-[#10201C]">{title}</h1>
      <div className="flex flex-col items-center justify-center bg-[#ECF6F5] border border-[#D3DEDB] rounded-xl p-16 text-center">
        <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#0D8C7C] to-[#6D5BD0] mb-6" aria-hidden="true" />
        <h2 className="text-xl font-bold text-[#10201C] mb-2">Coming soon</h2>
        <p className="text-sm text-[#7C8C87] max-w-md">
          The {title} area is part of the prototype flow and hasn&apos;t been built yet.
        </p>
      </div>
    </div>
  );
}