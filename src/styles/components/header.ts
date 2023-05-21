import { styled } from '..'

export const HeaderContainer = styled('header', {
  padding: '2rem 0rem',
  width: '100%',
  maxWidth: 1280,
  margin: '0 auto',
  gap: '1rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  a: {
    borderRadius: 2,
  },
})

export const CartBtn = styled('button', {
  position: 'relative',
  padding: '0.75rem',
  borderRadius: 6,
  backgroundColor: '$gray800',
  border: 0,
  color: '$gray400',
  display: 'flex',
  cursor: 'pointer',

  span: {
    position: 'absolute',
    top: 0,
    left: '100%',

    height: 30,
    minWidth: 30,

    border: '3px solid $gray900',

    opacity: 0,
    padding: '0 4px',

    background: '$green300',
    color: '$white',
    fontSize: '$sm',
    fontWeight: 'bold',
    borderRadius: 99999,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-18px, -8px)',
  },

  variants: {
    hasProduct: {
      true: {
        span: {
          opacity: 1,
          transition: 'opacity 150ms',
        },
        color: '$gray300',
        transition: 'color 150ms',
      },
    },
  },
})
