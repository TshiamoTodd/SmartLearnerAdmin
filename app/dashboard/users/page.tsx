import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
// import { payments } from '@/lib/data'
import { Card, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'

const UsersPage = async () => {
  const supabase = await createClient()

  const { data: users, error } = await supabase.from('User').select('id, email, username, role')

  return (
    <div className='flex flex-col p-3 w-full'>
      <Card className='w-full p-5 mb-2'>
        <CardDescription className='flex flex-row items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold'>
              Users Table
            </h2>
            <p className='text-[12px] font-thin'>
              List of all users on the app
            </p>
          </div>
        </CardDescription>
      </Card>

      <Card className='w-full p-5'>
        {users ? <DataTable columns={columns} data={users} /> : <p>No users available</p>}
      </Card>
      
    </div>
  )
}

export default UsersPage