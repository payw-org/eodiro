import Error from './_error'
import { NextPage } from 'next'

const Page: NextPage = () => {
  return <Error statusCode={404} />
}

export default Page
