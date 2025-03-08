import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='fixed top-0'>
        <nav>
            <Link href="/">
            <h1 className='text-3xl font-medium'>Eco Dash</h1>
            </Link>
        </nav>
        <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
    </div>
  )
}

export default Header