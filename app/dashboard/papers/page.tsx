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
      <Card className='w-full p-5'>
        <FileExplorer data={data} />
      </Card>
    </div>
  )
}

export default PapersPage