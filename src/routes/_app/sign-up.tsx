import { createFileRoute, redirect } from '@tanstack/react-router'
import { SignUpForm } from '~/components/sign-up-form'

export const Route = createFileRoute('/_app/sign-up')({
  component: SignUp,
  beforeLoad({ context: { session } }) {
    if (session) {
      throw redirect({ to: '/', replace: true })
    }
  },
})

function SignUp() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  )
}
