---
layout: post
title: "���node.js�ĵ��߳�"
description: "how to understand the signal thread of node.js"
category: node.js
tags: 
  - node.js
---
{% include JB/setup %}

## һ��node�ǵ��̣߳� why��

�ܼ򵥵�һ����֤��������֪�����ԡ�����ΪӦ������ȷ�ģ� ֱ��������ɡ�

	var http = require("http"),
		_global = 0;
	
	http.createServer(function(req, res) {
		_global += 1;
		console.log(_global);
		
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end();
	}).listen(8000);
	
�뷨�ܼ򵥣�node��һ����������Ȼ�������������ö˿ڣ��۲�`_global`ȫ�ֱ����Ƿ��˳�����ӣ�����Ĳ��Դ��룺

	var http = require("http"),
		num = 0;
		
	var options = {
		host: "localhost",
		path: "/",
		method: "get",
		port: "8000",
		headers: {
			"Content-Type":"application/x-www-form-urlencoded; charset=utf8"
		}
	}
	
	var oTimer = setInterval(function() {
		var req=http.request(options,function(res){
			res.on("end", function() {
				console.log(num++);
			});
		});
		
		req.end();
	}, 4);

<!--more-->	
���Գ���Ҳ�ܼ򵥣����ö�ʱ����ÿ4ms�����������һ������Ȼ����20��������ʱ����ÿ���žͻ������20 * (1000 / 4) = 5000������

## ���Խ��

�������еı���`_global`�������ӣ����޳��ֲ��

PS����֪�����������˵��ʲô������ʲôҲ����˵���������Լ���node��һ�����԰ɡ�����֪����������²�������޸�ͬһ���ڴ�������