import { styled } from '..'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
    marginBottom: '1.5rem',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    lineHeight: '1.4',
    marginBottom: '4rem',
  },

  a: {
    display: 'block',

    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
      transition: 'color 200ms',
    },
  },
})

export const ImagesRow = styled('div', {
  marginTop: '4rem',
  marginBottom: '3rem',
  display: 'flex',
  overflow: 'auto',
  maxWidth: '500',
})

export const ImageContainer = styled('div', {
  width: 130,
  minWidth: 130,
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  height: 130,

  boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.8)',
  borderRadius: 1000,
  overflow: 'hidden',
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  '&:not(:first-child)': {
    marginLeft: -30,
  },
})
