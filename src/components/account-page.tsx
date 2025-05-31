import { UpdateNameForm } from '~/components/update-name-form'
import { UpdatePasswordForm } from '~/components/update-password-form'
import { cn } from '~/lib/utils'

export function AccountPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('container max-w-2xl mx-auto p-6', className)}
      {...props}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account information and security settings
        </p>
      </div>

      <div className="space-y-6">
        <UpdateNameForm />
        <UpdatePasswordForm showNavigation={false} />
      </div>
    </div>
  )
}
