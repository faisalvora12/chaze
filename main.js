$(document).ready(function() {
  $(".click").click(function () {
    var a=document.getElementById("showuser").innerText;
    localStorage.lastname="";
    location.replace('login.html');
  });
});
var request = new XMLHttpRequest();
window.addEventListener('load', function() {
document.getElementById("b").style.visibility = "hidden";
request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        document.getElementById("b").style.visibility = "visible";
        document.getElementById("showuser").innerText=request.response;
      getuserid();
    }
    else if(request.status === 404 && request.readyState===4)
    {
        location.replace('login.html');
    }
};
request.open('POST', 'get/'+localStorage.lastname, true);
request.send();
});
function getuserid(){
request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        alert("hello");
      var str=request.response.split("!");
      jQuery(document).ready(function(){
       $("#training").append("backstroke      breaststroke       distperlength     freestyle<br>");
});
      for(var i=0;i<str.length;i++)
      {
        var str2=str[i].split("%");
        jQuery(document).ready(function(){
    $("#training").append(str2[0]+"      "+str2[1]+"         "+str2[2]+"       "+str2[3]+"<br>"); 
      });

      }
    }
    else if(request.status === 404 && request.readyState===4)
    {
        alert('user not found');
    }
};
request.open('POST', 'userid/'+localStorage.lastname, true);
request.send();

}
