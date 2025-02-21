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

const DeleteDialog = ({title}: {title: string}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className='p-0'>{title}</Button>
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
            <Label htmlFor="name" className='text-red-500'>Type "" to confirm your delete.</Label>
            <Input id="name" className="border border-gray-500" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant={'destructive'}>Delete Subject</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog