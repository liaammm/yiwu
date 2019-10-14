## 现场调测配置

### Mock假数据填充
1. `js/custom/util.js` 文件中
  - 修改文件中的 `isMock` 为 false，关闭假数据填充

### echarts图表初始化和更新
1. echarts图表配置
  - `js/custom/option.js` 文件中

2. echarts图表初始化，修改默认配置中的数据
  - `js/custom/drunkDriving.js` 文件中
  - `initEcharts()` 方法中，通过new Echarts_base() 初始化echarts图表，flushData初始化数据 (13行左右)
  - Echarts_base()方法参数中的`flushData`参数修改默认配置中的数据


#### 事时间插件的初始化配置
1. `js/custom/drunkDriving.js` 文件中
  - 通过`jeDate`方法初始化
  - 具体配置可参考文档：`http://www.jemui.com/uidoc/jedate.html`


#### 初始化下拉框
1. `js/custom/drunkDriving.js` 文件中
  - `$('select').selectMatch()` 方法初始化下拉框
  - 插件文档：`https://l-ui.com/content/about/design.html`


#### 弹框
1. 修改 `js/custom/demo.js` 文件中
  - `modalDialog()` 方法  (102行左右)
  - 注意：弹框需要放在服务上才能正常显示 ！！！
  - 在Tomcat服务或者IIS服务上运行，或者在visual Studio Code编辑器中安装Liver Server插件，通过Liver Server方式运行index.html

#### 表格初始化与更新
1. 修改 `js/custom/demo.js` 文件中
  - `initTable()` 方法初始化表格  (24行左右)
  - 更新数据：通过调用`initTable()`生成的表格对象暴露的`reFetchData()`方法更新表格数据  (127行左右)