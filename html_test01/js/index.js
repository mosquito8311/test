var nameCard = new Array();
var nameCardL;
var max_Y=2;
var max_X=2;
var peoples = [{"photo":"/upload/0/46/big.jpg","name":"张三(总监)","company":"公司：中国微软","industry":"行业：计算机","phone":"手机：18997203","fix":"传真：010-1111111","address":"地址：北京光华路22号光华soho3座1716","email":"E-mail：www.theindex.com","postcode":"邮编：010000"},
              {"photo":"/upload/0/47/big.jpg","name":"李四(总监)","company":"公司：中国微软","industry":"行业：计算机","phone":"手机：18997203","fix":"传真：010-1111111","address":"地址：北京光华路22号光华soho3座1716","email":"E-mail：www.theindex.com","postcode":"邮编：010000"},
              {"photo":"/upload/0/48/big.jpg","name":"王五(总监)","company":"公司：中国微软","industry":"行业：计算机","phone":"手机：18997203","fix":"传真：010-1111111","address":"地址：北京光华路22号光华soho3座1716","email":"E-mail：www.theindex.com","postcode":"邮编：010000"},
              {"photo":"/upload/0/49/big.jpg","name":"赵六(总监)","company":"公司：中国微软","industry":"行业：计算机","phone":"手机：18997203","fix":"传真：010-1111111","address":"地址：北京光华路22号光华soho3座1716","email":"E-mail：www.theindex.com","postcode":"邮编：010000"},
              {"photo":"/upload/0/50/big.jpg","name":"刘七(总监)","company":"公司：中国微软","industry":"行业：计算机","phone":"手机：18997203","fix":"传真：010-1111111","address":"地址：北京光华路22号光华soho3座1716","email":"E-mail：www.theindex.com","postcode":"邮编：010000"},
              {"photo":"/upload/0/51/big.jpg","name":"李家诚(总监)","company":"公司：中国微软","industry":"行业：计算机","phone":"手机：18997203","fix":"传真：010-1111111","address":"地址：北京光华路22号光华soho3座1716","email":"E-mail：www.theindex.com","postcode":"邮编：010000"},
              {"photo":"/upload/0/52/big.jpg","name":"李开复(总监)","company":"公司：中国微软","industry":"行业：计算机","phone":"手机：18997203","fix":"传真：010-1111111","address":"地址：北京光华路22号光华soho3座1716","email":"E-mail：www.theindex.com","postcode":"邮编：010000"},
              {"photo":"/upload/0/53/big.jpg","name":"石康(总监)","company":"公司：中国微软","industry":"行业：计算机","phone":"手机：18997203","fix":"传真：010-1111111","address":"地址：北京光华路22号光华soho3座1716","email":"E-mail：www.theindex.com","postcode":"邮编：010000"},
              {"photo":"/upload/0/54/big.jpg","name":"王朔(总监)","company":"公司：中国微软","industry":"行业：计算机","phone":"手机：18997203","fix":"传真：010-1111111","address":"地址：北京光华路22号光华soho3座1716","email":"E-mail：www.theindex.com","postcode":"邮编：010000"},
              {"photo":"/upload/0/55/big.jpg","name":"潘石屹(总监)","company":"公司：中国微软","industry":"行业：计算机","phone":"手机：18997203","fix":"传真：010-1111111","address":"地址：北京光华路22号光华soho3座1716","email":"E-mail：www.theindex.com","postcode":"邮编：010000"},
              {"photo":"/upload/0/46/big.jpg","name":"Greg(CEO)","company":"公司：北京因动思网络科技有限责任公司","industry":"行业：计算机","phone":"手机:18997203","fix":"传真：010-1111111","address":"地址：北京朝阳区光华路22号光华soho3座1716","email":"E-mail：www.theindex.com","postcode":"邮编：010000"},
              {"photo":"/upload/0/2/big.jpg","name":"王朝阳(总监)","company":"公司：中国微软","industry":"计算机","phone":"手机:18997203","fix":"传真：010-1111111","address":"地址：北京光华路22号光华soho3座1716","email":"E-mail：www.theindex.com","postcode":"邮编：010000"},];
var peopleAttr=["photo","name","industry","company","phone","fix","email","address","postcode"];
$(function() {
	/**
	 *初始化用户名、密码输入的提示语框 
	 */
	initInput();
	/**
	 * 设置logo居中
	 */
	 setLogoCenter();
	/**
	 *设置DIV圆角
	 */
	 $('.corner').each(function(){
		 $(this).width(this.clientWidth);
		 $(this).corner("round 8px").parent().css('padding', '2px').corner("round 10px");
	 });
	 
	 /**
	  * 语言设置 
	  */
	 $('#language').change(function(){
		 var date = new Date(); 
		 date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000)); 
		 $.cookie('config[language]', $(this).val(), { path: '/',expires: date }); 
		 window.location.reload();
		 return false;
	 });
	 
	 
	 /**
	  * 也在使用区域的图片滚动；
	  */
	 $("#foo1").carouFredSel({
			circular: false,
			infinite: false,
			auto 	: false,
			scroll	: {
				items	: "page"
			},
			prev	: {	
				button	: "#foo1_prev",
				key		: "left"
			},
			next	: { 
				button	: "#foo1_next",
				key		: "right"
			},
		});
	 $('#foo2').carouFredSel({
			prev: '#foo2_prev',
			next: '#foo2_next',
			auto: false,
		});

	/**
	 * 随机切换广场名片
	 */
	nameCardInit();
	window.setInterval(function(){
		var changeType = GetRandomNum(1,4);
		//设定变化方式的概率，使1的概率为70%
		var radom = GetRandomNum(0,9);
		if(radom>=0 && radom<=7){
			changeType = 1;
		}
		var gridX;
		var gridY;
		switch(changeType){
			case 1:
				gridX = GetRandomNum(0,2);
				gridY = GetRandomNum(0,2);
				break;
			case 2:
				gridX = 0;
				gridY = GetRandomNum(0,2);
				break;
			case 3:
				gridX = GetRandomNum(0,1);
				gridY = GetRandomNum(0,1);
				break;
			case 4:
				gridX = 0;
				gridY = 0;
				break;
			case 5:
				gridX = GetRandomNum(0,1);
				gridY = 0;
				break;
			case 6:
				gridX = 0;
				gridY = GetRandomNum(0,1);
				break;
			
		}
		nameCardFlush(gridX,gridY,changeType);
	}, 3000);
});
/**
 * 设置logo居中
 */
function setLogoCenter(){
	var l = $('.title_public');
	var w = $('body').width();
	l.offset({left:(w-l.width())/2-9});
}
/**
 *初始化用户名、密码输入的提示语框 
 */
function initInput(){
	var tv = $('#username_text').val();
	var u = $('#username').addClass('m_gray').val(tv);
	$('#password_text').addClass('m_gray').live('focus',function(){
		$('#password').show().val('').focus();
		$(this).hide();
	});
	$('#password').live('blur',function(){
		if($(this).val().length==0) {
			$('#password_text').show();
			$(this).hide();
		}
	});
	u.focus(function(){
		var v = $(this).val();
		if(v==tv){
			$(this).val('').removeClass('m_gray').addClass('m_balck');
		}  
	});
	u.blur(function(){
		if(u.val().length<1){
			u.val(tv).removeClass('m_balck').addClass('m_gray');
		}
	});
}
/**
 * 随机刷新广场名片
 * gridX:随机数0-2,表示二维九宫格某个单元格的X值；
 * gridY:随机数0-2,表示二维九宫格某个单元格的Y值
 * changeType:随机数1-6,表示以何种方式改变
 *            1:拆成九宫格;
 *            2:3格竖向合并;
 *            3:4格合并;
 *            4:9格合并;
 *            
 */
function nameCardFlush(gridX,gridY,changeType){
	nameCardClassInit();
	switch(changeType){
		case 1:
			newNameCardAddClass(nameCard[gridX][gridY],'grid_1');
			break;
		case 2:
			for(i=0;i<=max_X;i++){
				nameCardHide(nameCard[i][gridY]);
			}
			newNameCardAddClass(nameCard[gridX][gridY],'grid_3');
			break;
		case 3:
			//向右下合并
			for(i=gridX;i<=gridX+1;i++){
				for(j=gridY;j<=gridY+1;j++){
					nameCardHide(nameCard[i][j]);
				}
			}
			newNameCardAddClass(nameCard[gridX][gridY],'grid_4');
			break;
		case 4:
			nameCardHide(nameCardL);//隐藏所有单元格
			newNameCardAddClass(nameCard[gridX][gridY],'grid_9');
			break;
		
	}
	newNameCardShow(nameCard[gridX][gridY],'x');
}


function nameCardHide(obj){
	obj.hide();
}
function newNameCardShow(obj,html){
	var newPeople = peoples[GetRandomNum(0,11)];
	obj.fadeOut("fast",function(){
		//加载随机用户的名片信息
		for(var key in newPeople){
			if(key=="photo"){
				obj.find("[tag='"+key+"']").attr('src',$('#baseUrl').val()+newPeople[key]);
			}else{
				obj.find("[tag='"+key+"']").text(newPeople[key]);
			}
		}
		obj.fadeIn("slow");
	});
	
}
function newNameCardAddClass(obj,className){
	obj.removeClass();
	obj.addClass(className+' nameCardBackColor_1');//加载随机背景颜色；
}
function nameCardClassInit(){
	nameCardL.removeClass();
	nameCardL.addClass('grid_1 nameCardBackColor_default');
	nameCardL.show();
}
function nameCardInit(){
	nameCardL = $('.nine_grid li');
	//生成九宫格
	nameCardClassInit();
	nameCardL.each(function(index){
		var html="<div>";
		for(i=0;i<peopleAttr.length;i++){
			if(i==0){
				html+='<img tag="'+peopleAttr[i]+'" src="'+$('#baseUrl').val()+peoples[index][peopleAttr[i]]+'"/>';
			}else{
				if(i==1){
					style='font-weight: bold';
				}else{
					style='';
				}
				html+='<span tag="'+peopleAttr[i]+'" style="'+style+'">'+peoples[index][peopleAttr[i]]+'</span>';
			}
		}
		$(this).empty();
		$(this).append(html+"</div>");
	});
	for(i=0;i<3;i++){
		nameCard[i] = new Array();
	}
	nameCard[0][0]=$('#namecard_1');
	nameCard[0][1]=$('#namecard_2');
	nameCard[0][2]=$('#namecard_3');
	nameCard[1][0]=$('#namecard_4');
	nameCard[1][1]=$('#namecard_5');
	nameCard[1][2]=$('#namecard_6');
	nameCard[2][0]=$('#namecard_7');
	nameCard[2][1]=$('#namecard_8');
	nameCard[2][2]=$('#namecard_9');
	
}
function GetRandomNum(Min,Max){   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}

