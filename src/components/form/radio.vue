<template>
	<el-radio-group v-model="_value">
		<el-radio 
			v-for="(item,index) in selectList" 
			:key="index"
			:label="labelKey?item[labelKey]:item"
		>
			{{valueKey?item[valueKey]:item}}
		</el-radio>
	</el-radio-group>
</template>
<script>
export default {
	props:{
		name: String,
        value: null,
        selectList: {
            type: Array,
            default: () => []
		},
        valueKey: String,
		labelKey: String,
		formIndex:Number,
	},
	computed:{
		_value:{
			get(){
				return this.value
			},
			set(value){
				this.$emit("input",value,this.formIndex)
			}
		}
	},
}
</script>
