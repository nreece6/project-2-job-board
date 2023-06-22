const nameEl = document.getElementById('name_id')
const removeFavoriteBtn = document.getElementById('remove-favorite')
const userId = nameEl.getAttribute("data-user-id")


const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#job-name').value.trim();
  const needed_funding = document.querySelector('#job-location').value.trim();
  const description = document.querySelector('#job-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/jobPostings`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/home/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/jobPostings/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/home/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

const deleteFavoriteHandler = async (event) => {
  if (event.target.hasAttribute('data-favorite-id')) {
    
    const favoriteId = event.target.getAttribute("data-favorite-id")
    const response = await fetch(`/api/favorites/${favoriteId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/home/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};




// Select all the buttons with the class "btn-danger"
var buttons = document.querySelectorAll('.btn-danger');

// Iterate over each button and add the event listener
buttons.forEach(function(button) {
  button.addEventListener('click', deleteFavoriteHandler);
});
