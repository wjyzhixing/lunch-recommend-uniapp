<template>
	<view class="content">
		<view v-if="register">
			<view class="login">
				注册
			</view>
			<view class="example">
				<!-- 基础表单校验 -->
				<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
					<uni-forms-item label="用户名" required name="username">
						<uni-easyinput v-model="valiFormData.username" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="密码" required name="password">
						<uni-easyinput v-model="valiFormData.password" type="password" placeholder="请输入密码" />
					</uni-forms-item>
					<uni-forms-item label="邮箱" name="email">
						<uni-easyinput v-model="valiFormData.email" placeholder="请输入邮箱" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit('valiForm')">注册</button>
				<view class="register-btn">
					<view class="register-text">已有账号？</view>
					<view class="register-vbtn" @click="loginJump">直接登录</view>
				</view>
			</view>
		</view>
		<view v-if="login">
			<view class="login">
				登录
			</view>
			<view class="example">
				<!-- 基础表单校验 -->
				<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
					<uni-forms-item label="用户名" required name="username">
						<uni-easyinput v-model="valiFormData.username" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="密码" required name="password">
						<uni-easyinput v-model="valiFormData.password" type="password" placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit('valiForm')">登录</button>
				<view class="register-btn">
					<view class="register-text">没有账号？</view>
					<view class="register-vbtn" @click="registerJump">直接注册</view>
				</view>
			</view>
		</view>
		<view v-if="log" >
			<view class="login">您好，{{ user }}</view>
			<view class="logout">
				<button class="logout-btn" type="primary" @click="logout">退出登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: true,
				register: false,
				user: sessionStorage.getItem('user'),
				// 校验表单数据
				valiFormData: {
					username: '',
					password: '',
				},
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
			}
		},
		computed: {
			log() {
				return !this.login && !this.register
			}
		},
		onLoad() {
			if(sessionStorage.getItem('user') && sessionStorage.getItem('token')) {
				this.login = false;
			}
		},
		onReady() {},
		methods: {
			submit(ref) {
				if(this.login) {
					this.$refs[ref].validate().then(result => {
						this.axios.post('/api/login', this.qs.stringify(result), {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
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
									sessionStorage.setItem('token', res?.data?.data?.token);
									sessionStorage.setItem('user', result?.username);
									this.user = result?.username;
									uni.showToast({
										title: `登录成功`
									})
									this.login = false;
									this.valiFormData = {
										username: '',
										password: '',
									};
								}
								//控制台打印请求成功时返回的数据
								//bind(this)可以不用
							}.bind(this))
							.catch(function(err) {
								if (err.response) {
									console.log(err.response)
									//控制台打印错误返回的内容
								}
								//bind(this)可以不用
							}.bind(this))
					}).catch(err => {
						console.log('err', err);
					})
				}
				if(this.register) {
					this.$refs[ref].validate().then(result => {
						this.axios.post('/api/registry', this.qs.stringify(result), {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								}
							})
							.then(function(res) {
								console.log(res.data)
								if (res?.data?.code !== 0 && res?.data) {
								  uni.showToast({
								  	title: `${res?.data?.data}`,
									icon: 'error'
								  })
								} else {
									uni.showToast({
										title: `注册成功`
									})
									this.valiFormData = {
										username: '',
										password: '',
									};
									this.register = false;
									this.login = true;
								}
								//控制台打印请求成功时返回的数据
								//bind(this)可以不用
							}.bind(this))
							.catch(function(err) {
								if (err.response) {
									console.log(err.response)
									//控制台打印错误返回的内容
								}
								//bind(this)可以不用
							}.bind(this))
					}).catch(err => {
						console.log('err', err);
					})
				}
			},
			logout() {
				sessionStorage.clear();
				this.login = true;
			},
			registerJump() {
				this.register = true;
				this.login = false;
			},
			loginJump() {
				this.register = false;
				this.login = true;
			}
			
		},
	}
</script>

<style lang="less">
	.example {
		width: 80%;
		margin: 0 auto;
	}
	.login {
		font-size: 40upx;
		text-align: center;
		margin: 40upx;
	}
	.logout {
		position: fixed;
		bottom: 200upx;
		width: 100%;
		padding: 0;
		.logout-btn {			
			width: 80%;
		}
	}
	.register-btn {
		display: flex;
		align-items: center;
		justify-content: space-between;	
		margin: 30upx;
	}
	.register-text {
		font-size: 40upx;
	}
	.register-vbtn {
		font-size: 40upx;
		color: blueviolet;
	}
</style>
