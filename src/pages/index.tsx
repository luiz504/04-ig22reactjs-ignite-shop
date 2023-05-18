import Head from 'next/head'
import Image from 'next/image'
import { HomeContainer, Product } from '~/styles/pages/home'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import shirt1 from '~/assets/shirts/shirt1.png'
import shirt2 from '~/assets/shirts/shirt2.png'
import shirt3 from '~/assets/shirts/shirt3.png'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  })
  return (
    <>
      <Head>
        <title>Ignite Shop</title>
        <meta
          name="description"
          content="04 Ignite ReactJs, NextJs Fundamentals"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        <Product className="keen-slider__slide">
          <Image src={shirt1} width={520} height={480} alt="" />
          <footer>
            <strong> Shirt X</strong>
            <span> $ 79.90</span>
          </footer>
        </Product>

        <Product className="keen-slider__slide">
          <Image src={shirt2} width={520} height={480} alt="" />
          <footer>
            <strong> Shirt X</strong>
            <span> $ 79.90</span>
          </footer>
        </Product>

        <Product className="keen-slider__slide">
          <Image src={shirt3} width={520} height={480} alt="" />
          <footer>
            <strong> Shirt X</strong>
            <span> $ 79.90</span>
          </footer>
        </Product>
        <Product className="keen-slider__slide">
          <Image src={shirt3} width={520} height={480} alt="" />
          <footer>
            <strong> Shirt X</strong>
            <span> $ 79.90</span>
          </footer>
        </Product>
      </HomeContainer>
    </>
  )
}
