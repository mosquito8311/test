function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}

function empty(variable) {
	if(variable == null || isUndefined(variable) || variable.length == 0) 
		return true;
	return false;
}
function popupMsg(msg, second) {
	art.dialog({
		title: 'Hint',
		content: msg
	}).time(second);
	document.execCommand("stop");
}
function ajax(url, data, success, dataType, type) {
	if(empty(dataType)) 
		dataType = 'json';
	if(url.indexOf('?')>1)
		url += '&ajax=1';
	else 
		url += '?ajax=1';
	if(url.indexOf($CONFIG.domain)<0)
		url = $CONFIG.domain + url;
	jQuery.ajax({
		url:url,
		data:data,
		type: type,
		dataType: dataType,
		success:function(data){
			success(data);
		}
	});
}
var authCode = {
	send: function(type, mobile) {
		if(empty(mobile) || mobile.length!=11) {
			alert('mobile length error');
			return false;
		}
		switch (type) {
			case 1: var success = this.sendRegisterCodeSucc;break;
			case 2: var success = this.sendClaimCodeSucc;break;
		}
		var url = '/api/SendAuthCode';
		var data = {validate_type:type, mobile: mobile};
		ajax(url, data, success, 'json', 'post');
	},
	sendSucc: function(data) {
		if(!empty(data.msgId))
			$('#CreateAccountByPhone_msg_id').val(data.msgId)
	},
	sendRegisterCodeSucc: function(data)
	{
		authCode.sendSucc(data);
	},
	sendClaimCodeSucc: function(data)
	{
		authCode.sendSucc(data);
	},
};

// ajax hint search
var AJAX_HINT = {
	last_key : '',
	in_hint_div : 0,
	get_avatar : function(img) {
		if(img == '') {
			return $CONFIG.domain + "/images/default_avatar.png";
		}
		return img;
	},
	li_href : function(value) {
		if(value.verified == 1) {
			return $CONFIG.domain + '/profiles/view/'+value.uid;
		} else {
			return $CONFIG.domain + '/namecard/view/'+value.uid;
		}
	},
	search : function(obj){
		var ajax_hint = $('.ajax_hint');
		obj.onblur = function(){
			if(AJAX_HINT.in_hint_div == 0) {
				ajax_hint.hide();
			}
		};
		obj.onfocus = function(){AJAX_HINT.search(obj)};

		var key = obj.value;
		if(key.length < 1) {
			ajax_hint.hide();
			return false;
		}

		// this search key is equal to the last search key
		if(this.last_key == key) {
			AJAX_HINT.last_key = key;	//record this search key
			ajax_hint.show();
			return false;
		}
		AJAX_HINT.last_key = key;

		$.ajax({
			url: $CONFIG.domain + '/api/ajaxHintSearch?key='+key,
			dataType:'json',
			success:function(data){
				if(data.length > 0) {
					var ul_div = $('<ul>');
					for(var i in data) {
						var li_div = $('<li durl="'+AJAX_HINT.li_href(data[i])+'"><dt>'+
							'<img width="40px" src="'+ AJAX_HINT.get_avatar(data[i].photoUrl)+'"/></dt>'+
							'<dd><span>'+data[i].name+'</span>'+
							'<p class="area txtb"> '+data[i].hint+'</p></dd></li>');
						li_div.click(function(){location.href = $(this).attr('durl');});
						ul_div.append(li_div);
					}

					$('.ajax_hint').show();
					$('.ajax_hint').mouseover(function(){AJAX_HINT.in_hint_div=1})
						.mouseout(function(){obj.focus(); AJAX_HINT.in_hint_div=0;}
					);
					$('.ajax_hint').html(ul_div);
					$('img').error(function(){this.src = $CONFIG.domain + "/images/default_avatar.png"});
				} else {
					$('.ajax_hint').html('').hide();
				}
			}
		});
	}
}
// date select
var BirthdaySelect = {
	MonHead : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	initDay : function(select) {
		var year = $("#Profiles_birthdate_year").val();
		var month = $("#Profiles_birthdate_month").val();
		var n = this.MonHead[month - 1];
		this.writeDay(n, select);
	},
	yearChange : function() {
		var year = $("#Profiles_birthdate_year").val();
		var month = $("#Profiles_birthdate_month").val();
		var n = this.MonHead[month - 1];
		if (month ==2 && this.IsPinYear(year))
			this.writeDay(++n, 0);
	},
	monthChange : function() {
		var year = $("#Profiles_birthdate_year").val();
		var month = $("#Profiles_birthdate_month").val();
		var n = this.MonHead[month - 1];
		if (month ==2 && this.IsPinYear(year)) n++;
		this.writeDay(n, 0);
	},
	writeDay : function(n, select) {
		var s = '';
		for (var i=1; i<(n+1); i++) {
			var select_str = '';
			if(select == i)
				select_str = "selected=selected";
			s += "<option value='" + i + "' "+select_str+"> " + i + "</option>\r\n";
		}
		$("#Profiles_birthdate_day").html(s);
	 },
	 IsPinYear : function(year) {
		return(0 == year%4 && (year%100 !=0 || year%400 == 0));
	 }
};
$(function(){
	$('img').error(function(){this.src = $CONFIG.domain + "/images/default_avatar.png"});

	// auto show note for input text
	function filter_name(name) {
		name = name.replace('[', '_');
		name = name.replace(']', '');
		return name;
	}
	var auto_text = {};
	$('.auto_text').each(function(){
		if(this.value.length > 0 && this.name)
			eval("auto_text."+filter_name(this.name)+"='"+this.value+"'");
			$(this).addClass('m_gray');
	});
	$('.auto_text').live({
		focus:function(){
			eval("var ori_value = auto_text."+filter_name(this.name));
			if(ori_value && this.value == ori_value) {
				this.value = '';
			}
			$(this).removeClass('m_gray').addClass('m_black');
		},
		blur:function(){
			if(this.value == '') {
				eval("var ori_value = auto_text."+filter_name(this.name));
				if(ori_value)
					this.value = ori_value;
			}
			$(this).removeClass('m_black').addClass('m_gray');
		}
	});
	$(".mouse_event").live({
        mouseenter:function(){
			$(this).children('ul').show();
        },
        mouseleave:function(){
            $(this).children('ul').hide();
        }
	});
});