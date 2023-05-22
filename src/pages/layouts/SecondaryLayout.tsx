import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import logoFullSVG from '~/assets/logoFull.svg'

import { Header } from '~/styles/layouts/secondaryLayout'

type SecondaryLayoutProps = {
  children: React.ReactNode
}
export default function SecondaryLayout({ children }: SecondaryLayoutProps) {
  return (
    <>
      <Header>
        <Link href={'/'}>
          <Image src={logoFullSVG} alt="" />
        </Link>
      </Header>

      {children}
    </>
  )
}
