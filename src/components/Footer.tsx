"use client"

import { Github, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 font-mono text-sm">HUKUM © 2025</span>
            <div className="h-4 w-px bg-gray-800" />
            <Link 
              href="https://github.com/BaDAM152" 
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link 
              href="/terms" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              <span className="flex items-center">
                Terms & License
              </span>
            </Link>
            <Link 
              href="mailto:barghavabhilash@gmail.com" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              <span className="flex items-center">
                <Mail className="h-5 w-5" />
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
