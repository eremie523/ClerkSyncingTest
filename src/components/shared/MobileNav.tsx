import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import NavItems from './NavItems'
import Link from 'next/link'
import { Separator } from '../ui/separator'

type Props = {}

const MobileNav = (props: Props) => {
  return (
    <div className='md:hidden'>
        <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent className='flex flex-col gap-y-4'>
            <Link href={'/'}>
                <h3 className='text-primary fs-bold-32'>Evently</h3>
            </Link>
            <Separator />
            <NavItems />
        </SheetContent>
        </Sheet>
    </div>
  )
}

export default MobileNav