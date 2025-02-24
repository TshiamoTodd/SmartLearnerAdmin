"use client"
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
import { z } from "zod"
import { addSubject } from '@/lib/data'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'

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
})

const CreateVideo = () => {
  return (
    <Card className='w-full max-w-4xl mx-auto'>

    </Card>
  )
}

export default CreateVideo