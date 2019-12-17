import {httpPost, httpGet} from 'utils/request'
const host = 'article'
export const getArticles = (data) => {
  return httpGet({
    url: `${host}/get`,
    data
  })
}
export const addArticle = (data) => {
  return httpPost({
    url: `${host}/add`,
    data
  })
}