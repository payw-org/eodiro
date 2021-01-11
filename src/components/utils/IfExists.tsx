import { UnauthorizedError } from '@/modules/eodiro-request'
import Information from '../global/Information'
import ServerError from '../global/ServerError'
import { Spinner } from '../global/Spinner'

export const IfExists: React.FC<{ error: any; data: any }> = ({
  children,
  error,
  data,
}) => {
  if (error) {
    if (error?.name === UnauthorizedError.Unauthorized) {
      return <Information title="로그인하세요." />
    }

    return <ServerError />
  }

  if (data) {
    return <>{children}</>
  }

  return <Spinner />
}
