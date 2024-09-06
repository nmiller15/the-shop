export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full flex-col place-items-center justify-center">
      <i className="iconoir-refresh-double mb-6 animate-spin text-7xl"></i>
      <h2 className="text-xl text-slate-400">Loading Store Data...</h2>
    </div>
  );
}
