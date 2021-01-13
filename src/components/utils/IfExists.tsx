import { UnauthorizedError } from '@/modules/eodiro-request'
import React from 'react'
import Information from '../global/Information'
import ServerError from '../global/ServerError'
import { Spinner } from '../global/Spinner'
import { Flex } from '../ui/layouts/Flex'

export const IfExists: React.FC<{
  error: any
  data: any
  condition?: boolean
}> = ({ children, error, data, condition }) => {
  const childrenArray = React.Children.toArray(children)

  if (error) {
    if (error?.name === UnauthorizedError.Unauthorized) {
      return <Information title="로그인하세요." />
    }

    return <ServerError />
  }

  if (data) {
    if (condition === undefined) {
      return <>{children}</>
    }
    if (condition) {
      return <>{childrenArray[0]}</>
    }
    if (childrenArray[1]) {
      return <>{childrenArray[1]}</>
    }
  }

  return (
    <Flex center>
      <Spinner />
    </Flex>
  )
}
