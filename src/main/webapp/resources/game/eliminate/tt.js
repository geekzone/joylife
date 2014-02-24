var $ = function (id) {//���㰴id��ȡ
	return document.getElementById(id);
};
var arrAll = new Array();
var iTimeE = 60;
var iScore = 0;
var bMark = false;//�Ƿ���ۻ���

function init(){//����ģ��
	var oCon = $("mainDiv");
	var arrDiv0 = new Array();//7�������򡮵�����
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

function beforeBegin() {//��ʾ3��2��1Ԥ������ʱ
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
function gameHandler(){//60�뵹��ʱ
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
		oBeginDiv.innerHTML ="<span style='width: 343px;height: 438px;color: white;font-size: 50;font-weight: bold;line-height: 438px;'>�÷֣�"+iScore+"!</span>";
	}
}


function initCanDelete(){//��Ϸ��ʼǰ�������󣬺��ƶ��������¼��ء��������������������ͨ��
	var bInit = false;//�Ƿ��п�������
	for(var i=0;i<7;i++){
		for(var j=0;j<7;j++){
			var deDivs = ifCanDelete(arrAll[i][j]);
			if(deDivs.length>0){
				deleteDivs(deDivs);
				fillAllArr();//ɾ�������
				bInit = true;
			}
		}
	}

	if(bInit){//Ϊtrue��֤���ղ���������
		initCanDelete();//�ղ�����������λ�ñ䶯�����ٱ���һ��
	}else{
		bMark = true;
	}
}
function deleteDivs(arr){//������ɾ��div
	for(var n=0;n<arr.length;n++){
		var iDexy = findIndex(arr[n]);
		if(typeof(iDexy)!="undefined"){
			arrAll[iDexy.ri].splice(iDexy.rj,1);
			arr[n].parentNode.removeChild(arr[n]);
			if(bMark){
				iScore+=10;//��10��
				$("iMark").innerHTML = iScore+"";
			}
		}
	}
}

var moveable = false;
var oSelectDiv;
function createDiv(iLeft,ibottom){//����div
	var oDiv = document.createElement("div");
	oDiv.style.backgroundImage="url(img/zImg_"+Math.round(Math.random()*6)+".jpg)";
	oDiv.style.left = iLeft + "px";
	oDiv.style.bottom = ibottom + "px";
	oDiv.style.MozUserSelect="none"
	var posEx,posEy;
	oDiv.onmousedown=function(e){
		e = e ? e : (window.event ? window.event : null);
		posEx = e.clientX;//�������ʱͬʱ��ס���λ��
		posEy = e.clientY;
		
		moveable = true;
		oSelectDiv=this;
		oSelectDiv.style.zIndex = 100;
    };
	var oBro;//����div
	oDiv.onmousemove=function(e){
        e = e ? e : (window.event ? window.event : null); 
		
		if(moveable){
			var indexXY = findIndex(oSelectDiv);
			var eMoveLeft = e.clientX - posEx;
			var eMovebottom = e.clientY - posEy;
			var iBroi,iBroj;//��div��λ��
			
			if(Math.abs(eMoveLeft)>Math.abs(eMovebottom)){
				if(Math.abs(eMoveLeft)<49){
					iBroi = eMoveLeft>0?indexXY.ri+1:indexXY.ri-1;//������λ�������ж����������ĸ�div����
					iBroj = indexXY.rj;
					if(iBroi>=0&&iBroi<7){//��ֹ��Եʱȡ��������Ԫ��
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
		
	arrAll[indexIJ_L.ri][indexIJ_L.rj] = oIdiv;//��������λ��
	arrAll[indexIJ_I.ri][indexIJ_I.rj] = oLdiv;
	
	var arryI = ifCanDelete(oIdiv);
	var arryL = ifCanDelete(oLdiv);
	
	if(arryI.length==0&&arryL.length==0){//���û���������᷵��λ��
		oIdiv.style.left = indexIJ_I.ri*49;//��ԭλ��
		oIdiv.style.bottom = indexIJ_I.rj*49;
	
		oLdiv.style.left = indexIJ_L.ri*49;//v
		oLdiv.style.bottom = indexIJ_L.rj*49;
		
		arrAll[indexIJ_L.ri][indexIJ_L.rj] = oLdiv;
		arrAll[indexIJ_I.ri][indexIJ_I.rj] = oIdiv;
	}else{
		oIdiv.style.left = indexIJ_L.ri*49;//��div��ԭλ�ø�ԭdiv
		oIdiv.style.bottom = indexIJ_L.rj*49;
	
		oLdiv.style.left = indexIJ_I.ri*49;//ԭdiv��ԭλ�ø���div
		oLdiv.style.bottom = indexIJ_I.rj*49;
		
		if(arryI.length>0){
			deleteDivs(arryI);
		}
		
		if(arryL.length>0){
			deleteDivs(arryL);
		}
		fillAllArr();//ɾ�������
		initCanDelete();//�Ƿ���������������
	}
	oIdiv.style.backgroundImage;
}

function ifCanDelete(obj){//�鿴ĳ��div�ĵ�ǰλ���Ƿ�����������ص��ǿ�������div����
	var colorI = obj.style.backgroundImage;
	var ifx = findIndex(obj).ri;
	var ify = findIndex(obj).rj;

	var arrLeft = new Array();
	var arrbottom = new Array();
	
	if(ifx-1>=0){//ȡ����һ��
		var l1 = findColor(ifx-1,ify);
		if(l1==colorI){
			arrLeft[arrLeft.length] = arrAll[ifx-1][ify];
			if(ifx-2>=0){//�������һ����ͬ��ȡ�ڶ�������Ȼ�����ܱ߽�0
				var l2 = findColor(ifx-2,ify);
				if(l1==l2)
					arrLeft[arrLeft.length] = arrAll[ifx-2][ify];
			}
		}
	}
	
	if(ifx+1<7){//�Ҳ�ͬ��
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
	
	if(ify-1>=0){//�ϲ�
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
	
	if(ify+1<7){//�²�
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
		arrLeft[arrLeft.length] = obj;//ͬʱ�����˼���ԭ����div
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

function findColor(ix,iy){//��λ�õõ�����ɫ
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

function fillAllArr(){//��������ȱʧ����
	for(var i=0;i<7;i++){
		if(arrAll[i].length<7){//�Ƿ�ȱʧ
			for(var k=0;k<arrAll[i].length;k++){//�ȶ���ʣ���div
				arrAll[i][k].style.bottom = k*49 +"px";
			}
			while(arrAll[i].length<7){//�ٲ���div
				var j = arrAll[i].length;
				var oDiv = createDiv(i*49,j*49);
				$("mainDiv").appendChild(oDiv);
				arrAll[i][j] = oDiv;
			}
		}
	}
}

init();