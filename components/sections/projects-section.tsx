"use client"

import { ExternalLink, Github, Rocket } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "Social Learning Web Application (Peers)",
      description: "Full-stack web application launched to a 50,000 student campus to improve student learning. Directed 5-person team within Agile methodology to implement over 100,000 lines of code.",
      technologies: ["Node.js", "React", "PostgreSQL", "TypeScript"],
      github: "https://github.com/ibrahim/peers-app",
      demo: "https://peers-learning.com",
      metrics: "25+ organizations, 1000+ students, 500 daily users",
    },
    {
      title: "Machine Learning Model for Parkinson's Disease",
      description: "Detected Parkinson's disease symptoms with 60% accuracy using movement data from 5 subjects. Engineered ML model utilizing Anipose and YoloV8 architectures to generate 100 3D plots mapping human movements.",
      technologies: ["Python", "Supabase", "C", "YoloV8"],
      github: "https://github.com/ibrahim/parkinsons-ml",
      demo: "https://parkinsons-detection.herokuapp.com",
      metrics: "60% accuracy, 50K labeled frames, 2 years development",
    },
    {
      title: "Overnight Drift Quantitative Analysis",
      description: "Replicated New York Fed's overnight-drift methodology on 500+ trading days of SPY data. Automated data retrieval and preprocessing via Alpaca Markets API with comprehensive visualization.",
      technologies: ["Python", "Alpaca API", "Pandas", "Matplotlib"],
      github: "https://github.com/ibrahim/overnight-drift",
      demo: "https://overnight-drift-analysis.com",
      metrics: "500+ trading days analyzed, 5 look-back windows",
    },
    {
      title: "StudyBuddy iOS App",
      description: "Social studying platform connecting university students for collaborative learning sessions and study groups with real-time messaging and scheduling features.",
      technologies: ["Swift", "Firebase", "UIKit", "CoreData"],
      github: "https://github.com/ibrahim/studybuddy",
      demo: "https://apps.apple.com/studybuddy",
      metrics: "1K+ student users, 4.8★ App Store rating",
    },
  ]

  return (
    <div className="container mx-auto px-4 h-full flex items-center justify-center pointer-events-auto pt-16">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3 text-orange-300">Projects</h2>
          <p className="text-lg text-orange-200">Products solving real problems</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-slate-900/90 backdrop-blur-sm rounded-xl border border-orange-500/30 p-6">
              <div className="flex items-center mb-3">
                <Rocket className="text-orange-400 mr-2" size={18} />
                <h3 className="text-lg font-bold text-white">{project.title}</h3>
              </div>

              <p className="text-gray-300 text-sm mb-3 leading-relaxed">{project.description}</p>

              <div className="mb-3 p-2 bg-slate-800/50 rounded text-center">
                <p className="text-xs text-green-300 font-semibold">{project.metrics}</p>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-orange-800/30 text-orange-200 text-xs px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-orange-400 transition-colors"
                >
                  <Github size={14} className="mr-1" />
                  <span className="text-sm">Code</span>
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-teal-400 transition-colors"
                >
                  <ExternalLink size={14} className="mr-1" />
                  <span className="text-sm">Demo</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
