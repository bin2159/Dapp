'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from '@/lib/api'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export function RegisterForm ({ className, ...props }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const { name, email, password } = data
      const res = await axios.post('/api/auth/signup', {
        name,
        email,
        password
      })
      toast.success('Account created successfully')
      router.push('/dashboard')
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Create an Account</CardTitle>
          <CardDescription>
            Join our platform to book appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
            <div className='grid gap-3'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' {...register('name')} />
              {errors.name && (
                <p className='text-sm text-red-500'>{errors.name.message}</p>
              )}
            </div>

            <div className='grid gap-3'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' {...register('email')} />
              {errors.email && (
                <p className='text-sm text-red-500'>{errors.email.message}</p>
              )}
            </div>

            <div className='grid gap-3'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' {...register('password')} />
              {errors.password && (
                <p className='text-sm text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className='grid gap-3'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <Input
                id='confirmPassword'
                type='password'
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className='text-sm text-red-500'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? 'Creating account...' : 'Sign up'}
            </Button>
            <div className='text-center text-sm'>
              Already have an account?{" "}
              <a href='/login' className='underline underline-offset-4'>
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
