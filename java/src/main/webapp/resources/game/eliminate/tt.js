var $ = function (id) {//方便按id提取
	return document.getElementById(id);
};
var arrAll = new Array();
var iTimeE = 60;
var iScore = 0;
var bMark = false;//是否可累积分

function init(){//加载模型
	var oCon = $("mainDiv");
	var arrDiv0 = new Array();//7个’竖向‘的数组
	var arrDiv1 = new Array();
	var arrDiv2 = new Array();
	var arrDiv3 = new Array();
	var arrDiv4 = new Array();
	var arrDiv5 = new Array();
	var arrDiv6 = new Array();
	var arrDiv7 = new Array();
	
	arrAll = [arrDiv0,arrDiv1,arrDiv2,arrDiv3,arrDiv4,arrDiv5,arrDiv6];
	
	for(var i=0;i<7;i++){
		for(var j=0;j<7;j++){
			var oDiv = createDiv(i*49,j*49);
			oCon.appendChild(oDiv);
			arrAll[i][j] = oDiv;
		}
	}
	initCanDelete();
	beforeBegin();
	setTimeout('gameHandler()',3500);
}

function beforeBegin() {//显示3，2，1预备倒计时
	var oBeginDiv = document.createElement("div");
	oBeginDiv.className = "beforeBegin";
	$("pa").appendChild(oBeginDiv);
	oBeginDiv.innerHTML ="<span style='width: 343px;height: 438px;color: white;font-size: 100;font-weight: bold;line-height: 438px;'>Three!</span>";

	setTimeout(function(){
			oBeginDiv.innerHTML ="<span style='width: 343px;height: 438px;color: white;font-size: 100;font-weight: bold;line-height: 438px;'>Two!</span>";
			setTimeout(function(){
				oBeginDiv.innerHTML ="<span style='width: 343px;height: 438px;color: white;font-size: 100;font-weight: bold;line-height: 438px;'>One!</span>";
					setTimeout(function(){
						oBeginDiv.innerHTML ="<span style='width: 343px;height: 438px;color: white;font-size: 100;font-weight: bold;line-height: 438px;'>Go!</span>";
							setTimeout(function(){$("pa").removeChild(oBeginDiv)},500);
				},1000);
			},1000);
		},1000);
}
function gameHandler(){//60秒倒计时
	if(iTimeE>=0){
		var iWidth = $("handleBar").offsetWidth;
		$("handleBar").style.width = iTimeE/60*90+"%";
		iTimeE-=0.05;
		$("iTime").innerHTML=Math.ceil(iTimeE)+"'";
		setTimeout("gameHandler()",50);
	}else{
		var oBeginDiv = document.createElement("div");
		oBeginDiv.className = "beforeBegin";
		$("pa").appendChild(oBeginDiv);
		oBeginDiv.innerHTML ="<span style='width: 343px;height: 438px;color: white;font-size: 50;font-weight: bold;line-height: 438px;'>得分："+iScore+"!</span>";
	}
}


function initCanDelete(){//游戏开始前，结束后，和移动消除后新加载。可组合消除的先消除掉通用
	var bInit = false;//是否还有可消除的
	for(var i=0;i<7;i++){
		for(var j=0;j<7;j++){
			var deDivs = ifCanDelete(arrAll[i][j]);
			if(deDivs.length>0){
				deleteDivs(deDivs);
				fillAllArr();//删完后填满
				bInit = true;
			}
		}
	}

	if(bInit){//为true则证明刚才消除过。
		initCanDelete();//刚才消除过则有位置变动还得再遍历一次
	}else{
		bMark = true;
	}
}
function deleteDivs(arr){//按数组删除div
	for(var n=0;n<arr.length;n++){
		var iDexy = findIndex(arr[n]);
		if(typeof(iDexy)!="undefined"){
			arrAll[iDexy.ri].splice(iDexy.rj,1);
			arr[n].parentNode.removeChild(arr[n]);
			if(bMark){
				iScore+=10;//加10分
				$("iMark").innerHTML = iScore+"";
			}
		}
	}
}

var moveable = false;
var oSelectDiv;
function createDiv(iLeft,ibottom){//构造div
	var oDiv = document.createElement("div");
	oDiv.style.backgroundImage="url(img/zImg_"+Math.round(Math.random()*6)+".jpg)";
	oDiv.style.left = iLeft + "px";
	oDiv.style.bottom = ibottom + "px";
	oDiv.style.MozUserSelect="none"
	var posEx,posEy;
	oDiv.onmousedown=function(e){
		e = e ? e : (window.event ? window.event : null);
		posEx = e.clientX;//按下鼠标时同时记住鼠标位置
		posEy = e.clientY;
		
		moveable = true;
		oSelectDiv=this;
		oSelectDiv.style.zIndex = 100;
    };
	var oBro;//相邻div
	oDiv.onmousemove=function(e){
        e = e ? e : (window.event ? window.event : null); 
		
		if(moveable){
			var indexXY = findIndex(oSelectDiv);
			var eMoveLeft = e.clientX - posEx;
			var eMovebottom = e.clientY - posEy;
			var iBroi,iBroj;//临div的位置
			
			if(Math.abs(eMoveLeft)>Math.abs(eMovebottom)){
				if(Math.abs(eMoveLeft)<49){
					iBroi = eMoveLeft>0?indexXY.ri+1:indexXY.ri-1;//看鼠标的位移正负判断是左右是哪个div互动
					iBroj = indexXY.rj;
					if(iBroi>=0&&iBroi<7){//防止边缘时取不到相邻元素
						oBro = arrAll[iBroi][iBroj];
						oSelectDiv.style.left = indexXY.ri*49 + eMoveLeft + "px";
						oBro.style.left = iBroi*49 - eMoveLeft + "px";
					}
				}else{
					if(moveable)  {
						moveable = false; 
					}
					this.style.zIndex = "";
					if(oBro!=null)
					changeIndex(oSelectDiv,oBro);
				}
			}else{
				if(Math.abs(eMovebottom)<49){
					iBroj = eMovebottom>0?indexXY.rj-1:indexXY.rj+1;
					iBroi = indexXY.ri;
					if(iBroj>=0&&iBroj<7){
						oBro = arrAll[iBroi][iBroj];
						
						oSelectDiv.style.bottom = indexXY.rj*49 - eMovebottom + "px";
						oBro.style.bottom = iBroj*49 + eMovebottom + "px";
					}
				}else{
					if(moveable){
						moveable = false; 
					}
					oSelectDiv.style.zIndex = "";
					if(oBro!=null)
					changeIndex(oSelectDiv,oBro);
				}
			}
		}
	};	
	oDiv.onmouseup=function (e){
        if(moveable)  {
            moveable = false; 
        }
		oSelectDiv.style.zIndex = "";
		if(oBro!=null)
		changeIndex(oSelectDiv,oBro);
    };
	return oDiv;
}

function changeIndex(oIdiv,oLdiv){
	var indexIJ_I = findIndex(oIdiv);
	var indexIJ_L = findIndex(oLdiv);
		
	arrAll[indexIJ_L.ri][indexIJ_L.rj] = oIdiv;//更改数组位置
	arrAll[indexIJ_I.ri][indexIJ_I.rj] = oLdiv;
	
	var arryI = ifCanDelete(oIdiv);
	var arryL = ifCanDelete(oLdiv);
	
	if(arryI.length==0&&arryL.length==0){//如果没有消除机会返回位置
		oIdiv.style.left = indexIJ_I.ri*49;//回原位置
		oIdiv.style.bottom = indexIJ_I.rj*49;
	
		oLdiv.style.left = indexIJ_L.ri*49;//v
		oLdiv.style.bottom = indexIJ_L.rj*49;
		
		arrAll[indexIJ_L.ri][indexIJ_L.rj] = oLdiv;
		arrAll[indexIJ_I.ri][indexIJ_I.rj] = oIdiv;
	}else{
		oIdiv.style.left = indexIJ_L.ri*49;//临div的原位置给原div
		oIdiv.style.bottom = indexIJ_L.rj*49;
	
		oLdiv.style.left = indexIJ_I.ri*49;//原div的原位置给临div
		oLdiv.style.bottom = indexIJ_I.rj*49;
		
		if(arryI.length>0){
			deleteDivs(arryI);
		}
		
		if(arryL.length>0){
			deleteDivs(arryL);
		}
		fillAllArr();//删完后填满
		initCanDelete();//是否有引起其它消除
	}
	oIdiv.style.backgroundImage;
}

function ifCanDelete(obj){//查看某个div的当前位置是否可消除，返回的是可消除的div数组
	var colorI = obj.style.backgroundImage;
	var ifx = findIndex(obj).ri;
	var ify = findIndex(obj).rj;

	var arrLeft = new Array();
	var arrbottom = new Array();
	
	if(ifx-1>=0){//取左侧第一个
		var l1 = findColor(ifx-1,ify);
		if(l1==colorI){
			arrLeft[arrLeft.length] = arrAll[ifx-1][ify];
			if(ifx-2>=0){//如果左侧第一个相同再取第二个，当然不过能边界0
				var l2 = findColor(ifx-2,ify);
				if(l1==l2)
					arrLeft[arrLeft.length] = arrAll[ifx-2][ify];
			}
		}
	}
	
	if(ifx+1<7){//右侧同理
		var r1 = findColor(ifx+1,ify)
		if(r1==colorI){
			arrLeft[arrLeft.length] = arrAll[ifx+1][ify];
			if(ifx+2<7){
				var r2 = findColor(ifx+2,ify);
				if(r1==r2)
					arrLeft[arrLeft.length] = arrAll[ifx+2][ify];
			}
		}
	}
	
	if(ify-1>=0){//上侧
		var t1 = findColor(ifx,ify-1);
		if(t1==colorI){
			arrbottom[arrbottom.length] = arrAll[ifx][ify-1];
			if(ify-2>=0){
				var t2 = findColor(ifx,ify-2);
				if(t1==t2)
					arrbottom[arrbottom.length] = arrAll[ifx][ify-2];
			}
		}
	}
	
	if(ify+1<7){//下侧
		var b1 = findColor(ifx,ify+1);
		if(b1==colorI){
			arrbottom[arrbottom.length] = arrAll[ifx][ify+1];
			if(ify+2<7){
				var b2 = findColor(ifx,ify+2);
				if(b1==b2)
					arrbottom[arrbottom.length] = arrAll[ifx][ify+2];
			}
		}
	}
	
	if(arrLeft.length>1&&arrbottom.length>1){
		for(var k=0;k<arrbottom.length;k++){
			arrLeft[arrLeft.length] = arrbottom[k];
		}
		arrLeft[arrLeft.length] = obj;//同时别忘了加上原来的div
		return arrLeft;
	}else if(arrLeft.length>1||arrbottom.length>1){
		if(arrLeft.length>1){
				arrLeft[arrLeft.length] = obj;
				return arrLeft;
			}else{
				arrbottom[arrbottom.length] = obj;
				return arrbottom;
			}
	}else{
		return [];
	}
}

function findColor(ix,iy){//按位置得到背景色
	return arrAll[ix][iy].style.backgroundImage;
}

function findIndex(obj){
	for(var i=0;i<7;i++){
		for(var j=0;j<7;j++){
			if(obj===arrAll[i][j]){
				return {ri:i,rj:j};
			}
		}
	}
};

function fillAllArr(){//补齐所有缺失数组
	for(var i=0;i<7;i++){
		if(arrAll[i].length<7){//是否缺失
			for(var k=0;k<arrAll[i].length;k++){//先对齐剩余的div
				arrAll[i][k].style.bottom = k*49 +"px";
			}
			while(arrAll[i].length<7){//再补齐div
				var j = arrAll[i].length;
				var oDiv = createDiv(i*49,j*49);
				$("mainDiv").appendChild(oDiv);
				arrAll[i][j] = oDiv;
			}
		}
	}
}

init();