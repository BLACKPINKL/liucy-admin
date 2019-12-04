import {httpPost, httpGet} from 'utils/request'
import config from 'config/env'
const api = config.api
const host = 'form'
export const addForm = (data) => {
  return httpPost({
    url: `${api}/${host}/add`,
    data
  })
}

export const getForm = (data) => {
  return httpGet({
    url: `${api}/${host}/get`,
    data
  })
}
