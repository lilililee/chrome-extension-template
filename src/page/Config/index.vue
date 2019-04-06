<template>
	<el-container class="record-rt">
		<el-main style="padding-bottom:0">
			<el-scrollbar wrap-class="record-main">
				<div class="page-config">
					<el-form label-width="150px">
						<el-form-item 
							:label="item.name"
							v-for="(item, index) in configList" 
							:key="index">
							<component 
								:is="`k-${item.type}`" 
								v-bind="item" 
								v-model="item.value" 
								:form-index="index"
								@input="handleSave"
							/>
						</el-form-item>
					</el-form>  
				</div>
			</el-scrollbar>
		</el-main>
		<el-footer>
			<el-button type="primary" @click="handleCopy">
				<i class="el-icon-edit"></i>
				复制
			</el-button>
			<el-button type="success" @click="handleRun">
				<i class="el-icon-setting"></i>
				执行
			</el-button>
		</el-footer>
	</el-container>
	
</template>
<script>
import kText from 'Src/components/form/input.vue';
import kNumber from 'Src/components/form/number.vue';
import kPassword from 'Src/components/form/password.vue';
import kCheckbox from 'Src/components/form/checkbox.vue';
import kRadio from 'Src/components/form/radio.vue';
import kSelect from 'Src/components/form/select.vue';
import kFile from 'Src/components/form/file.vue';

export default {
    props: {
        list: {
            type: Array,
            default: () => []
        },
        selectIndex: Number
    },
    components: {
        kText,
        kNumber,
        kPassword,
        kCheckbox,
        kRadio,
        kSelect,
        kFile
    },
    data() {
        return {
            configList: []
        };
    },
    computed: {},
    watch: {
        selectIndex(i) {
            if (this.list[i]) {
                this.initConfigList(this.list[i].config);
                this.checkHasFileTypeConfig();
            } else {
                this.initConfigList([]);
            }
        },
        list(a) {
            if (a[this.selectIndex]) {
                this.initConfigList(a[this.selectIndex].config);
                this.checkHasFileTypeConfig();
            } else {
                this.initConfigList([]);
            }
        }
    },
    methods: {
        /**@name 提交表单 */
        handleSubmit() {
            console.log(this.configList);
            this.$message('查看控制台打印信息');
        },

        handleSave() {
            this.$emit('save', this.configList);
        },
        handleCopy() {
            this.$emit('copy', this.configList);
        },
        handleRun() {
            this.$emit('run',this.configList);
        },

        /**@name 检查配置列表是否存在文件上传类型 */
        checkHasFileTypeConfig() {
            let hasFileTypeConfig = this.configList.findIndex(
                item => item.type === 'file'
            );
            if (hasFileTypeConfig !== -1) {
                this.$message({
                    message: '有file类型',
                    type: 'warning'
                });
            }
        },
        handleInput(value, i) {
            let item = this.configList[i];
            item.value = value;
            this.configList = this.configList;
        },
        initConfigList(list) {
            this.configList = list.map(item => {
                if (item.value) {
                    return item;
                }

                if (item.default) {
                    return Object.assign({}, item, {
                        value: item.default
                    });
                }

                if (item.selectList) {
                    return Object.assign({}, item, {
                        value: []
                    });
                }

                if (item.type === 'radio' && !item.selectList) {
                    return Object.assign({}, item, {
                        value: [],
                        selectList: [
                            {
                                value: '是',
                                label: 1
                            }
                        ],
                        valueKey: 'value',
                        labelKey: 'label'
                    });
                }
                if (item.type === 'number') {
                    return Object.assign({}, item, {
                        value: 0
                    });
                }

                return Object.assign({}, item, {
                    value: ''
                });
            });
        }
    },
    mounted() {}
};
</script>
<style lang="less">
@import '~Src/css/_utils.less';

#chrome-app .page-config {
    width: 100%;
    margin: auto;
    .form {
        .flex-center();
        flex-wrap: wrap;
    }
    .form-item {
        width: 50%;
    }
}
#chrome-app {
    .el-form label {
        color: #fff;
    }
}
</style>
