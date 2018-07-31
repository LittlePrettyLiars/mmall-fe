/*
* @Author: E2
* @Date:   2017-11-20 10:01:58
* @Last Modified by:   E2
* @Last Modified time: 2017-11-20 11:15:30
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm           = require('util/mm.js');
var _payment         = require('service/payment-service.js');
var templateIndex = require('./index.string');

//page逻辑部分
var page = {
	data:{
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init: function(){
		this.onLoad();
	},
	onLoad : function(){
		this.loadPaymentInfo();	
	},
	//加载订单列表
	loadPaymentInfo :function(){
		var _this = this,
			PaymentHtml = '',
			$pageWrap = $('.page-wrap');		
		$pageWrap.html('<div class="loading"></div>');
		_payment.getPaymentInfo(this.data.orderNumber,function(res){
			//渲染html
			PaymentHtml =  _mm.renderHtml(templateIndex,res);
			$pageWrap.html(PaymentHtml);
			_this.listenOrderStatus();
		},function(errMsg){
			$pageWrap.html('<p class="err-tips">'+ errMsg +'</p>')
		});
	},
	//监听订单状态
	listenOrderStatus : function(){
		var _this =  this;
		this.paymentTimber = window.setInterval(function(){
			_payment.getPaymentStatus(_this.data.orderNumber,function(res){
				if(res == true){
					window.location.href 
						= './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
				}
			},function(errMsg){
				_mm.err-tips(errMsg);
			})
		},5e3);
	}
};

$(function(){
	page.init();
});
