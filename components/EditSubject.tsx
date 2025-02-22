'use client'

import React, { useState } from 'react'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

import { z } from "zod"
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { updateSubject } from '@/lib/data'

interface EditSubjectProps {
    id: string
    subjectName: string
    gradeRange: string
    schoolLevel: string
}

const gradeRanges = [
    { value: "1", label: "Grade 1-3" },
    { value: "2", label: "Grade 4-6" },
    { value: "3", label: "Grade 7" },
    { value: "4", label: "Grade 8-9" },
    { value: "5", label: "Grade 10-12" },
]

const schoolLevels = [
    { value: "1", label: "Primary" },
    { value: "2", label: "Secondary" },
]

const formSchema = z.object({
    subjectName: z.string().min(2, {
      message: "Subject must be at least 2 characters.",
    }),
    gradeRange: z.string().min(1, {
        message: "Please select a grade range.",
    }),
    schoolLevel: z.string().min(1, {
        message: "Please select a school level.",
    }),
})

const EditSubject = ({id, subjectName, schoolLevel, gradeRange}: EditSubjectProps) => {
    const [isLoading, setIsLoading] = useState(false)
    
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subjectName: subjectName,
            gradeRange: gradeRange,
            schoolLevel: schoolLevel,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = {
            subjectId: id,
            subjectName: values.subjectName,
            gradeRange: values.gradeRange,
            schoolLevel: values.schoolLevel
        }
        try {
            setIsLoading(true)
            const response = await updateSubject(formData)
            
            if (response.success) {
                setIsLoading(false)
                toast.success('Subject updated successfully')
                console.log("Data from database",response.data)
            } else if(response.error) {
                toast.error(response.error)
            }
        } catch (error) {
            console.log({error})
            toast.error('An error occurred while creating the subject')
            
        } finally {
            setIsLoading(false)
            redirect('/dashboard/subjects')
        }
    }

    return (
        <Card className='w-full max-w-4xl mx-auto'>
            <CardHeader>
                <CardTitle>Edit Subject</CardTitle>
            </CardHeader>
            <CardContent className='p-6'>
                <Form {... form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="subjectName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject Name</FormLabel>
                                    <FormControl>
                                        <Input className='border border-gray-500' placeholder="Mathematics" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the name of the subject.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="gradeRange"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Grade Range</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="border border-gray-500">
                                            <SelectValue placeholder={gradeRanges[0].label} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {gradeRanges.map((range) => (
                                                <SelectItem key={range.value} value={range.value}>
                                                    {range.label}
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

                        <FormField
                            control={form.control}
                            name="schoolLevel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>School Level</FormLabel>
                                    <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="border border-gray-500">
                                            <SelectValue placeholder={schoolLevels[0].label} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {schoolLevels.map((range) => (
                                                <SelectItem key={range.value} value={range.value}>
                                                    {range.label}
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
                            {isLoading ? <Loader2 className='size-4 animate-spin'/> : 'Edit Subject'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default EditSubject