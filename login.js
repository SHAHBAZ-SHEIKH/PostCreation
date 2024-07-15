document.getElementById("loginbtn").addEventListener("click",function(event){
    event.preventDefault();

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const getStoredvalue = JSON.parse(localStorage.getItem("uservalue"))
    console.log(getStoredvalue)

    const getfindValue = getStoredvalue.find((item)=>{
        return item.email === email && item.password === password;

    })

    if(getfindValue){
        localStorage.setItem("isLoggedInUser",JSON.stringify(getfindValue))
        Swal.fire({
            title: `${getfindValue.username} Login  Successfully`,
            text: "Congratulation!",
            icon: "success"
          });

          setTimeout(()=>{
            window.location.href = "index.html"

          },2000)
    
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "In valid Email & Password",
            
          });

    }
})