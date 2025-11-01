import { ReactNode } from 'react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Topbar from './Topbar'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/login')
  }
  return (
    <section>
      <Topbar email={session.user.email} />
      <div>
        {children}
      </div>
    </section>
  )
}
