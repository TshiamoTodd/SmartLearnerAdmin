'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { redirect } from 'next/navigation'

function Login() {

    const handleRedirect = () => {
        redirect('/dashboard')
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-slate-300 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
            <div className='flex h-screen w-full items-center justify-center px-4'>
                <Card className='w-xl'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Login</CardTitle>
                        <CardDescription>Enter your admin login details to access your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col gap-y-2 mb-3'>
                            <Label>Email</Label>
                            <Input
                                name='email'
                                type='email'
                                required
                                placeholder='hello@hello.com'
                            />

                            <Label>Password</Label>
                            <Input
                                name='password'
                                type='email'
                                required
                                placeholder='********'
                            />
                        </div>
                        <Button 
                            className='w-full'
                            onClick={handleRedirect}
                        >
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Login