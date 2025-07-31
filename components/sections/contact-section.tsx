"use client"

import { Github, Linkedin, Mail, Download, Twitter, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <div className="container mx-auto px-4 h-full flex items-center justify-center pointer-events-auto pt-16">
      <div className="max-w-4xl w-full bg-slate-900/95 backdrop-blur-md rounded-xl border border-orange-500/30 p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3 text-orange-300">Let's Connect</h2>
          <p className="text-lg text-orange-200">Ready to build something amazing?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <a
                href="mailto:i.mohammed@ufl.edu"
                className="flex items-center text-gray-300 hover:text-orange-400 transition-colors p-2 rounded"
              >
                <Mail className="mr-3" size={18} />
                <span>i.mohammed@ufl.edu</span>
              </a>
              <a
                href="https://github.com/i-mohammed2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-orange-400 transition-colors p-2 rounded"
              >
                <Github className="mr-3" size={18} />
                <span>github.com/i-mohammed2</span>
              </a>
              <a
                href="https://linkedin.com/in/ibrahim-mohammed-ufl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-orange-400 transition-colors p-2 rounded"
              >
                <Linkedin className="mr-3" size={18} />
                <span>linkedin.com/in/ibrahim-mohammed-ufl</span>
              </a>
            </div>

            <div className="mt-4 flex items-center text-gray-400 text-sm">
              <MapPin className="mr-2" size={16} />
              <span>Gainesville, FL</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Opportunities</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Actively seeking full-time software engineering roles and internship opportunities for Summer 2025.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-400 hover:bg-orange-950 bg-transparent"
              >
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
          <p className="text-gray-400 text-xs">© 2024 Ibrahim Mohammed. Built with React and Three.js.</p>
        </div>
      </div>
    </div>
  )
}
