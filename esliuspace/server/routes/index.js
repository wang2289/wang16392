var express = require('express');
var mockjs = require('mockjs');
var router = express.Router();

//用于输出彩票的状态
var makeIssue=function(){
	var date = new Date();//当前时间
	var first_issue_date=new Date();//当天第一期的时间
	first_issue_date.setHours(9);
	first_issue_date.setMinutes(10);
	first_issue_date.setSeconds(0);
	var end_issue_date=new Date(first_issue_date.getTime()+77*10*60*1000);
	//截止时间
	var cur_issue,end_time,state;
	// 正常销售
	if(date.getTime()-first_issue_date.getTime()>0&&date.getTime()-end_issue_date.getTime()<0){
		//当前时间如果大于第一期时间且小于截止时间，就是正常销售状态
		var cur_issue_date=new Date();
		cur_issue_date.setHours(9);
		cur_issue_date.setMinutes(0);
		cur_issue_date.setSeconds(0);
		var minus_time=date.getTime()-cur_issue_date.getTime();
		//剩余时间
		var h=Math.ceil(minus_time/1000/60/10);
		var end_date=new Date(cur_issue_date.getTime()+1000*60*10*h);
		//截止时间
		end_time=end_date.getTime();
		cur_issue=[end_date.getFullYear(),('0'+(end_date.getMonth()+1)).slice(-2),('0'+end_date.getDate()).slice(-2),('0'+h).slice(-2)].join('');
		//保存结果
	}else{
		// 否则今天销售已截止
		first_issue_date.setDate(first_issue_date.getDate()+1);
		end_time=first_issue_date.getTime();
		cur_issue=[first_issue_date.getFullYear(),('0'+(first_issue_date.getMonth()+1)).slice(-2),('0'+first_issue_date.getDate()).slice(-2),'01'].join('');
		
	}

	var cur_date=new Date();
	if(end_time-cur_date.getTime()>1000*60*2){
		state='正在销售'
	}else{
		state='开奖中'
	}
	return {
		issue:cur_issue,
		state:state,
		end_time:end_time
	}
}
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

// get omit
router.get('/get/omit', function (req, res, next) {
	res.json(mockjs.mock({
		'data|11': [/[1-9]{1,3}|0/],
		'issue':/[1-9]{8}/
	}))
});

// get opencode
router.get('/get/opencode', function (req, res, next) {
	var issue=makeIssue().issue;
	var data=mockjs.mock({
		'data': [/[1-3]/,/[4-5]/,/[6-7]/,/[8-9]/,/1[0-1]/]
	}).data;
	res.json({
		issue:issue,
		data:data
	})
});


// get state
router.get('/get/state',function(req,res,next){
	var state=makeIssue();
	console.log(state);
	res.json(state)
});


module.exports = router;
