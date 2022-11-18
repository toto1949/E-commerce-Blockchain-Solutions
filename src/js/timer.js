// la variable deadline est la date d'affichage des résultats

var deadline = new Date("Jul 04, 2019 11:08:00").getTime(); 
var t = 5000;

var R= ("#door");
function d(){
	window.location="resultats.html";

};
var x = setInterval(function() { 

var now = new Date().getTime(); 

t=deadline-now;
var days = Math.floor(t / (1000 * 60 * 60 * 24)); 
var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
var seconds = Math.floor((t % (1000 * 60)) / 1000); 
document.getElementById("jour").innerHTML =days ; 
document.getElementById("heure").innerHTML =hours; 
document.getElementById("minute").innerHTML = minutes; 
document.getElementById("seconde").innerHTML =seconds; 

if (t < 0) { 
		clearInterval(x);
		
		d();
		document.getElementById("demo").innerHTML='TIME UP';
		document.getElementById("jour").innerHTML ='0'; 
		document.getElementById("heure").innerHTML ='0'; 
		document.getElementById("minute").innerHTML ='0' ; 
		document.getElementById("seconde").innerHTML = '0';
		
		

	} 
}, 1000);

