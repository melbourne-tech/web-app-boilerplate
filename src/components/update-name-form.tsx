import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { useSupabaseBrowserClient, useUser } from '~/lib/app-context'
import { cn } from '~/lib/utils'

const updateNameSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
})

export function UpdateNameForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const user = useUser()
  const supabase = useSupabaseBrowserClient()

  const form = useForm<z.infer<typeof updateNameSchema>>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: user?.user_metadata.full_name ?? '',
    },
  })

  const updateNameMutation = useMutation({
    mutationFn: async (name: string) => {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: name,
        },
      })
      if (error) throw error

      // Refresh session to get updated user metadata
      await supabase.auth.refreshSession()
    },
    onSuccess: () => {
      // Reset form to clear any pending changes
      form.reset({ name: form.getValues().name })
    },
  })

  const onSubmit = async (values: z.infer<typeof updateNameSchema>) => {
    updateNameMutation.mutate(values.name)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Update Name</CardTitle>
          <CardDescription>Change your display name</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {updateNameMutation.error && (
                <p className="text-sm text-red-500">
                  {updateNameMutation.error instanceof Error
                    ? updateNameMutation.error.message
                    : 'An error occurred'}
                </p>
              )}
              {updateNameMutation.isSuccess && (
                <p className="text-sm text-green-600">
                  Name updated successfully!
                </p>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={updateNameMutation.isPending}
              >
                {updateNameMutation.isPending ? 'Updating...' : 'Update Name'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
