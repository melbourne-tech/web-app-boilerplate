import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { databaseClientMiddleware } from '~/middleware'

const getPosts = createServerFn({ method: 'GET' })
  .middleware([databaseClientMiddleware])
  .handler(async ({ context: { sql } }) => {
    let posts: any[] = []

    try {
      posts = await sql`select * from posts`
    } catch {}

    return { posts }
  })

const postsQueryOptions = () =>
  queryOptions({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })

export const Route = createFileRoute('/')({
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
    <div className="p-2">
      <Link to="/about">About</Link>
      <Link to="/protected">Protected</Link>
      <h3>Welcome Home!!!</h3>
      <pre>
        <code>{JSON.stringify(data.posts, null, 2)}</code>
      </pre>
    </div>
  )
}
