<template>
	<view>
		<view class="contentTop">
		    <text class="eatWhat">您的问题：</text>
		    <uni-easyinput v-model="eatWhat" placeholder="请输入您的问题" />
		</view>
		<view>
			<button class="btn" type="primary" @click="submit()">查询</button>
		
		</view>
		<view class="contentTT">{{ result }}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				eatWhat: '',
				result: ''
			}
		},
		methods: {
			submit() {
				const host = getApp().globalData.host;
			
				uni.request({
					url: host + "/chatgpt",
					method: 'POST',
					data: {
						text: this.eatWhat,
					},
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
							this.result = res?.data?.data?.msg
						}
					},
					fall: e => {
						console.log(e)
					}
				})
			}
		}
	}
</script>

<style lang="less">
    .openBut{
        margin: 20upx auto;
        background-color: #007AFF;
        color: #FFF;
        width: 90%;
        // height: 60upx;
        // line-height: 60upx;
        text-align: center;
        border-radius: 10upx;
        // position: fixed;
        // bottom: 80upx;
        text-align: center;
    }
	.btn {
		margin: 0 30upx;
	}
    .contentTop {
        margin: 30upx;
        display: flex;
        align-content: center;

        .eatWhat {
            display: flex;
            align-content: center;
            margin: auto;
        }
    }
    .contentTT {
        margin: 30upx 30upx;
        display: flex;
        align-content: center;
        justify-content: center;
        font-size: 40upx;
    }
</style>
