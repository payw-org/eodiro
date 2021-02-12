import axios from 'axios'
import ApiHost from '../api-host'

export async function logOut() {
  try {
    await axios({
      method: 'post',
      url: ApiHost.resolve('/auth/log-out'),
      withCredentials: true,
    })
  } catch (error) {
    console.error(error)
  }
}
