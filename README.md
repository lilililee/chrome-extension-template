# chrome-plugin-template
## 简述
开发 chrome 扩展模版，用于自动执行脚本设置界面内容

## 开发
npm run dev  
在chrome安装扩展（将整个项目文件夹添加到 chrome 扩展界面）
打开  http://www.baidu.com  进行测试（也可以在manifest.json修改匹配网站）  

npm run dev 启动样式1调试模式， 用于在页面配置脚本设置  
npm run dev2 启动样式2调试模式， 用于从文件中读取脚本设置  

## 打包
npm run build  
npm run build2  

## 生产环境
打包后在chrome安装扩展package下的文件夹



