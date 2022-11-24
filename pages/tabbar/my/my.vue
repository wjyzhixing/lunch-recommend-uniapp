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
		<view v-if="log">
			<view class="login2">
				<view>您好，{{ user }}</view>
				<view>
					<view>
						<image @click="jumpChange" class="box-image" style="height:30upx"
							src="../../../static/img/setting.png" mode="aspectFit"></image>
						<image @click="logout" class="box-image" style="height:30upx" src="../../../static/img/logout.png"
							mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="my-all">食品排名Top5</view>
			<view class="todayCar2">
				<qiun-data-charts class="charts" type="column" :opts="opts2" :chartData="chartData2" />
			</view>
			<view class="my-all">整体展示</view>
			<view class="my-all">
				<uni-tag class="my-tag" text="早餐" type="primary" @click="bkfilter('早餐')" />
				<uni-tag class="my-tag" text="午餐" type="primary" @click="bkfilter('午餐')" />
				<uni-tag class="my-tag" text="晚餐" type="primary" @click="bkfilter('晚餐')" />
				<uni-tag class="my-tag" text="全部" type="primary" @click="bkfilter(null)" />
			</view>
			<view class="todayCar">
				<qiun-data-charts class="charts" type="pie" :opts="opts" :chartData="chartData" />
			</view>
			<view class="recommend-btn">
				<view class="recommend-text">推荐不合理？</view>
				<view class="recommend-vbtn" @click="random">试试随机一个！</view>
			</view>
			<!-- <view>
				<button @click="share">点我微信分享</button>
			</view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			login: true,
			register: false,
			user: uni.getStorageSync("user"),
			list: [],
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
			opts: {
				color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
				padding: [5, 5, 5, 5],
				extra: {
					pie: {
						activeOpacity: 0.5,
						activeRadius: 10,
						offsetAngle: 0,
						labelWidth: 15,
						border: false,
						borderWidth: 3,
						borderColor: "#FFFFFF"
					}
				},
				legend: {
					"show": true,
					"position": "right",
					"float": "center",
					"padding": 5,
					"margin": 5,
					"backgroundColor": "rgba(0,0,0,0)",
					"borderColor": "rgba(0,0,0,0)",
					"borderWidth": 0,
					// "fontSize": 12,
					"fontColor": "#999999",
					"lineHeight": 4,
					"hiddenColor": "#CECECE",
					"itemGap": 1,
				},
			},
			chartData: {},
			opts2: {
				color: ["#FAC858", "#EE6666", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
				padding: [15, 15, 0, 5],
				legend: {},
				xAxis: {
					disableGrid: true
				},
				yAxis: {
					data: [
						{
							min: 0
						}
					]
				},
				extra: {
					column: {
						type: "group",
						width: 30,
						activeBgColor: "#000000",
						activeBgOpacity: 0.08,
						linearType: "custom",
						seriesGap: 5,
						linearOpacity: 0.5,
						barBorderCircle: true,
						customColor: [
							"#FA7D8D",
							"#EB88E2"
						]
					}
				}
			},
			chartData2: {},
		}
	},
	computed: {
		log() {
			return !this.login && !this.register
		}
	},
	onLoad() {
		if (uni.getStorageSync("user") && uni.getStorageSync("token")) {
			this.login = false;
		}
	},
	// onReady() {
	// 	if (uni.getStorageSync("user") && uni.getStorageSync("token")) {
	// 		this.getServerData();
	// 	}
	// },
	onShow() {
		if (uni.getStorageSync("user") && uni.getStorageSync("token")) {
			this.getServerData();
		}
	},
	methods: {
		submit(ref) {
			if (this.login) {
				this.$refs[ref].validate().then(result => {
					// this.axios.post('/api/login', this.qs.stringify(result), {
					// 	headers: {
					// 		'Content-Type': 'application/x-www-form-urlencoded'
					// 	}
					// })
					// 	.then(function (res) {
					// 		console.log(res.data)
					// 		if (res?.data?.code !== 0 && res?.data) {
					// 			uni.showToast({
					// 				title: `${res?.data?.message}`,
					// 				icon: 'error'
					// 			})
					// 		} else {
					// 			uni.setStorageSync('token', res?.data?.data?.token);
					// 			uni.setStorageSync('user', result?.username);
					// 			this.user = result?.username;
					// 			uni.showToast({
					// 				title: `登录成功`
					// 			})
					// 			this.login = false;
					// 			this.valiFormData = {
					// 				username: '',
					// 				password: '',
					// 			};
					// 		}
					// 		//控制台打印请求成功时返回的数据
					// 		//bind(this)可以不用
					// 	}.bind(this))
					// 	.catch(function (err) {
					// 		if (err.response) {
					// 			console.log(err.response)
					// 			//控制台打印错误返回的内容
					// 		}
					// 		//bind(this)可以不用
					// 	}.bind(this))
					const host = getApp().globalData.host;
					uni.request({
						url: host + "/login",
						method: 'POST',
						data: result,
						header: {
							"Content-Type": "application/x-www-form-urlencoded",
						},
						success: (res) => {
							console.log(res)
							if (res?.data?.code !== 0 && res?.data) {
								uni.showToast({
									title: `${res?.data?.message}`,
									icon: 'none'
								})
							} else {
								uni.setStorageSync('token', res?.data?.data?.token);
								uni.setStorageSync('user', result?.username);
								uni.setStorageSync('id', res?.data?.data?.id)
								this.user = result?.username;
								this.getServerData(result?.username);
								uni.showToast({
									title: `登录成功`
								})
								this.login = false;
								this.valiFormData = {
									username: '',
									password: '',
								};
							}
						},
						fall: e => {
							console.log(e)
						}
					})
				}).catch(err => {
					console.log('err', err);
				})
			}
			if (this.register) {
				this.$refs[ref].validate().then(result => {
					// this.axios.post('/api/registry', this.qs.stringify(result), {
					// 	headers: {
					// 		'Content-Type': 'application/x-www-form-urlencoded'
					// 	}
					// })
					// 	.then(function (res) {
					// 		console.log(res.data)
					// 		if (res?.data?.code !== 0 && res?.data) {
					// 			uni.showToast({
					// 				title: `${res?.data?.data}`,
					// 				icon: 'error'
					// 			})
					// 		} else {
					// 			uni.showToast({
					// 				title: `注册成功`
					// 			})
					// 			this.valiFormData = {
					// 				username: '',
					// 				password: '',
					// 			};
					// 			this.register = false;
					// 			this.login = true;
					// 		}
					// 		//控制台打印请求成功时返回的数据
					// 		//bind(this)可以不用
					// 	}.bind(this))
					// 	.catch(function (err) {
					// 		if (err.response) {
					// 			console.log(err.response)
					// 			//控制台打印错误返回的内容
					// 		}
					// 		//bind(this)可以不用
					// 	}.bind(this))

					const host = getApp().globalData.host;
					uni.request({
						url: host + "/registry",
						method: 'POST',
						data: result,
						header: {
							"Content-Type": "application/x-www-form-urlencoded",
						},
						success: (res) => {
							console.log(res)
							if (res?.data?.code !== 0 && res?.data) {
								uni.showToast({
									title: `${res?.data?.data}`,
									icon: 'none'
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
						},
						fall: e => {
							console.log(e)
						}
					})
				}).catch(err => {
					console.log('err', err);
				})
			}
		},
		logout() {
			// uni.Stro
			// sessionStorage.clear();
			this.chartData = {};
			this.chartData2 = {};
			uni.setStorageSync("user", undefined);
			uni.setStorageSync("token", undefined);
			this.login = true;
		},
		registerJump() {
			this.register = true;
			this.login = false;
		},
		loginJump() {
			this.register = false;
			this.login = true;
		},
		getServerData(user) {
			//模拟从服务器获取数据时的延时
			const result = {
				food: '',
				username: user || uni.getStorageSync("user")
			}
			this.getMyWifeFood(result)
		},
		bkfilter(time) {
			let res = []
			if (time) {
				res = this.list.filter(i => {
					if (i.whichTime === time || i.whichTime === '全部') {
						return i
					}
				}).map(i => {
					return { name: i.food, value: i.times }
				})
				console.log(res)
			} else {
				res = this.list.map(i => {
					return {
						name: i.food,
						value: i.times
					}
				})
			}
			res = res.filter(i => i.value !== 0)
			const chart = {
				series: [
					{
						data: res
					}
				]
			}
			console.log(chart)
			this.chartData = JSON.parse(JSON.stringify(chart));
		},
		getMyWifeFood(result) {
			const host = getApp().globalData.host;
			uni.request({
				url: host + "/getMyWifeFood",
				method: 'POST',
				data: result,
				header: {
					'token': uni.getStorageSync("token")
				},
				success: (res) => {
					console.log(res.data)
					if (res?.data?.code !== 0 && res?.data) {
						uni.showToast({
							title: `${res?.data?.message}`,
							icon: 'none'
						})
					} else {
						const list = res?.data?.data
						let temp = list.map(i => {
							return {
								name: i.food,
								value: i.times
							}
						})
						this.list = list;
						temp = temp.filter(i => i.value !== 0)
						const chart = {
							series: [
								{
									data: temp
								}
							]
						}
						console.log(chart)
						this.chartData = JSON.parse(JSON.stringify(chart));
						const tp2 = temp.sort((a, b) => b.value - a.value).slice(0, 5)
						let res2 = {
							categories: tp2.map(i => i.name),
							series: [
								{
									name: "次数",
									data: tp2.map(i => i.value)
								}
							]
						};
						this.chartData2 = JSON.parse(JSON.stringify(res2));
					}
				},
				fall: err => {
					if (err.response) {
						console.log(err.response)
						this.list = [];
						uni.showToast({
							title: `${err?.response?.data?.message} 请检查登录信息`,
							icon: 'none'
						})
						//控制台打印错误返回的内容
					}
				}
			})
		},
		share() {
			uni.share({
				provider: "weixin",
				scene: "WXSceneSession",
				type: 0,
				href: "https://cn.bing.com/images/search?q=%e5%a5%b6%e8%8c%b6&form=HDRSC2&first=1&tsc=ImageHoverTitle",    // 分享跳转的链接
				title: "微信分享",    // 分享标题
				summary: "微信分享示例",    // 分享内容文字
				imageUrl: "https://tse4-mm.cn.bing.net/th/id/OIP-C.4dMFZeNZTSghjY1RpuOqlgHaLH?w=182&h=273&c=7&r=0&o=5&dpr=1.25&pid=1.7",    //分享封面图片
				success: function (res) {
					// 此处是调起微信分享成功的回调
				},
				fail: function (err) {
					// 此处是调起微信分享失败的回调
				}
			});
		},
		jumpChange() {
			uni.navigateTo({
				url: '/pages/tabbar/personInfo-change/personInfo-change'
			})
		},
		random() {
			console.log(this.list)
			const result = this.list[this.rand(0, this.list.length || 0) || 0].food;
			console.log(result)
			uni.showToast({
				title: `今天推荐吃${result || '鸡腿'}！`,
				icon: 'none'
			})
		},
		rand(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
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
	justify-content: space-between;
	text-align: center;
	margin: 40upx;
}

.login2 {
	font-size: 40upx;
	justify-content: space-between;
	// text-align: center;
	margin: 40upx 40upx 20upx 20upx;
	display: flex;
	align-items: center;

	.box-image {
		width: 40upx;
	}
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

.my-all {
	margin: 20upx;
	color: blueviolet;
}

.my-tag {
	margin-right: 10upx;
}

.todayCar {
	height: 600upx;
}

.todayCar2 {
	height: 400upx;
}

.recommend-btn {
	display: flex;
	align-items: center;
	justify-content: end;
	margin: 0upx 30upx 150upx;
}

.recommend-text {
	font-size: 30upx;
	margin-right: 30upx;
}

.recommend-vbtn {
	font-size: 30upx;
	color: blueviolet;
}
</style>
