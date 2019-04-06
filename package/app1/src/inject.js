// 供目标页面调用

// 监听脚本启动事件
chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  let script = document.createElement('script')
  
  script.src = chrome.extension.getURL('dist/app.js')
  
  document.body.appendChild(script)
  document.body.removeChild(script)
})

