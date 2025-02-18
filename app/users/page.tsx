import Sidebar from '@/components/Sidebar'
import React from 'react'

const Users = () => {
  return (
    <main className="flex min-h-screen w-full flex-row">
        <Sidebar/>
        <div>
            <h1>Users</h1>
        </div>
    </main>
  )
}

export default Users