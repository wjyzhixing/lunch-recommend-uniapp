
export class Luckdraw {

	
	/**
	 * 随机开奖数
	 * @returns  
	 */
	random(ratio) {
		let sum = 0;
		for (let i = 0; i < ratio.length; i++) {
			sum += ratio[i];
		}
		var ratioArray = ratio;
		ratioArray.sort(function(a, b){return a - b});
		let r = Math.ceil(Math.random() * sum);
		var finds = this.findCloseNum(ratioArray, r);
		var find = 0;
		for (let i = 0; i < ratioArray.length; i++) {
			if(ratioArray[i]==0){
				continue;
			}else{
			 if (r-finds<=finds && finds <= ratioArray[i]) {
			 	find = ratioArray[i];
			 	return find;
			 } else if (i == ratioArray.length - 1) {
			 	find = ratioArray[i];
			 	return find;
			 }	
			}
		}
		return false;
	}
	
	/**
	 * 目标函数最相近的数值
	 * @param {Object} arr
	 * @param {Object} num
	 */
	findCloseNum(arr, num) {
		var index = 0; // 保存最接近数值在数组中的索引
		var d_value = Number.MAX_VALUE; // 保存差值绝对值，默认为最大数值
		for (var i = 0; i < arr.length; i++) {
			var new_d_value = Math.abs(arr[i] - num); // 新差值
			if (new_d_value <= d_value) { 
				if (new_d_value === d_value && arr[i] < arr[index]) { 
					continue;
				}
				index = i;
				d_value = new_d_value;
			}
		}
		return arr[index] // 返回最接近的数值
	}
}
