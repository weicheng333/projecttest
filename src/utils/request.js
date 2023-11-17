import axios from 'axios'

const appContent = JSON.parse(process.env.VITE_APP_SRC)

const isLocal = process.env.VITE_APP_ISLOCAL === 'true'

const server = axios.create({
  timeout: 15000
})
function m () {
  const ua = navigator.userAgent
  const isWindowsPhone = /(?:Windows Phone)/.test(ua)
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  const isAndroid = /(?:Android)/.test(ua)
  const isFireFox = /(?:Firefox)/.test(ua)
  const isTablet =
    /(?:iPad|PlayBook)/.test(ua) ||
    (isAndroid && !/(?:Mobile)/.test(ua)) ||
    (isFireFox && /(?:Tablet)/.test(ua))
  const isPhone = /(?:iPhone)/.test(ua) && !isTablet
  const isPc = !isPhone && !isAndroid && !isSymbian
  return {
    isTablet, // iPad
    isPhone, // iPhone
    isAndroid, // Android
    isPc // Pc
  }
}
// 添加请求拦截器
server.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Token = token
      config.headers.Referer = 'https://xzapi.test.tiantiantongshi.com'
      config.headers['Cache-Control'] = 'no-cache'
      config.headers['If-Modified-Since'] = '0'
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
server.interceptors.response.use(
  function (response) {
    if (response.data.code !== 0) {
      // return
      if ([1998, 1999, 1401].includes(response.data.code)) {
        // localStorage.clear();   '  '
        if (!window.h5sdk) {
          localStorage.setItem('initUrl', window.location.href)
          if (!isLocal) window.location.href = appContent.redirectUrl
          return
        } else {
          // alert(window.location.href);
          localStorage.setItem('initUrl', window.location.href)
          try {
            const oc = m()
            window.h5sdk.error((err) => { throw err })
            window.h5sdk.ready(() => {
              window.tt.requestAuthCode({
                appId: appContent.appid,
                // 获取成功后的回调
                success (res) {
                  axios({
                    method: 'get',
                    url: appContent.domain + '/api/usark/login',
                    params: {
                      code: res.code,
                      platform: oc.pc ? 'okr' : 'h5'
                    }
                  }).then((res) => {
                    if (res.data.data) {
                      localStorage.setItem('token', res.data.data.token)
                      window.location.reload()
                    }
                    // Oshow.innerHTML = "loginres" + JSON.stringify(res);
                  })
                  // alert(res.code, "feishucode");
                },
                // 获取失败后的回调
                fail (err) {
                  // document.querySelector("#jjjj").innerHTML =
                  //   JSON.stringify(err);
                  alert(err)
                }
              })
            })

            // 通过 ready 接口确认环境准备就绪后才能调用 API
          } catch (error) {
            // alert(error);
          }
        }
      }
      // Message.error(response.data.message)
    }
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

const request = function (option) {
  return server(option)
}

export default request
