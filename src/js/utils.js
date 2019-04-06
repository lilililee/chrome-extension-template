// 工具函数

/**
 * 适用于触发绑定在document的事件，例如react框架网站
 */
const generateEvent = (eventType, canBubble, cancelable) => {
  let event = document.createEvent('HTMLEvents')
  event.initEvent(eventType, canBubble, cancelable)
  return event
}

const Event = {
  blur: generateEvent('blur', true, true),
  focus: generateEvent('focus', true, true),
  click: generateEvent('click', true, true),
  mousedown: generateEvent('mousedown', true, true),
  mouseout: generateEvent('mouseout', true, true),
  input: generateEvent('input', true, true),
  change: generateEvent('change', true, true)
}

/**
 * 持续调用一个函数，直到函数返回值为true或超时
 * 常用于通过dom的某个状态来判断是否可以进入下一流程
 * @param {Function} fn 
 * @param {number} limitTime  限制时间，单位为毫秒
 */
const when = (fn, limitTime = 300000) => {
  return new Promise((reslove, reject) => {
    let time = 0
    let id = setInterval(() => {
      time += 500
      if (fn()) {
        reslove()
        clearInterval(id)
      }
      if (time >= limitTime) {
        reject()
        clearInterval(id)
        showMsg(`脚本执行超时已终止，请刷新页面重试`, 0)
      }
    }, 500)
  })
}

const log = msg => {
  console.log(msg)
}

const sleep = ms => new Promise(r => setTimeout(r, ms || 1000))

/**
 * 显示提示信息
 * @param {string} txt 
 * @param {number} time 
 */
const showMsg = (txt = '', time = 1500) => {
  let msg = document.createElement('div')
  msg.innerHTML = `
        <div className="my-msg-box" style="
        position: fixed;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        webkitTransform: translate(-50%,-50%);
        font-size: 14px;
        padding: 8px;
        border-radius: 5px;
        background: rgba(0, 0, 0, 1);
        line-height: 1.5;
        text-align: center;
        width: 300px;
        color: #fff;
        z-index: 999999;
        word-break:break-all;">
            ${txt}
        </div>
    `
  document.body.appendChild(msg)

  time && setTimeout(() => {
    document.body.removeChild(msg)
  }, time)
}

const breakScript = msg => {
  sleep().then(() => {
    showMsg('Error: ' + msg)
    // removeLocal('script')
  })
}

const inject = (container, src, tag = 'iframe') => {
  let context = document.createElement(tag)
  context.id = 'i-' + new Date().getTime()
  if (tag === 'link') {
    context.href = src
    context.rel = 'stylesheet'
  } else {
    context.src = src
  }
  document.querySelectorAll(container)[0].appendChild(context)
  return new Promise((resolve, reject) => {
    context.onload = () => resolve(context)
  })
}

const flatten = arr => arr.reduce((pre, val) => pre.concat(Array.isArray(val) ? flatten(val) : val), []);


export default {
  Event,
  when,
  log,
  sleep,
  inject,
  flatten,
  showMsg,
  breakScript
}
