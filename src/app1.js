/**
 * 配置界面ui 样式1
 * 适用于在界面配置多个字段并可保存为多个记录
 */

import Vue from 'vue';
import ElementUI from 'element-ui';
import ElScrollbar from "element-ui/lib/scrollbar"
import 'element-ui/lib/theme-chalk/index.css';


import PageTem from './index.vue';
import utils from './js/utils';
// import './css/app.less'

if(document.getElementById("chrome-app")){
	document.body.removeChild(document.getElementById("chrome-app"))
}

let App = document.createElement('div');
App.id = 'chrome-app';
document.body.appendChild(App);


Vue.use(ElementUI, { size: 'small', zIndex: 100000 });
Vue.use(ElScrollbar)
new Vue({
    el: '#chrome-app',
    components: { PageTem },
    template: `<PageTem/>`
});
