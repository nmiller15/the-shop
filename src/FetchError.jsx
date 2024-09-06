export default function FetchError() {
  return (
    <div className="flex h-[70vh] w-full flex-col place-items-center justify-center">
      <i className="iconoir-emoji-sad mb-3 text-9xl"></i>
      <h2 className="text-xl text-slate-400">Unable to fetch shop data...</h2>
      <p className="text-md text-slate-400">
        We&apos;re sorry. Please try back again later.
      </p>
    </div>
  );
}
