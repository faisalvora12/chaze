$(document).ready(function() {
  $(".click").click(function () {
    var a=document.getElementById("showuser").innerText;
    alert("The user "+a+" has logged out");
    location.replace('login.html');
  });
});
window.addEventListener('load', function() {
var request = new XMLHttpRequest();
request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      alert(localStorage.lastname);
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
        alert("the user if is : the user was found");
    }
    else if(request.status === 404 && request.readyState===4)
    {
        alert('The user could not be found');
    }
};
request.open('POST', 'userid/'+localStorage.lastname, true);
request.send();

}
