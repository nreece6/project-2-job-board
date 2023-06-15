const favoriteButtons = document.querySelectorAll("#favorite-button");

favoriteButtons.forEach((button) => {
  button.addEventListener("click", handleFavoriteClick);
});
let favoriteId; // Define the favoriteId variable outside the if statement
function handleFavoriteClick(event) {
  const button = event.target;
  const parts = window.location.href.split("/");
  const jobId = parts[parts.length - 1];
  console.log(jobId);

//Send fetch request to API
  const isFavorite = button.classList.contains("active"); // Check if the button is currently marked as a favorite
 

  if (!isFavorite) {
   
    button.style.backgroundColor = "red";
    fetch(`http://localhost:3001/api/favorites`, {
      method: "POST",
      body: JSON.stringify({ job_id: jobId, user_id: "2" }), // Send the job ID to the API'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        favoriteId = data.favorite_id; // Set the favoriteId variable
        console.log(data)
        
        button.classList.toggle("active"); // Toggle the active class to reflect the updated favorite state
        
      })
      .catch((error) => {
       
        // console.error("Error:", error);
      });
  } else {
    fetch(`http://localhost:3001/api/favorites/${favoriteId}`, {
      method: "DELETE",
      body: JSON.stringify({ job_id: jobId, user_id: "2" }), // Send the job ID to the API'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
       
        button.classList.toggle("active"); // Toggle the active class to reflect the updated favorite state
        
      })
      .catch((error) => {
        
        // console.error("Error:", error);
      });
    
    button.style.backgroundColor = "gray";
  }
}
