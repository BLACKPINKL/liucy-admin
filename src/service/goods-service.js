import {httpPost, httpGet} from 'utils/request'
const host = 'goods'
export const addGoods = (data) => {
  return httpPost({
    url: `${host}/add`,
    data
  })
}

export const getGoodsList = (data) => {
  return httpGet({
    url: `${host}/get`,
    data
  })
}

export const getGoodsById = (data) => {
  return httpGet({
    url: `${host}/getById`,
    data
  })
}

export const updateGoods = (data) => {
  return httpPost({
    url: `${host}/update`,
    data
  })
}
export const removeGoods = (data) => {
  return httpGet({
    url: `${host}/del`,
    data
  })
}

export const recoverGoods = (data) => {
  return httpGet({
    url: `${host}/recover`,
    data
  })
}