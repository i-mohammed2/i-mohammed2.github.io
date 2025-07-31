"use client"

import { useMemo } from "react"
import { EducationSection } from "./sections/education-section"
import { ExperienceSection } from "./sections/experience-section"
import { ProjectsSection } from "./sections/projects-section"
import { ContactSection } from "./sections/contact-section"

export function ContentOverlay({ scrollProgress }) {
  // Adjusted for 6x height
  const activeSection = useMemo(() => {
    if (scrollProgress < 0.2) return "intro"
    if (scrollProgress < 0.4) return "education"
    if (scrollProgress < 0.6) return "experience"
    if (scrollProgress < 0.8) return "projects"
    return "contact"
  }, [scrollProgress])

  const getOpacity = (section) => {
    return activeSection === section ? 1 : 0
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: getOpacity("education") }}>
        <EducationSection />
      </div>

      <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: getOpacity("experience") }}>
        <ExperienceSection />
      </div>

      <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: getOpacity("projects") }}>
        <ProjectsSection />
      </div>

      <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: getOpacity("contact") }}>
        <ContactSection />
      </div>
    </div>
  )
}
