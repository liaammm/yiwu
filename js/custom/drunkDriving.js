$(document).ready(function() {
	var INTERV = 1000 * 10
	var complexEchart = {
		cqsj: null,
		lhysj1: null,
		lhysj2: null,
		rhsjfx1: null,
		rhsjfx2: null
	}

	function initEcharts() {
		// 吹气数据
		complexEchart.cqsj = new Echarts_base({
			id: 'cqsj',
			chartOption: $.deepclone(option.cqsj), //option来源 option.js
			animal : {
				open : true,
				time : 3000,
				type : "common"
			},
			openFlashData: false,  // 是否开启自动刷新数据，默认关闭
			flushTime: 60,   // 自动刷新数据的时间（单位：s），默认30s刷新数据
			flushData: function() {
				var _this = this;
				request('/drunkDriving/cqsjEchart', function(data) {
					if (data) {
						_this.showLoading();
						_this.chartOption.dataset.source = data;

						$('.cqsj-legend').empty();
						var _cqsjHtml = '';
						$.each(data, function(index, item){
							_cqsjHtml += '<div class="cqsj-legend-list">'+
												'<i class="cqsj-legend-icon" style="background-color:' + cqsjColor[index] + '"></i>'+
												'<span class="cqsj-legend-name">' + item.name + '</span>'+
												'<div class="cqsj-legend-val" style="color:' + cqsjColor[index] + '">'+
													'<span>' + item.value + '</span>'+
													'<span>起</span>'+
												'</div>'+
											'</div>';
						})
						$('.cqsj-legend').append(_cqsjHtml);
						_this.chart.setOption(_this.chartOption, true);
						_this.hideLoading();
					}
				})
			}
		})
		complexEchart.cqsj.init();

		// 六合一数据--驾驶
		complexEchart.lhysj1 = new Echarts_base({
			id: 'lhysj1',
			chartOption: $.deepclone(option.lhysj), //option来源 option.js
			flushData: function() {
				var _this = this;
				request('/drunkDriving/lhysjEchart1', function(data) {
					if (data) {
						_this.showLoading();
						var _per1 = (data[0].value/(data[0].value + data[1].value) * 100).toFixed(2)
						_this.chartOption.series[0].data[0].value = _per1;
						_this.chartOption.series[0].data[1].value = (100 - _per1).toFixed(2);

						_this.chartOption.series[1].data[0].value = (100 - _per1).toFixed(2);
						_this.chartOption.series[1].data[1].value = _per1;

						_this.chartOption.series[0].data[0].itemStyle = linearGradient[0];
						_this.chartOption.series[1].data[0].itemStyle = linearGradient[1];

						$('.lhysj-content .legend1').empty();
						var _html = '';
						$.each(data, function(index, item){
							_html += '<div>'+
											'<i style="background-color:' + linearGradientIcon[index] + '"></i>'+
											'<span>' + item.name + '</span>'+
											'<span style="color:' + linearGradientIcon[index] + '">1237起</span>'+
										'</div>';
						})
						$('.lhysj-content .legend1').append(_html);
						_this.chart.setOption(_this.chartOption, true);
						_this.hideLoading();
					}
				})
			}
		})
		complexEchart.lhysj1.init();

		// 六合一数据--裁决
		complexEchart.lhysj2 = new Echarts_base({
			id: 'lhysj2',
			chartOption: $.deepclone(option.lhysj), //option来源 option.js
			flushData: function() {
				var _this = this;
				request('/drunkDriving/lhysjEchart2', function(data) {
					if (data) {
						_this.showLoading();
						var _per1 = (data[0].value/(data[0].value + data[1].value) * 100).toFixed(2)
						_this.chartOption.series[0].data[0].value = _per1;
						_this.chartOption.series[0].data[1].value = (100 - _per1).toFixed(2);

						_this.chartOption.series[1].data[0].value = (100 - _per1).toFixed(2);
						_this.chartOption.series[1].data[1].value = _per1;

						_this.chartOption.series[0].data[0].itemStyle = linearGradient[2];
						_this.chartOption.series[1].data[0].itemStyle = linearGradient[3];

						$('.lhysj-content .legend2').empty();
						var _html = '';
						$.each(data, function(index, item){
							_html += '<div>'+
											'<i style="background-color:' + linearGradientIcon[index + 2] + '"></i>'+
											'<span>' + item.name + '</span>'+
											'<span style="color:' + linearGradientIcon[index + 2] + '">1237起</span>'+
										'</div>';
						})
						$('.lhysj-content .legend2').append(_html);

						_this.chart.setOption(_this.chartOption, true);
						_this.hideLoading();
					}
				})
			}
		})
		complexEchart.lhysj2.init();

		// 融合数据-已匹配
		complexEchart.rhsjfx1 = new Echarts_base({
			id: 'rhsjfx1',
			chartOption: $.deepclone(option.rhsjfx), //option来源 option.js
			flushData: function() {
				var _this = this;
			}
		})
		complexEchart.rhsjfx1.init();

		// 融合数据-未匹配
		complexEchart.rhsjfx2 = new Echarts_base({
			id: 'rhsjfx2',
			chartOption: $.deepclone(option.rhsjfx), //option来源 option.js
			flushData: function() {
				var _this = this;
			}
		})
		complexEchart.rhsjfx2.init();

	}

	function initEvent() {
		// 时间插件初始化
		jeDate("#date-range",{
			theme:{ bgcolor:"#0785d6",color:"#fff", pnColor:"#d8d8d8"},
			isinitVal:true,
			initDate:[{YYYY:2019,MM:05,DD:05}, false],
			range:"\t到\t",
			isClear:false,
			// onClose:false, // 选中后关闭
			// minDate:'1970-01-01',
			// maxDate:'2019-12-31',
			format: 'YYYY-MM-DD'
		});
		$('#date-range').val('2019-07-12\t到\t2019-07-23')
		
		$('select').selectMatch();

		// $('select').selectByIndex(0);
        // $('select#dd, select#zhd').selectByIndex(3);
        // $('#zd, #dd').trigger('change');
        // $('select#dd, select#zhd').addClass('disabled');

	}

	var RestfulUtil = {
		// 最易发生警情地点数据填充
		getAccidentInfo: function() {
			var _this = this
			request('/accident/query', function(data) {
				var _htl = '';
				$.each(data, function(idx, item){
					_htl += '<div class="police-location">'+
					'<span>' + (idx + 1) + '.' + item.name + '</span>'+
					'<span>' + item.value + '</span>'+
					'</div>'
				})
				$('.zyfsjqdd .ui-card-content').empty();
				$('.zyfsjqdd .ui-card-content').append(_htl);
			})
		}
	}

	function fetchData() {
		RestfulUtil.getAccidentInfo();
	}

	function init() {
		// 初始化相关图表
		initEcharts()

		// 初始化事件
		initEvent()

		// 启动轮训查询数据
		fetchData()
		setInterval(function() {
			// fetchData()
		}, INTERV)

	}

	init()
})
