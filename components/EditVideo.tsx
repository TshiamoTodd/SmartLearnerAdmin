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
import { addSubject, addSubjectVideo, getSubjectsForVideoCreationForm, updateSubjectVideo } from '@/lib/data'
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

interface EditVideoProps {
    videoId: any
    subjectId: any
    title: string
    description: string
    videoUrl: string
}

const EditVideo = ({videoId, subjectId, title, description, videoUrl}: EditVideoProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [subjects, setSubjects] = useState<{value:string, label:string}[]>([])
    
    const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
              title: title,
              description: description,
              videoUrl: videoUrl,
              subject:  "",
          },
    })
    console.log(subjects.length)

    useEffect(() => {
        const fetchSubjects = async () => {
            setIsLoading(true);
            const response = await getSubjectsForVideoCreationForm();
    
            if (response.success) {
                const fetchedSubjects = response.data ?? [{ value: '', label: 'No subjects found' }];
                setSubjects(fetchedSubjects);
    
                // Find the correct subject label after fetching
                const selectedSubject = fetchedSubjects.find(subject => subject.value === subjectId)?.value ?? "";
    
                // Update the form values dynamically
                form.reset({
                    title,
                    description,
                    videoUrl,
                    subject: selectedSubject
                });
    
                setIsLoading(false);
            }
        };
    
        fetchSubjects();
    }, [form, subjectId, title, description, videoUrl])

    

    console.log(subjects.find(subject => subject.value === subjectId)?.label)

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const videoData = {
          videoId: videoId,
          title: data.title,
          description: data.description,
          videoUrl: data.videoUrl,
          subjectId: data.subject
        }

        console.log(data.subject)
        setIsLoading(true)
        try {
          const response = await updateSubjectVideo(videoData)
    
          if(response.success){
            toast.success("Video updated successfully.")
          } else {
            toast.error(`Success.error: Failed to update video. ${response.error}`)
          }
        } catch (error) {
          toast.error(`Catch.failed: Failed to update video. ${error}`)
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
                                    <SelectValue placeholder={subjects.find(subject => subject.value === subjectId)?.label} />
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
                    {isLoading ? <Loader2 className='size-4 animate-spin'/> : 'Update Video Resource'}
                </Button>
                </form>
            </Form>
            </CardContent>
        </Card>
    )
}

export default EditVideo