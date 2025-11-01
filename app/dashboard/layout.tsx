import { ReactNode } from 'react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/login')
  }
  return (
    <section>
      {children}
    </section>
  )
}
