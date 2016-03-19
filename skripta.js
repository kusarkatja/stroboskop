window.addEventListener('load', function() {
	//stran nalozena
	
	//Dodaj novo barvo
	var dodajBarvo = function(event) {
		var input = document.createElement('button');
        var picker = new jscolor(input);
        picker.fromRGB(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255))
        document.getElementById("barve").appendChild(input);
	}
	
	document.querySelector("#novaBarva") 
		.addEventListener('click', dodajBarvo);
		
	//Odstrani barve
	var odstraniBarvo = function(event) {
		var izbireBarv = document.getElementById("barve").children;
		var st = izbireBarv.length;
		for (var x = 0; x<st; x++) {
			//console.log(izbireBarv[0].innerHTML + " " + st);
			document.getElementById("barve").removeChild(izbireBarv.item(0));
		}
	}
	
	document.querySelector("#odstraniBarve") 
		.addEventListener('click', odstraniBarvo);
	
	
	//Stroboskop
	var vrednosti = [];
	var minCas = 0;
	var maxCas = 0;
	var ustavi = false;
	
	var spremeniBarvo = function(id) {
		document.getElementById("stroboskop").style.backgroundColor = "#"+vrednosti[id];

		if (ustavi) {
			ustavi = false;
		} else {
			novId = (id+1) % vrednosti.length;
			timeout = Math.floor((Math.random() * (maxCas-minCas)) + minCas);
			setTimeout(function() {spremeniBarvo(novId)} , timeout);
		}		
	}
	
	var stop = function(event) {
		ustavi = true;
		var start = document.querySelector("#start");
		start.innerHTML = "Zaženi stroboskop";
		start.removeEventListener('click', stop);
		start.addEventListener('click', zagon);
	}
	
	var zagon = function(event) {
		ustavi = false;
		vrednosti = [];
		var barve = document.querySelectorAll("#barve > button");
		for (i = 0; i < barve.length; i++) {
			var barva = barve[i];
			vrednosti.push(barva.innerHTML);
		}
		
		minCas = document.getElementById("min").value;
		maxCas = document.getElementById("max").value;
		spremeniBarvo(0);
		
		var start = document.querySelector("#start");
		start.innerHTML = "Ustavi stroboskop";
		start.removeEventListener('click', zagon);
		start.addEventListener('click', stop);
	}
	
	document.querySelector("#start").addEventListener('click', zagon);
	
});