var fontColor = '#a2c1f3';  // 字体颜色
var bgColor = '#213a66';  // ui-card的背景颜色
var ssjtfsColor = ['#3db4ee', '#57aeb6', '#5df28f', '#d3f975', '#efca6e', '#f3a3a3', '#15d48a', '#46eed4', '#41b0fc', '#a3f3ae', '#f3a3ac', '#41b0fc'];
var cqsjColor = ['#55d8fe', '#ff8373', '#a3a0fb', '#d3f975', '#efca6e', '#f3a3a3', '#15d48a', '#46eed4', '#41b0fc', '#a3f3ae', '#f3a3ac', '#41b0fc'];

var dataStyle = {
    normal: {
        label: {
            show: false
        },
        labelLine: {
            show: false
        },
        shadowBlur: 0,
        shadowColor: '#f00'
    }
};
var colorArray = [
    {
        top: '#ffa800', //黄
        bottom: 'rgba(11,42,84,.3)'
    }, {
        top: '#1ace4a', //绿
        bottom: 'rgba(11,42,84, 0.3)'
    },
    {
        top: '#4bf3ff', //蓝
        bottom: 'rgba(11,42,84,.3)'
    }, {
        top: '#4f9aff', //深蓝
        bottom: 'rgba(11,42,84,.3)'
    },
    {
        top: '#b250ff', //粉
        bottom: 'rgba(11,42,84,.3)'
    }
];

var linearGradientIcon = ['#ff8373', '#a3a0fb', '#77da7c', '#baba5e']
var linearGradient = [{
	color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
		offset: 0,
		color: '#ff8373'
	}, {
		offset: 1,
		color: '#5d5a7e'
	}])
},{
	color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
		offset: 0,
		color: '#a3a0fb'
	}, {
		offset: 1,
		color: '#4a609a'
	}])
},{
	color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
		offset: 0,
		color: '#77da7c'
	}, {
		offset: 1,
		color: '#57667e'
	}])
},{
	color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
		offset: 0,
		color: '#baba5e'
	}, {
		offset: 1,
		color: '#52658e'
	}])
}]
var option = {

	jqfsqs: {
		dataset: {
			dimensions: ['name', 'value'],
			source: [
				{ name: '0', value: 0 },
				{ name: '1', value: 12 },
				{ name: '2', value: 12 },
				{ name: '3', value: 12 },
				{ name: '4', value: 12 },
				{ name: '5', value: 12 },
				{ name: '6', value: 12 },
				{ name: '7', value: 12 },
				{ name: '8', value: 2 },
				{ name: '9', value: 18 },
				{ name: '10', value: 30 },
				{ name: '11', value: 6 },
				{ name: '12', value: 38 },
				{ name: '13', value: 42 },
				{ name: '14', value: 20 },
				{ name: '15', value: 24 },
				{ name: '16', value: 17 },
				{ name: '17', value: 14 },
				{ name: '18', value: 15 },
				{ name: '19', value: 16 },
				{ name: '20', value: 12 },
				{ name: '21', value: 16 },
				{ name: '22', value: 16 },
				{ name: '23', value: 12 },
				{ name: '24', value: 10 }
			]
		},
		tooltip: {
			show: true,
			trigger: 'axis'
		},
		grid: {
			top: '10',
			left: '10',
			right: '15',
			bottom: '10',
			containLabel: true,
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			// data: ['14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
			axisLabel: {
				color: fontColor // 坐标值具体的颜色
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#2f4874' // 横坐标方向分割线颜色
				}
			}
			// name: '/时',
			// nameTextStyle: {
			// 	color: '#fff',
			// 	padding: [25, 0, 0, 0]
			// }
		},
		yAxis: [{
			type: 'value',
			axisLabel: {
				color: fontColor // 坐标值具体的颜色
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#2f4874' // 横坐标方向分割线颜色
				}
			},
			axisLine: {
				show: false
			}
		}],
		series: [{
			name: '警情',
			type: 'line',
			// smooth: true, //是否平滑曲线显示
			symbol: 'circle',
			symbolSize: 10,
			itemStyle: {
				color: "#23c5ef",
				borderColor: "#1e396c",
				borderWidth: 3
			},
			// lineStyle: {
			// 	normal: {
			// 		color: "#23c5ef", // 线条颜色
			// 	},
			// },
			// itemStyle: {
			// 	color: "#23c5ef",
			// 	borderColor: "#1e396c",
			// 	borderWidth: 3
			// },
			// data: [393, 438, 485, 631, 689, 824, 987, 1000, 1100, 1200]
		}]
	},

	jqlxfbs: {
		dataset: {
			dimensions: ['name', 'value'],
			source: [
				{ name: '车损', value: 285 },
				{ name: '人伤', value: 410 },
				{ name: '逃逸', value: 235 },
				{ name: '危化', value: 410 },
				{ name: '死亡', value: 274 },
				{ name: '重伤', value: 274 },
				{ name: '其它', value: 235 }
			]
		},
		tooltip: {
			trigger: 'item',
			formatter: function (params) {
                return params.marker + params.data.name + ' : ' + params.data.value + ' (' + params.percent + '%)';
			}
		},
		grid: {
			top: '10',
			left: '10',
			right: '10',
			bottom: '10',
			containLabel: true,
		},
		series: [{
			name: '警情类型分布',
			type: 'pie',
			radius: ['30%', '60%'],
			center: ['50%', '50%'],
			color: ['#f3d0a3', '#a3e7f3', '#f0bb55', '#afa3f3', '#f3a3ee', '#f3a3a3', '#15d48a', '#46eed4', '#41b0fc', '#a3f3ae', '#f3a3ac', '#41b0fc'], //'#FBFE27','rgb(11,228,96)','#FE5050'
			label: {
				normal: {
					// formatter: ['{c|{c}次}', '{b|{b}}'].join('\n'),
					formatter: '{b|{b}}',
					rich: {
						c: {
							color: 'rgb(241,246,104)',
							fontSize: 14,
							fontWeight:'bold',
							lineHeight: 5
						},
						b: {
							color: fontColor,
							fontSize: 12,
							height: 40
						},
					},
				}
			},
			labelLine: {
				normal: {
					lineStyle: {
						color: 'rgb(98,137,169)',
					},
					smooth: 0.2,
					length: 10,
					length2: 10,

				}
			}
		}]
	},

    ssjdclxph: {
        dataset: {
            //这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
            //如果不指定 dimensions，也可以通过指定 series.encode 完成映射，参见后文。
            dimensions: ['name', 'value'],
            source: [
				{ name: '其他车辆', value: 61 },
				{ name: '三轮车', value: 53 },
				{ name: '摩托车', value: 55 },
				{ name: '拖拉机', value: 57 },
				{ name: '货车', value: 59 },
                { name: '客车', value: 44 }
            ]
        },
        grid: {
            top: 0,
            bottom: 0,
            left: 10,
            right: 0,
            containLabel: true
		},
        tooltip: {
            formatter: function(params) {
                var marker =
                    "<span style='display:inline-block;margin-right:5px;border-radius:0.5em;width:0.5em;height:0.5em;background-color: #ca42bb;'></span>";
                var result = marker + params.data.name + ' : ' + params.data.value;
                return result;
            },
            textStyle: {
                fontSize: 14
            }
        },
        yAxis: {
					type: 'category',
					axisLabel: {
						show: false,
										textStyle: {
												color: fontColor,
												fontSize: 12
										},
										formatter: function(out) {
												return out.length > 4 ? out.substring(0, 4) + '...' : out;
						},
						interval: 0,
						margin: -10, //刻度标签与轴线之间的距离
						verticalAlign: 'middle',
					},
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            interval: 0
        },
        xAxis: {
			type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
				show: false,
                textStyle: {
                    color: fontColor,
                    fontSize: 12
                }
            }
        },
        series: [
            {
                type: 'bar',
				barWidth: 16,
				barGap: '-100%',
				label: {
					show: true,
					fontSize: 12,
					position: 'right',
					color: fontColor,
					padding: [2, 0, 0, -70],
					// margin: 10,
					verticalAlign: 'middle',
					formatter: function(obj) {
						return obj.name;
					}
				},
				itemStyle: {
					normal: {
						show: true,
						color: function(params) {
							return {
								type: 'linear',
								colorStops: [{
									offset: 0,
									color: '#1e3b70'
								}, {
									offset: 1,
									color: '#ca42bb'
								}]
							}
						},
						barBorderRadius: 4,
						borderWidth: 0,
						borderColor: '#333'
					}
				},
				barCategoryGap: '50%',
			},
			{
				type: 'bar',
				yAxisIndex: 0, //代表使用第二个Y轴刻度
				barGap: '-100%',
				barWidth: 16,
				itemStyle: {
					normal: {
						barBorderRadius: 200,
						color: 'transparent'
					}
				},
				label: {
					normal: {
						show: true,
						position: ['100', 3],
						textStyle: {
							fontSize: 12,
							color: fontColor,
						},
						formatter: function(data) {
							return data.num;
						}
					}
				}
			}
        ]
	},
	
	ssjtfs: {
		color: ssjtfsColor,
		dataset: {
			dimensions: ['name', 'value'],
			source: [
				{ name: '机动车与机动车', value: 324 },
				{ name: '非机动车与非机动车', value: 412 },
				{ name: '机动车与非机动车', value: 412 },
				{ name: '机动车与人', value: 124 },
				{ name: '非机动车与人', value: 421 }
			]
		},
		series: [{
			name: '涉事交通方式',
			type: 'pie',
			clockwise: true, //饼图的扇区是否是顺时针排布
			minAngle: 10, //最小的扇区角度（0 ~ 360）
			radius: ["60%", "70%"],
			center: '50%',
			avoidLabelOverlap: false,
			itemStyle: { //图形样式
				normal: {
					borderColor: bgColor,
					borderWidth: 3,
				},
			},
			label: {
				normal: {
					show: true,
					color: '#23efb8',
					fontSize: 12,
					show: false,
					position: 'center',
					formatter: '{value|{@value}}\n{text|{b}}',
					rich: {
						text: {
							color: "#23efb8",
							fontSize: 12,
							align: 'center',
							verticalAlign: 'middle',
							padding: 5
						},
						value: {
							color: "#23efb8",
							fontSize: 16,
							align: 'center',
							verticalAlign: 'middle',
						},
					}
				},
				emphasis: {
					show: true,
					textStyle: {
						fontSize: 12,
					}
				}
			}
		}]
	},

	sgxtjq: {
		dataset: {
			dimensions: ['name', 'value'],
			source: [
				{ name: '正面相撞', value: 19 },
				{ name: '侧面', value: 12 },
				{ name: '尾随', value: 15 },
				{ name: '对面相刮', value: 22 },
				{ name: '同向刮擦', value: 12 },
				{ name: '刮擦行人', value: 12 },
				{ name: '碾压', value: 12 },
				{ name: '翻车', value: 2 },
				{ name: '坠车', value: 18 },
				{ name: '失火', value: 30 },
				{ name: '撞固定物', value: 6 },
				{ name: '撞禁止车辆', value: 38 },
				{ name: '动物', value: 22 },
				{ name: '其他', value: 20 }
			]
		},
		tooltip: {
			trigger: 'axis'
		},
		grid: {
			top: '10',
			left: '10',
			right: '10',
			bottom: '15',
			containLabel: true,
		},
		xAxis: {
			type: 'category',
			boundaryGap: true,
			axisLabel: {
				rotate: -45, // 倾斜度 -90 至 90 默认为0  
				color: '#d8d8d8', // 坐标值具体的颜色
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#2f4874' // 横坐标方向分割线颜色
				}
			}
		},
		yAxis: [{
			type: 'value',
			axisLabel: {
				color: '#d8d8d8' // 坐标值具体的颜色
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#2f4874' // 纵坐标方向分割线颜色
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#2f4874' // 纵坐标方向分割线颜色
				}
			}
		},
		{
			type: 'value',
			axisLine: {
				show: true,
				lineStyle: {
					color: '#2f4874' // 纵坐标方向分割线颜色
				}
			}
		}
	],
		series: [{
			name: '事故形态-警情',
			type: 'bar',
			barWidth: 16,
			label: {
				show: true,
				fontSize: 12,
				position: 'top',
				color: fontColor
			},
			itemStyle: {
				normal: {
					color: function() {
						// 前4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始.
						// 第5个参数则是一个数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置.
						return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: '#05bbfa' },
							{ offset: 0.7, color: '#2261a0' },
							{ offset: 1, color: '#214074' }
						]);
					},
					barBorderRadius: 4   // 设置圆角
				}
			}
		}]
	},

	cqsj: {
		color: cqsjColor,
		dataset: {
			dimensions: ['name', 'value'],
			source: [
				{ name: '正常', value: 324 },
				{ name: '醉酒驾驶', value: 412 },
				{ name: '饮酒驾驶', value: 412 }
			]
		},
		series: [{
			name: '涉事交通方式',
			type: 'pie',
			clockwise: true, //饼图的扇区是否是顺时针排布
			minAngle: 10, //最小的扇区角度（0 ~ 360）
			radius: ["60%", "80%"],
			center: '50%',
			avoidLabelOverlap: false,
			itemStyle: { //图形样式
				normal: {
					borderColor: bgColor,
					borderWidth: 3,
				},
			},
			label: {
				normal: {
					show: true,
					color: '#fff',
					fontSize: 12,
					show: false,
					position: 'center',
					formatter: function(obj) {
						return obj.name + '\n\n' + obj.percent + '%'
					}
				},
				emphasis: {
					show: true,
					textStyle: {
						fontSize: 12,
					}
				}
			}
		}]
	},

	// 两个圆环
    lhysj: {
		series: [{
			name: '第一个圆环',
			type: 'pie',
			clockWise: false,
			radius: [45, 60],
			itemStyle: dataStyle,
			hoverAnimation: false,
			center: ['25%', '50%'],
			data: [{
				value: 75,
				label: {
					normal: {
						rich: {
							a: {
								color: '#603dd0',
								align: 'center',
								fontSize: 20,
								fontWeight: "bold"
							},
							b: {
								color: '#fff',
								align: 'center',
								fontSize: 16
							}
						},
						formatter: function(params){
							return params.percent + '%';
						},
						position: 'center',
						show: true,
						textStyle: {
							fontSize: '14',
							fontWeight: 'normal',
							color: '#fff'
						}
					}
				},
				itemStyle: linearGradient[0]
			}, {
				value: 25,
				name: 'invisible',
				itemStyle: {
					normal: {
						color: '#335081'
					}
				}
			}]
		}, {
			name: '第二个圆环',
			type: 'pie',
			clockWise: false,
			radius: [45, 60],
			itemStyle: dataStyle,
			hoverAnimation: false,
			center: ['75%', '50%'],
			data: [{
				value: 75,
				label: {
					normal: {
						rich: {
							a: {
								color: '#603dd0',
								align: 'center',
								fontSize: 20,
								fontWeight: "bold"
							},
							b: {
								color: '#fff',
								align: 'center',
								fontSize: 16
							}
						},
						formatter: function(params){
							return params.percent + '%';
						},
						position: 'center',
						show: true,
						textStyle: {
							fontSize: '14',
							fontWeight: 'normal',
							color: '#fff'
						}
					}
				},
				itemStyle: linearGradient[1]
			}, {
				value: 25,
				name: 'invisible',
				itemStyle: {
					normal: {
						color: '#335081'
					}
				}
			}]
		}]
	},

	rhsjfx: {
		dataset: {
			dimensions: ['name', 'value1', 'value2'],
			source: [
				{ name: '吹气', value1: 19, value2: 39 },
				{ name: '六合一', value1: 12, value2: 50 }
			]
		},
		tooltip: {
			trigger: 'axis'
		},
		grid: {
			top: '20',
			left: '10',
			right: '10',
			bottom: '35',
			containLabel: true,
		},
		legend: {
			// selectedMode:false,//取消图例上的点击事件
			data:['醉酒','饮酒'],
			icon:"circle",
			x: 'center', // 'center' | 'left' | {number},
			y: 'bottom', // 'center' | 'bottom' | {number}
			padding: [0, 0, 5, 0],    // [5, 10, 15, 20]
			textStyle: {
			  fontSize: '14',
			  color:'#fff'
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: true,
			axisLabel: {
				fontSize: '14',
				color: '#ffffff' // 坐标值具体的颜色
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#274473' // 横坐标方向分割线颜色
				}
			}
		},
		yAxis: [{
			type: 'value',
			axisLabel: {
				color: '#ffffff' // 坐标值具体的颜色
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#274473' // 纵坐标方向分割线颜色
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#274473' // 纵坐标方向分割线颜色
				}
			}
		},
		{
			type: 'value',
			axisLine: {
				show: true,
				lineStyle: {
					color: '#2f4874' // 纵坐标方向分割线颜色
				}
			}
		}
	],
	series: [{
		name:'醉酒',
		type:'bar',
		stack: '排名',
		barWidth:18,
		label: {
			show: false,
			fontSize: 12,
			position: 'top',
			color: fontColor
		},
		itemStyle: {
			barBorderRadius: 2, 
			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: "rgba(193,119,130,1)"
				},
				{
					offset: 1,
					color: "rgba(193,119,130,0.2)"
				}
			])
		}
		},{
		name:'饮酒',
		type:'bar',
		stack: '排名',
		barWidth:18,
		label: {
			show: false,
			fontSize: 12,
			position: 'top',
			color: fontColor
		},
		itemStyle:{
			barBorderRadius: [2, 2, 0, 0],
			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: "rgba(133,142,223,1)"
				},
				{
					offset: 1,
					color: "rgba(133,142,223,0.2)"
				}
			])
		}
		}]
	},
}
