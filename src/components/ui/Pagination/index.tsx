import { useEffect, useRef } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import PageButton from './PageButton'
import $ from './style.module.scss'

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
  const firstPage = (pageLevel - 1) * pageUnit + 1
  const lastPage = Math.min(firstPage + (pageUnit - 1), totalPage)
  const isPreviousAvailable = firstPage !== 1
  const isNextAvailable = lastPage < totalPage

  const pages = []

  for (let pageNum = firstPage; pageNum <= lastPage; pageNum += 1) {
    pages.push(pageNum)
  }

  return (
    <>
      {isPreviousAvailable && (
        <>
          <PageButton page={1} type="begin" onPressPage={onPressPage} />
          <PageButton
            page={firstPage - 1}
            type="previous"
            onPressPage={onPressPage}
          />
        </>
      )}
      {pages.map((pageNum) => (
        <PageButton
          type="default"
          key={pageNum}
          page={pageNum}
          isSelected={pageNum === currentPage}
          onPressPage={onPressPage}
        />
      ))}
      {isNextAvailable && (
        <>
          <PageButton
            page={lastPage + 1}
            type="next"
            onPressPage={onPressPage}
          />
          <PageButton page={totalPage} type="end" onPressPage={onPressPage} />
        </>
      )}
    </>
  )
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const paginationRef = useRef<HTMLDivElement>(null)
  const setIsMobile = useSetRecoilState(isMobileState)

  useEffect(() => {
    const paginationElm = paginationRef.current

    if (!paginationElm) return

    const resizeObserver = new ResizeObserver(() => {
      if (paginationElm.clientWidth <= 600) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    })

    resizeObserver.observe(paginationElm)
  }, [setIsMobile])

  return (
    <div ref={paginationRef} className={$['pagination']}>
      <Buttons {...props} />
    </div>
  )
}

export default Pagination
