<template>
	<div class="k-file">
		<label>
			<span>选择文件</span>
			<input type="file" @change="handleChangeFile" multiple/>
		</label>
		<ul>
			<li></li>
		</ul>
	</div>
	
</template>
<script>
export default {
	props:{},
	methods:{
		handleChangeFile(e){
			console.log(e);
		}
	}
}
</script>
<style lang="less">
.k-file{
	label{
		position: relative;
		display: block;
		width:100px;
		height:20px;
		line-height: 20px;
		padding:5px 15px;
		border-radius: 3px;
		border-color:#409EFF;
		overflow: hidden;
		font-size: 12px;
		text-align: center;
		color:#fff;
		background:#409eff;
		cursor: pointer;
		white-space: nowrap;
	}
	input[type=file]{
		position: absolute;
		opacity: 0;
		z-index: -1;
	}

	label:hover{
		background:#66b1ff;
		border-color:#66b1ff;
	}
	label:active{
		background:#409eff;
		border-color:#409EFF;
	}
}
</style>
