"use client"

export function ScrollProgress({ progress }) {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-10">
      <div className="h-32 w-1 bg-slate-700 rounded-full relative">
        <div
          className="absolute bottom-0 w-1 bg-gradient-to-t from-orange-400 to-orange-600 rounded-full transition-all duration-300"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      <div className="mt-3 space-y-2">
        {["Education", "Experience", "Projects", "Contact"].map((section, index) => {
          // Adjusted for longer sections
          const sectionBoundaries = [0.35, 0.55, 0.75, 1.0]
          const isActive =
            progress >= (index === 0 ? 0.15 : sectionBoundaries[index - 1]) && progress < sectionBoundaries[index]

          return (
            <div
              key={section}
              className={`w-2 h-2 rounded-full transition-colors ${isActive ? "bg-orange-400" : "bg-slate-600"}`}
              title={section}
            />
          )
        })}
      </div>
    </div>
  )
}
