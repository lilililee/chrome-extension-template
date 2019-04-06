<template>
	<el-checkbox-group v-model="_value">
		<el-checkbox 
			v-for="(item,index) in selectList" 
			:key="index"
			:label="labelKey?item[labelKey]:item"
		>
			{{valueKey?item[valueKey]:item}}
		</el-checkbox>
	</el-checkbox-group>
</template>
<script>
export default {
    props: {

        name: String,
        value: Array,
        selectList: {
            type: Array,
            default: () => []
		},
		formIndex:Number,
        valueKey: String,
        labelKey: String
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
};
</script>
