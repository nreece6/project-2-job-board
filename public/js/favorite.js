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
  const parts = url.split("/");
  const jobId = parseInt(parts[parts.length - 1]);
  console.log(jobId);
  const userId = favoriteBtn.getAttribute("data-user-id");

  const favoriteIdsByJob = {}; //keeps track of favorite_id
  let favoriteId;

  async function createFavorite() {
    const devUrl = "http://localhost:3001/api/favorites";
    await fetch(devUrl, {
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
    const devUrl = `http://localhost:3001/api/users/${userId}`; //seasrching for the favorited job post inside of user data
    await fetch(devUrl)
      .then((response) => response.json())
      .then((data) => data.favorites)
      .then((favorites) => {
        console.log(favorites);
        const currentFavoriteData = favorites.filter(
          (item) => item.job_id === jobId
        ); //picks only the favorite data with the current job id on it

        if (!currentFavoriteData) {
          console.log("favorite not found");
        }
        const favId = currentFavoriteData[0].id; //getting the favorite_id from the favorite data

        //making another api request to favoriteRoutes to delete that favorite

        fetch(`http://localhost:3001/api/favorites/${favId}`, {
          method: "DELETE",
        });
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  }
});
