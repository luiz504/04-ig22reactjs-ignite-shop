import React from 'react'
import Header from '../components/Header'

type MainLayoutProps = {
  children: React.ReactNode
}
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
