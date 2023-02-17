<template>
	<view>
		<view>
			<image style="width: 100%; height: 300upx; background-color: #eeeeee;" mode="top"
				src="@/static/img/background.jpeg"></image>
		</view>
		<view class="mainPage">
			<view class="content">
				今天吃什么？
			</view>
		</view>
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
	onLoad() { },
	methods: {
		onAdd() {
			if (!uni.getStorageSync("token")) {
				uni.showToast({
					title: `token不存在，请检查登录信息`,
					icon: 'none'
				})
				return;
			}
			let url = '/pages/tabbar/food-detail/food-detail'
			console.log(this.$navTo)
			this.$navTo.togo(url)
		},
		onRandom() {
			// this.axios.post('/api/recommendMyWifeFood', this.qs.stringify({user: uni.getStorageSync("user")}), {
			// 		headers: {
			// 			'token': uni.getStorageSync("token")
			// 		}
			// 	})
			// 	.then(function(res) {
			// 		console.log(res.data)
			// 		if (res?.data?.code !== 0 && res?.data) {
			// 			uni.showToast({
			// 				title: `${res?.data?.message}`,
			// 				icon: 'error'
			// 			})
			// 		} else {
			// 			uni.showToast({
			// 				title: `今天推荐来吃${res?.data?.data || '鸡腿'}!`,
			// 				icon: 'none'
			// 			})
			// 		}
			// 		//控制台打印请求成功时返回的数据
			// 		//bind(this)可以不用
			// 	}.bind(this))
			// 	.catch(function(err) {
			// 		if (err.response) {
			// 			console.log(err.response)
			// 			//控制台打印错误返回的内容
			// 			uni.showToast({
			// 				title: `${err?.response?.data?.message} 请检查登录信息`,
			// 				icon: 'error'
			// 			})
			// 		}
			// 		//bind(this)可以不用
			// 	}.bind(this))
			const host = getApp().globalData.host;
			uni.request({
				url: host + "/recommendMyWifeFood",
				method: 'POST',
				data: { user: uni.getStorageSync("user") },
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					'token': uni.getStorageSync("token")
				},
				success: (res) => {
					console.log(res)
					console.log(res.data)
					if (res?.data?.code !== 0 && res?.data) {
						uni.showToast({
							title: `${res?.data?.message}`,
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: `今天推荐来吃${res?.data?.data || '鸡腿'}!`,
							icon: 'none'
						})
					}

				},
				fall: err => {
					if (err.response) {
						console.log(err.response)
						//控制台打印错误返回的内容
						uni.showToast({
							title: `${err?.response?.data?.message} 请检查登录信息`,
							icon: 'none'
						})
					}
				}
			})
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
