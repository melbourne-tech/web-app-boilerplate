import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { useSupabaseBrowserClient } from '~/lib/app-context'
import { cn } from '~/lib/utils'

const updatePasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

interface UpdatePasswordFormProps
  extends React.ComponentPropsWithoutRef<'div'> {
  onSuccess?: () => void
  showNavigation?: boolean
}

export function UpdatePasswordForm({
  className,
  onSuccess,
  showNavigation = true,
  ...props
}: UpdatePasswordFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const supabase = useSupabaseBrowserClient()

  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof updatePasswordSchema>) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      })
      if (error) throw error

      if (onSuccess) {
        onSuccess()
      } else if (showNavigation) {
        await navigate({ to: '/protected' })
      } else {
        setSuccess(true)
        form.reset()
        setTimeout(() => setSuccess(false), 3000) // Hide success message after 3 seconds
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {showNavigation ? 'Reset Your Password' : 'Update Password'}
          </CardTitle>
          <CardDescription>
            {showNavigation
              ? 'Please enter your new password below.'
              : 'Change your account password'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && (
                <p className="text-sm text-green-600">
                  Password updated successfully!
                </p>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? 'Saving...'
                  : showNavigation
                    ? 'Save new password'
                    : 'Update Password'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
