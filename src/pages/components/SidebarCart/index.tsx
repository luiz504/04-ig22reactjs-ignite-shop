import React, { useState } from 'react'
import * as Sidebar from '@radix-ui/react-dialog'
import { Minus, Plus, X } from '@phosphor-icons/react'

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

import img1 from '~/assets/shirts/shirt1.png'
import img2 from '~/assets/shirts/shirt2.png'
import img3 from '~/assets/shirts/shirt3.png'
import img4 from '~/assets/shirts/shirt4.png'
import EmptySvg from '~/assets/empty-cart.svg'

import Image from 'next/image'

type SidebarCartProps = {
  children: React.ReactNode
}
export default function SidebarCart({ children }: SidebarCartProps) {
  const [products, setProduct] = useState([
    { id: 'p1', name: 'Pruct Name 1', price: 7949, amount: 1, imageUrl: img1 },
    { id: 'p2', name: 'Pruct Name 2 ', price: 7949, amount: 2, imageUrl: img2 },
    { id: 'p3', name: 'Pruct Name 3', price: 7949, amount: 3, imageUrl: img3 },
    { id: 'p4', name: 'Pruct Name 4', price: 7949, amount: 4, imageUrl: img4 },
  ])

  const { amount, total } = products?.reduce(
    (acum, cur) => {
      const semiTotal = (cur.price * cur.amount) / 100
      acum.total += semiTotal
      acum.amount += cur.amount

      return acum
    },
    { total: 0, amount: 0 },
  )

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price || 0)

  const incrementProduct = (id: string) => {
    setProduct((old) =>
      old.map((p) => (p.id === id ? { ...p, amount: p.amount + 1 } : p)),
    )
  }

  const decrementProduct = (id: string) => {
    setProduct((old) =>
      old.map((p) =>
        p.id === id && p.amount > 1 ? { ...p, amount: p.amount - 1 } : p,
      ),
    )
  }

  const removeProduct = (id: string) => {
    setProduct((old) => old.filter((p) => p.id !== id))
  }

  return (
    <Sidebar.Root>
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
            {products.map((product) => (
              <Product key={product.id}>
                <div className="image-placeholder">
                  <Image src={product.imageUrl} alt="" height={93} width={93} />
                </div>

                <ProducInforSection>
                  <h1>{product.name}</h1>

                  <strong>{formatPrice(product.price / 100)}</strong>

                  <footer>
                    <button
                      type="button"
                      onClick={() => removeProduct(product.id)}
                    >
                      Remover
                    </button>

                    <div>
                      <button
                        type="button"
                        disabled={product.amount < 2}
                        onClick={() => decrementProduct(product.id)}
                      >
                        <Minus weight="bold" size={16} />
                      </button>
                      <span>{product.amount}</span>
                      <button
                        type="button"
                        onClick={() => incrementProduct(product.id)}
                      >
                        <Plus weight="bold" size={16} />
                      </button>
                    </div>
                  </footer>
                </ProducInforSection>
              </Product>
            ))}

            {!products?.length && (
              <Feedback>
                <h4>Carrinho Vazio</h4>
                <Image src={EmptySvg} alt="" height={200} draggable={false} />
              </Feedback>
            )}
          </ProductList>

          <Article>
            <div className="row qtd">
              <span>Quantidade</span>
              <span>
                {amount} {amount === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="row total">
              <strong>Valor total</strong>
              <strong>{formatPrice(total)}</strong>
            </div>
          </Article>

          <Footer>
            <button type="button" disabled={!products.length}>
              Finalizar Compra
            </button>
          </Footer>
        </Content>
      </Sidebar.Portal>
    </Sidebar.Root>
  )
}
