var ename=".";
function signup() {
    var fname = document.getElementById("fname").value;
    var email = document.getElementById("semail").value;
    if(typeof(Storage)!=="undefined")
    {
        localStorage.lastname=email;
    }
    else
    {
        alert("not supported")
    }
    var spass = document.getElementById("spass").value;
    var rpass = document.getElementById("rpass").value;
    if (fname.length == 0)
    {
       
        alert("Please fill in the full name");
    }
    else if (email.length == 0)
    {
     
        alert("Please fill in the username");
    }
    else if(email.includes("@")==false)
    {
       
        alert("please enter a correct format for email");
    }
    else if(email.split("@")[0].length==0||email.split("@")[1].length==0)
    {
       
        alert("your email format is incorrect");
    }
    else if (spass.length == 0)
    {
        alert("Please fill in the password");
    }
    else if (spass != rpass)
        alert("Your password and repeat password do not match");
    else
    {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                //alert("sign up successful");
                location.replace('main.html');
            }
            else if(request.status === 404 && request.readyState===4)
            {
                alert('That email already exists');
            }
            else if(request.status === 401 && request.readyState===4)
            {
                alert("your email did not pass the server test")
            }
        };
        request.open('POST', 'signup/'+fname+"/"+email+"/"+spass, true);
        request.send();
    }
}
function login() {
    var email=document.getElementById("lemail").value;
    if(typeof(Storage)!=="undefined")
    {
        localStorage.lastname=email;
    }
    else
    {
        alert("not supported")
    }
    var pass=document.getElementById("pass").value;
    if(email.length==0)
    {
       
        alert("Please fill in the email");
    }
    else if(email.includes("@")==false)
    {
      
        alert("please enter a correct format for email");
    }
    else if(email.split("@")[0].length==0||email.split("@")[1].length==0)
        alert("your email format is incorrect");
    else if(pass.length==0)
        alert("Please fill in the password");
    else
    {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                location.replace('main.html');
            }
            else if(request.status === 404 && request.readyState===4)
            {
                alert('Invalid username or password');
            }
            else if(request.status === 401 && request.readyState===4)
            {
                alert("your email did not pass the server test")
            }
        };
        request.open('POST', 'login/'+email+"/"+pass, true);
        request.send();
    }
}
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
var modal = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
