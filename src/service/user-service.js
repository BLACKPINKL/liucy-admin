import {httpPost, httpGet} from 'utils/request'
const host = 'user'
export const login = (data) => {
  return httpPost({
    url: `${host}/login`,
    data
  })
}