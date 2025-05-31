import { createFileRoute, redirect } from '@tanstack/react-router'
import { SignInForm } from '~/components/sign-in-form'

export const Route = createFileRoute('/_app/sign-in')({
  component: SignIn,
  beforeLoad({ context: { session } }) {
    if (session) {
      throw redirect({ to: '/', replace: true })
    }
  },
})

function SignIn() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  )
}
