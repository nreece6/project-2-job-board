// Assuming you have a button element with the class "favorite-button" for each job item

// Step 1: Attach event listener to buttons
const favoriteButtons = document.querySelectorAll('.favorite-button');
favoriteButtons.forEach(button => {
  button.addEventListener('click', handleFavoriteClick);
});

// Step 2: Handle favorite button click
function handleFavoriteClick(event) {
  const button = event.target;
  const jobId = button.dataset.jobId; // Assuming you have the job ID stored as a data attribute

  // Step 3: Send fetch request to API
  const isFavorite = button.classList.contains('active'); // Check if the button is currently marked as a favorite

  const url = isFavorite ? '/api/remove-favorite' : '/api/add-favorite';
  const method = isFavorite ? 'DELETE' : 'POST';

  fetch(url, {
    method: method,
    body: JSON.stringify({ jobId: jobId }), // Send the job ID to the API
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    // Step 4: Update button appearance based on API response
    button.classList.toggle('active'); // Toggle the active class to reflect the updated favorite state
    // Additional logic if needed
  })
  .catch(error => {
    // Handle error
    console.error('Error:', error);
  });
}
