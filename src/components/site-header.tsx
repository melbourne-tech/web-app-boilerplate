import { Link } from '@tanstack/react-router'
import { Menu, X, LogOut, User, Settings } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '~/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { CurrentUserAvatar } from '~/components/current-user-avatar'
import { useUser, useSupabaseBrowserClient } from '~/lib/app-context'
import { cn } from '~/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Protected', href: '/protected' },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const user = useUser()
  const supabase = useSupabaseBrowserClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b border-border/40',
          mobileMenuOpen
            ? 'bg-white dark:bg-gray-950'
            : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
        )}
      >
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4">
          {/* Logo */}
          <div className="mr-4 md:mr-6">
            <Link
              to="/"
              className="mr-6 flex items-center space-x-2"
              onClick={closeMobileMenu}
            >
              <span className="text-xl font-bold">MT-WAB</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink
                    to={item.href}
                    className={cn(
                      'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                      '[&.active]:bg-accent/50'
                    )}
                    activeProps={{
                      className: 'active',
                    }}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side - Auth/User */}
          <div className="flex flex-1 items-center justify-end space-x-2">
            {user ? (
              /* Desktop User Dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer outline-hidden rounded-full border border-input focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]">
                  <CurrentUserAvatar />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.user_metadata.full_name ?? 'Your account'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Account Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Desktop Auth Buttons */
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/sign-in">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              type="button"
              variant="ghost"
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setMobileMenuOpen(!mobileMenuOpen)
              }}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            aria-hidden="true"
            onClick={closeMobileMenu}
          />
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className={cn(
            'fixed top-14 left-0 right-0 z-50 md:hidden',
            'animate-in slide-in-from-top-2 duration-200 ease-out'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white dark:bg-gray-950 border-b border-border shadow-lg">
            <div className="max-h-[calc(100vh-3.5rem)] overflow-y-auto">
              <div className="px-4 py-4">
                {/* Navigation Links */}
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'block rounded-lg px-4 py-3 text-base font-medium transition-colors',
                        'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                      )}
                      onClick={closeMobileMenu}
                      activeProps={{
                        className:
                          'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100',
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile auth section */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                        <CurrentUserAvatar />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {user.user_metadata.full_name ?? user.email}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button
                          variant="ghost"
                          asChild
                          className="w-full justify-start h-11 rounded-lg px-4"
                          size="sm"
                        >
                          <Link to="/account" onClick={closeMobileMenu}>
                            <Settings className="mr-3 h-4 w-4" />
                            Account Settings
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={handleSignOut}
                          className="w-full justify-start h-11 rounded-lg px-4 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/20"
                          size="sm"
                        >
                          <LogOut className="mr-3 h-4 w-4" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        variant="ghost"
                        asChild
                        className="w-full h-11 rounded-lg px-4"
                        size="sm"
                      >
                        <Link to="/sign-in" onClick={closeMobileMenu}>
                          Sign In
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full h-11 rounded-lg px-4"
                        size="sm"
                      >
                        <Link to="/sign-up" onClick={closeMobileMenu}>
                          Sign Up
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
