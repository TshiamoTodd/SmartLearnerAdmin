'use client' // Since Next.js components are server-first, enable client-side logic

import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/logo.png'
import React, { ReactNode } from 'react'
import DashboardLinks from '@/components/DashboardLinks'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, User2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut() // End session and sign out
    if (error) {
      console.error("Logout Error:", error.message)
      return
    }
    
    localStorage.removeItem("supabase.auth.token")
    sessionStorage.removeItem("supabase.auth.token")
  
    router.push('/')
  }
  

  return (
    <>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <div className='hidden border-r bg-muted/40 md:block'>
          <div className='flex flex-col max-h-screen h-full gap-2'>
            <div className='h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6'>
              <Link href={'/'} className='flex items-center gap-2'>
                <Image src={Logo} alt='logo' className='size-7' />
                <p className='text-xl font-thin'>
                  Smart<span className='text-blue-600 font-thin'>Learner</span>
                </p>
              </Link>
            </div>
            <div className='flex-1'>
              <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <header className='flex h-14 items-center gap-4 border-b bg-gray-500 px-4 lg:h-[60px] lg:px-6'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={'outline'} size={'icon'} className='md:hidden'>
                  <Menu className='size-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side={'left'}>
                <nav className='grid mt-10 gap-2'>
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>
            <div className='flex items-center ml-auto'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'outline'} size={'icon'} className='rounded-full'>
                    <User2 className='size-5' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={'/dashboard'}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={'/dashboard/subjects'}>Subject</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-slate-200'>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
