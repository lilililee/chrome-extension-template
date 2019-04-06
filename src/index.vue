<template>
  <div id="chrome-app" class="app1">
    <h1 class="app-title">xxx 脚本配置</h1>
    <el-container id="page-ct">
      <page-record :list="planList" :select-index="index" @add="handleAdd" @select="handleSelect" @remove="handleRemove" />
      <page-config v-show="index!=-1" :list="planList" :select-index="index" @save="handleSave" @copy="handleCopy" @run="handleRun" />
    </el-container>
  </div>

</template>
<script>
import pageConfig from './page/Config/index.vue'
import pageRecord from './page/Record/index.vue'
import config from './form.json'
import running from './js/running'

const KEY_PLAN = 'PLAN'

export default {
  components: {
    pageConfig,
    pageRecord
  },
  data() {
    return {
      planList: [],
      index: -1
    }
  },
  methods: {
    handleSave(list) {
      let nameItem = list.find(item => item.key === 'name')
      if (nameItem) {
        this.planList[this.index].name = nameItem.value
      }
      this.planList[this.index].config = [...list]
      localStorage.setItem(KEY_PLAN, JSON.stringify(this.planList))
    },
    handleCopy(list) {
      const item = this.planList[this.index]
      let json = {
        time: new Date().getTime(),
        name: item.name,
        config: [...list]
      }
      this.planList.unshift(json)
      this.index = 0
    },
    handleRun(list = []) {
      /**@name 是否丢失字段值 */
      let isLost = false

      const map = list.reduce((data, item) => {
        if (!item.value) {
          isLost = true
        }
        if (Array.isArray(item.value)) {
          data[item.key] = [...item.value]
        } else {
          data[item.key] = item.value
        }

        return data
      }, {})
      console.log(map)
      console.log(isLost)

      // 移除配置界面
      document.getElementById
      let app = document.getElementById('chrome-app')
      app.parentNode.removeChild(app)
      running(map)
    },
    handleAdd() {
      let json = {
        time: new Date().getTime(),
        name: '',
        config: [...config]
      }
      this.planList.unshift(json)
      this.index = 0
    },
    handleSelect(index) {
      this.index = index
    },
    handleRemove(index) {
      if (this.index >= index) {
        this.index--
      }
      this.planList.splice(index, 1)
    }
  },
  mounted() {
    const PLAN_STR = localStorage.getItem(KEY_PLAN)

    if (PLAN_STR) {
      this.planList = JSON.parse(PLAN_STR)
    }
  }
}
</script>
<style lang="less">
#chrome-app {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100000;
  padding: 10px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  min-width: 1200px;
  text-align: left;

  .app-title {
    text-align: center;
    font-size: 22px;
    line-height: 80px;
  }
  #page-ct {
    width: 1200px;
    margin: auto;
    // height: 550px;
    footer {
      line-height: 60px;
      text-align: right;
    }
  }

  .el-main {
    padding: 0 20px;
  }

  .record-aside {
    height: 500px;
  }
  .record-main {
    height: 480px;
  }
  .record-aside-warp li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 280px;
    padding: 15px 0;
    padding-left: 15px;
    cursor: pointer;
    background: transparent;
    transition: all 0.5s;
  }
  .record-aside-warp li:hover {
    color: #409eff;
    background: rgba(255, 255, 255, 0.1);
  }
  .record-aside-warp .li--atv,
  .record-aside-warp .li--atv:hover {
    background: #409eff;
    color: #fff;
  }

  .record-aside-item {
    flex: 1;
  }
  .record-aside-warp .el-icon-error {
    color: rgba(255, 255, 255, 0.4);
    transition: color 0.5s;
    cursor: pointer;
    margin-right: 5px;
  }
  .record-aside-warp .el-icon-error:hover {
    color: #f00;
  }
  .record-rt {
    border-left: 2px dashed #409eff;
    margin-left: 15px;
  }
  .record-value {
    border-bottom: 1px solid #409eff;
  }
}
</style>

