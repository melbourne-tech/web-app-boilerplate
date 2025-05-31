import { queryOptions } from '@tanstack/react-query'
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

export const postsQueryOptions = () =>
  queryOptions({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })
