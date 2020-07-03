import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { useEffect, useRef } from 'react'

import $ from './style.module.scss'
import PageButton from './PageButton'

export type PaginationProps = {
  totalPage: number
  currentPage: number
  onPressPage: (page: number) => void
}

const isMobileState = atom({
  key: 'isMobileState',
  default: false,
})

const Buttons: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onPressPage,
}) => {
  const isMobile = useRecoilValue(isMobileState)
  const pageUnit = isMobile ? 5 : 10
  const pageLevel = Math.ceil(currentPage / pageUnit)
  const firstPage = (pageLevel - 1) * (pageUnit - 1) + 1
  const lastPage = Math.min(firstPage + (pageUnit - 1), totalPage)

  const pages = []

  for (let pageNum = firstPage; pageNum <= lastPage; pageNum += 1) {
    pages.push(pageNum)
  }

  return (
    <>
      {pages.map((pageNum) => (
        <PageButton
          key={pageNum}
          page={pageNum}
          isSelected={pageNum === currentPage}
          onPressPage={onPressPage}
        />
      ))}
    </>
  )
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const paginationRef = useRef<HTMLDivElement>(null)
  const setIsMobile = useSetRecoilState(isMobileState)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (paginationRef.current.clientWidth <= 600) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    })

    resizeObserver.observe(paginationRef.current)
  }, [])

  return (
    <div ref={paginationRef} className={$['pagination']}>
      <Buttons {...props} />
    </div>
  )
}

export default Pagination
