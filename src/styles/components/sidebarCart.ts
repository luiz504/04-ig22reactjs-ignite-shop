import { keyframes, styled } from '~/styles'
import * as Sidebar from '@radix-ui/react-dialog'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const Overlay = styled(Sidebar.Overlay, {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translateX(100%)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

export const Content = styled(Sidebar.Content, {
  background: '$gray800',
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,

  width: 480,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  display: 'flex',
  flexDirection: 'column',
  '&:focus': {
    outline: 'none',
  },
})

export const Header = styled('header', {
  padding: '1.5rem 1.5rem 0 3rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  marginBottom: '2rem',

  '&:focus': { outline: 'none' },

  button: {
    marginLeft: 'auto',
    background: 'transparent',
    border: 0,
    color: '$gray400',
    padding: '0.25rem',
    display: 'flex',
    borderRadius: 2,
  },

  h2: {
    color: '$gray100',
    fontSize: '$lg',
  },
})

export const ProductList = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: '0 3rem',
  gap: '1.5rem',
  marginBottom: '2rem',
})

export const Product = styled('div', {
  display: 'flex',
  gap: '1.125rem',

  'div.image-placeholder': {
    background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
    width: 102,
    height: 93,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,

    img: {
      objectFit: 'cover',
    },
  },
})

export const ProducInforSection = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  h1: {
    fontWeight: 400,
    fontSize: '$md',
    color: '$gray300',
    lineHeight: 1.6,
    marginBottom: '0.125rem',
  },
  strong: {
    lineHeight: 1.6,
    fontSize: '$md',
    marginBottom: '0.5rem',
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',

    button: {
      color: '$green500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 2,
      border: 0,
    },

    '> button': {
      color: '$green500',
      fontWeight: 'bold',
      lineHeight: 1.6,
      fontsize: '1rem',
      backgroundColor: 'transparent',
    },

    div: {
      display: 'flex',
      gap: '0.5rem',

      button: {
        padding: '0.25rem',
        borderRadiur: 2,
        backgroundColor: '$gray800',
        '&:disabled': {
          cursor: 'default',
          color: '$gray400',
        },
      },
      span: {
        cursor: 'default',
        padding: '0 0.25rem',
        fontWeight: 'bold',
        fontSize: '$md',
        lineHeight: 1.6,
      },
    },
  },
})

export const Feedback = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  gap: '2rem',
  h4: {
    fontSize: '$lg',
    color: '$gray300',
    lineHeight: 1.6,
  },
})

export const Article = styled('article', {
  display: 'flex',
  flexDirection: 'column',
  padding: '0 3rem',
  gap: '.5rem',
  marginBottom: '3.125rem',

  '.row': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  '.row.qtd': {
    span: {
      lineHeight: 1.6,
    },
    'span:nth-child(2)': {
      fontSize: '$md',
    },
  },

  '.row.total': {
    'strong:nth-child(1)': {
      fontSize: '$md',
      lineHeight: 1.6,
    },

    'strong:nth-child(2)': {
      fontSize: '$xl',
      lineHeight: 1.4,
    },
  },
})

export const Footer = styled('footer', {
  padding: '0 3rem 3rem 3rem',

  button: {
    width: '100%',
    padding: '1.25rem',

    borderRadius: 8,
    border: 0,
    backgroundColor: '$green500',

    color: '$white',
    fontWeight: 'bold',
    fontSize: '$md',
    lineHeight: 1.6,
    cursor: 'pointer',

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',

      transition: 'background 150ms',
    },
    '&:disabled': {
      opacity: 0.6,
    },
  },
})
