<script>
export default {
	globalData: {
		    token: '',
			user: '',
			host: 'http://43.143.38.230:7001',
			// host: '/api',
	},
	onLaunch: function() {
		console.log('App Launch');

		setTimeout(() => {
			// uni.setTabBarBadge({
			// 	index: 1,
			// 	text: '31'
			// });
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */ 
</style>
