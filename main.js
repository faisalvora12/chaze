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
      var dist=0;
      var back=0;
      var bs=0;
      var free=0;
      var str=request.response.split("!");
      jQuery(document).ready(function(){
       $("#training").append("training number //backstroke   //   breaststroke   //    distperlength  //   freestyle<br>");
});
      var i=1;
      for(i=1;i<str.length;i++)
      {
        var str2=str[i].split("%");
        jQuery(document).ready(function(){
          dist=parseInt(dist)+parseInt(str2[5]);
          if(str2[3]==='true')back++;
           if(str2[4]==='true')bs++;
           if(str2[6]==='true')free++;
             $("#panels").append("<div id='dummy"+i+"' class='col-sm panel panel-default' style='background-color: white'><label id='"+i+"' class='panel-body classWithPad'> training "+i+"//"+str2[1]+"//"+str2[2]+" //   "+str2[3]+"   //    "+str2[4]+"   //    "+str2[5]+"   //    "+str2[6]+"</label></div>"); 
      });
      }
      jQuery(document).ready(function(){
     var avg=parseInt(parseInt(dist)/i);
      });
    }
    else if(request.status === 404 && request.readyState===4)
    {
        alert('user not found');
    }
};
request.open('POST', 'userid/'+localStorage.lastname, true);
request.send();

}
function train()
{
   document.getElementById("main").style.visibility = "visible";
  $( ".button" ).remove();
}
$(document).ready(function(){
  $("#panels").on("click","div.panel",function() { 
        var idp = $(this).attr('id');
        var id = $(this).children("div").attr('id');
    document.getElementById(idp).style.transform = "translateY(4px)";//just gives the illution of a click
    document.getElementById("main").style.visibility = "hidden";
     $("#nextpage").append("<button class='button' onclick='train()' type='button'>BACK</button>");
     
      document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  });
  /*changes the color of the cliked option*/
  $("#train").click(function(){
    $("#train").css("color", "aqua");
    $("#records").css("color", "white");
    $("#trends").css("color", "white");
    $("#settings").css("color", "white");
    $("#feedback").css("color", "white");
    $("#recommend").css("color", "white");
  });
     $("#records").click(function(){
    $("#records").css("color", "aqua");
    $("#train").css("color", "white");
    $("#trends").css("color", "white");
    $("#settings").css("color", "white");
    $("#feedback").css("color", "white");
    $("#recommend").css("color", "white");
  });  $("#trends").click(function(){
    $("#trends").css("color", "aqua");
    $("#records").css("color", "white");
    $("#train").css("color", "white");
    $("#settings").css("color", "white");
    $("#feedback").css("color", "white");
    $("#recommend").css("color", "white");
  });  $("#settings").click(function(){
    $("#settings").css("color", "aqua");
    $("#records").css("color", "white");
    $("#trends").css("color", "white");
    $("#train").css("color", "white");
    $("#feedback").css("color", "white");
    $("#recommend").css("color", "white");
  });  $("#feedback").click(function(){
    $("#feedback").css("color", "aqua");
    $("#records").css("color", "white");
    $("#trends").css("color", "white");
    $("#settings").css("color", "white");
    $("#train").css("color", "white");
    $("#recommend").css("color", "white");
  });
   $("#recommend").click(function(){
    $("#recommend").css("color", "aqua");
    $("#records").css("color", "white");
    $("#trends").css("color", "white");
    $("#settings").css("color", "white");
    $("#feedback").css("color", "white");
    $("#train").css("color", "white");
});
  });
