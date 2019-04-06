## 单选 radio

|   属性名   |  类型  |                                      说明                                      |
| :--------: | :----: | :----------------------------------------------------------------------------: |
|   value    |  any   |                              值，用于绑定 v-model                              |
| selectList | Array  |                                    单选选项                                    |
|  valueKey  | String |               若存在，会获取 selectList[][valuekey]的值作为展示                |
|  labelKey  | String | 若存在，会获取 selectList[][labelkey]的值作为 el-radio 组件的 label 属性值传入 |

## 多选 checkbox

|   属性名   |  类型  |                                       说明                                        |
| :--------: | :----: | :-------------------------------------------------------------------------------: |
|   value    |  any   |                               值，用于绑定 v-model                                |
| selectList | Array  |                                     单选选项                                      |
|  valueKey  | String |                 若存在，会获取 selectList[][valuekey]的值作为展示                 |
|  labelKey  | String | 若存在，会获取 selectList[][labelkey]的值作为 el-checkbox 组件的 label 属性值传入 |

## 下拉 select

|   属性名    |  类型  |                                      说明                                       |
| :---------: | :----: | :-----------------------------------------------------------------------------: |
|    value    |  any   |                              值，用于绑定 v-model                               |
| placeholder | String |                               placeholder 占位符                                |
| selectList  | Array  |                                    单选选项                                     |
|  valueKey   | String |                若存在，会获取 selectList[][valuekey]的值作为展示                |
|  labelKey   | String | 若存在，会获取 selectList[][labelkey]的值作为 el-select 组件的 label 属性值传入 |

## 文本框 input

|   属性名    |  类型  |         说明         |
| :---------: | :----: | :------------------: |
|    value    |  any   | 值，用于绑定 v-model |
| placeholder | String |  placeholder 占位符  |

## 文件 file

如果是图片类型，必须每次执行时点击上传，由于input files属性不可修改， 用Object.defineProperty 定义目标input的files属性的get指向到自行上传的文件files
如果是 excel 类型，可每次执行时点击上传动态解析，也可以保存解析内容持续使用
