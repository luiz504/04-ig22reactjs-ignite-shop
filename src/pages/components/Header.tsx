import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from '@phosphor-icons/react'
import { useShoppingCart } from 'use-shopping-cart'

import logoFullSVG from '~/assets/logoFull.svg'

import { HeaderContainer, CartBtn } from '~/styles/components/header'

import SidebarCart from './SidebarCart'

export default function Header() {
  const { cartCount } = useShoppingCart()
  return (
    <HeaderContainer>
      <Link href={'/'}>
        <Image role="button" src={logoFullSVG} alt="" />
      </Link>

      <SidebarCart>
        <CartBtn hasProduct={!!cartCount} type="button">
          <Handbag size={24} weight="bold" />
          <span>{cartCount}</span>
        </CartBtn>
      </SidebarCart>
    </HeaderContainer>
  )
}
