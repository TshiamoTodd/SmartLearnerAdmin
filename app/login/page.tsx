'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function Login() {
    const supabase = createClientComponentClient()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async () => {
        setError('') 

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setError('Invalid email or password')
            return
        }

        if (data.user) {
            
            const { data: userRole, error: roleError } = await supabase
                .from('User')
                .select('role')
                .eq('id', data.user.id)
                .single()

            if (roleError || !userRole || userRole.role !== 'Admin') {
                setError('Access denied. Only admins can log in.')
                return
            }

            router.push('/dashboard')
        }
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-slate-300 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
            </div>
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Label>Password</Label>
                            <Input
                                name='password'
                                type='password'
                                required
                                placeholder='********'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                        <Button className='w-full' onClick={handleLogin}>
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Login
