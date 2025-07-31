"use client"

import { Briefcase, TrendingUp, Users } from "lucide-react"

export function ExperienceSection() {
  const experiences = [
    {
      title: "Software Engineering Intern",
      company: "Amazon Aurora",
      period: "May 2025 - Aug 2025",
      icon: <Briefcase className="text-white" size={20} />,
      color: "from-orange-400 to-red-600",
      achievements: ["Improved Aurora's optimized-reads feature by 40% with better eviction policies for 250K+ users worldwide", "Restructured performance testing suite and reduced setup time by 90% with automated Python scripts", "Built real-time KPI dashboards for cache-hit and eviction latency, reducing regression-detection time"],
      technologies: ["C++", "Python", "Linux", "SQL", "AWS"],
    },
    {
      title: "Data Analyst Intern",
      company: "McKnight Neuroscience Laboratory",
      period: "May 2024 - Aug 2024",
      icon: <TrendingUp className="text-white" size={20} />,
      color: "from-teal-400 to-blue-600",
      achievements: ["Processed 2TB of raw brain data from 10 moving rats through modular Python/MATLAB ETL pipeline", "Engineered neural network model to isolate brain oscillations (theta, gamma, ripple) with >95% accuracy", "Developed place-cell detection algorithm, identifying 200+ place cells across 10 subjects"],
      technologies: ["Java", "Python", "SQL", "MATLAB"],
    },
    {
      title: "Research Lead",
      company: "Smart Systems Robotics Lab",
      period: "Jan 2023 - May 2024",
      icon: <Users className="text-white" size={20} />,
      color: "from-purple-400 to-indigo-600",
      achievements: ["Spearheaded team of 10 students to develop Parkinson's disease detection ML model", "Engineered PostgreSQL schema to label and host 100K+ video frames, slashing query latency by 50%", "Presented results at UF research symposium (100+ industry experts), paper under review"],
      technologies: ["Python", "TensorFlow", "PostgreSQL"],
    },
    {
      title: "Software Engineering Intern",
      company: "PayPal",
      period: "May 2023 - Aug 2023",
      icon: <Briefcase className="text-white" size={20} />,
      color: "from-amber-400 to-yellow-600",
      achievements: ["Built React/Node.js asset-management portal for 1M records, decreasing load times by 40%", "Designed SQL schemas and REST APIs for onboarding workflows, reducing API response time by 60%", "Led full-lifecycle development across three concurrent projects with 50 global stakeholders"],
      technologies: ["React", "JavaScript", "Spotfire", "SQL"],
    },
  ]

  return (
    <div className="container mx-auto px-4 h-full flex items-center justify-center pt-8">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold mb-2 text-orange-300">Experience</h2>
          <p className="text-base text-orange-200">Building systems at scale</p>
        </div>

        <div className="space-y-3">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-slate-900/90 backdrop-blur-sm rounded-xl border border-orange-500/30 p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                <div className="flex items-center mb-2 lg:mb-0">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${exp.color} rounded-full flex items-center justify-center mr-3`}
                  >
                    {exp.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                    <p className="text-orange-300 text-sm">{exp.company}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-amber-800/40 to-orange-800/40 px-3 py-1 rounded-full border border-amber-600/30">
                  <p className="text-amber-200 text-xs font-medium">{exp.period}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="lg:col-span-2">
                  <ul className="space-y-0.5">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                        <p className="text-gray-200 text-xs leading-relaxed">{achievement}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-teal-800/40 text-teal-200 text-xs px-2 py-0.5 rounded border border-teal-600/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
