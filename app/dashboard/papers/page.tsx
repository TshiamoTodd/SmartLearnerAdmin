import FileExplorer from '@/components/FileExplorer'
import { Button } from '@/components/ui/button'
import { Card, CardDescription } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/server'
import { CirclePlus, File, Folder } from 'lucide-react'
import React from 'react'

const PapersPage = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase
  .storage
  .from('pdfBucket').list('', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  })

  return (
    <div className='flex flex-col p-3 w-full'>
      <Card className='w-full p-5 mb-2'>
        <CardDescription className='flex flex-row items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold'>
              Past Question Papers
            </h2>
            <p className='text-[12px] font-thin'>
              Add, view and manage past question papers
            </p>
          </div>

          <div className='flex gap-3'>
            <Button variant={'outline'} className='border border-gray-300'>
              <File size={20} />
              Create Folder 
            </Button>
            <Button> 
              <CirclePlus size={20} />
              Add Paper 
            </Button>
          </div>
        </CardDescription>
      </Card>

      <Card className='w-full p-5'>
        <FileExplorer data={data} />
      </Card>
    </div>
  )
}

export default PapersPage