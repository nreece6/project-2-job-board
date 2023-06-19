document.addEventListener("DOMContentLoaded", function () {
  const favoriteBtn = document.getElementById("favorite-button");
  const alertFavorite = document.getElementById("alert-favorited");
  const alertUnFavorite = document.getElementById("alert-unfavorited");
  favoriteBtn.addEventListener("click", () => {
    handleFavorite();
  });

async function handleFavorite(event) {
    const isFavorited = favoriteBtn.classList.contains("btn-danger");
    
    if (isFavorited) {
      favoriteBtn.classList.remove("btn-danger");
      favoriteBtn.classList.add("btn-outline-danger");
      await removeFavorite();
      alertUnFavorite.classList.remove("d-none");
      setTimeout(() => {
        alertUnFavorite.classList.add("d-none");
      }, 2000);
    } else {
      favoriteBtn.classList.add("btn-danger");
      await createFavorite();
      alertFavorite.classList.remove("d-none");
      setTimeout(() => {
        alertFavorite.classList.add("d-none");
      }, 2000);
    }
    
  }
//to get the job id from the url .../job/id
const url = window.location.href;
const parts = url.split('/')
const jobId = parts[parts.length - 1]

const userId = favoriteBtn.getAttribute("data-user-id");


const favoriteIdsByJob = {};  //keeps track of favorite_id
let favoriteId;


async function createFavorite() {

  await fetch("http://localhost:3001/api/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, job_id: jobId }),
  })
    .then((response) => response.json())
    .then((data) => {
      favoriteId = data.favorite_id;
        // Store the favoriteId in the data structure
        favoriteIdsByJob[jobId] = favoriteId;
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error:", error);
    });
}

async function removeFavorite() {
await fetch(`http://localhost:3001/api/favorites`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
    body: JSON.stringify({ user_id: userId, job_id: jobId }),
  
})
 
  .catch((error) => {
    // Handle any errors
    console.error("Error:", error);
  });
}

});