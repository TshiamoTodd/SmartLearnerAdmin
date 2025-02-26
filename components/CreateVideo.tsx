"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { addSubject, addSubjectVideo, getSubjectsForVideoCreationForm } from '@/lib/data'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const formSchema = z.object({
    title: z.string().min(2, {
      message: "Subject must be at least 2 characters.",
    }),
    description: z.string().min(1, {
        message: "Please select a grade range.",
    }),
    videoUrl: z.string().min(1, {
        message: "Please select a school level.",
    }),
    subject: z.string().min(1, {
        message: "Please select a school level.",
    }),
})

const CreateVideo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [subjects, setSubjects] = useState<{value:string, label:string}[]>([])

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await getSubjectsForVideoCreationForm()

      if (response.success){
        setSubjects(response.data ?? [{value: '', label: 'No subjects found'}])
      }
    }

    fetchSubjects()
  }, [])
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          title: "",
          description: "",
          videoUrl: "",
          subject: "",
      },
  })

  // 2. Define your submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const videoData = {
      title: data.title,
      description: data.description,
      videoUrl: data.videoUrl,
      subjectId: data.subject
    }
    setIsLoading(true)
    try {
      const response = await addSubjectVideo(videoData)

      if(response.success){
        toast.success("Video created successfully.")
      } else {
        toast.error(`Success.error: Failed to create video. ${response.error}`)
      }
    } catch (error) {
      toast.error(`Catch.failed: Failed to create video. ${error}`)
    } finally {
      setIsLoading(false)
      redirect("/dashboard/videos")
    }
  }

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
          <CardTitle>Create Video Resource</CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <Form {... form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                          <Input className='border border-gray-500' placeholder="Principles of Motion" {...field} />
                      </FormControl>
                      <FormDescription>
                          This is the title of the video.
                      </FormDescription>
                      <FormMessage />
                  </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                          <Input className='border border-gray-500' placeholder="This video explains the Principles of Motion" {...field} />
                      </FormControl>
                      <FormDescription>
                          This is the description of the video.
                      </FormDescription>
                      <FormMessage />
                  </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>Video URL</FormLabel>
                      <FormControl>
                          <Input className='border border-gray-500' placeholder="https://www.youtube.com/watch?v=CjYncyCqWjQ" {...field} />
                      </FormControl>
                      <FormDescription>
                          This is the URL of the video.
                      </FormDescription>
                      <FormMessage />
                  </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>School Level</FormLabel>
                      <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="border border-gray-500">
                              <SelectValue placeholder={'Select subject'} />
                          </SelectTrigger>
                          <SelectContent>
                              {subjects.map((item) => (
                                  <SelectItem key={item.value} value={item.value}>
                                      {item.label}
                                  </SelectItem>
                              ))}
                          </SelectContent>
                      </Select>
                      </FormControl>
                      <FormDescription>
                          Select the grade level this subject is offered in.
                      </FormDescription>
                      <FormMessage />
                  </FormItem>
              )}
          />

            <Button type="submit" className='w-full'>
                {isLoading ? <Loader2 className='size-4 animate-spin'/> : 'Create Video Resource'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CreateVideo