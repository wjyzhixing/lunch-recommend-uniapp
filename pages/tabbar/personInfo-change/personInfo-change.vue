<template>
	<view class="content">
		<view class="example">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item label="用户名" required name="username">
					<uni-easyinput disabled v-model="valiFormData.username" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="密码" required name="password">
					<uni-easyinput v-model="valiFormData.password" type="password" placeholder="请输入密码" />
				</uni-forms-item>
				<uni-forms-item label="邮箱" name="email">
					<uni-easyinput v-model="valiFormData.email" placeholder="请输入邮箱" />
				</uni-forms-item>
				<uni-forms-item label="是否发送邮件"  name="ifEmail">
					<uni-data-checkbox v-model="valiFormData.ifEmail" :localdata="emailData" />
				</uni-forms-item>
			</uni-forms>
			<button type="primary" @click="submit('valiForm')">修改</button>
		</view>
	</view>
</template> 

<script>
export default {
	data() {
		return {
			valiFormData: {
				username: '',
				password: '',
				ifEmail: 'true',
			},
			// 单选数据源
			emailData: [{
				text: '发送',
				value: 'true'
			}, {
				text: '不发送',
				value: 'false'
			}],
			// 校验规则
			rules: {
				username: {
					rules: [{
						required: true,
						errorMessage: '姓名不能为空'
					}]
				},
				password: {
					rules: [{
						required: true,
						errorMessage: '密码不能为空'
						// }, {
						// 	format: 'number',
						// 	errorMessage: '年龄只能输入数字'
						// }]
					}]
				}
			},
		};
	},
	onLoad() { },
	onShow() {
		const host = getApp().globalData.host;
		uni.request({
			url: host + "/showUserInfo",
			method: 'POST',
			data: {
				id: uni.getStorageSync("id")
			},
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				'token': uni.getStorageSync("token")
			},
			success: (res) => {
				console.log(res)
				if (res?.data?.code !== 0 && res?.data) {
					uni.showToast({
						title: `${res?.data?.message}`,
						icon: 'none'
					})
				} else {
					console.log(res?.data)
					this.valiFormData = {
						...res?.data?.data,
						ifEmail: String(res?.data?.data?.ifEmail ?? true)
					}
				}
			},
			fall: e => {
				console.log(e)
			}
		})
},
onHide() {
	this.active = false;
},
methods: {
	submit(ref) {
			this.$refs[ref].validate().then(result => {
				console.log(result)
				const params = {
					...result,
					ifEmail: String(result.ifEmail),
					id: uni.getStorageSync('id')
				}
				const host = getApp().globalData.host;
				uni.request({
					url: host + "/updateUserInfo",
					method: 'POST',
					data: params,
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"token": uni.getStorageSync('token')
					},
					success: (res) => {
						console.log(res)
						if (res?.data?.code !== 0 && res?.data) {
							uni.showToast({
								title: `${res?.data?.message}`,
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: `修改成功`
							})
							setTimeout(() => {
								uni.navigateBack()
							},500)
						}
					},
					fall: e => {
						console.log(e)
					}
				})
			}).catch(err => {
				console.log('err', err);
			})
		
	},
	goToPage(url) {
		if (!url) return;
		uni.navigateTo({
			url
		});
	}
}
};
</script>

<style lang="scss" scoped>
.content {
	margin: 40upx;
}
</style>
