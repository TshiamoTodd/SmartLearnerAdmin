import Sidebar from '@/components/Sidebar'
import React from 'react'

const Subject = () => {
  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar/>
      <h1 className="text-center">
        Subjects
      </h1>
    </main>
  )
}

export default Subject