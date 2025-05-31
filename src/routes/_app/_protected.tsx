import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_protected')({
  beforeLoad({ context: { session } }) {
    if (!session) {
      throw redirect({ to: '/sign-in' })
    }

    return {
      session,
    }
  },
})
