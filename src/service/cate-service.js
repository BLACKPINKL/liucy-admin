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