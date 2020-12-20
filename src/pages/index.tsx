import Home from '@/components/home/Home'
import EodiroHttpCookie from '@/modules/eodiro-http-cookie'
import { NextPage } from 'next'
import { useEffect } from 'react'

const Page: NextPage = () => {
  useEffect(() => {
    EodiroHttpCookie.set({
      expires: new Date('2020-12-31').toUTCString(),
      name: 'test_cookie',
      value: 'what',
    }).then((res) => {
      console.log(res)
    })
  }, [])

  return <Home />
}

export default Page
