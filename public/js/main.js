$(document).ready(function () {
  $(".click").click(function () {
    var a = document.getElementById("showuser").innerText;
    localStorage.lastname = "";
    location.replace('login.html');
  });
});

var request = new XMLHttpRequest();
window.addEventListener('load', function () {
  document.getElementById("b").style.visibility = "hidden";
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      document.getElementById("b").style.visibility = "visible";

      document.getElementById("showuser").innerText = request.response;
      getuserid();
    }
    else if (request.status === 404 && request.readyState === 4) {
      location.replace('login.html');
    }
  };
  request.open('POST', 'get/' + localStorage.lastname, true);
  request.send();
});
function getuserid() {
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var dist = 0;
      var back = 0;
      var bs = 0;
      var free = 0;
      var str = request.response.split("!");

      var i = 1;
      for (i = 1; i < str.length; i++) {
        var str2 = str[i].split("%");
        jQuery(document).ready(function () {
          dist = parseInt(dist) + parseInt(str2[5]);
          if (str2[3] === 'true') back++;
          if (str2[4] === 'true') bs++;
          if (str2[6] === 'true') free++;
          var add = "";
          for ( j = 1 ; j <= 3 ; j++ )
          {
            add = add + "<div class='col-xl-4 col-md-6 col-lg-4'><div class='card shadow mb-4'><!-- Card Header - Dropdown --><div class='card-header py-3 d-flex flex-row align-items-center justify-content-between'><h6 class='m-0 font-weight-bold text-primary'>Morning Swim</h6></div><!-- Card Body --><div class='card-body'><div class='chart-area'><canvas id='myAreaChart'></canvas></div></div></div></div>";
          }
          alert(add);
          $(".container-fluid").append(add);
          //$("#panels").append("<div id='dummy" + i + "' class='col-sm panel panel-default' style='background-color: white'><label id='" + i + "' class='panel-body classWithPad'><canvas id='myChart" + i + "' width='500' height='350'></canvas> Training " + i + "<br>Total# lanes:85 <br>Total time: 500 secs<br>Avg power:30<br>Avg speed:50" + "</label></div>");
        });
      }
      jQuery(document).ready(function () {
        var avg = parseInt(parseInt(dist) / i);
      });
    }
    else if (request.status === 404 && request.readyState === 4) {
      alert('user not found');
    }
  };
  request.open('POST', 'userid/' + localStorage.lastname, true);
  request.send();

}

/*Blob function call-sends the blob file to the server and gets the data back **/
function blob(trainingid, contname, blobService) {

  blobService.listBlobsSegmented(contname, null, function (error, results) {
    if (error) {
      // List blobs error
    } else {
      for (var i = 0, blob; blob = results.entries[i]; i++) {
        if (trainingid === blob.name) {
          /* sending the file to the server*/
          request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
              var str = request.response;
              $("#nextpage").append("<div class='remove'>" + str + "</div>");
            }
            else if (request.status === 404 && request.readyState === 4) {
              alert("the server did not complete get blob data");
            }
          };
          request.open('POST', 'blob/' + contname + "/" + blob.name, true);
          request.send();
        }
      }
    }
  });

}
/*
$(document).ready(function () {
  $("#panels").on("click", "div.panel", function () {
    var idp = $(this).attr('id');
    var id = $(this).children("label").attr('id');
    var text = (id.innerText || id.textContent);
    // document.getElementById(idp).style.transform = "translateY(4px)";//just gives the illution of a click
    document.getElementById("main").style.visibility = "hidden";
    var el = document.getElementById(id);
    var text = (el.innerText || el.textContent);
    //$("#nextpage").append("<div class='remove'>"+text+"</div>");
    var training = text.split("//");
    var trainingid = training[1];
 
    var a = "";
    var blobUri = 'https://' + 'chazestorage' + '.blob.core.windows.net';
    var blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, '?sv=2018-03-28&ss=b&srt=sco&sp=rwdlac&se=2119-01-18T08:03:19Z&st=2019-01-18T00:03:19Z&spr=https&sig=ZHPdLCVN2ylcrU0n07Xz16upTxCaiQRsl1SvvCHvEFk%3D');
    blobService.listContainersSegmented(null, function (error, results) {
      if (error) {
        // List container error
      } else {
        for (var i = 0, container; container = results.entries[i]; i++) {
          if (container.name == "trainings")
            blob(trainingid, container.name, blobService);
        }
      }
      //timeout code
      setTimeout(function () {
      }, 50);//timeout ends
    });
   
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  });
});*/
