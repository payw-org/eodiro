import 'swiper/swiper.scss'
import './style.scss'

import { useEffect, useRef } from 'react'

import Swiper from 'swiper'

type ImageViewerProps = {
  srcs: string[]
  close: () => void // Close function
  initialIndex: number
}
const ImageViewer: React.FC<ImageViewerProps> = (props) => {
  const swiperElm = useRef<HTMLDivElement>(null)
  const prevElm = useRef<HTMLButtonElement>(null)
  const nextElm = useRef<HTMLButtonElement>(null)
  const swiper = useRef<Swiper>(null)

  useEffect(() => {
    swiper.current = new Swiper(swiperElm.current, {
      direction: 'horizontal',
      loop: false,
      navigation: {
        prevEl: prevElm.current,
        nextEl: nextElm.current,
      },
      initialSlide: props.initialIndex,
    })
  }, [])

  useEffect(() => {
    swiper.current.slideTo(props.initialIndex, 0)
  }, [props.initialIndex])

  return (
    <div className="post-image-viewer swiper-container" ref={swiperElm}>
      <div className="background" />
      <div className="swiper-wrapper">
        {props.srcs.map((src, i) => {
          return (
            <div key={i} className="image-wrapper swiper-slide">
              <div className="linker">
                <img src={src} alt={src} />
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="img-link absolute-link"
                />
              </div>
            </div>
          )
        })}
      </div>

      <button className="close-btn" onClick={() => props.close()}>
        <i className="octicon octicon-x" />
      </button>

      <button className="nav-btn prev-btn" ref={prevElm}>
        <i className="octicon octicon-chevron-left" />
      </button>
      <button className="nav-btn next-btn" ref={nextElm}>
        <i className="octicon octicon-chevron-right" />
      </button>
    </div>
  )
}

export default ImageViewer
