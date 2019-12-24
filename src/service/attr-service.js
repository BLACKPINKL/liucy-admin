import {httpPost, httpGet} from 'utils/request'
const host = 'attr'
export const addAttr = (data) => {
  return httpPost({
    url: `${host}/add`,
    data
  })
}

export const getAttrList = (data) => {
  return httpGet({
    url: `${host}/get`,
    data
  })
}

export const getAttrById = (data) => {
  return httpGet({
    url: `${host}/getById`,
    data
  })
}

export const getTypesById = (data) => {
  return httpGet({
    url: `${host}/getTypesById`,
    data
  })
}

export const updateAttr = (data) => {
  return httpPost({
    url: `${host}/update`,
    data
  })
}
export const removeAttr = (data) => {
  return httpGet({
    url: `${host}/del`,
    data
  })
}
