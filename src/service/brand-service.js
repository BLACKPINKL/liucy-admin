import {httpPost} from 'utils/request'
const host = 'brand'
export const addBrand = (data) => {
  return httpPost({
    url: `${host}/add`,
    data
  })
}
