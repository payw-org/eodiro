import { NextPage } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    console.log(router.query.tipId)
  }, [])

  return <div>{router.query.tipId}</div>
}

export default Page
