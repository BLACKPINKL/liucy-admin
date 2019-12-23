import {httpPost, httpGet} from 'utils/request'
const host = 'category'
export const addCategory = (data) => {
  return httpPost({
    url: `${host}/add`,
    data
  })
}

export const getCategoryList = (data) => {
  return httpGet({
    url: `${host}/get`,
    data
  })
}

export const getCategoryById = (data) => {
  return httpGet({
    url: `${host}/getById`,
    data
  })
}

export const updateCategory = (data) => {
  return httpPost({
    url: `${host}/update`,
    data
  })
}
export const removeCategory = (data) => {
  return httpGet({
    url: `${host}/del`,
    data
  })
}

export const recoverCategory = (data) => {
  return httpGet({
    url: `${host}/recover`,
    data
  })
}