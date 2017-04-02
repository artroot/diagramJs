
var his = [];

function setTheme(color) {
//document.querySelector('.container').style.setProperty('--theme-color', color);
document.querySelector('.graphic').style.setProperty('--graphic-bg-color', color);
}

function setBlure(el){	
document.querySelector('.graphic').style.setProperty('--graphic-blur', '5px');
//el.style.setProperty('filter', 'blur(0px)');
el.style.setProperty('--graphic-blur', '0px');
////console.log('blur');	
}

function restoreBlure(el){
	//el.style.removeProperty('filter');
	////console.log("DEL BLUR");
	el.style.removeProperty('--graphic-blur');
	document.querySelector('.graphic').style.setProperty('--graphic-blur', '0px');
}

function createGraphic(id, graphicName, data, backName, backData){
	console.log("Create for: "+id);
	console.log("//////////////////"+graphicName+"////////////////////");
	console.log("length: "+his.length);
	var	parent = document.getElementById(id);
	//	his.push({'name' : graphicName	, 'data' : data	});
	parent.innerHTML = '';

	var nav = document.createElement('nav');
	var ul = document.createElement('ul');
	var now = document.createElement('li');

	parent.appendChild(nav);
	nav.appendChild(ul);

	//if (his.length == 0){

		console.log("WAS ADDED: "+graphicName);
		
		his.push({'name' : graphicName, 'data' : data});
		//his.remove({'name' : graphicName, 'data' : data});
		
	//}

	if(his.length > 0){
		var newHis = [];
		for (var key in his) {

							console.log("item: "+his[key].name);
							var back = document.createElement('li');
							back.innerHTML = his[key].name;
							ul.appendChild(back);
							newHis.push({'name' : his[key].name, 'data' : his[key].data });
							if(his[key].name == graphicName) break; 
							var hname = his[key].name;
							var hdata = his[key].data;
							back.onclick = function(){
								createGraphic('graphic1', hname, hdata, false, false);
							};
							console.log("item-after: "+his[key].name);
			 				
			//console.log("%%%%%%%NOW: "+graphicName);
			//console.log("%%%%%%%: "+his[key].name);
		}
		his = newHis;
	}
/*
	his.forEach(function (hisItem){
		console.log("%%%%%%%NOW: "+graphicName);
		console.log("%%%%%%%: "+hisItem.name);
		if(hisItem.name == graphicName) break;
	});
*/
	/*var newHis = [];
		his.reverse().forEach(function (hisItem){
			do{
				console.log("item!!!!: "+hisItem.name);
						newHis.push({'name' : hisItem.name, 'data' : hisItem.data });
						var back = document.createElement('li');
						back.innerHTML = hisItem.name;
						ul.appendChild(back);
						back.onclick = function(){
							createGraphic('graphic1', hisItem.name, hisItem.data, false, false);
						};
			}while(hisItem.name != graphicName);
			
		});
	his = newHis;
*/
	//now.innerHTML = graphicName;
	//ul.appendChild(now);

	var graphic = document.createElement('ol');

	parent.appendChild(graphic);

	//graphic.innerHTML = '';

	if(graphic == null) console.log(id+" is null!!");

	var height = graphic.offsetHeight;
	var width  = graphic.offsetWidth;
	///console.log("height value = "+height);
	////console.log("width value = "+width);

	var max = getMax(data);
	///console.log("max value = "+max);
/*
	var last = max.toString().substr(max.toString().length-1,1);
	console.log("last value = "+last);

	var heightSh = max;

	var l = max.toString().length;
	var d = '1';
	
	while(d.toString().length < l){
		d = d.toString()+0;
		console.log("d: " + d);
	}

	while(heightSh % d != 0){
		heightSh++;
	}

	console.log("heightSh value = "+heightSh);

	var numSh = Math.round(heightSh/4);
	console.log("numSh value = "+numSh);

	var i = heightSh;
*/
///////////////
/*
	var scale = document.createElement('li');
	scale.style.setProperty('height', (height/heightSh*heightSh)+'px');
	scale.style.setProperty('background-color', 'white');
	scale.style.setProperty('box-shadow', 'none');
	graphic.appendChild(scale);

	do{

		var pos = document.createElement('div');
		//pos.style.setProperty('margin-bottom', (height/heightSh*i)+'px');
		pos.style.setProperty('position','relative');
    	//pos.style.setProperty('background-color', 'transparent');
    	pos.style.setProperty('margin-bottom', (height/heightSh*numSh-25)+'px');
    	pos.style.setProperty('border-bottom', '2px solid black');
    	pos.style.setProperty('width', '5px');
		pos.innerHTML = i;
		scale.appendChild(pos);
		i = i-numSh;
		console.log(i);
	}while(i >= 0);
*/
	data.forEach(function(item, i, arr){		
		var li = document.createElement('li');
		li.style.setProperty('padding-top', (height/max*item.value)+'px');
		li.style.setProperty('width', (100/data.length)-5+'%');
		li.name = item.name;
		
		//onclick = 'setBlure(this);';
		graphic.appendChild(li);
		
		/*li.onmouseover = function(){
    		setBlure(li);
		};*/
		li.onclick = function(){
    		setBlure(li);
    		showDescr(item, li, graphic, graphicName, data);
		};
		/*document.onclick = function(){
    		restoreBlure(li);
		};*/

		var label = document.createElement('label');
		label.innerHTML = item.name;
		li.appendChild(label);

		var div = document.createElement('div');
		var margin = (height/max*item.value)+50;
		div.style.setProperty('width', (100/data.length)-5+'%');
		div.style.setProperty('margin-top', '-'+margin+'px');
		
		li.appendChild(div);

		var p = document.createElement('p');
		p.innerHTML = item.value;

		div.appendChild(p);
		//p.style.setProperty('margin-left', Math.round((100/positions.length)-5)/2.5+'%');

	});
}

function getMax(positions){
	var max = positions[0].value;
	positions.forEach(function(item, i, arr){
		if(item.value > max) max = item.value;
	});
	return max;
}

function addItem(){
	var found = false;
	var iName = document.getElementById('name').value;
	var iValue = document.getElementById('value').value;
	positions.forEach(function(item, i){
		if(item.name == iName) {
			found = true;
			positions[i] = {'name' : iName, 'value' : iValue};
		}
	});
	if (!found) positions.push({'name' : iName, 'value' : iValue});

	createGraphic('graphic1', positions);
}

function showDescr(item, li, graphic, graphicName, graphicData){
	var old = document.getElementById(item.name+'_graphic_descr');
	if(old && old.id == item.name+'_graphic_descr') old.remove();
	var div = document.createElement('div');
	div.id = item.name+'_graphic_descr';
	//div.tabindex = 1;
	///console.log("event.clientY: "+event.clientY);
	///console.log("event.clientX: "+event.clientX);
	div.className = 'descr';

	div.style.setProperty('top', event.clientY+'px');
	
//document.body.tabindex = 0;
	graphic.appendChild(div);
	
	///console.log("DIV: "+div.clientWidth);
	if (event.clientX >= window.innerWidth-div.clientWidth+50) div.style.setProperty('left', event.clientX-div.clientWidth+'px');
	else div.style.setProperty('left', event.clientX+'px');
	div.setAttribute('tabindex', 1);
	div.setAttribute('contentEditable', true);
	div.focus();

	div.onblur = function(){
    		restoreBlure(li);
    		div.remove();
		};

	var header = document.createElement('header');
	header.innerHTML = item.name+' - '+item.value;
	div.appendChild(header);

	if (item.descr){
		for (var key in item.descr) {
 			var p = document.createElement('p');
			var spanName = document.createElement('span');
			spanName.innerHTML = key;
			div.appendChild(p);
			p.appendChild(spanName);
			if (item.descr[key] instanceof Array){
				spanName.className = 'link';
				spanName.onclick = function(){
					//his.push({'name' : key, 'data' : item.descr[key]});
						//console.log("HISSSSSS: "+key);
					createGraphic('graphic1', key, item.descr[key], false, false);
				};

			}else{
				var spanValue = document.createElement('span');
				spanValue.innerHTML = item.descr[key];
				p.appendChild(spanValue);
			}	
		}
		/*
	item.descr.forEach(function(name, i, value){
		var p = document.createElement('p');
		var spanName = document.createElement('span');
		var spanValue = document.createElement('span');
		spanName.innerHTML = name.getName();
		spanValue.innerHTML = value;
		div.appendChild(p);
		p.appendChild(spanName);
		p.appendChild(spanValue);
	});*/
}

}

var graphicName = 'Statistic';

// January	February	March	April	May	June	July	August	September	October	November	December

var data = [
		{
			'name' : 'Jan', 
			'value' : 3,
			'descr' : {
				'Descr' : 'Test descr',
				'Cost' : 'Test cost',
				'Else' : 'Lol'
			}
		},
		{
			'name' : 'Feb', 
			'value' : 5
		},
		{
			'name' : 'Mar', 
			'value' : 36,
			'descr' : {
				'One' : 'xxxx',
				'Count' : 36
			}
		},
		{
			'name' : 'Apr', 
			'value' : 8
		},
		{
			'name' : 'May', 
			'value' : 19
		},
		{
			'name' : 'Jun', 
			'value' : 6
		},
		{
			'name' : 'Jul', 
			'value' : 1
		},
		{
			'name' : 'Aug', 
			'value' : 28,
			'descr' : {
				'One' : 'xxxx',
				'Count' : 28,
				'Week' : [
					{
						'name' : 'Week1',
						'value' : 10
					},
					{
						'name' : 'Week2',
						'value' : 10,
						'descr' : {
							'Days' : [
							{
								'name' : 'Mon',
								'value' : 5
							},
							{
								'name' : 'Tue',
								'value' : 5
							}
							]	
						}
					}, 
					{
						'name' : 'Week3',
						'value' : 8
					},
				]
			}
		},
		{
			'name' : 'Sep', 
			'value' : 28,
		},
		{
			'name' : 'Oct', 
			'value' : 11,
		},
		{
			'name' : 'Nov', 
			'value' : 18,
			'descr' : {
				'One' : 'xxxx',
				'Count' : 18
			}
		},
		{
			'name' : 'Dec', 
			'value' : 33,
		},
	];

createGraphic('graphic1', graphicName, data);


