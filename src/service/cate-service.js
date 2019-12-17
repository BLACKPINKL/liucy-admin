import {httpPost, httpGet} from 'utils/request'
const host = 'cate'
export const addCate = (data) => {
  return httpPost({
    url: `${host}/add`,
    data
  })
}
export const getCate = (data) => {
  return httpGet({
    url: `${host}/get`,
    data
  })
}
export const delCate = (data) => {
  return httpGet({
    url: `${host}/del`,
    data
  })
}
export const updateCateById = (data) => {
  return httpPost({
    url: `${host}/update`,
    data
  })
}
export const getCateById = (data) => {
  return httpGet({
    url: `${host}/getById`,
    data
  })
}