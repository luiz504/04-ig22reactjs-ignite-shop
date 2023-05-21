import React, { useState } from 'react'
import * as Sidebar from '@radix-ui/react-dialog'
import { Minus, Plus, X } from '@phosphor-icons/react'
import axios from 'axios'

import {
  Overlay,
  Content,
  Header,
  ProductList,
  Article,
  Footer,
  Product,
  ProducInforSection,
  Feedback,
} from '~/styles/components/sidebarCart'

import EmptySvg from '~/assets/empty-cart.svg'

import Image from 'next/image'
import { useShoppingCart } from 'use-shopping-cart'
import { useGlobalContext } from '~/contexts/globalContext'
import Link from 'next/link'

type SidebarCartProps = {
  children: React.ReactNode
}
export default function SidebarCart({ children }: SidebarCartProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price || 0)

  const {
    cartDetails,
    removeItem,
    incrementItem,
    decrementItem,
    cartCount,
    totalPrice,
  } = useShoppingCart()

  const { isOpenCartSidebar, handleOpenSidebarCart } = useGlobalContext()

  const totalPriceFormated =
    totalPrice && totalPrice >= 0 ? formatPrice(totalPrice / 100) : undefined

  const [creatingCheckoutSection, setcreatingCheckoutSection] = useState(false)

  async function handleBuyProduct() {
    try {
      setcreatingCheckoutSection(true)

      if (!cartDetails || !Object.keys(cartDetails).length) {
        throw new Error('Cart Empty')
      }

      const lineItems = Object.values(cartDetails)
        .map((item) =>
          item.price_id
            ? { price_id: item.price_id as string, quantity: item.quantity }
            : undefined,
        )
        .filter((item) => item)

      if (!lineItems.length) {
        throw new Error('Each Product must have a price_id')
      }

      const response = await axios.post('/api/checkout', {
        line_items: lineItems,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl // external
    } catch (err) {
      // Connect with some observer tool like DataDog/Sentry
      setcreatingCheckoutSection(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  const hasProduct = !!cartDetails && !!Object.keys(cartDetails).length

  return (
    <Sidebar.Root open={isOpenCartSidebar} onOpenChange={handleOpenSidebarCart}>
      <Sidebar.Trigger asChild>{children}</Sidebar.Trigger>
      <Sidebar.Portal>
        <Overlay />
        <Content>
          <Header>
            <Sidebar.Close>
              <X weight="bold" size={16} />
            </Sidebar.Close>
            <Sidebar.Title>Sacola de Compras</Sidebar.Title>
          </Header>

          <ProductList>
            {cartDetails &&
              Object.values(cartDetails).map((product) => (
                <Product key={product.id}>
                  <div className="image-placeholder">
                    {product.image && (
                      <Image
                        src={product.image}
                        alt=""
                        height={93}
                        width={93}
                      />
                    )}
                  </div>

                  <ProducInforSection>
                    <h1>{product.name}</h1>

                    <strong>{formatPrice(product.price / 100)}</strong>

                    <footer>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                      >
                        Remover
                      </button>

                      <div>
                        <button
                          type="button"
                          disabled={product.quantity < 2}
                          onClick={() => decrementItem(product.id)}
                        >
                          <Minus weight="bold" size={16} />
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          type="button"
                          onClick={() => incrementItem(product.id)}
                        >
                          <Plus weight="bold" size={16} />
                        </button>
                      </div>
                    </footer>
                  </ProducInforSection>
                </Product>
              ))}

            {!hasProduct && (
              <Feedback>
                <h4>Carrinho Vazio</h4>
                <Image src={EmptySvg} alt="" height={200} draggable={false} />
              </Feedback>
            )}
          </ProductList>

          {hasProduct && (
            <Article>
              <div className="row qtd">
                <span>Quantidade</span>
                <span>
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="row total">
                <strong>Valor total</strong>
                <strong>{totalPriceFormated}</strong>
              </div>
            </Article>
          )}

          <Footer>
            {hasProduct && (
              <button
                type="button"
                onClick={handleBuyProduct}
                disabled={creatingCheckoutSection}
              >
                Finalizar Compra
              </button>
            )}

            {!hasProduct && (
              <Link href={'/'} onClick={() => handleOpenSidebarCart()}>
                Ir para Catalogo
              </Link>
            )}
          </Footer>
        </Content>
      </Sidebar.Portal>
    </Sidebar.Root>
  )
}
