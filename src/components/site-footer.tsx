import { Link } from '@tanstack/react-router'
import { useState } from 'react'

export function SiteFooter() {
  const [currentYear] = useState(() => new Date().getFullYear())

  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-screen-2xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row md:py-0">
          {/* Left side - Logo and copyright */}
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold">MT-WAB</span>
            </Link>
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {currentYear} Melbourne Tech, LLC
            </p>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link
              to="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <a
              href="https://supabase.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Supabase
            </a>
            <a
              href="https://github.com/TanStack/start"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              TanStack Start
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
