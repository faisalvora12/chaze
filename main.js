$(document).ready(function() {
  $(".click").click(function () {
    var a=document.getElementById("showuser").innerText;
    alert("The user "+a+" has logged out");
    location.replace('login.html');
  });
});
var request = new XMLHttpRequest();
window.addEventListener('load', function() {

request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      //alert(localStorage.lastname);
        document.getElementById("showuser").innerText=request.response;
      getuserid();
    }
    else if(request.status === 404 && request.readyState===4)
    {
        alert('You are not signed in');
        location.replace('login.html');
    }
};
request.open('POST', 'get/'+localStorage.lastname, true);
request.send();
});
function getuserid(){
request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      alert(request.response);
    }
    else if(request.status === 404 && request.readyState===4)
    {
        alert('user not found');
    }
};
request.open('POST', 'userid/'+localStorage.lastname, true);
request.send();

}
