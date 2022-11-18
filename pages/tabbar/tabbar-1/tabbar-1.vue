<template>
	<view>
	<view>
		<image style="width: 100%; height: 300upx; background-color: #eeeeee;" mode="top" src="@/static/img/background.jpeg"></image>
	</view>
	<view class="mainPage">
	<view class="content">
		今天吃什么？
	</view>
	</view class="btn-list">
		<button class="btn" @click="onRandom()">推荐一个</button>
		<button class="btn" @click="onAdd()" type="primary">新增一个</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {
		onAdd() {
			if(!sessionStorage.getItem('token')) {
				uni.showToast({
					title: `token不存在，请检查登录信息`,
					icon: 'error'
				})
				return;
			}
			let url = '/pages/tabbar/tabbar-4/tabbar-4'
			console.log(this.$navTo)
			this.$navTo.togo(url)
		},
		onRandom() {
			this.axios.post('/api/recommendMyWifeFood', this.qs.stringify({user: sessionStorage.getItem('user')}), {
					headers: {
						'token': sessionStorage.getItem('token')
					}
				})
				.then(function(res) {
					console.log(res.data)
					if (res?.data?.code !== 0 && res?.data) {
						uni.showToast({
							title: `${res?.data?.message}`,
							icon: 'error'
						})
					} else {
						uni.showToast({
							title: `今天推荐来吃${res?.data?.data || '鸡腿'}!`,
							icon: 'none'
						})
					}
					//控制台打印请求成功时返回的数据
					//bind(this)可以不用
				}.bind(this))
				.catch(function(err) {
					if (err.response) {
						console.log(err.response)
						//控制台打印错误返回的内容
						uni.showToast({
							title: `${err?.response?.data?.message} 请检查登录信息`,
							icon: 'error'
						})
					}
					//bind(this)可以不用
				}.bind(this))
		}
	}
};
</script>

<style lang="less" scoped>
.content {
	text-align: center;
	height: fit-content;
	font-size: 50upx;
	margin: 100upx;
}
.mainPage {
	background: lightgoldenrodyellow;
	border: 2upx solid #dedede;
	border-radius: 20upx;
	margin: 30upx;
	position: relative;
	top: -200upx;
	height: 100%;
}
.btn {
	margin: 40upx;
}
</style>
