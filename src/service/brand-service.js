import {httpPost} from 'utils/request'
import config from 'config/env'
const api = config.api
const host = 'brand'
export const addBrand = (data) => {
  return httpPost({
    url: `${baseUrl}/${host}/add`,
    data
  })
}
