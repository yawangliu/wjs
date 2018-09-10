$(function() {
	$("[href='newsList.html']").click(function() {	
		var dataSubmit={"table": { "tableName": "Pub_Query", "row": {"CurrentPage": "1","PageRecord": "5" } }};
		
		var url='/LiveVideo/admin/news/getNewsList.do';
		var tableId='.newsList table';
		var columndefs= [
			  {
                "targets": 0,
                "data": "",
                "render": function ( data, type, full, meta )
                    {
                        return '<input type="radio" name="newsList">';
                    }
			  },
              {
                    "targets": 1,   "sDefaultContent" : "", 
                    "data": "title",
                    "render": function ( data, type, full, meta ) {                        	
                        	return "<a href='newsDetail.html' target='navTab' id=\'" +full["newsid"]+
                        			"\' onclick='getNewsDetail($(this),event)' style='color:blue;' " +
                        			"title='新闻详细信息'>"+data +'</a>';
                        	
                    	}   
                },{
                    "targets": 2,"sDefaultContent" : "", 
                    "data":"publishtime"
                },{
                      "targets": 3,"sDefaultContent" : "", 
                      "data":"createby"
                }   ];	
		getTableContent(dataSubmit,url, tableId,columndefs);
		});
	 $('.pdf').media({width:450, height:350});//
}) ; 


	function newsSearch(){
		var dataSubmit={"table": { "tableName": "Pub_Query", "row": {"CurrentPage": "1","PageRecord": "20" } }};
		var url='/LiveVideo/admin/news/getNewsList.do';
		var tableId='.newsList table';
		var columndefs= [
		   			  {
		                   "targets": 0,
		                   "data": "",
		                   "render": function ( data, type, full, meta )
		                       {
		                           return '<input type="radio" name="newsList">';
		                       }
		   			  },
		                 {
		                       "targets": 1,   "sDefaultContent" : "", 
		                       "data": "title",
		                       "render": function ( data, type, full, meta ) {                        	
		                           	return "<a href='newsDetail.html' target='navTab' id=\'" +full["newsid"]+
		                           			"\' onclick='getNewsDetail($(this),event)' style='color:blue;' " +
		                           			"title='会员详细信息'>"+data +'</a>';
		                           	
		                       	}   
		                   },{
		                       "targets": 2,"sDefaultContent" : "", 
		                       "data":"publishtime"
		                   },{
		                         "targets": 3,"sDefaultContent" : "", 
		                         "data":"createby"
		                   } ];		
		var dataRow=dataSubmit.table.row;		
		var caption = $("#caption").val();		
		var startTime =$("#startTime17").val();
		var endTime =$("#endTime17").val();
		if(startTime >endTime){
			alert("开始时间不能大于结束时间");
			return $("[href='newsList.html']").click();	
		}
		if(caption !=""){
			dataRow.title=caption;
//			alert(caption);
		}if(startTime !=""){
			dataRow.starttime=startTime;
			alert(startTime);
		}if(endTime !=""){
			dataRow.endtime=endTime;
		}
		getTableContent(dataSubmit,url, tableId,columndefs);
	}	
	
	function uploadFile1(){  //提交文件方法
		var formData = new FormData();
		 if(confirm("确定要添加附件吗?")){
		 	formData.append('file', $('#news1')[0].files[0]);		 	 
		 	$.ajax({
		 	    url: '/LiveVideo/admin/course/upload.do',
		 	    type: 'POST',
		 	    cache: false,
		 	    data: formData,
		 	    processData: false,
		 	    contentType: false
		 	}).done(function(res) {
		 		console.log(res);
		 		$(".newsAdd input:eq(3)").attr("name",res.datas.table.row.contentid);
		 		//用户修改 
				var dataRow5=res.datas.table.row;
				$(".newsAdd a").attr("href",dataRow5.fullname);
				//$(".newsAdd a").html(dataRow5.filename);

			     
		 	}).fail(function(res) { 
		 		alert("附件上传失败！");
		 	});	 	} 
		}

	function   getNewsDetail(obj,event){    //获取新闻详情
		event.preventDefault(); 	 
		var dataSubmit={"table": { "tableName": "Pub_Query", "row": { } }};	
		var url=unescape(obj.attr("href")).replaceTmById($(event.target).parents(".unitBox:first"));  	
		var data1=dataSubmit.table.row;
		data1.newsid=obj.attr("id");
		console.log(dataSubmit);
		navTab.reload(url);  		
		$.ajax({
			type : "post",   
			url : "/LiveVideo/admin/news/getNewsInfo.do",
			dataType : "json",
			data :{"datas":JSON.stringify(dataSubmit)} ,
			error : function() {
				alert("数据加载失败，请重新加载...");		
			},
			success : function(data) {			
				console.log(data);
				var dataRow=data.datas.table.row;	
				$(".newsDetail dd:eq(0)").html(dataRow.title);		
				$(".newsDetail dd:eq(1)").html(dataRow.publishtime);		
				$(".newsDetail dd:eq(2)").html(dataRow.createby);		
				$(".newsDetail dd:eq(3)").html(dataRow.attachment);		
				$(".newsDetail textarea").html(dataRow.contents);
				
				if(data.datas.table.row.table!=undefined){  
					var dataRow1=data.datas.table.row.table.row[0];
					$(".newsDetail a").attr("href",dataRow1.fullname);
					$(".newsDetail a").html(dataRow1.filename);

			}
			}
		});	   
 }
	
	function deleteNewsRecord(obj,event) {	   //删除选中记录  :checked
		event.preventDefault(); 	
		var dataSubmit={"table": { "tableName": "Pub_Query", "row": {  } }};
		var dataRow=dataSubmit.table.row;
		var url=obj.attr("href");
		var delChecked=obj.parents('.pageContent').find("td input:checked");
		if(delChecked.length==0){
			alert("请选定一条记录！");
		}
		else if(confirm("确定要删除选定记录吗?")){
			var str="";
			str+=delChecked.eq(i).parent('td').next().children().attr("id");
				
			dataRow.newsid=str;
			$.ajax({
				type : "get",
				url : url,
				dataType : "json",
				data :{"datas":JSON.stringify(dataSubmit)} ,
				error : function() {
					alert("数据加载失败，请重新加载...");		
				},
				success : function(data) {
					console.log(data);
					if(data.result==1){
						alert("删除成功");		
						$("button.newsList").click();
					}					
				}
			});	
		}		
	}
	function reviseNewsRecord (obj,event) {	   //修改选中新闻记录  :checked
		event.preventDefault(); 	
		var dataSubmit={"table": { "tableName": "Pub_Query", "row": {  } }};
		var dataRow=dataSubmit.table.row;
		var url=obj.attr("href");
		var delChecked=obj.parents('.pageContent').find("td input:checked");
		var str="";
		if(delChecked.length==0){alert("请选择一条记录！");  }else{
			str=delChecked.eq(0).parent('td').next().children().attr("id");	
		dataRow.newsid=str;
		navTab.reload("newsAdd.html");  	
		$.ajax({
			type : "post",
			url : url,
			dataType : "json",
			data :{"datas":JSON.stringify(dataSubmit)} ,
			error : function() {
				alert("数据提交失败，请重新提交...");		
			},
			success : function(data) {	
				console.log(data);
				if(data.result==1){
					var dataRow=data.datas.table.row;	
					if(dataRow.title!=""){$(".newsAdd input:eq(0)").val(dataRow.title);}
						if(dataRow.newsid!=""){$(".newsAdd input:eq(0)").attr("id",dataRow.newsid);}
					if(dataRow.publishtime!=""){$(".newsAdd input:eq(1)").val(dataRow.publishtime);}
					if(dataRow.createby!=""){$(".newsAdd input:eq(2)").val(dataRow.createby);}
//					$(".newsAdd input:eq(3)").val(dataRow.attachment);
					if(dataRow.contents!=""){$(".newsAdd textarea").val(dataRow.contents);}
					
//					$(".newsAdd input:eq(2)").attr("href",dataRow.fullname);
					$(".newsAdd a").attr("href",dataRow.fullname);
//					alert(dataRow.fullname);
					//console.log(data.datas.table.row.table);
					//附件上传
					if(data.datas.table.row.table!=undefined){  	
						var dataRow1=data.datas.table.row.table.row[0];
						$(".newsAdd a").attr("href",dataRow1.fullname);
						$(".newsAdd a").html(dataRow1.filename);
						}						
				}}
		});	
	}}	
	function validateCallback_23(form,fn) {   //提交新闻表单
	    var $form = $(form);  
	    var dataSubmit=fn();
	    console.log(dataSubmit);
	        //验证表单如果有非法字段 返回  
	    if (!$form.valid()) {  
	        return false;  
	    }  	 
	    $.ajax({  
	        type: form.method || 'POST',  
	        url:$form.attr("action"),  
	        //获取表单的内容数据  
	        data:  {"datas":JSON.stringify(dataSubmit)},  // 
	        dataType:"json",  
	        cache: false,  
	        //执行回调函数  
	        success: function(data) {				
	    	    if(data.result==1){
	    	    	alert("保存成功");		
	    	    	$("[href='newsList.html']").click();
	    	    }					
	    	},  
	        error: function() {
				alert("保存失败，请重新保存...");	  } 
	    });  
	        //保证不会通过普通表单提交  
	        return false;  
	}

	function getNewsFormContent(){
		//2017.5.13 修改处...
	 	var dataSubmit = {"table": { "tableName": "Pub_Query", "row": {"CurrentPage": "1","PageRecord": "20","table":{"row":[{}]}} }};	
	 	var dataRow=dataSubmit.table.row;
	 	var dataRow4=dataSubmit.table.row.table.row[0];
	 	alert("aaa");
		var title = $(".newsAdd input:eq(0)").val();		
		var publishtime = $(".newsAdd input:eq(1)").val();
		var createby = $(".newsAdd input:eq(2)").val();
		var contents = $(".newsAdd textarea").val(); 
		
		var contentid = $(".newsAdd input:eq(3)").attr("name");
		var newsid = $(".newsAdd input:eq(0)").attr("id");
		
		if(title !=""){
			dataRow.title =title;
		}if(publishtime !=""){
			dataRow.publishtime =publishtime;
		}if(createby !=""){
			dataRow.createby=createby;
		}if(contents !=""){
			dataRow.contents=contents;
		}if(contentid !=""){
			dataRow4.contentid=contentid; 
		}
		console.log(dataSubmit);
		return dataSubmit;		
	}
	
	//-----------------------------------------------------------------
	/*function deleteNewsAnnex(obj,event) {	   //删除选中附件  
		event.preventDefault(); 	
		var dataSubmit={"table": { "tableName": "Pub_Query", "row": {  } }};
		var dataRow=dataSubmit.table.row;
		var url=obj.attr("href");
		var delChecked=obj.parents('.pageContent').find("td input:checked");
		if(delChecked.length==0){
			alert("请选定一条记录！");
		}
		else if(confirm("确定要删除选定记录吗?")){
			var str="";
			str+=delChecked.eq(i).parent('td').next().children().attr("id");
				
			dataRow.newsid=str;
			$.ajax({
				type : "get",
				url : url,
				dataType : "json",
				data :{"datas":JSON.stringify(dataSubmit)} ,
				error : function() {
					alert("数据加载失败，请重新加载...");		
				},
				success : function(data) {
					console.log(data);
					if(data.result==1){
						alert("删除成功");		
						$("button.newsList").click();
					}					
				}
			});	
		}		
	}*/