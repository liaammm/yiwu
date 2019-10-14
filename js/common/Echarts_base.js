/**
 *    可编辑内容窗口    （基础类）
 */
function Echarts_base(option) {
	/**
     图标类型数据字典项     只影响设置数据
     type:{
			//折线
			line:{
				
			},
			//柱状		
			bar	:{
				
			},
			//饼图
			pie	:{
				
			}	
		}
     */

	this.id = option.id //DIV的id
	this.openFlashData = option.openFlashData == undefined ? false : option.openFlashData  // 是否开启自动刷新数据，默认关闭
	this.flushTime = option.flushTime == undefined ? 30 : option.flushTime  // 自动刷新数据的时间（单位：s），默认30s刷新数据

	//图表类型
	this.type = option.type == undefined ? 'default1' : option.type
	//图标小类
	this.subType = option.subType == undefined ? 'default1' : option.subType
	/*	元素
	 */
	this.chart
	//echarts 的option
	this.chartOption = option.chartOption == undefined ? {} : option.chartOption
	//数据刷新定时器句柄
	this.dataInterval
	this.animal =
		option.animal == undefined
			? {
					open: false,
					time: 1000,
					type: 'common'
			  }
			: option.animal
	//刷新数据
	this.flushData = option.flushData == undefined ? function() {} : option.flushData;
	/*	设置周期刷新数据	（内部方法）
	 */
	(this.setflushData = function(isOpen, cycle) {
		var _this = this
		if (isOpen) {
			this.dataInterval = window.setInterval(
				function() {
					this.flushData(false)
				}.bind(this),
				parseInt(cycle) * 1000
			)
		} else {
			window.clearInterval(this.dataInterval)
		}
	}),
		/*	生成对应html		（内部方法）
		 */
		(this.createDiv = function() {
			var parent = $('#' + this.id)
			parent.addClass('echarts_base')
			parent.empty()
		}),
		/*	初始化事件		（内部方法）
		 */
		(this.initEvent = function() {
			var _this = this
			$('#' + this.id).resize(function() {
				//修改大小
				_this.resizeChart()
			})
			this.initChart()

			if (this.animal.open) {
				this.animalEvent()
			}
		}),
		/**    删除自身div        （外部方法）
	 用于删除按钮或快捷键删除联动
	 */
		(this.del = function() {
			this.setflushData(false)
			$('#' + this.id).remove()
			this.chart.del()
		}),
		/**    初始化    （外部方法）
	 主要初始化方法
	 */
		(this.init = function() {
			if ($('#' + this.id).length === 0 ) return;
			this.createDiv()
			this.initEvent()
		}),

        /**
		 * 加载遮罩层
		 * 数据加载前，echarts对象调用该方法，显示加载中遮罩层
		 * @param {Object} obj 遮罩层样式
         */
        (this.showLoading = function(obj) {
        	obj = obj ? obj : {
                text: '',
                // color: '#c23531',
                color: '#2486ff',
                textColor: '#fff',
                maskColor: 'rgba(30, 57, 108, 0.7)',
                // maskColor: 'rgba(255, 255, 255, 0.12)',
                // maskColor: 'rgba(15, 35, 57, 0.22)',
                zlevel: 2
            }
            this.chart.showLoading(obj)
        }),

        /**
         * 隐藏遮罩层
         * 数据加载完毕，echarts对象调用该方法，隐藏加载中遮罩层
         */
        (this.hideLoading = function() {
            this.chart.hideLoading()
        }),
		/*	初始化图表		（内部方法）	（需重写）
		 */
		(this.initChart = function() {
			if (this.chart == undefined) {
				this.chart = echarts.init(document.getElementById(this.id))
			}
			this.chart.setOption(this.chartOption, true, true)
			this.resizeChart()
			this.flushData(true)
			this.setflushData(this.openFlashData, this.flushTime)
		}),
		/*	重新绘制大小		（内部方法）	（需重写）
	 用于容器大小改变时做自适应
	 */
		(this.resizeChart = function() {
			if (this.resizeChartEvent[this.type]==null) {
				this.resizeChartEvent["default1"]();
			}
			else {
				this.resizeChartEvent[this.type]();
			}
		}),
		/**
	 根据类型编写对应的resizeChart事件
	 */
		(this.resizeChartEvent = {
			//横向柱状图
			jiechujing: function() {
				var width = $('#' + this.id).width(),
					height = $('#' + this.id).height()
				/**修改
				360 * 220	
				xAxis.axisLabel.fontSize	12
				yAxis.axisLabel.fontSize	12
				legend.textStyle.fontSize	12
				series[].barWidth			10
				grid.bottom					70
				低于 0.8  高于 0.8开始变化
			*/
				var standardW = 360,
					standardH = 220,
					proportionMin = 0.8,
					proportionMax = 1.2,
					standardFontSize = 12,
					standardBarW = 10,
					standardGridBottom = 50;
				if (width > standardW * proportionMax) {
					this.chartOption.xAxis.axisLabel.fontSize = (standardFontSize / standardW) * proportionMax * width
					this.chartOption.yAxis.axisLabel.fontSize = (standardFontSize / standardW) * proportionMax * width
					this.chartOption.legend.textStyle.fontSize = (standardFontSize / standardW) * proportionMax * width
					for (var i = 0, len = this.chartOption.series.length; i < len; i++) {
						this.chartOption.series[i].barWidth = (standardBarW / standardW) * proportionMax * width
					}
				} else if (width < standardW * proportionMin) {
					this.chartOption.xAxis.axisLabel.fontSize = (standardFontSize / standardW) * proportionMin * width
					this.chartOption.yAxis.axisLabel.fontSize = (standardFontSize / standardW) * proportionMin * width
					this.chartOption.legend.textStyle.fontSize = (standardFontSize / standardW) * proportionMin * width
					for (var i = 0, len = this.chartOption.series.length; i < len; i++) {
						this.chartOption.series[i].barWidth = (standardBarW / standardW) * proportionMin * width
					}
				} else {
					this.chartOption.xAxis.axisLabel.fontSize = standardFontSize
					this.chartOption.yAxis.axisLabel.fontSize = standardFontSize
					this.chartOption.legend.textStyle.fontSize = standardFontSize
					for (var i = 0, len = this.chartOption.series.length; i < len; i++) {
						this.chartOption.series[i].barWidth = standardBarW
					}
				}
				this.chartOption.grid.bottom = (standardGridBottom / standardH) * height

				this.chart.setOption(this.chartOption)
				this.chart.resize()
			}.bind(this),
			axis: function() {
				var width = $('#' + this.id).width(),
					height = $('#' + this.id).height()
				var standardW = 360,
					standardH = 220,
					proportionMin = 0.8,
					proportionMax = 1.2,
					standardFontSize = 14,
					standardGridBottom = 50
				if (width > standardW * proportionMax) {
					this.chartOption.xAxis.axisLabel.fontSize = (standardFontSize / standardW) * proportionMax * width
					this.chartOption.yAxis.axisLabel.fontSize = (standardFontSize / standardW) * proportionMax * width
					this.chartOption.xAxis.nameTextStyle.fontSize = (standardFontSize / standardW) * proportionMax * width
				} else if (width < standardW * proportionMin) {
					this.chartOption.xAxis.axisLabel.fontSize = (standardFontSize / standardW) * proportionMin * width
					this.chartOption.yAxis.axisLabel.fontSize = (standardFontSize / standardW) * proportionMin * width
					this.chartOption.xAxis.nameTextStyle.fontSize = (standardFontSize / standardW) * proportionMin * width
				} else {
					this.chartOption.xAxis.axisLabel.fontSize = standardFontSize
					this.chartOption.yAxis.axisLabel.fontSize = standardFontSize
					this.chartOption.xAxis.nameTextStyle.fontSize = standardFontSize
				}
				this.chartOption.grid.bottom = (standardGridBottom / standardH) * height

				this.chart.setOption(this.chartOption)
				this.chart.resize()
			}.bind(this),
			axislong: function() {
				var width = $('#' + this.id).width(),
					height = $('#' + this.id).height()
				var standardW = 1000,
					standardH = 220,
					proportionMin = 0.8,
					proportionMax = 1.2,
					standardFontSize = 14,
					standardGridBottom = 50
				if (width > standardW * proportionMax) {
					this.chartOption.xAxis.axisLabel.fontSize = (standardFontSize / standardW) * proportionMax * width
					this.chartOption.yAxis.axisLabel.fontSize = (standardFontSize / standardW) * proportionMax * width
					this.chartOption.xAxis.nameTextStyle.fontSize = (standardFontSize / standardW) * proportionMax * width
				} else if (width < standardW * proportionMin) {
					this.chartOption.xAxis.axisLabel.fontSize = (standardFontSize / standardW) * proportionMin * width
					this.chartOption.yAxis.axisLabel.fontSize = (standardFontSize / standardW) * proportionMin * width
					this.chartOption.xAxis.nameTextStyle.fontSize = (standardFontSize / standardW) * proportionMin * width
				} else {
					this.chartOption.xAxis.axisLabel.fontSize = standardFontSize
					this.chartOption.yAxis.axisLabel.fontSize = standardFontSize
					this.chartOption.xAxis.nameTextStyle.fontSize = standardFontSize
				}
				this.chartOption.grid.bottom = (standardGridBottom / standardH) * height

				this.chart.setOption(this.chartOption)
				this.chart.resize()
			}.bind(this),
			gaugeData: function() {
				var width = $('#' + this.id).width(),
					height = $('#' + this.id).height()
				var standardW = 360,
					proportionMin = 0.8,
					proportionMax = 1.2,
					standardFontSize = 16,
					bigFontSize = 22
				if (width > standardW * proportionMax) {
					for (var i = 0, len = this.chartOption.series.length; i < len; i++) {
						this.chartOption.series[i].detail.fontSize = (bigFontSize / standardW) * proportionMax * width
						this.chartOption.series[i].title.fontSize = (standardFontSize / standardW) * proportionMax * width
					}
				} else if (width < standardW * proportionMin) {
					for (var i = 0, len = this.chartOption.series.length; i < len; i++) {
						this.chartOption.series[i].detail.fontSize = (bigFontSize / standardW) * proportionMin * width
						this.chartOption.series[i].title.fontSize = (standardFontSize / standardW) * proportionMin * width
					}
				} else {
					for (var i = 0, len = this.chartOption.series.length; i < len; i++) {
						this.chartOption.series[i].detail.fontSize = bigFontSize
						this.chartOption.series[i].title.fontSize = standardFontSize
					}
				}

				this.chart.setOption(this.chartOption)
				this.chart.resize()
			}.bind(this),
			default1: function() {
				//不做处理
				this.chart.setOption(this.chartOption)
				this.chart.resize()
			}.bind(this),
			illegal: function () {
            //不做处理
            this.chart.setOption(this.chartOption);
            this.chart.resize();
		}.bind(this),
		illegal: function () {
            //不做处理
            this.chart.setOption(this.chartOption);
            this.chart.resize();
        }.bind(this)
		}),
		/**    （外部调用）修改数据时触发
	 data : [{}]    经过校验后的对象数组
	 name :
	 value :
	 attr :
	 */
		(this.setDataset = function(data) {
			this.setDatasetEvent[this.type][this.subType](data)
		}),
		/*	根据类型编写对应的setDataset事件
		 */
		(this.setDatasetEvent = {
			default1: {
				pies: function(data, type) {
					this.chartOption.dataset = data
					this.chart.setOption(this.chartOption, true)
				}.bind(this),
				default1: function(data, type) {
					var series = []
					this.chartOption.dataset = data
					for (var i = 0, len = data.dimensions.length - 1; i < len; i++) {
						series.push(this.chartOption.series[0])
					}
					this.chartOption.series = series
					this.chart.setOption(this.chartOption, true)
				}.bind(this)
			}
		}),
		/**	echart动画
		 */
		(this.animalEvent = function() {
			var _this = this
			switch (this.animal.type) {
				case 'none':
					break
				case 'common':
					this.currentIndex = -1
					this.seriesIndex = 0
					setInterval(function() {
						var dataLen = 0
						var seriesLen = 0
						if (_this.chartOption.series[0].data == undefined) {
							dataLen = _this.chartOption.dataset.source.length
							seriesLen = _this.chartOption.dataset.dimensions.length - 1
						} else {
							dataLen = _this.chartOption.series[0].data.length
							seriesLen = _this.chartOption.series.length
						}
						// 取消之前高亮的图形
						_this.chart.dispatchAction({
							type: 'downplay',
							seriesIndex: 0,
							dataIndex: _this.currentIndex
						})
						_this.currentIndex = (_this.currentIndex + 1) % dataLen
						if (_this.currentIndex == 0) {
							_this.seriesIndex = (_this.seriesIndex + 1) % seriesLen
						}
						// 高亮当前图形
						_this.chart.dispatchAction({
							type: 'highlight',
							seriesIndex: _this.seriesIndex,
							dataIndex: _this.currentIndex
						})
						// 显示 tooltip
						_this.chart.dispatchAction({
							type: 'showTip',
							seriesIndex: _this.seriesIndex,
							dataIndex: _this.currentIndex
						})
					}, _this.animal.time)
					break
				default:
					break
			}
		})
}

// echart数据处理函数
// 打乱数据，规避饼图标签重叠问题
function reArrangePieData(data, valueKey) {
	var newData = []
	var len = data.length
	data.sort(function(a, b) {
		return a[valueKey] - b[valueKey]
	})

	for (var i = 0; i < len; i++) {
		if (i > len - 1 - i) {
			break
		}

		if (i === len - 1 - i) {
			newData.push(data[i])
			break
		}
		newData.push(data[i])
		newData.push(data[len - 1 - i])
	}

	return newData
}
