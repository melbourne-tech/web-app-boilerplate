import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/about')({
  component: About,
})

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">
          About Melbourne Tech Web App Boilerplate
        </h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Melbourne Tech Web App Boilerplate (MT-WAB) is a comprehensive,
            production-ready foundation for modern web applications, built with
            industry best practices and cutting-edge technologies.
          </p>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Frontend Stack</h2>
              <ul className="space-y-2">
                <li>
                  • <strong>React 19</strong> - Latest React with concurrent
                  features
                </li>
                <li>
                  • <strong>TanStack Start</strong> - Full-stack React framework
                </li>
                <li>
                  • <strong>TanStack Router</strong> - Type-safe routing
                </li>
                <li>
                  • <strong>TanStack Query</strong> - Server state management
                </li>
                <li>
                  • <strong>Tailwind CSS</strong> - Utility-first styling
                </li>
                <li>
                  • <strong>Radix UI</strong> - Accessible component primitives
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Backend & Services
              </h2>
              <ul className="space-y-2">
                <li>
                  • <strong>Supabase</strong> - Authentication & database
                </li>
                <li>
                  • <strong>PostgreSQL</strong> - Robust relational database
                </li>
                <li>
                  • <strong>Cloudflare Workers</strong> - Edge computing
                  platform
                </li>
                <li>
                  • <strong>Server Functions</strong> - Type-safe API endpoints
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">🔐 Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Complete user authentication with sign-up, sign-in, password
                  reset, and protected routes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📱 Responsive Design</h3>
                <p className="text-sm text-muted-foreground">
                  Mobile-first responsive design that works beautifully on all
                  devices.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">⚡ Performance</h3>
                <p className="text-sm text-muted-foreground">
                  Code splitting, SSR, and optimized bundle sizes for fast
                  loading.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🛡️ Type Safety</h3>
                <p className="text-sm text-muted-foreground">
                  End-to-end type safety from database to UI components.
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="mb-4">
              This boilerplate is designed to be a solid foundation for your
              next project. Simply clone, configure your environment variables,
              and start building!
            </p>
            <div className="bg-card rounded border p-4">
              <code className="text-sm">npm install && npm run dev</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
