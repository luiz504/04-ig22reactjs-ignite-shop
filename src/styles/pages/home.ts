import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1280px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,
  padding: '0.25rem',
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1EA483 0%, #7465d4 100%)',
  borderRadius: 8,
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  a: {
    outline: '2px solid white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: 1,

    '&:focus': {
      outline: 'none',
    },
  },

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

export const CartHandlerBtn = styled('button', {
  display: 'none',
  position: 'relative',
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
  span: {
    position: 'absolute',
    top: 0,
    left: '100%',

    height: 30,
    minWidth: 30,

    border: '3px solid $gray800',

    opacity: 0,
    padding: '0 4px',

    background: '$gray800',
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
    addedToTheBag: {
      true: {
        span: {
          opacity: 1,
          transition: 'opacity 150ms',
        },
      },
    },
  },
})
