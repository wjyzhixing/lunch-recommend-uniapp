<template>
    <view class="content">
        <view class="contentTT">
            随机输入选择吃什么？
        </view>
        <view class="contentTop">
            <text class="eatWhat">吃什么：</text>
            <uni-easyinput v-model="eatWhat" placeholder="请输入吃什么，用中文逗号隔开" />
        </view>
        <ljs-turntable :show="ljs_turntable_show" @getPrize="getPrize" @turntableState="turntableState" :list="list" ref="child" />
        <view>
			<image style="width: 100%; height: 650upx; background-color: #eeeeee;"
				src="@/static/img/eatwhat.jpeg"></image>
		</view>
        <button class="openBut" @click="open()">打开转盘</button>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                ljs_turntable_show: false,
                list: [],
                eatWhat: '',
            }
        },
        onLoad() {
            // 最少3个选项
            // 最大值：12份，
            // 最小值：1份，
            // 每份10度
            // this.list = [
            //     {
            //         name: "苹果手机",
            //         prop: 18,
            //         // state: true, // 是否中奖
            //         id: 1
            //     },
            //     {
            //         name: "Iphone 11",
            //         prop: 18,
            //         // state: true, // 是否中奖
            //         id: 2
            //     },
            //     // {
            //     //     name: "谢谢参与",
            //     //     prop: 12,
            //     //     // state: false, // 是否中奖
            //     //     id: 5
            //     // },
            //     // {
            //     //     name: "Iphone 8",
            //     //     prop: 6,
            //     //     // state: true, // 是否中奖
            //     //     id: 3
            //     // },
            //     // {
            //     //     name: "谢谢参与",
            //     //     prop: 6,
            //     //     // state: false, // 是否中奖
            //     //     id: 5
            //     // },
            //     // {
            //     //     name: "Iphone 7",
            //     //     prop: 6,
            //     //     // state: true, // 是否中奖
            //     //     id: 4
            //     // },
            //     // {
            //     //     name: "谢谢参与",
            //     //     prop: 9,
            //     //     // state: false, // 是否中奖
            //     //     id: 5
            //     // },
            // ];
        },
        methods: {
            // 打开转盘
            open(){
                this.list = [];
                let lt = [];
                const tp = this.eatWhat.split('，');
                tp.map((i,index) => {
                    lt.push({
                        name: i,
                        prop: 36 / tp.length,
                        // state: true, // 是否中奖
                        id: index
                    })
                })
                console.log(lt)
                this.list = lt;
                this.$refs.child.getList(lt);
                this.ljs_turntable_show = true;

            },
            // 回调，修改转盘的展示状态
            turntableState(val){
                this.ljs_turntable_show = val;
            },
            // 回调，转盘结果
            getPrize(state, id, prizeName){
                console.log(state, id, prizeName)
            },
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