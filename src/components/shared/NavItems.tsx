"use client"
import { HeaderLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const NavItems = (props: Props) => {
    const pathName = usePathname();
  return (
    <ul className='flex flex-col gap-3 md:flex-row'>
        {HeaderLinks.map((link: {
            href: string,
            label: string,
        }, index: number) => {
            const isActive = (pathName.split('?')[0] === link.href)
            return (
                <li key={index}>
                     <Link href={link.href} className={`px-4 py-2 font-semibold ${isActive && 'text-primary-foreground' }`}>
                        {link.label}
                     </Link>
                </li>
            )
        })}
    </ul>
  )
}

export default NavItems