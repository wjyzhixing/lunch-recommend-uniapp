<template>
	<uni-section :title="`${id ? '食物详情' : '新增食物'}`" type="line">
		<view class="example">
			<!-- 基础用法，不包含校验规则 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="baseFormData">
				<uni-forms-item label="食品" required name="food">
					<uni-easyinput v-model="baseFormData.food" placeholder="请输入食品名称" />
				</uni-forms-item>
				<uni-forms-item label="次数" required name="times">
					<uni-easyinput v-model="baseFormData.times" placeholder="请输入次数" />
				</uni-forms-item>
				<uni-forms-item label="喜爱程度" required name="love">
					<uni-data-checkbox v-model="baseFormData.love" :localdata="lovesData" />
				</uni-forms-item>
				<uni-forms-item label="哪餐" required name="whichTime">
					<uni-data-checkbox v-model="baseFormData.whichTime" :localdata="whichTimeData" />
				</uni-forms-item>
			</uni-forms>
			<view class="button-group">
				<button type="primary" class="btn-change" @click="submit('valiForm')">提交</button>
			</view>
		</view>
	</uni-section>
</template>

<script>
export default {
	data() {
		return {
			// 基础表单数据
			baseFormData: {
				food: '',
				times: '',
				love: 0,
				whichTime: '全部',
			},
			id: null,
			// 单选数据源
			lovesData: [{
				text: '不喜欢',
				value: '0'
			}, {
				text: '一点点',
				value: '1'
			}, {
				text: '一般',
				value: '2'
			}, {
				text: '较喜欢',
				value: '3'
			}, {
				text: '很喜欢',
				value: '4'
			}, {
				text: '非常喜欢',
				value: '5'
			}],
			// 数据源
			whichTimeData: [{
				text: '早餐',
				value: '早餐'
			}, {
				text: '午餐',
				value: '午餐'
			}, {
				text: '晚餐',
				value: '晚餐'
			}, {
				text: '全部',
				value: '全部'
			}],
			// 校验表单数据
			valiFormData: {
				food: '',
				times: '',
				loves: '',
				whichTime: '',
			},
			// 校验规则
			rules: {
				food: {
					rules: [{
						required: true,
						errorMessage: '食品名称不能为空'
					}]
				},
				times: {
					rules: [{
						required: true,
						errorMessage: '次数不能为空'
					}, {
						format: 'number',
						errorMessage: '次数只能输入数字'
					}]
				}
			},
		}
	},
	computed: {},
	onLoad(options) {
		console.log(options)
		this.baseFormData = {
			food: options.food,
			times: options.times,
			love: options.love,
			whichTime: options.whichTime
		}
		this.id = options._id;
	},
	onReady() { },
	methods: {
		submit(ref) {
			this.$refs[ref].validate().then(res => {
				console.log('success', res);
				const data = {
					...res,
					love: Number(res.love),
					id: this.id,
					user: uni.getStorageSync("user")
				}
				if (!this.id) {
					this.add(data)
				}
				if (this.id) {
					delete data.user;
					this.update(data)
				}
			}).catch(err => {
				console.log('err', err);
			})
		},
		update(data) {
			// this.axios.post('/api/updateMyWifeFood', this.qs.stringify(data), {
			// 		headers: {
			// 			'token':  uni.getStorageSync("token")
			// 		}
			// 	})
			// 	.then(function(res) {
			// 		if (res?.data?.code !== 0 && res?.data) {
			// 			uni.showToast({
			// 				title: `${res?.data?.message}`,
			// 				icon: 'error'
			// 			})
			// 		} else {
			// 			uni.showToast({
			// 				title: '修改成功',
			// 			})
			// 			setTimeout(() => {
			// 				uni.navigateBack();								
			// 			},1000)
			// 		}
			// 		//控制台打印请求成功时返回的数据
			// 		//bind(this)可以不用
			// 	}.bind(this))
			// 	.catch(function(err) {
			// 		if (err.response) {
			// 			console.log(err.response)
			// 			//控制台打印错误返回的内容
			// 		}
			// 		//bind(this)可以不用
			// 	}.bind(this))
			const host = getApp().globalData.host;
			uni.request({
				url: host + "/updateMyWifeFood",
				method: 'POST',
				data: data,
				header: {
					'token': uni.getStorageSync("token")
				},
				success: (res) => {
					if (res?.data?.code !== 0 && res?.data) {
						uni.showToast({
							title: `${res?.data?.message}`,
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '修改成功',
						})
						setTimeout(() => {
							uni.navigateBack();
						}, 1000)
					}
				},
				fall: err => {

				}

			})
		},
		add(data) {
			// this.axios.post('/api/addMyWifeFood', this.qs.stringify(data), {
			// 		headers: {
			// 			'token':  uni.getStorageSync("token")
			// 		}
			// 	})
			// 	.then(function(res) {
			// 		if (res?.data?.code !== 0 && res?.data) {
			// 			uni.showToast({
			// 				title: `${res?.data?.message}`,
			// 				icon: 'error'
			// 			})
			// 		} else {
			// 			uni.showToast({
			// 				title: '新增成功',
			// 			})
			// 			setTimeout(() => {
			// 				uni.navigateBack();								
			// 			},1000)
			// 		}
			// 		//控制台打印请求成功时返回的数据
			// 		//bind(this)可以不用
			// 	}.bind(this))
			// 	.catch(function(err) {
			// 		if (err.response) {
			// 			console.log(err.response)
			// 			//控制台打印错误返回的内容
			// 		}
			// 		//bind(this)可以不用
			// 	}.bind(this))
			const host = getApp().globalData.host;
			uni.request({
				url: host + "/addMyWifeFood",
				method: 'POST',
				data: data,
				header: {
					'token': uni.getStorageSync("token")
				},
				success: (res) => {
					if (res?.data?.code !== 0 && res?.data) {
						uni.showToast({
							title: `${res?.data?.message}`,
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '新增成功',
						})
						setTimeout(() => {
							uni.navigateBack();
						}, 1000)
					}
				},
				fall: err => {

				}

			})
		}
	}
}
</script>
<style lang="less">
.content {
	text-align: center;
	height: 400upx;
	margin-top: 200upx;
}

.example {
	/deep/ .uni-forms-item__label {
		margin-left: 20upx;
		width: 160upx !important;
		font-size: 30upx !important;
	}

	/deep/ .uni-forms-item__content {
		margin: auto;
	}

	.button-group {
		position: fixed;
		bottom: 200upx;
		width: 100%;

		.btn-change {
			width: 80%;
		}
	}
}
</style>
