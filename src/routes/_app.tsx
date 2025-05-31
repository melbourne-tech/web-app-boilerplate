import { Outlet, createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from '~/components/site-header'
import { SiteFooter } from '~/components/site-footer'

export const Route = createFileRoute('/_app')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
