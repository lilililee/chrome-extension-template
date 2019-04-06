<template>
	<el-select 
		v-model="_value" 
		filterable 
		:placeholder="placeholder"
	>
		<el-option 
			v-for="(item,index) in selectList"
			:key="index"
			:label="labelKey?item[labelKey]:item"
			:value="valueKey?item[valueKey]:item"
		>
		</el-option>
	</el-select>
</template>
<script>
export default {
    props: {
        name: String,
        value: null,
        placeholder: String,
        selectList: {
            type: Array,
            default: () => []
        },
        valueKey: String,
        labelKey: String,
        formIndex: Number
    },
    computed: {
        _value: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value, this.formIndex);
            }
        }
    }
};
</script>
