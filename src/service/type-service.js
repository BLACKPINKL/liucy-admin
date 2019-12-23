import {httpPost, httpGet} from 'utils/request'
const host = 'type'
export const addType = (data) => {
  return httpPost({
    url: `${host}/add`,
    data
  })
}

export const getTypeList = (data) => {
  return httpGet({
    url: `${host}/get`,
    data
  })
}

export const getTypeById = (data) => {
  return httpGet({
    url: `${host}/getById`,
    data
  })
}

export const updateType = (data) => {
  return httpPost({
    url: `${host}/update`,
    data
  })
}
export const removeType = (data) => {
  return httpGet({
    url: `${host}/del`,
    data
  })
}

export const recoverType = (data) => {
  return httpGet({
    url: `${host}/recover`,
    data
  })
}