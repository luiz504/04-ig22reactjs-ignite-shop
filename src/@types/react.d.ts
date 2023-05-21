/* eslint-disable no-unused-vars */
import React from 'react'

declare module 'react' {
  // React Functional Component with required children
  type FCWC<P = {}> = React.FC<P & { children: React.ReactNode }>
}
