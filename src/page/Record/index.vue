<template>
  <el-aside>
    <div class="record-add" @click="handleAdd">
      <i class="el-icon-plus"></i>
      <span>添加新记录</span>
    </div>
    <el-scrollbar wrap-class="record-aside">
      <ul class="record-aside-warp">
        <li :class="{'li--atv':selectIndex===index}" v-for="(item,index) in list" :key="index" @click="handleSelect(index)">
          <div class="record-aside-item">
            <h3>{{item.name||"未命名"}}</h3>
            <time>{{new Date(item.time).toLocaleString()}}</time>
          </div>
          <div>
            <i class="el-icon-error" title="删除该记录" @click.stop="handleRemove(index)" />
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </el-aside>
</template>
<script>
export default {
  props: {
    list: Array,
    selectIndex: Number
  },
  data() {
    return {}
  },
  methods: {
    handleAdd() {
      this.$emit('add')
    },
    handleSelect(index) {
      this.$emit('select', index)
    },
    handleRemove(index) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => { 
          this.$emit('remove', index)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
     
    }
  }
}
</script>
<style lang="less">
#chrome-app {
  .record-add {
    width: 291px;
    height: 50px;
    line-height: 50px;
    border: 2px dashed #fff;
    margin-bottom: 5px;
    text-align: center;
    cursor: pointer;
    border-color: #409eff;
    color: #409eff;
    .el-icon-plus {
      font-size: 20px;
      vertical-align: middle;
    }
  }
  .record-add:active {
    transform: scale(0.9);
  }
}
</style>
