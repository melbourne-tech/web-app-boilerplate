import { createFileRoute } from '@tanstack/react-router'
import { AccountPage } from '~/components/account-page'

export const Route = createFileRoute('/_app/_protected/account')({
  component: Account,
})

function Account() {
  return <AccountPage />
}
