import {httpPost, httpGet} from 'utils/request'
const host = 'brand'
export const addBrand = (data) => {
  return httpPost({
    url: `${host}/add`,
    data
  })
}
export const getBrand = (data) => {
  return httpGet({
    url: `${host}/get`,
    data
  })
}
export const removeBrand = (data) => {
  return httpGet({
    url: `${host}/del`,
    data
  })
}
