import DashboardBlocks from '@/components/DashboardBlocks'
import RecentUsers from '@/components/RecentUsers'
import React from 'react'

const Dashboard = async () => {
  return (
    <div className='p-10 bg-gray-200'>
        <DashboardBlocks/>
        <div className='flex w-full pt-10'>
          <RecentUsers/>
        </div>
    </div>
  )
}

export default Dashboard