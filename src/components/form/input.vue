<template>
	<el-input 
		v-model="_value" 
		:placeholder="placeholder"
		style="width:215px"
	/>
</template>
<script>
export default {
    props: {
		value:String,
		name:String,
		formIndex:Number,
		placeholder:String
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
