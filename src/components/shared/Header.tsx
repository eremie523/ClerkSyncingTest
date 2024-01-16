import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import MobileNav from './MobileNav'
import NavItems from './NavItems'

type Props = {}

const Header = (props: Props) => {
    return (
        <nav className='px-8 lg:px-16 py-4 border border-bottom flex justify-between items-center'>
            <Link href={'/'}>
                <h3 className='text-primary fs-bold-32'>Evently</h3>
            </Link>
            <SignedIn>
                <div className='hidden md:block'>
                    <NavItems />
                </div>
            </SignedIn>
            <SignedOut>
                <div>
                    <Link href={'/sign-in'}>
                        <Button className='bg-primary rounded-full font-bold' size={'lg'}>LOGIN</Button>
                    </Link>
                </div>
            </SignedOut>
            <div className='flex gap-3 items-center justify-center'>
                <SignedIn>
                    <UserButton />
                    <MobileNav />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                </SignedIn>
            </div>
        </nav>
    )
}

export default Header