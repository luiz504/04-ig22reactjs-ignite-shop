import { styled } from '..'

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4rem',
  maxWidth: 1280,
  width: '100%',
  margin: '0 auto',

  '@media (max-width: 1440px)': {
    padding: '0 0.5rem',
  },
  '@media (max-width: 1280px)': {
    gap: '2rem',
  },
  '@media (max-width: 900px)': {
    gridTemplateColumns: '50% 1fr',
  },
  '@media (max-width: 675px)': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 576,
  height: 656,
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  borderRadius: 8,
  padding: '.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  '@media (max-width: 675px)': {
    height: 400,
    padding: '.5rem',
  },
})

export const ProductDetail = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$gray300',
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: '$green300',
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  button: {
    marginTop: 'auto',
    border: 0,
    padding: '1.25rem',
    backgroundColor: '$green500',

    color: '$white',
    fontWeight: 'bold',
    fontSize: '$md',

    borderRadius: 8,
    cursor: 'pointer',

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
      transition: 'background-color .2s',
    },
  },
  '@media (max-width: 675px)': {
    padding: '.5rem',
    marginBottom: '2rem',
    p: { marginBottom: '2rem', marginTop: '1.5rem' },
  },
})
