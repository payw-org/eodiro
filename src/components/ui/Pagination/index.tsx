import { useEffect, useRef } from 'react'

import $ from './style.module.scss'
import PageButton from './PageButton'

export type PaginationProps = {
  totalPage: number
  currentPage: number
  onPressPage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  totalPage,
  currentPage,
  onPressPage,
}) => {
  function Buttons() {
    if (totalPage < 10) {
      return (
        <>
          {Array.from(Array(totalPage).keys()).map((index) => (
            <PageButton
              key={index}
              page={index + 1}
              isSelected={currentPage === index + 1}
            />
          ))}
        </>
      )
    } else {
      return <div></div>
    }
  }

  const paginationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const width = paginationRef.current.clientWidth
      if (width < 600) {
        console.log('mobile')
      } else {
        console.log('desktop')
      }
    })

    resizeObserver.observe(paginationRef.current)
  }, [])

  return (
    <div ref={paginationRef} className={$['pagination']}>
      <Buttons />
    </div>
  )
}

export default Pagination
