import { Github, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-white/[0.1] bg-black/40 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent font-mono text-sm">
              HUKUM © 2025
            </span>
            <div className="h-4 w-px bg-white/[0.1]" />
            <Link 
              href="https://github.com/BaDAM152" 
              className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link 
              href="/terms" 
              className="text-sm text-white/60 hover:text-white transition-all duration-300 relative group"
            >
              <span className="flex items-center">
                Terms & License
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link 
              href="mailto:barghavabhilash@gmail.com" 
              className="text-sm text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
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