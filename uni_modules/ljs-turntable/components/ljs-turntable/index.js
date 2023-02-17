
export default {
	data() {
		return {
			truntableData: [], // 转盘数据
			color: ["#014EB5","#A800FF","#e82edb","#B5454C","#443bff","#e8a425","#ff7aab","#e84b1e","#552ce2","#e8861e","#d441ff","#9c7aff","#014EB5","#A800FF","#e82edb","#B5454C","#443bff","#e8a425","#ff7aab","#e84b1e","#552ce2","#e8861e","#d441ff","#9c7aff","#014EB5","#A800FF","#e82edb","#B5454C","#443bff","#e8a425","#ff7aab","#e84b1e","#552ce2","#e8861e","#d441ff","#9c7aff","#014EB5","#A800FF","#e82edb","#B5454C","#443bff","#e8a425","#ff7aab","#e84b1e","#552ce2","#e8861e","#d441ff","#9c7aff","#014EB5","#A800FF","#e82edb","#B5454C","#443bff","#e8a425","#ff7aab","#e84b1e","#552ce2","#e8861e","#d441ff","#9c7aff","#014EB5","#A800FF","#e82edb","#B5454C","#443bff","#e8a425","#ff7aab","#e84b1e","#552ce2","#e8861e","#d441ff","#9c7aff"],
			timerRun: false, // 游戏是否已开始
			transform: null, 
		}
	},
	props: {
		list: Array, // 转盘基础数据
		show: Boolean, // 显示组件：默认不显示
		// showModel: Boolean, // 显示模式：弹窗（默认），正常
	},
	mounted() {
		this.init([]);
	},
	methods: {
		// 隐藏组件
		close(){
			// if(this.timerRun){
			// 	uni.showToast({
			// 		title: '请耐心等待',
			// 		duration: 1500,
			// 		icon: "none"
			// 	});
			// 	return
			// }
			this.$emit("turntableState", false);
		},
		getList(lt) {
			console.log(lt)
			this.truntableData = lt
			this.list = lt;
			this.init(lt)
		},
		// 点击开始按钮
		go(){
			// this.init()
			if(this.timerRun){
				uni.showToast({
					title: '请耐心等待',
					duration: 1500,
					icon: "none"
				});
				return
			}
			this.timerRun = true;
			let power = Math.floor(Math.random()*100 + 1); //随机获取一个力量值
			let jiaodu = 0; // 旋转的角度
			let decline = 0.01; // 衰退
			let timer = setInterval(()=>{
				if(Number(power.toFixed(2)) <= 0){
					clearInterval(timer);
					this.getData(jiaodu%360);
				}
				jiaodu += power;
				// #ifdef H5
				document.getElementById("rotateBoard").style.transform = 'rotate('+ jiaodu +'deg)';
				// #endif
				// #ifdef MP-WEIXIN || APP-PLUS
				this.transform = 'rotate('+ jiaodu +'deg)'
				// #endif
				
				power = (power - power*decline) < decline?0:power - power*decline;
			},10)
		},
		// 通过旋转得角度，获取当前指向得奖品
		getData(deg){
			let _this = this;
			deg = 360 - deg;
			let prize = null;
			let nums = this.list.length;
			for(let i = 0; i < nums; i++){
				if(this.list[i].start <= deg && deg < this.list[i].start + this.list[i].prop*10){
					prize = this.list[i];
					
					// if(prize.state){
					// 	this.$emit("getPrize", prize.state, prize.id, prize.name)
					// }else{
					// 	this.$emit("getPrize", prize.state, null, "很遗憾")
					// }
					
					uni.showModal({
						// title: prize.state?'恭喜您':'很遗憾',
						// title: ''
						content: '今天吃' + prize.name,
						// content: prize.state?'恭喜您，获得：'+prize.name+'！':'很抱歉，要继续努力哟~',
						showCancel: false,
						success: function (res) {
							if (res.confirm) {
								// #ifdef H5
								document.getElementById("rotateBoard").style.transform = 'rotate('+ 0 +'deg)';
								// #endif
								// #ifdef MP-WEIXIN || APP-PLUS
								_this.transform = 'rotate('+ 0 +'deg)'
								// #endif
								_this.timerRun = false;
							}
						}
					});
					break;
				}
			}
			
		},
		init(lt){
			let tempStart = 0;
			let tempScale = 0;
			lt.forEach((item, i)=>{
				item["scale"] = item.prop*10 - 90; // 所占弧度的度数
				item["scaleText"] = tempScale + (90 + (item.prop*10 - 90))/2; // 文字的回旋角度
				item["sin"] = Math.sin(Math.PI*2*item.scaleText/360)*160; // 正弦
				item["cos"] = Math.cos(Math.PI*2*item.scaleText/360)*160; // 余弦
				tempScale = tempScale + 90 + (item.prop*10 - 90);
				if(i !== 0){
					tempStart = tempStart + lt[i - 1].prop*10;
				}
				item["start"] = tempStart;
			});
			// console.log(this.list)
			this.truntableData = lt;
		},
	},
}