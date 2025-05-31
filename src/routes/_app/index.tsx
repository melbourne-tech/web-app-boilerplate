import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { postsQueryOptions } from '~/data/posts'

export const Route = createFileRoute('/_app/')({
  component: Home,
  pendingComponent: () => <div>Loading...</div>,
  async loader({ context }) {
    const { posts } =
      await context.queryClient.ensureQueryData(postsQueryOptions())

    return { posts }
  },
})

function Home() {
  const { data } = useSuspenseQuery(postsQueryOptions())

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Welcome to Melbourne Tech Web App Boilerplate
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            A modern, type-safe full-stack React boilerplate with
            authentication, database integration, and industry best practices.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">TanStack Router</h3>
            <p className="text-sm text-muted-foreground">
              Type-safe, client-first routing with code splitting and data
              loading.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Supabase Auth</h3>
            <p className="text-sm text-muted-foreground">
              Complete authentication system with user management and protected
              routes.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Tailwind CSS</h3>
            <p className="text-sm text-muted-foreground">
              Modern utility-first CSS framework with a beautiful design system.
            </p>
          </div>
        </div>

        {data.posts.length > 0 && (
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Database Posts</h2>
            <div className="grid gap-4">
              {data.posts.map((post: any, index: number) => (
                <div key={index} className="p-4 border rounded-md bg-card">
                  <pre className="text-sm overflow-auto">
                    <code>{JSON.stringify(post, null, 2)}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.posts.length === 0 && (
          <div className="text-center py-12 border rounded-lg bg-muted/50">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No posts yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Your database connection is working! Add some posts to see them
              here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
