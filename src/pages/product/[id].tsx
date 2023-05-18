// import { useRouter } from 'next/router'
import {
  ImageContainer,
  ProductContainer,
  ProductDetail,
} from '~/styles/pages/product'

export default function Product() {
  // const { query } = useRouter()
  return (
    <ProductContainer>
      <ImageContainer />
      <ProductDetail>
        <h1>Product Name</h1>
        <span>R$79,90</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
          doloribus recusandae aut itaque similique magnam ut distinctio alias,
          ad quae veniam enim doloremque, vitae voluptatem quisquam. Magnam
          sequi officiis tempora?
        </p>
        <button>Buy</button>
      </ProductDetail>
    </ProductContainer>
  )
}
