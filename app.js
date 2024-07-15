
const currentUser = JSON.parse(localStorage.getItem("isLoggedInUser"));
const allPosts = JSON.parse(localStorage.getItem("allPosts")) || [];

if (!currentUser) {
    window.location.href = "login.html";
}

let imgsrc = document.getElementById("imgsrc");
let userNameDisplay = document.getElementById("userNameDisplay");

function displayPost() {
    const postdiv = document.querySelector(".postdiv");
    postdiv.innerHTML = "";
    allPosts.forEach((post,index) => {
        postdiv.innerHTML += `<div class="postarea">
                <div class="postimage">
                    <img src=${post.profilePicture} alt="">
                    <div class="welcome">
                        <h2>Hi! <span>${post.username}</span></h2>
                        <p>${post.createdAt}</p>
                    </div>
                </div>
                <div class="userPotsHead">
                    <h3>${post.content}</h3>
                    <img src="${post.imageUrl}" alt="">
                </div>
                <div class="seeinsight">
                    <h4>See Insight</h4>
                    <button>Boost Post</button>
                    <div class="line2"></div>
                </div>
                <div class="facebook-icon">
                    <div class="image-icon">
                        <img src="./image/facbook-icon2.jpg" alt="">
                        <span>15</span>
                    </div>
                    <div class="share">
                        <p>5 Shares</p>
                    </div>
                    <div class="line2"></div>
                </div>
                <div class="like">
                    <div class="love-icon">
                        <i class="fa-regular fa-heart"></i> <span>Like</span>
                    </div>
                    <div class="comment">
                        <i class="fa-regular fa-comment"></i> <span>Comment</span>
                    </div>
                    <div class="share">
                        <i class="fa-regular fa-share-from-square"></i> <span>Share</span>
                    </div>
                    <div class="line2"></div>
                </div>

                <div class="mainBtn">
                    <div class="editBtn">
                        <button onclick="editHandler(${index})">Edit</button>
                    </div>

                    <div class="editBtn">
                        <button onclick="deleteHandler(${index})">Delete</button>
                    </div>
                    <div class="line2"></div>

                </div>
            </div>`;
    });
}

document.getElementById("postBtn").addEventListener("click", function () {
    const content = document.getElementById("postContent").value.trim();
    const imageUrl = document.getElementById("postImageUrl").value.trim();

    if (!content || !imageUrl) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill all fields",
        });
        return;
    }

    setTimeout(() => {
        const post = {
            username: currentUser.username,
            profilePicture: currentUser.profilePicture,
            content: content,
            imageUrl: imageUrl,
            createdAt: new Date().toLocaleString(),
        };

        allPosts.unshift(post);
        localStorage.setItem("allPosts", JSON.stringify(allPosts));
        document.getElementById("postContent").value = "";
        document.getElementById("postImageUrl").value = "";
        displayPost();
    }, 1000);
});

document.getElementById("logOutBtn").addEventListener("click", function () {
    localStorage.removeItem("isLoggedInUser");
    Swal.fire({
        title: `LogOut Successfully`,
        text: "Congratulations!",
        icon: "success"
    });

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
});


function editHandler(index){
    const newContent = prompt("Edit your content",allPosts[index].content);
    if(!newContent){
        alert("please enter a value")
        return
      }
      if (newContent !== null) {
        allPosts[index].content = newContent;
        localStorage.setItem("allPosts", JSON.stringify(allPosts));
        displayPost();
      }
}

function deleteHandler(index){
    if (confirm("Are you sure you want to delete this post?")) {
        allPosts.splice(index, 1);
        localStorage.setItem("allPosts", JSON.stringify(allPosts));
        displayPost();
      }
}

if (document.getElementById("postcreate")) {
    document.getElementById("postcreate").classList.remove("hidden");
    userNameDisplay.textContent = currentUser.username;
    imgsrc.src = currentUser.profilePicture;
    displayPost();
}
