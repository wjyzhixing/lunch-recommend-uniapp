# 简介
转盘抽奖。支持自定义盘面选项，灵活配置占比及奖品。

# 平台兼容性
全平台兼容。
# 快速开始
### 使用 uni_modules 安装（推荐）
使用 uni_modules 方式安装组件库，可以直接通过插件市场导入，通过右键菜单快速更新组件，不需要引用、注册，直接在页面中使用 ljs-turntable 组件。

### 快速应用
```
<template>
	<view class="content">
		<view class="openBut" @click="open()">打开转盘</view>
		<ljs-turntable :show="ljs_turntable_show" @getPrize="getPrize" @turntableState="turntableState" :list="list"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ljs_turntable_show: false,
				list: [],
			}
		},
		onLoad() {
			// 最少3个选项
			// 最大值：12份，
			// 最小值：1份，
			// 每份10度
			this.list = [
				{
					name: "苹果手机",
					prop: 5,
					state: true, // 是否中奖
					id: 1
				},
				{
					name: "Iphone 11",
					prop: 4,
					state: true, // 是否中奖
					id: 2
				},
				{
					name: "谢谢参与",
					prop: 7,
					state: false, // 是否中奖
					id: 5
				},
				{
					name: "Iphone 8",
					prop: 1,
					state: true, // 是否中奖
					id: 3
				},
				{
					name: "谢谢参与",
					prop: 6,
					state: false, // 是否中奖
					id: 5
				},
				{
					name: "Iphone 7",
					prop: 4,
					state: true, // 是否中奖
					id: 4
				},
				{
					name: "谢谢参与",
					prop: 9,
					state: false, // 是否中奖
					id: 5
				},
			];
		},
		methods: {
			// 打开转盘
			open(){
				this.ljs_turntable_show = true;
			},
			// 回调，修改转盘的展示状态
			turntableState(val){
				this.ljs_turntable_show = val;
			},
			// 回调，转盘结果
			getPrize(state, id, prizeName){
				console.log(state, id, prizeName)
			},
		}
	}
</script>

<style>
	.openBut{
		margin: 20upx;
		background-color: #007AFF;
		color: #FFF;
		width: 200upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		border-radius: 10upx;
	}
</style>

```
### 参数

 参数  | 类型| 解释
 ---- | ----- | ------ 
 show  | Boolean | （必填）是否显示。
 list  | Array | （必填）传入组件的基础数据。所以选项按照顺时针依次排列。


list 参数：

 参数  | 类型| 解释
 ---- | ----- | ------ 
 name| String| 奖品名称。
 prop| Int| （必填）奖品占比。说明： 比例总共被分解成36份。此数值，设置为1，代表占1份区域，最小为1，最大不得超过12，最少3个区域。所有奖品选项，占比和需为36。否则无法绘制。
 state| Boolean| （必填）是否中奖。
 id| String| （必填）奖品唯一标识。

### 方法

 参数  | 类型| 解释
 ---- | ----- | ------ 
 @getPrize| 回调函数| 抽奖结束返回function(state, id, prizeName)。state：是否中奖， id：中奖ID, prizeName：奖品名称。
 @turntableState| 关闭按钮回调函数| 修改转盘的展示状态。

# 贡献代码
龙九山。有任何问题，请在平台留言，在手头宽裕得情况下，我会尽快修复问题。