<template>
	<view>
		<view class="content">
			<view class="topSelect">
				<uni-search-bar class="topSearch" @confirm="search" :focus="true" v-model="searchValue" @input="input"
					@cancel="cancel" @clear="clear">
				</uni-search-bar>
				<button class="topBtn" @click="showPopView">筛选</button>
			</view>
			<filter-popup :data="filterData" :form.sync="filterForm" v-model="popup.filter" title="全部筛选"
				height="1104rpx" @finsh="subFinsh"></filter-popup>
		</view>
		<uni-section title="我的曾经" type="line">
			<view v-for="item in list">
				<uni-swipe-action>

					<uni-swipe-action-item @click="bindClick">
						<view class="content-box">
							<uni-card :title="item.food" :sub-title="item.whichTime" :extra="`次数:${item.times}次`"
								@click="onClick(item)">
								<view class="uni-list">
									<!-- <text>{{item.ifExpensive}}</text> -->
									<view>
										<text class="uni-sign" @click.stop="jumpSign('showRight', item)">打标签</text>
										<text v-if="item.ifExpensive" class="uni-delSign" @click.stop="deleteSign(item)">删除标签</text>
									</view>
									<view class="uni-body">
										<uni-tag type="success" :text="item.ifExpensive"></uni-tag>
									</view>
								</view>
							</uni-card>
						</view>
						<template v-slot:right>
							<view class="slot-button" @click="bindClick(item)"><text class="slot-button-text">删除</text>
							</view>
						</template>
					</uni-swipe-action-item>
				</uni-swipe-action>

			</view>
			<view v-show="showOther">
				<view class="noData">
					暂无数据
				</view>
			</view>
			<!-- <uni-list v-for="item in listCom"> -->
			<!-- <uni-list-item :title="item.food" :note="item.whichTime" :rightText="item.times" /> -->
			<!-- </uni-list> -->
		</uni-section>
		<uni-drawer ref="showRight" mode="right" :mask-click="true" @change="change($event, 'showRight')">
			<uni-section title="打标签" type="line">
				<view class="scroll-view">
					<scroll-view class="scroll-view-box" scroll-y="true">
						<uni-forms ref="valiForm" :rules="rules" :modelValue="baseFormData">
							<uni-forms-item label="标签" required name="ifExpensive">
								<uni-data-checkbox v-model="baseFormData.ifExpensive" :localdata="ifExpensiveData" />
							</uni-forms-item>
						</uni-forms>
						<view class="button-group">
							<button type="primary" class="btn-change"
								@click="submit('valiForm', 'showRight')">提交</button>
						</view>
						<!-- 					<view class="close">
						<button @click="closeDrawer('showRight')"><text class="word-btn-white">关闭Drawer</text></button>
					</view> -->
					</scroll-view>
				</view>
			</uni-section>
		</uni-drawer>
	</view>
</template>

<script>
import FilterPopup from "@/components/filter-popup/filter-popup";
export default {
	components: {
		FilterPopup,
	},
	data() {
		return {
			tagId: null,
			showRight: false,
			list: [

			],
			searchValue: '',
			//筛选表单数据
			filterData: [{
				options1: [{
					text: '取消置顶'
				}],
				options2: [{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				},
				{
					text: '确认',
					style: {
						backgroundColor: '#F56C6C'
					}
				}
				],
				children: false, //是否有子项
				title: "哪餐",
				key: "whichTime", //键名 接收对象名字
				keyValue: "value", //获取的值是哪个
				isRadio: true, //是否单选 否则多选
				data: [{
					title: "早餐",
					id: 1,
					value: "早餐",
				},
				{
					title: "午餐",
					id: 2,
					value: "午餐",
				},
				{
					title: "晚餐",
					id: 3,
					value: "晚餐",
				},
				{
					title: "全部",
					id: 4,
					value: "全部",
				},
				],
			},
			{
				children: false, //是否有子项
				title: "喜爱程度",
				key: "love", //键名 接收对象名字
				keyValue: "value", //获取的值是哪个
				isRadio: true, //是否单选 否则多选
				data: [{
					title: "不喜欢",
					value: "0",
				},
				{
					title: "一点点",
					value: "1",
				},
				{
					title: "一般",
					value: "2",
				},
				{
					title: "较喜欢",
					value: "3",
				},
				{
					title: "很喜欢",
					value: "4",
				},
				{
					title: "非常喜欢",
					value: "5",
				},
				],
			}
			], //筛选数据
			filterForm: {
				love: [undefined],
				whichTime: [undefined]
			}, //选中的表单
			popup: {
				filter: false
			},
			baseFormData: {
				ifExpensive: '',
			},
			ifExpensiveData: [{
				text: '很便宜',
				value: '很便宜'
			}, {
				text: '贵但可接受',
				value: '贵但可接受'
			}, {
				text: '便宜不想吃',
				value: '便宜不想吃'
			}, {
				text: '太贵',
				value: '太贵'
			}, {
				text: '下次一定',
				value: '下次一定'
			}],
			// 校验规则
			rules: {
				ifExpensive: {
					rules: [{
						required: true,
						errorMessage: '标签不能为空'
					}]
				},
			},
		};
	},
	onLoad() {
		// console.log(sessionStorage.getItem('user'))
	},
	onShow() {
		if (!uni.getStorageSync('token')) {
			this.list = [];
		}
		this.init();
	},
	computed: {
		showOther() {
			return this.list.length === 0 ? true : false
		}
	},
	methods: {
		init() {
			const result = {
				food: this.searchValue,
				whichTime: this.filterForm?.whichTime?.toString() || undefined,
				love: this.filterForm?.love?.toString() || undefined,
				username: uni.getStorageSync("user")
			}
			this.getMyWifeFood(result)
		},
		subFinsh(e) {
			console.log(e)
			this.popup.filter = false;
			const result = {
				food: this.searchValue,
				whichTime: e?.whichTime?.toString() || undefined,
				love: e?.love?.toString() || undefined,
				username: uni.getStorageSync("user")
			}
			this.getMyWifeFood(result)
			this.$emit('close');
		},
		showPopView() {
			this.popup.filter = true;
		},
		search(res) {
			console.log(this.filterForm)
			// uni.showToast({
			// 	title: '搜索：' + res.value,
			// 	icon: 'none'
			// })
			const result = {
				food: res.value,
				whichTime: this.filterForm?.whichTime?.toString() || undefined,
				love: this.filterForm?.love?.toString() || undefined,
				username: uni.getStorageSync("user")
			}
			this.getMyWifeFood(result)
		},
		getMyWifeFood(result) {
			// this.axios.post('/api/getMyWifeFood', this.qs.stringify(result), {
			// 		headers: {
			// 			'token':  uni.getStorageSync("token")
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
			// 			this.list = res?.data?.data
			// 			console.log(res?.data)
			// 		}
			// 		//控制台打印请求成功时返回的数据
			// 		//bind(this)可以不用
			// 	}.bind(this))
			// 	.catch(function(err) {
			// 		if (err.response) {
			// 			console.log(err.response)
			// 			this.list = [];
			// 			uni.showToast({
			// 				title: `${err?.response?.data?.message} 请检查登录信息`,
			// 				icon: 'error'
			// 			})
			// 			//控制台打印错误返回的内容
			// 		}
			// 		//bind(this)可以不用
			// 	}.bind(this))
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
						this.list = res?.data?.data
						console.log(res?.data)
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
		input(res) {
			this.searchValue = res;
			console.log('----input:', res)
		},
		clear(res) {
			const result = {
				food: '',
				whichTime: this.filterForm?.whichTime?.toString() || undefined,
				love: this.filterForm?.love?.toString() || undefined,
				username: uni.getStorageSync("user")
			}
			this.getMyWifeFood(result)
			// uni.showToast({
			// 	title: 'clear事件，清除值为：' + res.value,
			// 	icon: 'none'
			// })
		},
		// blur(res) {
		// 	uni.showToast({
		// 		title: 'blur事件，输入值为：' + res.value,
		// 		icon: 'none'
		// 	})
		// },
		// focus(e) {
		// 	uni.showToast({
		// 		title: 'focus事件，输出值为：' + e.value,
		// 		icon: 'none'
		// 	})
		// },
		cancel(res) {
			const result = {
				food: '',
				whichTime: this.filterForm?.whichTime?.toString() || undefined,
				love: this.filterForm?.love?.toString() || undefined,
				username: uni.getStorageSync("user")
			}
			this.getMyWifeFood(result)
			// uni.showToast({
			// 	title: '点击取消，输入值为：' + res.value,
			// 	icon: 'none'
			// })
		},
		onClick(e) {
			console.log(e)
			let url = '/pages/tabbar/food-detail/food-detail'
			console.log(e)
			uni.navigateTo({  
				url: `${url}?_id=${e._id}&food=${e.food}&times=${e.times}&love=${e.love}&user=${e.user}&whichTime=${e.whichTime}`
			}) 
			// this.$navTo.togo(url, e)
		},
		jumpSign(e, item) {
			console.log(item)
			this.$refs[e].open()
			this.tagId = item._id,
				this.baseFormData.ifExpensive = item?.ifExpensive || undefined
		},
		confirm() { },
		// 打开窗口
		// 关闭窗口
		closeDrawer(e) {
			this.$refs[e].close()
		},
		// 抽屉状态发生变化触发
		change(e, type) {
			this[type] = e
		},
		submit(ref, ref2) {
			this.$refs[ref].validate().then(res => {
				console.log('success', res, this.tagId);
				const data = {
					id: this.tagId,
					ifExpensive: res.ifExpensive,
				}
				// this.axios.post('/api/addTagIfExpensive', this.qs.stringify(data), {
				// 	headers: {
				// 		'token': uni.getStorageSync("token")
				// 	}
				// })
				// 	.then(function (res) {
				// 		if (res?.data?.code !== 0 && res?.data) {
				// 			uni.showToast({
				// 				title: `${res?.data?.message}`,
				// 				icon: 'error'
				// 			})
				// 		} else {
				// 			uni.showToast({
				// 				title: '打标签成功',
				// 			})
				// 			this.init()
				// 			setTimeout(() => {
				// 				this.closeDrawer(ref2)
				// 			}, 1000)
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
					url: host + "/addTagIfExpensive",
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
								title: '打标签成功',
							})
							this.init()
							setTimeout(() => {
								this.closeDrawer(ref2)
							}, 1000)
						}
					},
					fall: err => {

					}

				})
			}).catch(err => {
				console.log('err', err);
			})
		},
		deleteSign(item) {
			console.log(item)
			// this.axios.post('/api/deleteTag', this.qs.stringify({ id: item._id }), {
			// 	headers: {
			// 		'token': uni.getStorageSync("token")
			// 	}
			// })
			// 	.then(function (res) {
			// 		if (res?.data?.code !== 0 && res?.data) {
			// 			uni.showToast({
			// 				title: `${res?.data?.message}`,
			// 				icon: 'error'
			// 			})
			// 		} else {
			// 			uni.showToast({
			// 				title: '删除标签成功',
			// 			})
			// 			setTimeout(() => {
			// 				this.init()
			// 			}, 1000)
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
				url: host + "/deleteTag",
				method: 'POST',
				data: { id: item._id },
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
							title: '删除标签成功',
						})
						setTimeout(() => {
							this.init()
						}, 1000)
					}
				},
				fall: err => {

				}
			})
		},
		bindClick(e) {
			console.log(e);
			const host = getApp().globalData.host;
			uni.request({
				url: host + "/deleteMyWifeFood",
				method: 'POST',
				data: {
					id: e._id,
					username: e.user
				},
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
							title: '删除成功',
						})
						setTimeout(() => {
							this.init()
						}, 1000)
					}
				},
				fall: err => {

				}

			})
			// uni.showToast({
			// 	title: `点击了${e.position === 'left' ? '左侧' : '右侧'} ${e.content.text}按钮`,
			// 	icon: 'none'
			// });
		},
	},
	// app端拦截返回事件 ，仅app端生效
	onBackPress() {
		if (this.showRight) {
			this.$refs.showRight.close()
			return true
		}
	}

}
</script>

<style lang="less" scoped>
.content {
	text-align: center;
	/* height: 400upx; */
	/* margin-top: 200upx; */
}

.topSelect {
	display: flex;
	align-items: center;
}

.topBtn {
	height: 60upx;
	line-height: 60upx;
	background-color: #0066ff;
	color: #fff;
}

.noData {
	height: 200upx;
	border: 1px solid #efefef;
	margin: 40upx;
	background-color: #fff;
	justify-content: center;
	display: flex;
	align-items: center;
}

.uni-list {
	display: flex;
	justify-content: space-between;

	.uni-sign {
		color: blueviolet;
	}

	.uni-delSign {
		margin-left: 20upx;
		color: blueviolet;
	}
}

.scroll-view {
	flex: 1;
	align-items: center;
	justify-content: start;
	margin: 10upx 20upx 0upx;
}

.topSearch {
	width: 70%;
}

.content-box {
	flex: 1;
	/* #ifdef APP-NVUE */
	justify-content: center;
	/* #endif */
	// height: 44px;
	// line-height: 44px;
	position: relative;
	background-color: #fff;
	border-bottom-color: #f5f5f5;
	border-bottom-width: 1px;
	border-bottom-style: solid;
}

.content-text {
	font-size: 15px;
}

.example-body {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	justify-content: center;
	padding: 10px 0;
	background-color: #fff;
}

.button {
	border-color: #e5e5e5;
	border-style: solid;
	border-width: 1px;
	padding: 4px 8px;
	border-radius: 4px;
}

.button-text {
	font-size: 15px;
}

.slot-button {
	/* #ifndef APP-NVUE */
	display: flex;
	height: 100%;
	/* #endif */
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
	background-color: #ff5a5f;
}

.slot-button-text {
	color: #ffffff;
	font-size: 14px;
}

/deep/ .button-group--right[data-v-22750408] {
	margin: 30upx 0upx;
}
</style>
