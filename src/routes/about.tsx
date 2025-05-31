import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-2">
      <Link to="/">Home</Link>
      Hello "/about"!
    </div>
  )
}
