$(document).ready(function() {
  $("$click").click(function () {
    alert("Hello!");
  });
});
window.addEventListener('load', function() {
var request = new XMLHttpRequest();
request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        document.getElementById("showuser").innerText=request.response;
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
/*
request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        alert("the user if is :"+request.response);
    }
    else if(request.status === 404 && request.readyState===4)
    {
        alert('The user could not be found');
    }
};
request.open('POST', 'get/userid/'+localStorage.lastname, true);
request.send();
});

*/
