'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { deleteSubject, deleteSubjectVideo } from '@/lib/data'
import { toast } from "sonner"
import { redirect } from 'next/navigation'
import { Loader2 } from 'lucide-react'


const DeleteVideoDialog = ({title, video, id}: {title: string, video: string, id: string}) => {
  const [deleteText, setDeleteText] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDelete = async () => {
    if(video === deleteText) {
      try {
        setIsLoading(true)
        const response = await deleteSubjectVideo(id)

        if(response.success) {
          console.log('deleted')
          setIsOpen(false)
          toast.success('Video resource deleted successfully')
          setIsLoading(false)
          
        } else if(!response.success) {
          toast.error(response.error)
        }


      } catch (error) {
        console.log('error', error)
        toast.error('An error occurred while deleting the Video resource')
      } finally {
        setIsLoading(false)
        redirect('/dashboard/videos')
      }

    } else {
      toast.error('The text you entered does not match the subject name. Please try again.')
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <p className='p-0'>{title}</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            This Action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="name" className='text-red-500'>Type {video} to confirm your delete.</Label>
            <Input id="name" onChange={(e) => setDeleteText(e.target.value)} className="border border-gray-500" />
            <Button 
              onClick={handleDelete} 
              variant={'destructive'}
              className='w-full'
            >
              {isLoading ? <Loader2 className='size-4 animate-spin'/> : 'Delete Subject'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteVideoDialog