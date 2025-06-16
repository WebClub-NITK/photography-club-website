import { useState } from 'react'
import { FiUser, FiLock } from 'react-icons/fi'
import { FaAt } from 'react-icons/fa'
import Button from '../../components/Button'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50'>
      <div className='w-full max-w-md space-y-8 relative'>
        {/* Glass effect container */}
        <div className='absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl'></div>
        
        {/* Content */}
        <div className='relative p-8 space-y-6'>
          {/* Header */}
          <div className='text-left'>
            <h2 className='font-playfair text-4xl font-medium text-gray-900'>
              Welcome Back
            </h2>
            <p className='mt-3 text-sm text-gray-600'>
              Sign in to access your <br />NITK Photography Club Member account
            </p>
          </div>

          {/* Form */}
          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <div className='space-y-4'>
              {/* Email */}
              <div>
                <label htmlFor='email' className='sr-only'>
                  Email address
                </label>
                <div className='relative'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                    <FaAt className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className='block w-full rounded-full border-0 py-3 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all duration-200'
                    placeholder='Email address'
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <div className='relative'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                    <FiLock className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className='block w-full rounded-full border-0 py-3 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all duration-200'
                    placeholder='Password'
                  />
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-black focus:ring-black transition-colors duration-200'
                />
                <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <a href='#' className='font-medium text-black hover:text-gray-800 transition-colors duration-200'>
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type='submit'
                variant='primary'
                size='lg'
                className='w-full'
              >
                Sign in
              </Button>
            </div>
          </form>

          {/* Sign up link */}
          <div className='flex flex-col gap-2'>
          <p className='text-sm text-gray-600'>
            Not a member?{' '}
            <a href='#' className='font-medium text-black hover:text-gray-800 transition-colors duration-200'>
              Join the club, it&apos;s free!
            </a>
          </p>

          <p className='text-sm text-gray-600'>
            Need other help?{' '}
            <a href='#' className='font-medium text-black hover:text-gray-800 transition-colors duration-200'>
              Contact us
            </a>
          </p>
          </div>
        </div>
      </div>
    </div>
  )
}
