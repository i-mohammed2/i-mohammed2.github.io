"use client"

export function Loader() {
  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-block relative w-16 h-16">
          <div className="absolute border-2 border-t-orange-400 border-r-transparent border-b-transparent border-l-transparent rounded-full w-16 h-16 animate-spin"></div>
        </div>
        <p className="mt-4 text-orange-200">Loading...</p>
      </div>
    </div>
  )
}
