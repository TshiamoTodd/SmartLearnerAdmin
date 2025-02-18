import Sidebar from '@/components/Sidebar'
import React from 'react'

const Paper = () => {
  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar/>
      <h1 className="text-center">
        Past Papers
      </h1>
    </main>
  )
}

export default Paper