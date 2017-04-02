'use strict';

class Diagram {

	constructor(id){
		this.source = document.getElementById(id);
		this.dataHistory = [];
		this.className = 'graphic';
	}

	create(name, data){
		this.source.innerHTML = null;
		this.source.className = this.className; 
		this.generateNav(name, data);
		this.generateDiagram(name, data);
	}

	generateNav(name, data){
		var nav = document.createElement('nav');
		var ul 	= document.createElement('ul');
		var now = document.createElement('li');

		this.source.appendChild(nav);
		nav.appendChild(ul);
		this.dataHistory.push({'name' : name, 'data' : data});
		
		if(this.dataHistory.length > 0){
			var newdataHistory = [];
			var thisClass = this;
			for (var key in this.dataHistory) {
				var lastDiagram = document.createElement('li');
				lastDiagram.innerHTML = this.dataHistory[key].name;
				ul.appendChild(lastDiagram);
				newdataHistory.push({'name' : this.dataHistory[key].name, 'data' : this.dataHistory[key].data });
				if(this.dataHistory[key].name == name) break; 
				var lastDiagramName = this.dataHistory[key].name;
				var lastDiagramData = this.dataHistory[key].data;
				lastDiagram.onclick = function(){
					thisClass.create(lastDiagramName, lastDiagramData);
				};
			}
			this.dataHistory = newdataHistory;
		}
	}

	setFocus(item){
		this.source.style.setProperty('--graphic-blur', '5px');
		//document.querySelector('.graphic').style.setProperty('--graphic-blur', '5px');
		item.style.setProperty('--graphic-blur', '0px');
	}

	blur(item){
		item.style.removeProperty('--graphic-blur');
		this.source.style.setProperty('--graphic-blur', '0px');
	}

	getMax(positions){
		var max = positions[0].value;
		positions.forEach(function(item, i, arr){
			if(item.value > max) max = item.value;
		});
		return max;
	}

	setTheme(color) {
		this.source.style.setProperty('--graphic-bg-color', color);
	}

	showDetailBox(item, data){
		var oldBox = document.getElementById(data.name+'_diagram_box');
		if(oldBox && oldBox.id == data.name+'_diagram_box') oldBox.remove();
		var div = document.createElement('div');
		div.id = data.name+'_diagram_box';
		div.className = 'descr';

		div.style.setProperty('top', event.clientY+'px');
		
		this.source.appendChild(div);
		
		if (event.clientX >= window.innerWidth-div.clientWidth+50) div.style.setProperty('left', event.clientX-div.clientWidth+'px');
		else div.style.setProperty('left', event.clientX+'px');
		div.setAttribute('tabindex', 1);
		div.setAttribute('contentEditable', true);
		div.focus();
		
		var thisClass = this;

		div.onblur = function(){
	    	thisClass.blur(item);
	    	this.remove();
		};

		var header = document.createElement('header');
		header.innerHTML = data.name+' - '+data.value;
		div.appendChild(header);

		if (data.descr){
			for (var key in data.descr) {
	 			var p = document.createElement('p');
				var spanName = document.createElement('span');
				spanName.innerHTML = key;
				div.appendChild(p);
				p.appendChild(spanName);
				if (data.descr[key] instanceof Array){
					spanName.className = 'link';
					spanName.onclick = function(){
						thisClass.create(key, data.descr[key]);
					};
				}else{
					var spanValue = document.createElement('span');
					spanValue.innerHTML = data.descr[key];
					p.appendChild(spanValue);
				}	
			}
		}
	}

	generateDiagram(name, data){
		var diagram = document.createElement('ol');
		this.source.appendChild(diagram);

		var diagramSpaceHeight = diagram.offsetHeight;
		var diagramSpaceWidth  = diagram.offsetWidth;
		var maxItem = this.getMax(data);
		
		var thisClass = this;

			var li = document.createElement('li');
			li.style.setProperty('padding-top', (diagramSpaceHeight/maxItem*maxItem)+'px');
			li.style.setProperty('width', '0px');
			li.style.setProperty('padding-left', '0px');
			li.style.setProperty('padding-right', '0px');
			diagram.appendChild(li);


		data.forEach(function(item, i){		
			var li = document.createElement('li');
			li.style.setProperty('animation-name', 'animate-li');
			li.style.setProperty('--graphic-padding-top', (diagramSpaceHeight/maxItem*item.value)+'px');
			li.style.setProperty('width', (100/data.length)-5+'%');
			li.name = item.name;	
			diagram.appendChild(li);

			li.onclick = function(){
	    		thisClass.setFocus(li);
	    		thisClass.showDetailBox(li, item);
			};
			
			var label = document.createElement('label');
			label.innerHTML = item.name;
			li.appendChild(label);

			var div = document.createElement('div');
			var margin = (diagramSpaceHeight/maxItem*item.value)+50;
			div.style.setProperty('width', (100/data.length)-5+'%');
			/*div.style.setProperty('margin-top', '-'+margin+'px');*/
			div.style.setProperty('animation-name', 'animate-div');
			div.style.setProperty('--graphic-margin-top', '-'+margin+'px');
			
			li.appendChild(div);

			var p = document.createElement('p');
			p.innerHTML = item.value;

			div.appendChild(p);
		});
	}
}
