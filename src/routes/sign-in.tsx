import { createFileRoute } from '@tanstack/react-router'
import { SignInForm } from '~/components/sign-in-form'

export const Route = createFileRoute('/sign-in')({
  component: SignIn,
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
