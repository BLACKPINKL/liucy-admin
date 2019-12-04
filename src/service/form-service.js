import {httpPost} from 'utils/request'
import config from 'config/env'
const api = config.api
const host = 'form'
export const addForm = (data) => {
  return httpPost({
    url: `${api}/${host}/add`,
    data
  })
}