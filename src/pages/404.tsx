import { NextPage } from 'next'
import Error from './_error'

const Page: NextPage = () => {
  return <Error statusCode={404} />
}

export default Page
