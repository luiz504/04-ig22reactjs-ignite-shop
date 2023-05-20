import Link from 'next/link'
import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1280px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,
  padding: '0.25rem',
})

export const Product = styled(Link, {
  background: 'linear-gradient(180deg, #1EA483 0%, #7465d4 100%)',
  borderRadius: 8,
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  img: {
    objectFit: 'cover',
    width: 'auto',
  },

  footer: {
    position: 'absolute',
    inset: 'auto 0.25rem 0.25rem 0.25rem',
    padding: '2rem',

    borderRadius: 6,
    background: 'rgba(0, 0, 0, 0.6)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all .2s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',

      strong: {
        fontSize: '$lg',
        color: '$gray100',
        marginBottom: '0.25rem',
      },

      span: {
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300',
      },
    },

    button: {
      display: 'none',
      borderRadius: 6,
      padding: '0.75rem',
      background: '$green500',
      border: 0,
      color: '$white',
      cursor: 'pointer',

      '&:hover': {
        background: '$green300',
        transition: 'background 150ms',
      },
    },
  },

  '&:hover, &:focus, &:focus-within': {
    footer: {
      transform: 'translate(0%)',
      opacity: 1,

      button: {
        display: 'flex',
      },
    },
  },
})
