import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from "element-ui"

export function downloadAppendixFile(id, fileName) {
  axios({
    method: 'get',
    url: process.env.VUE_APP_BASE_API + '/appendixFile/downloadAppendixFile/' + id,
    headers: {
      Authorization: getToken()
    },
    responseType: 'blob'
  })
    .then(res => {
      if (res.data.type) {
        // 文件下载
        const blob = new Blob([res.data], {
          // type: 'application/vnd.ms-excel'
        })
        let link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', fileName)
        link.click()
        link = null
        Message.success("下载成功！")
      } else {
        // 返回json
        Message.warning(res.data.msg)
      }
    })
    .catch(err => {
      Message.error('下载失败' + err)
    })
}
