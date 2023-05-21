import React, { createContext, useContext, useState } from 'react'

type GlobalContextType = {
  isOpenCartSidebar: boolean
  handleOpenSidebarCart: (value?: boolean) => void
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)

export const GlobalProvider: React.FCWC = ({ children }) => {
  const [isOpenCartSidebar, setIsOpenCartSidebar] = useState(false)

  const handleOpenSidebarCart = (value: boolean = false) => {
    setIsOpenCartSidebar(value)
  }

  return (
    <GlobalContext.Provider
      value={{ isOpenCartSidebar, handleOpenSidebarCart }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  const context = useContext(GlobalContext)

  if (!Object.keys(context).length) {
    throw new Error(
      'useGlobalContext only works with GlobalProvider wrapping it',
    )
  }

  return context
}
