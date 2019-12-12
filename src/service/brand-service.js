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

export const getBrandById = (data) => {
  return httpGet({
    url: `${host}/getById`,
    data
  })
}

export const updateBrand = (data) => {
  return httpPost({
    url: `${host}/update`,
    data
  })
}
export const removeBrand = (data) => {
  return httpGet({
    url: `${host}/del`,
    data
  })
}

export const recoverBrand = (data) => {
  return httpGet({
    url: `${host}/recover`,
    data
  })
}
