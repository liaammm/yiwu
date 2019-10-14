// customTable.js


/**
 * 通用方法
 */


/**
 * @name 江彩霞
 * @Date 2019-08-27 15:33:03
 * @introduction 自定义复选框
 * @description 返回自定义复选框
 * @param {String} id 标识符，chkAll：头部全选复选框，chk：每一行的复选框
 * @return {返回类型说明} 返回重新构建的复选框（优化input复选框的样式）
 * @exception {违例类型} 违例类型说明
 */
var cusCheckboxHtml = function (id) {
    var html = '';
    // <label for="radio1" class="ui-radio"></label><label for="radio1">单选项1</label>
    if (isIE8()) {
        html += '<input type="checkbox" class="cusCheckbox ie_8" name="' + id + '" id="' + id + '">';
    } else {
        html +=
            '<input type="checkbox" class="cusCheckbox" name="' +
            id +
            '" id="' +
            id +
            '">\
                  <label class="ui-checkbox" for="' +
            id +
            '"></label>';
    }
    return html;
};


/**
 * @name 江彩霞
 * @Date 2019-08-27 15:45:08
 * @introduction 全选判断
 * @description 表格全选判断
 * @param {参数类型} 参数 参数说明
 * @return {返回类型说明} 返回是否全选中，1：全选，0：未选择，-1：非全选
 * @exception {违例类型} 违例类型说明
 */
var isCheckAll = function () {
    var alln = $('.mtable').find('input[type="checkbox"]').length;
    var chkn = $('.mtable').find('input[type="checkbox"]:checked').length;
    if (alln === chkn) {
        return 1;
    }
    if (chkn !== 0) {
        return -1;
    }
    return 0;
};

// 判断ie8
var isIE8 = function () {
    var browser = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(';');
    var trim_Version = version[1].replace(/[ ]/g, '');
    return browser == 'Microsoft Internet Explorer' && trim_Version == 'MSIE8.0';
};


/**
 * 表格区域正式开始
 */

// function initTable(elemName, hasPage, url, columnFormatter) {
/**
 * @name 江彩霞
 * @Date 2019-08-28 13:20:28
 * @introduction 初始化表格区域
 * @description 根据传递的参数，初始化表格
 * @param {String} option.elemName 填充表格的元素id 或者 class，必填
 * @param {Boolean} option.hasPage 是否有分页项，默认false无分页
 * @param {String} option.url 请求接口地址，必填
 * @param {Object} option.columnFormatter 表格每行展示的内容，必填
 * @param {Object} option.data 请求接口传递的参数，默认为{}
 * @return {返回类型说明}
 * @exception {违例类型} 违例类型说明
 */
function initTable(option) {
    this.elemName = option.elemName;
    this.elem = $(option.elemName);
    this.hasPage = option.hasPage ? option.hasPage : false;
    this.url = option.url;
    this.colFormat = option.columnFormatter;
    this.data = option.data ? option.data : {};

    this.pageNo = 1;  // 分页-当前页码数,默认是选中第一页
    this.pageSize = 10;  // 分页-每页显示的条目数
    this.total = 0;  // 分页-数据条目总数
    this.tbData = {};
    this.pagi = undefined;
    this.req = '';

    // 片段
    this.colFragment = undefined;

    // console.log(this)
    this.init();
}

initTable.prototype = {
    // 更新数据
    /**
     * @name 江彩霞
     * @Date 2019-08-27 15:25:26
     * @introduction 更新数据--外部调用
     * @description 需通过查询按钮等方法更新数据时，通过该方法调用fetchData
     * @param {String} url 请求地址
     * @param {Object} data 请求参数
     * @param {Function} data 回调函数
     * @return {返回类型说明}
     * @exception {违例类型} 违例类型说明
     */
    reFetchData: function (url, data, callback) {
        this.pageNo = data.current ? data.current : 1;  // 页码设置
        this.pageSize = data.size ? data.size : 10;  // 每页显示条数设置
        // this.fetchData(url, data, callback);

        switch (this.pageSize) {
            case 10:
                this.fetchData(url, data, callback);
                this.elem.find('select#select-every').selectByIndex(0);
				break;
            case 20:
                this.fetchData(url, data, callback);
                this.elem.find('select#select-every').selectByIndex(1);
                break;
            case 50:
                this.fetchData(url, data, callback);
                this.elem.find('select#select-every').selectByIndex(2);
				break;
            case 100:
                this.fetchData(url, data, callback);
                this.elem.find('select#select-every').selectByIndex(3);
				break;
            default:
                // new LightTip().success('成功', 3000);
                new LightTip().error('调用reFetchData()方法时，请传递的参数size（每页显示的条数）必须为10、20、50或者100', 5000);
		}


    },

    /**
     * @Date 2019-08-08 11:50:40
     * @introduction 更新表格数据
     * @description 点击页码或者发送新的请求，更新表格中的数据
     * @param {String} url 请求地址
     * @param {Object} data 请求参数
     * @param {Function} data 回调函数
     * @return {返回类型说明} 无返回参数
     * @exception {违例类型} 违例类型说明
     */
    fetchData: function (url, data, callback) {
        var _this = this;
        $(this.elemName).find('#ui-loading').loading();
        var self = this;
        if (data) {
            // 增加支持 form 和 json 两种入参
            if (typeof data === 'string') {
                this.req = $(data + ' :input')
                    .filter(function (index, element) {
                        return $(element).val() !== '';
                    })
                    .serialize();
                this.req = this.req + '&current=' + self.pageNo + '&size=' + self.pageSize;
            } else {
                this.req = $.extend({}, {current: self.pageNo, size: self.pageSize}, data);
            }
        }else{
            this.req = $.extend({}, {current: self.pageNo, size: self.pageSize});
        }
        var reqData = this.req;

        this.pageNo = reqData.current;  // 页码设置
        this.pageSize = reqData.size;  // 每页显示条数设置

        // debugger
        // 测试
        if(true) {
            var testData = {
                // pageSize: 12,  // 每页显示10条数据
                total: 200,  // 共200条数据
                records: [
                    {
                        id: 1,
                        time: '2019-02-01',
                        address: '后宅街道XX路XXX路口-' + parseInt(Math.random() * 20 + 1),
                        brigade: '后宅大队',
                        alarmPerson: '王大山',
                        policeName: '王大陆',
                        ruling: '已裁决'
                    },
                    {
                        id: 2,
                        time: '2019-02-02',
                        address: '后宅街道XX路XXX路口',
                        brigade: '后宅大队',
                        alarmPerson: '王大山',
                        policeName: '王大陆',
                        ruling: '已裁决'
                    },
                    {
                        id: 3,
                        time: '2019-02-03',
                        address: '后宅街道XX路XXX路口',
                        brigade: '后宅大队',
                        alarmPerson: '王大山',
                        policeName: '王大陆',
                        ruling: '未裁决'
                    },
                    {
                        id: 4,
                        time: '2019-02-04',
                        address: '后宅街道XX路XXX路口',
                        brigade: '后宅大队',
                        alarmPerson: '王大山',
                        policeName: '王大陆',
                        ruling: '已裁决'
                    },
                    {
                        id: 5,
                        time: '2019-02-05',
                        address: '后宅街道XX路XXX路口',
                        brigade: '后宅大队',
                        alarmPerson: '王大山',
                        policeName: '王大陆',
                        ruling: '已裁决'
                    },
                    {
                        id: 6,
                        time: '2019-02-06',
                        address: '后宅街道XX路XXX路口',
                        brigade: '后宅大队',
                        alarmPerson: '王大山',
                        policeName: '王大陆',
                        ruling: '已裁决'
                    },
                    {
                        id: 7,
                        time: '2019-02-07',
                        address: '后宅街道XX路XXX路口',
                        brigade: '后宅大队',
                        alarmPerson: '王大山',
                        policeName: '王大陆',
                        ruling: '已裁决'
                    },
                    {
                        id: 8,
                        time: '2019-02-08',
                        address: '后宅街道XX路XXX路口',
                        brigade: '后宅大队',
                        alarmPerson: '王大山',
                        policeName: '王大陆',
                        ruling: '已裁决'
                    },
                    {
                        id: 9,
                        time: '2019-02-09',
                        address: '后宅街道XX路XXX路口',
                        brigade: '后宅大队',
                        alarmPerson: '王大山',
                        policeName: '王大陆',
                        ruling: '已裁决'
                    },
                    {
                        id: 10,
                        time: '2019-02-10',
                        address: '后宅街道XX路XXX路口',
                        brigade: '后宅大队',
                        alarmPerson: '王大山',
                        policeName: '王大陆',
                        ruling: '已裁决'
                    },
                    {
                        id: 11,
                        time: '2019-02-11',
                        address: '后宅街道XX路XXX路口',
                        brigade: '后宅大队',
                        alarmPerson: '王大山',
                        policeName: '王大陆',
                        ruling: '已裁决'
                    },
                    {
                        id: 12,
                        time: '2019-02-12',
                        address: '后宅街道XX路XXX路口',
                        brigade: '后宅大队',
                        alarmPerson: '王大山',
                        policeName: '王大陆',
                        ruling: '已裁决'
                    }
                ]
                
            }
            self.setData(testData);
            self.setTableData();
            if(self.pagi) {
                self.freshPagi();

                switch (reqData.size) {
                    case 10:
                    self.elem.find('select#select-every').selectByIndex(0);
                        break;
                    case 20:
                        self.elem.find('select#select-every').selectByIndex(1);
                        break;
                    case 50:
                        self.elem.find('select#select-every').selectByIndex(2);
                        break;
                    case 100:
                        self.elem.find('select#select-every').selectByIndex(3);
                        break;
                    default:
                        // new LightTip().success('成功', 3000);
                        new LightTip().error('调用reFetchData()方法时，请传递的参数size（每页显示的条数）必须为10、20、50或者100', 5000);
                }
            }
            
            $(_this.elemName).find('#ui-loading').hide();
            return
        }


        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: reqData,
            success: function (data) {
                self.setData(data);
                self.param = reqData.param;
                self.setTableData();
                if(self.pagi) {
                    self.freshPagi();
                    switch (reqData.size) {
                        case 10:
                            self.elem.find('select#select-every').selectByIndex(0);
                            break;
                        case 20:
                            self.elem.find('select#select-every').selectByIndex(1);
                            break;
                        case 50:
                            self.elem.find('select#select-every').selectByIndex(2);
                            break;
                        case 100:
                            self.elem.find('select#select-every').selectByIndex(3);
                            break;
                        default:
                            // new LightTip().success('成功', 3000);
                            new LightTip().error('调用reFetchData()方法时，请传递的参数size（每页显示的条数）必须为10、20、50或者100', 5000);
                    }
                }
                $(_this.elemName).find('#ui-loading').hide();
            },
            error: function (err) {
                console.log(err);
                $(_this.elemName).find('#ui-loading').hide();
            }
        });
    },

    // 设置数据
    setData: function (data) {
        //this.pageNo = data.pageNo
        // this.pageSize = data.pageSize;
        this.tbData = data.records;
        this.total = data.total;
        $('.ui-table-page .page-total').html('共' + this.total + '条');
    },

    // 刷新分页栏
    freshPagi: function () {
        this.pagi.num.every = this.pageSize;
        this.pagi.num.length = this.total;
        this.pagi.num.current = this.pageNo;
        this.pagi.show();
    },

    /**
     * 初始化
     */

    init: function () {
        var self = this;

        // console.log(this)
        this.appendGridHtml();

        this.initPagi();
        $('select').selectMatch();

        // 获取数据并初始化
        this.fetchData(this.url, this.data);
        // 添加事件
        this.addEvents();
    },

    /**
     * 获取当前元素在表格中的下标，从0开始
     *
     * @param {*} elm 元素
     * @returns 下标
     */
    getItemIndex: function(elm) {
		// closest() 方法获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上
        var trIndex =
            $(elm).data('index') ||
            $(elm)
                .closest('div.tr')
                .data('index');
        var index = trIndex % this.pageSize;
        return index;
    },

    /**
     * 通用方法
     */

    // 获取表格行数据(表格内通过行数获取)
    dataItem: function (index) {
        return this.tbData[index];
    },

    
    // 获取选中行数据
    getCheckedData: function () {
        var self = this;
        var ckList = $('.mtable .cusCheckbox:checked');
        var dataArr = [];
        if (ckList.length !== 0) {
            ckList.each(function (idx, item) {
                var index = $(item)
                    .parents('div.tr')
                    .index();
                dataArr.push(self.tbData[index]);
            });
        }
        return dataArr;
    },

    /**
     * 插入表格html
     */

    appendGridHtml: function () {
        this.elem.empty();
        var fragment = document.createDocumentFragment();
        // 遮罩层
        fragment.appendChild(this.appendTableLoaning());
        // 表格头
        fragment.appendChild(this.appendTableTitle());
        // 表格内容
        fragment.appendChild(this.appendTableContain());
        // 功能栏
        if(this.hasPage) {
            $(fragment).append(this.appendFuncBar());
        }
        // 插入DOM
        // this.elem.addClass('outpane table-area');
        this.elem.append(fragment);
    },

    /**
     * 加载遮罩层
     * 用于数据加载前，显示加载中遮罩层，加载完成后隐藏
     * @param {Object} obj 遮罩层样式
     */
    appendTableLoaning: function () {
        var Loaing = document.createElement('div');
        Loaing.className = 'ui-loading';
        Loaing.id = 'ui-loading';

        return Loaing;
    },

    // 添加表格头
    appendTableTitle: function () {
        var self = this;
        var Contain = document.createElement('div');
        Contain.className = 'ui-table-title';
        
        $.each(this.colFormat, function (idx, item) {
            var Cell = document.createElement('span');
            Cell.innerHTML = item.title ? item.title : '';

            // 先遍历设置属性(以免单独设置的style被覆盖)
            for (key in item.attrs) {
                Cell.setAttribute(key, item.attrs[key]);
            }

            if (item.type === 'checkbox') {
                Cell.innerHTML = cusCheckboxHtml('chkAll');
                // ie8不支持onchange
                // this.elem.find('.table.mtable')
                if (!isIE8()) {
                    Cell.firstChild.onchange = function (e) {
                        var checked = $(this).prop('checked');
                        self.elem.find('.mtable')
                            .find('input[type="checkbox"]')
                            .prop('checked', checked);
                    };
                } else {
                    Cell.firstChild.onclick = function (e) {
                        var checked = $(this).prop('checked');
                        self.elem.find('.mtable')
                            .find('input[type="checkbox"]')
                            .prop('checked', checked);
                    };
                }
            }
            
            if (item.width) {
                Cell.style.width = item.width;
            }
            Contain.appendChild(Cell);
        });

        return Contain;
    },

    // 表格外框
    appendTableContain: function () {
        var Contain = document.createElement('div');
        Contain.className = 'ui-table-body';
        if(this.hasPage) {
            Contain.className = 'ui-table-body has-page'
        }else{
            Contain.className = 'ui-table-body'
        }
        var Table = document.createElement('div');

        Table.className = 'table mtable';


        Contain.appendChild(Table);

        return Contain;
    },

    // 表格具体内容
    setTableData: function () {
        // 表格行
        var self = this;
        var tBodyContain = $(this.elemName + ' .ui-table-body .table');
        tBodyContain.empty();
        $.each(this.tbData, function (idx, row) {
            var TrRow = document.createElement('div');
            TrRow.className = 'tr';
            TrRow.setAttribute ( 'data-index' , idx);
            var order = (self.pageNo - 1) * self.pageSize + idx;
            $.each(self.colFormat, function (idxx, item) {
                append = true;
                var TdCell = document.createElement('span');

                if(item.class) {
                    TdCell.setAttribute('class', 'td ' + item.class);
                }else{
                    TdCell.className = 'td';
                }
                
                // var order = (self.pageNo - 1) * self.pageSize + idx;
                // 先遍历设置属性(以免单独设置的style被覆盖)
                for (key in item.attrs) {
                    TdCell.setAttribute(key, item.attrs[key]);
                }
                if (item.width) {
                    TdCell.style.width = item.width;
                }
                // 单元格内容
                if (item.type === 'checkbox') {
                    TdCell.innerHTML = cusCheckboxHtml('chk' + order);
                    TdCell.style.padding = '0';
                    // ie8不支持onchange
                    if (!isIE8()) {
                        TdCell.firstChild.onchange = function (e) {
                            var checked = isCheckAll();
                            self.elem.find('#chkAll').prop('checked', checked === 1);
                        };
                    } else {
                        TdCell.firstChild.onclick = function (e) {
                            var checked = isCheckAll();
                            self.elem.find('#chkAll').prop('checked', checked === 1);
                        };
                    }
                } else if (item.type === 'order') {
                    TdCell.innerHTML = order + 1;
                } else if (item.template) {
                    TdCell.innerHTML = item.template(row);
                    $('select').selectMatch();
                } else if (item.command) {
                    // 表格内按钮事件
                    for (cmd in item.command) {
                        var data = item.command[cmd];
                        var BtnCell = document.createElement('span');

                        // 先遍历设置属性(以免单独设置的style被覆盖)
                        for (key in data.attrs) {
                            BtnCell.setAttribute(key, data.attrs[key]);
                        }

                        BtnCell.className = data.className;
                        BtnCell.onclick = (function (clickFn) {
                            return function (e) {
                                e = e || window.event;
                                clickFn.call(self, e);
                            };
                        })(data.click);
                        BtnCell.innerHTML = data.text;
                        TdCell.appendChild(BtnCell);
                    }
                }else if (item.method) {
                    // 表格点击事件
                    var BtnCell = document.createElement('span');
                    for (key in item.method.attrs) {
                        BtnCell.setAttribute(key, item.method.attrs[key]);
                    }
                    BtnCell.className = item.method.className;
                    BtnCell.onclick = (function (clickFn) {
                        return function (e) {
                            e = e || window.event;
                            clickFn.call(self, e);
                        };
                    })(item.method.click);
                    BtnCell.innerHTML = row[item.field] || '';
                    TdCell.appendChild(BtnCell);
                }  else {
                    if (row[item.field] !== null && row[item.field] !== undefined) {
                        TdCell.innerHTML = row[item.field];
                        TdCell.setAttribute('title', row[item.field]);
                    }

                    // TdCell.innerHTML = row[item.field] || '';
                }
                if (item.render) {
                    var render = $.isFunction(item.render) ? item.render(_data, row, order) : item.render;
                    for (key in render) {
                        TdCell.setAttribute(key, render[key]);
                        if (key === 'rowspan' && render[key] === 0) {
                            append = false;
                        } 
                    }
                }
                  
                append && TrRow.appendChild(TdCell);
            });
            tBodyContain.append(TrRow);
        });
    },

    // 分页栏及数量选择
    appendFuncBar: function () {
        var Funbar = document.createElement('div');
        Funbar.className = 'ui-table-page';

        var FunPrev = document.createElement('div');
        FunPrev.className = 'table-pagi-prev';

        var FunFirstBtn = document.createElement('span');
        FunFirstBtn.innerHTML = '首页';
        FunFirstBtn.className = 'page-first';
        FunPrev.appendChild(FunFirstBtn);
        
        var FunPrevBtn = document.createElement('span');
        FunPrevBtn.innerHTML = '上一页';
        FunPrevBtn.className = 'page-prev';
        FunPrev.appendChild(FunPrevBtn);

        Funbar.appendChild(FunPrev);


        var FunPagi = document.createElement('div');
        FunPagi.className = 'table-pagi';
        Funbar.appendChild(FunPagi);

        
        var FunNext = document.createElement('div');
        FunNext.className = 'table-pagi-next';

        var FunNextBtn = document.createElement('span');
        FunNextBtn.innerHTML = '下一页';
        FunNextBtn.className = 'page-next';
        FunNext.appendChild(FunNextBtn);

        var Selector = document.createElement('div');
        Selector.className = 'pageshow fr';
        Selector.innerHTML =
            '<span class="title">每页显示:</span>' +
            '<select id="select-every">' +
                '<option value="10" selected>10条</option>' +
                '<option value="20">20条</option>' +
                '<option value="50">50条</option>' +
                '<option value="100">100条</option>' +
            '</select>';
        Funbar.appendChild(Selector);


        var FunTotal = document.createElement('span');
        FunTotal.innerHTML = '共0条';
        FunTotal.className = 'page-total';
        FunNext.appendChild(FunTotal);

        Funbar.appendChild(FunNext);
        return Funbar;
    },

    // 添加分页
    initPagi: function () {
        var self = this;
        this.pagi = new Pagination($(this.elemName + ' .table-pagi'), {
            length: self.total,  // 数据条目总数
            every: self.pageSize,  // 每页显示的条目数
            current: 1,  // 当前页码数,默认是选中第一页
            onClick: function (page, index) {
                // 分页栏点击
                self.pageNo = index;  // 第几页
                var data = {param:self.param};
                self.fetchData(self.url,data);
            }
        });
    },

    // 添加事件
    addEvents: function () {
        var self = this;
        // 添加分页
        // this.pagi = new Pagination($(this.elemName + ' .table-pagi'), {
        //     length: self.total,  // 数据条目总数
        //     every: self.pageSize,  // 每页显示的条目数
        //     current: 1,  // 当前页码数,默认是选中第一页
        //     onClick: function (page, index) {
        //         // 分页栏点击
        //         self.pageNo = index;  // 第几页
        //         var data = {param:self.param};
        //         self.fetchData(self.url,data);
        //     }
        // });


        // 首页
        // $('.ui-table-page').on('click', '.page-first', function(){
        this.elem.on('click', '.page-first', function(){
            self.pageNo = 1;
            self.pagi.num.current = self.pageNo;
            self.pagi.show();
            var data = {param:self.param};
            self.fetchData(self.url,data);
        })

        // 上一页
        // $('.ui-table-page').on('click', '.page-prev', function(){
        this.elem.on('click', '.page-prev', function(){
            self.pageNo--;
            $('.ui-table-page .page-prev').addClass('active');
            if(self.pageNo < 1) {
                self.pageNo++;
                return;
            }
            self.pagi.num.current = self.pageNo;
            self.pagi.show();
            var data = {param:self.param};
            self.fetchData(self.url,data);
        })

        // 下一页
        // $('.ui-table-page').on('click', '.page-next', function(){
        this.elem.on('click', '.page-next', function(){
            self.pageNo++;
            // console.log(Math.floor(self.total/self.pageSize) + '-' + Math.ceil(self.total/self.pageSize))
            $('.ui-table-page .page-next').addClass('active');
            if(self.pageNo > Math.ceil(self.total/self.pageSize)) {
                self.pageNo--;
                return;
            }
            self.pagi.num.current = self.pageNo;
            self.pagi.show();
            var data = {param:self.param};
            self.fetchData(self.url,data);
        });

        // 显示数量选择
        this.elem.on('change', '#select-every', function () {
            // 获取显示数量
            var num = parseInt($(this).val());
            self.pageSize = num;
            self.pageNo = 1;
            // if (num * self.pagi.num.current > self.pagi.num.length) {
            //     self.pageNo = 1;
            // }
            var data = {param:self.param};
            self.fetchData(self.url,data);
        });
    }
};
