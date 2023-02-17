<template>
	<view class="content">
		<view class="wrap">
			<view class="top-column">
				<view class="nav"></view>
				<view class="title">
					<text>九宫格抽奖</text>
				</view>
			</view>
			<view class="wrap-luckDraw">
				<view class="box">
					<view class="item" v-for="(item,index) in data" :key='item.id'>
						<view class="box_item" :class="item.id===flag?'active':''" v-if="index===4"
							:style="{background: 'url('+startBtn+')',backgroundSize:'100% 100%',fontSize:'28rpx',alignItems: 'center'}"
							@click="item.id==0?start():''">
							{{item.name}}
						</view>
						<view class="box_item" :class="item.id===flag?'active':''" v-else
							@click="item.id==0?start():''">
							<image class="prizeIcon" :src="item.img"></image>
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<view class="luckdraw-num">
				已获得抽奖{{lotteryNumber}}次机会
			</view>
			<view class="gradualBg">
				<view class="footer">
					<view class="bgBox"></view>
				   <view class="copyright">活动底部</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		Luckdraw
	} from './utils/index.js'
	export default {
		props: {
			prizeList: {
				type: Array,
				default () {
					return ''
				},
			},
		},
		data() {
			return {
				startBtn:'../../static/luck_draw.png',
				data: [{
						id: 1,
						name: '',
						img:'',
					},
					{
						id: 2,
						name: ''
					},
					{
						id: 3,
						name: '',
						img:'',
					},
					{
						id: 8,
						name: '',
						img:'',
					},
					{
						id: 4,
						name: '',
						img:'',
					},

					{
						id: 7,
						name: '',
						img:'',
					},

					{
						id: 6,
						name: '',
						img:'',
					},

					{
						id: 5,
						name: '',
						img:'',
					},
				],
				flag: '', //中奖的编号
				time: 0, //旋转的值 
				isStart: false, //是否开始
				lotteryNumber: 10, //抽奖次数
				ratio: [],
				prizeStatus:0,//是否得奖
			}
		},
		created() {
			this.data.splice(4, 0, {
				id: 0,
				name: '开始'
			})
			let arr = this.prizeList;
			arr.forEach((item, index) => {
				this.data.forEach(item1 => {
					if (item1.id === item.sort) {
						item1.img = item.img;
						item1.name = item.name;
						return;
					}
				})
			})
			var ratioArr = [];
			arr.forEach((item, index) => {
				ratioArr.push(item.ratio)
			})
			this.ratio = ratioArr;
		},
		methods: {
			start() {
				if (this.isStart) return
				if (this.lotteryNumber <= 0) {
					uni.showToast({
						title: '次数已用完',
						icon: 'none',
						duration: 2000
					});
					return
				}
				this.lotteryNumber--
				this.isStart = true
				let ratio = this.ratio

				// 中奖概率构造函数
				let ld = new Luckdraw();
				//
				let flagNew = ld.random(ratio) //生成随机数
				var flag=0;
				for(var i=0;i<this.prizeList.length;i++){
					if(flagNew==this.prizeList[i].ratio){
						 flag=this.prizeList[i].sort;
					}else{
						continue;
					}
				}
				this.time = 6100 + (50 * flag)
				this.flag = 1
				this.fn(100)
			},
			
			fn() {
				let time = this.time
				let n = 50
				let Timeout = () => {
					setTimeout(() => {
						time = time - n
						if (time <= 5000 && time > 4000) {
							n = 90
						}
						if (time <= 4000 && time > 3000) {
							n = 100
						} else if (time <= 3000 && time > 2500) {
							n = 500
						} else if (time <= 2500 && time > 2000) {
							n = 800
						} else if (time <= 2000) {
							n = 1000
						}
						if (time <= 0) {
							if (this.flag) {
								let title = '';
								let flag=this.flag;
								let prizeList=this.prizeList;
								for(var i=0;i<prizeList.length;i++){
									if(flag==prizeList[i].sort){
										title=prizeList[i].name;
										break;
									}
								}
								uni.showToast({
									title: `恭喜您获得${title}`,
									icon: 'none',
									duration: 3500
								});
							} else {
								uni.showToast({
									title: '很遗憾没有中奖',
									icon: 'none',
									duration: 2000
								});
							}
							this.isStart = false
							return false
						}
						if (this.flag < 8) {
							this.flag++
						} else {
							this.flag = 1
						}
						Timeout()
					}, n)
				}
				Timeout()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		margin: 0px;
		padding: 0px;

		.wrap {
			width: 100%;
			height: 100vh;
			background-color: #DD524D;
			padding-bottom: 200rpx;
			.top-column {
				width: 100%;
				height: 0;
				padding-bottom:35%;

				.nav {
					width: 100%;
					height: 10rpx;
					display: block;
				}

				.title {
					width: 410rpx;
					height: 57rpx;
					margin: auto;
					margin-top: 10%;
					background: #FFAF46;
					box-shadow: 0px 3px 2px 0px rgba(172, 48, 3, 0.44);
					border-radius: 29rpx;
					text-align: center;
					line-height: 57rpx;
					color: #D33400;
				}
			}
			.wrap-luckDraw {
				width: auto;
				height: 580rpx;

				.box {
					width: 580rpx;
					height: 510rpx;
					display: flex;
					margin: auto;
					flex-wrap: wrap;
					justify-content: space-around;
					align-items: center;

					.box_item {
						width: 172rpx;
						height: 152rpx;
						background-color: #fff;
						display: flex;
						padding-bottom: 2rpx;
						color: #FF5118;
						//align-items: center;
						justify-content: center;
						border-radius: 28rpx;
						flex-wrap: wrap;
						font-size: 24rpx;
						text-align: center;

						.prizeIcon {
							width: 108rpx;
							height: 90rpx;
							margin: auto;
						}

						&:nth-child(5) {
							color: #fff;
						}
					}

					.active {
						background-color: rgba(0, 0, 0, .5);
					}
				}
			}

			.luckdraw-num {
				width: 459rpx;
				height: 72rpx;
				margin: 20rpx auto;
				background: #FA3E3F;
				border-radius: 10rpx;
				line-height: 72rpx;
				text-align: center;
				color: #fff;
			}
		}


		.footer{
			width: 100%;
			position: fixed;
			height: 84rpx;
			bottom: 0;
			.bgBox{
				
				height: 84rpx;
				background: rgba(255, 255, 255, 0.59);
				opacity: 0.2;
			}
			.copyright{
				width: 100%;
				position: absolute;
				text-align: center;
				line-height: 84rpx;
				left: 50%;   
			    transform: translate(-50%,-92rpx);  
				font-weight: 500;
				color:#FFDED4;
			}
		}

	}
</style>
