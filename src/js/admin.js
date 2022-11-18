admin:{ 
var attempt = 3; 

function valider(){
var username = document.getElementById("nomadmin").value;
var password = document.getElementById("password").value;
if ( username == "admin" && password == "vote"){
alert ("Authentifié en tant qu'Administrateur");
window.location = "admin.html"; // Redirection dans une autre page
return false;
}else{ if (username == "elect" && password == "vote") {

alert ("Authentifié en tant qu'électeur");
window.location = "voter.html"; // Redirection dans une autre page
return false;


}else{
attempt --;
alert("il vous reste "+attempt+" tentatives;");

if( attempt == 0){
document.getElementById("nomadmin").disabled = true;
document.getElementById("password").disabled = true;
document.getElementById("login").disabled = true;
return false;
}
}



}


}


}