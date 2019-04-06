<template>
	<el-input-number
		v-model="_value" 
		:label="placeholder"
		style="width:215px"
	/>
</template>
<script>
export default {
    props: {
		value:Number,
		name:String,
		placeholder:String,
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
	}
};
</script>
