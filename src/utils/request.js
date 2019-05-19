const request = path => {
  let url = 'https://www.zhengzhicheng.cn/api/public/v1/' + path
  return new Promise((resolve, reject) => {
    mpvue.request({
      url: url,
      success: function(res) {
        resolve(res)
      }
    })
  })
}
export default request
