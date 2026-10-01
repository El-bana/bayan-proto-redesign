export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 p-4 bg-bg-light overflow-y-auto">
      {children}
    </div>
  );
}
