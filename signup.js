
document.getElementById("btn").addEventListener("click", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;
    const profilePicture = document.getElementById("profilePicture").files[0];
    

    const userget = JSON.parse(localStorage.getItem("uservalue")) || [];


    const emailExists = userget.find(user => user.email === email);
    if (emailExists) {
        alert("This email already exists. Please use a different email.");
        return;
    }

    if (username.includes("@")) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Username cannot contain an email address",
        });
        return;
    }



    if (!username.trim() || !email.trim() || !password.trim()) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill all fields",
            
          });

        return;
    }
    if (password.length < 8) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password length must be 8 characters long",
            
          });

        return;
    }

    if (password !== cpassword) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password and confirm password must be the same",
            
          });

        return;
    }

    if (!profilePicture) {
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please upload a profile picture",
      });
      return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
      const imageUrl = e.target.result;

      userget.push({
          username: username,
          password: password,
          email: email,
          profilePicture: imageUrl,
          posts:[]
      });

      localStorage.setItem("uservalue", JSON.stringify(userget));
      Swal.fire({
          title: `${username} Account Created Successfully`,
          text: "Congratulations!",
          icon: "success"
      });

      setTimeout(() => {
          window.location.href = "login.html";
      }, 2000);
  }

  reader.readAsDataURL(profilePicture);
});

