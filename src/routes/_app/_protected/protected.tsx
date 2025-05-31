import { createFileRoute } from '@tanstack/react-router'
import { useUser } from '~/lib/app-context'

export const Route = createFileRoute('/_app/_protected/protected')({
  component: ProtectedComponent,
  async loader({ context }) {
    return {
      user: context.session.user,
    }
  },
})

function ProtectedComponent() {
  const user = useUser()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">
          Protected Page
        </h1>

        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            🔐 Authentication Success
          </h2>
          <p className="text-muted-foreground mb-4">
            Congratulations! You've successfully accessed a protected route.
            This page is only accessible to authenticated users.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">User Information</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Email:</span> {user?.email}
              </div>
              <div>
                <span className="font-medium">User ID:</span> {user?.id}
              </div>
              <div>
                <span className="font-medium">Created:</span>{' '}
                {user?.created_at
                  ? new Date(user.created_at).toISOString()
                  : 'N/A'}
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Route Protection</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                This route is protected using TanStack Router's{' '}
                <code className="bg-muted px-1 rounded">beforeLoad</code> hook.
              </p>
              <p>
                Unauthenticated users are automatically redirected to the
                sign-in page.
              </p>
              <p>
                The redirect preserves the original URL for seamless navigation
                after login.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
          <p className="text-muted-foreground mb-4">
            Your boilerplate includes everything you need to build protected
            features:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              • Add more protected routes by creating files under{' '}
              <code className="bg-muted px-1 rounded">_protected/</code>
            </li>
            <li>• Implement role-based access control with user metadata</li>
            <li>• Create user dashboards and account management features</li>
            <li>
              • Build data-driven applications with type-safe server functions
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
