$(document).ready(function() {
	var INTERV = 1000 * 10

	/**
	 * @introduction 初始化事件
	 * @description 将各个方法的调用统一在一个方法中，统一进行管理、调用
	 * @param {参数类型} 参数 参数说明
	 * @return {返回类型说明}
	 * @exception {违例类型} 违例类型说明
	 */
	function initEvent() {
		// 年月日初始化
		jeDate("#date-range",{
			theme:{ bgcolor:"#0785d6",color:"#fff", pnColor:"#d8d8d8"},
			isinitVal:true,
			initDate:[{YYYY:2019,MM:05,DD:05}, false],
			range:"\t到\t",
			isClear:false,
			minDate:'1970-01-01',
			maxDate:'2019-12-31',
			format: 'YYYY-MM-DD'
		});
		$('#date-range').val('2019-07-12\t到\t2019-07-23');

		// select下拉框初始化
		$('select').selectMatch();



		// 初始化表格
		postGrid = new initTable({
			elemName: '#table-content',
			hasPage: true,
			url: '/policeSentimentList/list',
			data: {
				current: 1,
				size: 10
			},
			columnFormatter: [
				{
					type: 'checkbox',
					width: '4rem',
					attrs: {
						style: 'text-align: center;'   // 为该行单独设置css样式
					}
				},
				{
					title: '序号',
					type: 'order',
					width: '6rem',
					attrs: {
						style: 'text-align: center;padding-right:2rem;'
					}
				},
				{
					field: 'time',
					title: '时间'
				},
				{
					field: 'address',
					title: '地址',
					class: 'ohide',            // 为该行添加class(例如：ohide)
				},
				{
					field: 'brigade',
					title: '所属大队'
				},
				{
					field: 'ruling',
					title: '是否裁决',
					template: function (row) {
						return '<select style="width:5rem;"><option>是</option><option>否</option></select>'
					}
				},
				{
					field: 'ruling',
					title: '是否裁决',
					template: function (row) {
						var color = row.ruling == '未裁决' ? '#ff274c' : '#36df0e';
						return '<span style="color:' + color + '">' + row.ruling + '</san>'
					}
				},
				{
					field: 'alarmPerson',
					title: '报警人',
					method: {                      // 非操作栏，给改栏添加点击事件
						attrs: {
							style: 'color: #07b8f9; cursor: pointer;'
						},
						className: 'details',
						click: function (e) {
							var index = this.getItemIndex($(e.target)); // 获取当前元素在表格中的下标，从0开始
							var rowData = this.dataItem(index);  // 获取该行的数据
							var rowDatas = this.getCheckedData();  // 获取选中行数据
							console.log(index, rowData, rowDatas);
						}
					}
				},
				{
					field: 'policeName',
					title: '处置民警'
				},
				{
					title: '操作',
					width: '8rem',
					attrs: {
						style: 'text-align:center;'
					},
					command: [                    // 操作栏，可添加多个操作按钮
						{
							name: 'showManager',
							text: '查看',
							attrs: {
								style: 'cursor: pointer;'
							},
							className: 'details green-btn',
							click: function (e) {          // 该操作按钮的点击事件
								var index = this.getItemIndex($(e.target)); // 获取当前元素在表格中的下标，从0开始
								var rowData = this.dataItem(index);  // 获取该行的数据
								var rowDatas = this.getCheckedData();  // 获取选中行数据
								console.log(index, rowData, rowDatas);

								modalDialog({              // 点击按钮，显示弹框
									id: '#dialog-one',
									url: '../dialogDemo.html',
									data: {                 // 传递参数
										rowData: rowData,
										rowDatas: rowDatas
									},
									cbk: cbkFun,    // 弹框显示后的回调函数；如果使用的是调用另外一个函数，写成cbkFun,不能写成 cbkFun()，否则会导致马上执行
									close: function(){
										console.log('弹框关闭后的回调函数')
									}
								})
							}
						}
					]
				}
			]
		});

		/**
		 * @introduction 弹框回调函数
		 * @description 生成表格后，点击查看详情，页面显示后的回调函数
		 * @param {参数类型} 参数 参数说明
		 * @return {返回类型说明}
		 * @exception {违例类型} 违例类型说明
		 */
		function cbkFun(obj) {
			// data: modalDialog中传递的data参数
			console.log(obj);
		}

		// 查询按钮点击事件，根据异常类型不同，显示不同的弹框内容
		$('.search-btn').click(function(){
			postGrid.reFetchData('/policeSentimentList/list', {
				current: 2,  // current: 当前页码数
				size: 20  // size：每页显示的条目数
			})
		})
		
		
	}

	var RestfulUtil = {}

	function fetchData() {}

	/**
	 * @introduction 初始化各个方法
	 * @description 主要用于初始化事件、统一查询接口数据、更新数据，开启数据轮训查询
	 * @param {参数类型} 参数 参数说明
	 * @return {返回类型说明}
	 * @exception {违例类型} 违例类型说明
	 */
	function init() {
		// 初始化事件
		initEvent()
		// 查询数据
		fetchData()

		// 启动轮训查询数据
		// setInterval(function() {
		// 	fetchData()
		// }, INTERV)

	}

	init()
})
