/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var $ = function(id){
  return document.getElementById(id);
}
/**/
function selectFrom(lowerValue,upperValue){
  var choices = upperValue-lowerValue+1;
  return Math.floor(Math.random() * choices + lowerValue);
}
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}
var color=["#F6BD0F","#AFD8F8","#8BBA00","#FF8E46","#008E8E","#D64646","#8E468E"];


/**
 * 渲染图表
 */
function renderChart() {
 
  var width = 0;
  var city = chartData[pageState.nowSelectCity][pageState.nowGraTime];
  if(pageState.nowGraTime==="day")
  {
    width=10;
  }else if(pageState.nowGraTime==="week")
  {
    width = 20;
  }else if(pageState.nowGraTime === "month")
  {
    width = 30;
  }else{
    alert("renderChart function goes wrong.");
  }

  var aqiChartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
  aqiChartWrap.style.height="500px";
  //aqiChartWrap.style.backgroundcolo="500px";
  var html="";
  for (var x in city) {
    var randomColor = color[selectFrom(0,color.length-1)];
    html += "<div title=\""+x+": "+city[x]+"\" style=\"float:left;background-color:"+randomColor+";width:"+width+"px;height:500px;\"><div style=\"background-color:#fff;width:"+width+"px;height:"+(500-city[x])+"px;\"></div></div>";
  }
  aqiChartWrap.innerHTML = html;
}


function graTimeChange() {
  var targetClickedValue = arguments[0].target.value;
  if (pageState.nowGraTime!=targetClickedValue) {
    pageState.nowGraTime = targetClickedValue;
	renderChart();
   }
  
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  var targetSelectValue = arguments[0].target;
  if(targetSelectValue[targetSelectValue.selectedIndex].value!=pageState.nowSelectCity){
    pageState.nowSelectCity = targetSelectValue[targetSelectValue.selectedIndex].value;
	renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var graTime = document.getElementsByName("gra-time");
  for (var i = 0; i < graTime.length; i++) {
    graTime[i].onclick=graTimeChange;    
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = $("city-select");
  var html = "";
  var propertiesInAqiSourceData = Object.keys(aqiSourceData);
  for(var i = 0;i<propertiesInAqiSourceData.length;i++){
      html += "<option>"+propertiesInAqiSourceData[i]+"</option>";
  }
  citySelect.innerHTML = html;
  pageState.nowSelectCity = propertiesInAqiSourceData[0]; // 设置第一个值为默认值
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onchange = citySelectChange;
}

/**
 * date1 和 date2是日期格式的
 */
function isInSameWeek(date1,date2){

	var minDate = new Date(Math.min(date1,date2));
	var maxDate = new Date(Math.max(date1,date2));
	var minWeek = minDate.getDay();
	var maxWeek = maxDate.getDay();
	if(maxDate - minDate > 7*24*3600*1000 || minDate.getDay()===0)
	{
		return false;
	}else if(minWeek===6 && maxWeek===0 || 
			minWeek < maxWeek||
			minDate.getTime() == maxDate.getTime()){
		return true;
	}else{
		return false;
	}
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
	for(var i in aqiSourceData)
	{
    chartData[i]={};
		var aqiWeek = {};
		var aqiMonth = {};
		var t = Object.keys(aqiSourceData[i]);
		var sumTempWeek = 0;
		var sumTempMonth = 0;
		var date1 = new Date(t[0]);
		var countInWeek = 0;
		var countInMonth = 0;
		var m;
		for(m = 0;m<t.length;m++){
			var date2 = new Date(t[m]);
			if(isInSameWeek(date1,date2)){
				countInWeek++;
				sumTempWeek += aqiSourceData[i][t[m]];
			}else{
				aqiWeek[t[m-1]] = sumTempWeek/countInWeek;
				countInWeek = 1;
				sumTempWeek = aqiSourceData[i][t[m]];
			}
			
			if(date1.getMonth()===date2.getMonth()){
				countInMonth++;
				sumTempMonth += aqiSourceData[i][t[m]];
			}else{
				aqiMonth[t[m-1]] = sumTempMonth/countInMonth;
				countInMonth = 1;
				sumTempMonth = aqiSourceData[i][t[m]];
			}
			date1=date2;
		}
		if(m==t.length){
			aqiWeek[t[m-1]] = sumTempWeek/countInWeek;
			aqiMonth[t[m-1]] = sumTempMonth/countInMonth;
		}
		//aqiWeeks[i] = aqiWeek;
		//aqiMonths[i] = aqiMonth;
    chartData[i].week = aqiWeek;
    chartData[i].day = aqiSourceData[i];
    chartData[i].month = aqiMonth;
	}
  // 处理好的数据存到 chartData 中
  // 格式该是什么样的？北京：object{day,week,month}
  //for(var i in aqiSourceData){
	//charData[i].day = 
  //}
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
