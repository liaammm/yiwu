// 引入mock数据
var isMock = true
if (isMock) {
	document.write("<script language=javascript src='./js/custom/MockData.js'></script>");
}

/**
 * 最外层父元素添加遮罩层
 */
var maskHtml = '<div id="ui-loading" style="position: absolute;width: 100%;height: 100%;background-color: rgba(8, 8, 8, 0.42);z-index: 11;display: none">' +
		'<div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">' +
			'<i style="display: inline-block;width: 3.2rem;height: 3.2rem;background: url(data:image/gif;base64,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);background-size: cover;"></i>' +
			'<span class="text" style="color: #d5d5d8;margin-left: 1.2rem;font-size: 1.5rem;"></span>' +
		'</div>' +
	'</div>';
$(parent.parent.document).find('body').append(maskHtml);
var parentLoading = $(parent.parent.document).find('#ui-loading');


/**
 * @Date 2019-08-08 19:50:40
 * @introduction 显示最外层遮罩层
 * @param {String} str 请求地址
 * @return {返回类型说明} 无返回参数
 * @exception {违例类型} 违例类型说明
 */
function showMask(str) {
	str = str ? str : '';
    parentLoading.find('.text').html(str);
    parentLoading.show();
}

/**
 * @Date 2019-08-08 19:52:58
 * @introduction 隐藏最外层遮罩层
 * @return {返回类型说明} 无返回参数
 * @exception {违例类型} 违例类型说明
 */
function hideMask() {
    parentLoading.hide();
}

// 定义自动刷新数据时间
var INTERV = 1000 * 10

/**
 * 格式化时间   new Date().Format("yyyy-MM-dd hh:mm:ss");
 * @param {String} fmt 时间格式
 */
Date.prototype.Format = function(fmt) { //author: meizz
	var o = {
		"M+" : this.getMonth()+1,                 //月份
		"d+" : this.getDate(),                    //日
		"h+" : this.getHours(),                   //小时
		"m+" : this.getMinutes(),                 //分
		"s+" : this.getSeconds(),                 //秒
		"q+" : Math.floor((this.getMonth()+3)/3), //季度
		"S"  : this.getMilliseconds()             //毫秒
	};
	if(/(y+)/.test(fmt))
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("("+ k +")").test(fmt))
	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	return fmt;
}

// 获取当天时间
function getToday (reg) {
	return new Date().Format(reg);
}

/**
 * 获取距离今天XX天
 * @param {String} idate 传入当前时间
 * @param {Number} space 距离今天的时间，正数为后XX天，负数为前XX天
 * @param {String} reg 
 * getSpaceDate('2109-07-26 12:00:00', -1, 'yyyy-MM-dd')
 */
function getSpaceDate (idate, space, reg) {
	var $date = new Date(idate);//获取当前时间
	var time = $date.setDate($date.getDate() + space);
	if(reg) time = $date.Format(reg);
	return time;
}

/**
 * @name 江彩霞
 * @Date 2019-08-28 16:13:08
 * @introduction 距离现在多少个月
 * @description 初始化吹气未开单表格结构
 * @param {String} idate 传入当前时间
 * @param {Number} space 距离今天的时间，正数为后XX月，负数为前XX月
 * @param {String} reg 返回的时间格式
 * @return {返回类型说明}
 * @exception {违例类型} 违例类型说明
 */
function getSpaceMonth (idate, space, reg) {
    var $date = new Date(idate);//获取当前时间
    var time = $date.setMonth($date.getMonth() + space);
    if(reg) time = $date.Format(reg);
    return time;
}

// 请求并更新数据
var baseUrl = 'http://33.155.81.176:8888';
function request (url, cbk, opt) {
	var param = {
		type: (opt && opt.type) || 'POST',
		url: baseUrl + url,
		dataType: 'json',
		success: function(data) {
			if (data.status == 'success') {
				if (data.data.length != 0) {
					cbk && cbk(data.data)
				}
			} else {
				console.error(data.message)
			}
		},
		error: function(e) {
			console.error(e)
		}
	}
	if (opt && opt.data) {
		param.data = opt.data
	}

	if(isMock) {
		switch (url) {
			case "/policeSituation/jqfsqsEchart":
				cbk && cbk(MockData.jqfsqsEchart);
				break;
			case "/policeSituation/ssjtfsEchart":
				cbk && cbk(MockData.ssjtfsEchart);
				break;
			case "/policeSituation/jqfsqsEchart":
                cbk && cbk(MockData.jqfsqsEchart);
                break;
            case "/periodAnalysis/jqfsqsEchart_year":
                cbk && cbk(MockData.jqfsqsEchart_year);
                break;
            case "/periodAnalysis/jqfsqsEchart_month":
                cbk && cbk(MockData.jqfsqsEchart_month);
                break;
			case "/accident/query":
				cbk && cbk(MockData.accident);
				break;
			case "/drunkDriving/cqsjEchart":
                cbk && cbk(MockData.cqsjEchart);
                break;
			case "/drunkDriving/lhysjEchart1":
                cbk && cbk(MockData.lhysjEchart1);
                break;
			case "/drunkDriving/lhysjEchart2":
                cbk && cbk(MockData.lhysjEchart2);
                break;
			default:
				cbk && cbk({});
		}
		return
	}

	return $.ajax(param)
}

/**
 * 弹框
 * @param {String} option.id 用于加载弹框内容的id
 * @param {String} option.url 请求页面地址
 * @param {Object} option.data 传递的参数
 * @param {Function} option.cbk 弹框内容请求成功后的回调
 * @param {Function} option.close 关闭弹框后的回调
 */
function modalDialog(option) {
	if($(option.id).length == 0) {
		$('body').append('<div class="dialog-content" id="' + option.id.split('#')[0] + '"></div>');
	}

	if(!option.url || typeof(option.url) != 'string') {
		new LightTip().error('请完善请求页面地址!');
		return;
	}

	var data = option.data == undefined ? {} : option.data; // 传递的参数
	var callBack = option.cbk == undefined ? function() {} : option.cbk;

	$(option.id).empty();
	$(option.id).load(option.url, function(){
		$(option.id).addClass('active');
		callBack(data);
		var closeBtn = '';
		var closeBtnArr = ['.close-btn', '.cancel-btn', '.return-btn'];
		$.each(closeBtnArr, function(k,v) {
			closeBtn += option.id + ' ' + v + ','
		})
		closeBtn = closeBtn.substr(0, closeBtn.length - 1);
		$(closeBtn).on('click',function(){
			$(this).parents('.dialog-content').toggleClass('active');
			setTimeout(function() {
				$(this).parents('.dialog-content').empty();
			}, 680)
			option.close && option.close();
		})
	})

}

/**
 * 复选框全选、反选
 * @param {Object} that 点击的复选框元素
 */
function checkboxState (that) {
	var _allCheckbox = $(that).siblings('input[type="checkbox"]').length - 1;  // 复选框长度
	if($(that).hasClass('check-all')) {
		var _isChecked = $(that).prev().is(':checked');
		$(that).nextAll('input[type="checkbox"]').prop('checked', !_isChecked);
	} else {
		if($(that).prev().is(':not(:checked)')){
			var checkedLeng = $(that).prevAll('.check-all').nextAll('input[type="checkbox"]').filter(':checked').length;
			if(checkedLeng == (_allCheckbox - 1)){  // 复选框长度和选中的个数一样 -> 全选
				$(that).prevAll('.check-all').prev('input[type="checkbox"]').prop('checked', true);
			}else{ // 取消全选
				$(that).prevAll('.check-all').prev('input[type="checkbox"]').prop('checked', false);
			}
		}else{
			$(that).prevAll('.check-all').prev('input[type="checkbox"]').prop('checked', false);
		}
	}
}

  /**
   * @name 江彩霞
   * @Date 2019-08-27 16:18:48
   * @introduction select 重置为默认值选项
   * @description 根据传递的序号i，选中该select框的第i项
   * @param {Number} i 选中第i项选项，默认从0开始计数
   * @return {返回类型说明} 返回遍历并设置选中后的select
   * @exception {违例类型} 违例类型说明
   */
  $.fn.selectByIndex = function(i) {
    return $(this).each(function() {
      var sel = $(this);
      if (!sel.data('select')) {
		new Select(sel);
		// alert('该select下拉框不存在')
		console.error('该select下拉框不存在')
      } else {
        // 刷新
        sel
          .find('option')
          .eq(i)
          .prop('selected', true);
        sel.selectMatch();
      }
    });
  };


