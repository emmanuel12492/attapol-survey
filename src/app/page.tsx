import { redirect } from 'next/navigation'

export const runtime = 'edge'

export default async function RootPage() {
  redirect('/home')
}
