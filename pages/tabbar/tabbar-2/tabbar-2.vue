<template>
	<view>
		<view class="content">
			<view class="topSelect">
				<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @input="input" @cancel="cancel"
					@clear="clear">
				</uni-search-bar>
				<button class="topBtn" @click="showPopView">筛选</button>
			</view>
			<filter-popup :data="filterData" :form.sync="filterForm" v-model="popup.filter" title="全部筛选"
				height="1104rpx" @finsh="subFinsh"></filter-popup>
		</view>
		<uni-section title="我的曾经" type="line">
			<view v-for="item in list">
				<uni-card :title="item.food" :sub-title="item.whichTime" :extra="item.ifExpensive"
					@click="onClick(item)">
					<text class="uni-body">次数:{{ item.times }}次</text>
				</uni-card>
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
				list: [

				],
				searchValue: '',
				//筛选表单数据
				filterData: [{
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
				}
			};
		},
		onLoad() {
			console.log(sessionStorage.getItem('user'))
		},
		onShow() {
			const result = {
				food: this.searchValue,
				whichTime: this.filterForm?.whichTime?.toString() || undefined,
				love: this.filterForm?.love?.toString() || undefined,
				username: sessionStorage.getItem('user')
			}
			this.getMyWifeFood(result)
		},
		computed: {
			showOther() {
				return this.list.length === 0 ? true : false
			}
		},
		methods: {
			subFinsh(e) {
				console.log(e)
				this.popup.filter = false;
				const result = {
					food: this.searchValue,
					whichTime: e?.whichTime?.toString() || undefined,
					love: e?.love?.toString() || undefined,
					username: sessionStorage.getItem('user')
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
					username: sessionStorage.getItem('user')
				}
				this.getMyWifeFood(result)
			},
			getMyWifeFood(result) {
				this.axios.post('/api/getMyWifeFood', this.qs.stringify(result), {
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
							this.list = res?.data?.data
							console.log(res?.data)
						}
						//控制台打印请求成功时返回的数据
						//bind(this)可以不用
					}.bind(this))
					.catch(function(err) {
						if (err.response) {
							console.log(err.response)
							this.list = [];
							uni.showToast({
								title: `${err?.response?.data?.message} 请检查登录信息`,
								icon: 'error'
							})
							//控制台打印错误返回的内容
						}
						//bind(this)可以不用
					}.bind(this))
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
					username: sessionStorage.getItem('user')
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
					username: sessionStorage.getItem('user')
				}
				this.getMyWifeFood(result)
				// uni.showToast({
				// 	title: '点击取消，输入值为：' + res.value,
				// 	icon: 'none'
				// })
			},
			onClick(e) {
				console.log(e)
				let url = '/pages/tabbar/tabbar-4/tabbar-4'
				console.log(this.$navTo)
				this.$navTo.togo(url, e)
			}
		},
		onBackPress() {
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
		},

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
</style>
