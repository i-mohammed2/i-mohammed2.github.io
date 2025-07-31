"use client"

import { GraduationCap, Award, BookOpen } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function EducationSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation()
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation()

  return (
    <div className="container mx-auto px-4 h-full flex items-center justify-center pt-16">
      <div className="max-w-5xl w-full">
        <div 
          ref={headerRef}
          className={`text-center mb-8 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold mb-3 text-orange-300">Education</h2>
          <p className="text-lg text-orange-200">Academic foundation for innovation</p>
        </div>

        <div 
          ref={cardsRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-slate-900/90 backdrop-blur-sm p-6 rounded-xl border border-orange-500/30">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mr-3">
                <GraduationCap className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Master of Science</h3>
                <p className="text-orange-300">Computer Science, Minor in Math</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-orange-200 font-bold">University of Florida</p>
              <p className="text-gray-300 text-sm">May 2024 - Dec 2025 • GPA: 3.9/4.0</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Award className="text-orange-400 mt-1 flex-shrink-0" size={14} />
                <p className="text-gray-300 text-sm">Advanced Data Structures, Algorithm Analysis</p>
              </div>
              <div className="flex items-start space-x-2">
                <Award className="text-orange-400 mt-1 flex-shrink-0" size={14} />
                <p className="text-gray-300 text-sm">3x Hackathon Winner (2x UF Swamphacks, CU Anschutz)</p>
              </div>
              <div className="flex items-start space-x-2">
                <Award className="text-orange-400 mt-1 flex-shrink-0" size={14} />
                <p className="text-gray-300 text-sm">6x Dean's List</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-sm p-6 rounded-xl border border-teal-500/30">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mr-3">
                <BookOpen className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Bachelor of Arts</h3>
                <p className="text-teal-300">Computer Science Cum Laude</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-teal-200 font-bold">University of Florida</p>
              <p className="text-gray-300 text-sm">Aug 2021 - May 2024 • GPA: 3.7/4.0</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Award className="text-teal-400 mt-1 flex-shrink-0" size={14} />
                <p className="text-gray-300 text-sm">Certificate in Artificial Intelligence</p>
              </div>
              <div className="flex items-start space-x-2">
                <Award className="text-teal-400 mt-1 flex-shrink-0" size={14} />
                <p className="text-gray-300 text-sm">Operating Systems, Data Science, Machine Learning</p>
              </div>
              <div className="flex items-start space-x-2">
                <Award className="text-teal-400 mt-1 flex-shrink-0" size={14} />
                <p className="text-gray-300 text-sm">Computer Vision, Computer Networking</p>
              </div>
            </div>
          </div>
        </div>

        <div 
          ref={skillsRef}
          className={`mt-6 bg-gradient-to-r from-orange-900/40 via-slate-900/60 to-teal-900/40 backdrop-blur-sm p-4 rounded-xl border border-orange-500/20 transition-all duration-1000 delay-600 ${
            skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h4 className="text-lg font-bold text-orange-300 mb-3 text-center">Core Skills</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {["Machine Learning", "iOS Development", "Cloud Computing", "Computer Vision"].map((skill, index) => (
              <div 
                key={skill} 
                className={`bg-slate-800/60 p-2 rounded text-center transition-all duration-500 ${
                  skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <p className="text-white text-xs font-medium">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
