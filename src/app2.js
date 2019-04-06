/**
 * 配置界面ui 样式1
 * 适用于在文件中读取脚本设置
 */

import utils from './js/utils';
import './css/app2.less'
import running from './js/running'

let fileArea = document.createElement('div')
fileArea.innerHTML = `
  <div id="chrome-app" class="app2">
    <h1 class="app-title">xxx 脚本配置</h1>
    <div class="tips">* 请先选中文件夹批量上传文件，然后启动脚本</div>
    <input type="file" id="input-files" webkitdirectory />
    <div class="btn" id="start">启动脚本</div>
  </div>
`
document.body.appendChild(fileArea)

let fileInput = document.querySelector('#chrome-app #input-files')
document.querySelector('#chrome-app #start').addEventListener('click', async e => {
  if (fileInput.files.length) {
    document.body.removeChild(fileArea)
    
    running()
  } else {
    utils.showMsg('请先上传文件')
  }
})