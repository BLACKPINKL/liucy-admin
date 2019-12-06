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
// 处理上传组件回调问题
const _getForm = (data) => {
  return httpGet({
    url: `${api}/${host}/get`,
    data
  })
}

export const getForm = (data) =>{
  // 获取表单
  return _getForm(data).then(res => {
    // 说明是上传组件
    res.forms.forEach((item,i) => {
      // 添加成功回调以及失败回调
      if(item.type === 'upload') {
        // 添加成功回调以及失败回调
        item.props['onSuccess'] = function(response, file) {
          // 将结果地址添加到value中
          
          item.value.push(response)
        }
        item.props['onError'] = function(err) {
          console.log('err', err);
          
        }
        // // 添加成功回调以及失败回调
        // item.props.onSuccess = function(response, file) {
          
        //   return response
          
        // }
        // item.props.onError = function(err) {
        //   console.log('err', err);
        // }
      }
    })
    return res
  })
}

