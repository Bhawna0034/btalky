export default function AuthImagePattern({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="hidden lg:flex items-center justify-center bg-linear-to-br from-slate-800 to-slate-900 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8 max-w-100 mx-auto">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg  ${i % 2 === 0 ? "bg-blue-500/40 animate-pulse" : "bg-slate-700/50"}`}
              style={{
                animationDuration: i % 2 === 0 ? "2s" : "0s",
                animationDelay: `${(i % 3) * 0.2}s`,
              }}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
        <p className="text-white/60">{subtitle}</p>
      </div>
    </div>
  );
}
