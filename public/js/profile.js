const nameEl = document.getElementById('name_id')
const removeFavoriteBtn = document.getElementById('remove-favorite')
const userId = nameEl.getAttribute("data-user-id")


const newFormHandler = async (event) => {
  event.preventDefault();

  const job_name = document.querySelector('#job-name').value.trim();
  const job_location = document.querySelector('#job-location').value.trim();
  const job_description = document.querySelector('#job-desc').value.trim();
  const salary = document.querySelector('#salary').value
  const Company_name = document.querySelector('#CompanyName').value
  const user_id = 2
  // if (job_name && job_location && job_description && salary && Company_name && user_id ) {
    const response = await fetch(`/api/jobPostings`, {
      method: 'POST',
      body: JSON.stringify({ job_name, job_location, job_description, Company_name, user_id, salary}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setTimeout(() => {
        document.location.replace('/home/profile')
      }, 3000)
      
     
    } else {
      alert('Failed to create project');
    }
  }
;

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

document.querySelector('.new-job-form')
.addEventListener('submit', newFormHandler);


// Select all the buttons with the class "btn-danger"
var buttons = document.querySelectorAll('.btn-danger');

// Iterate over each button and add the event listener
buttons.forEach(function(button) {
  button.addEventListener('click', deleteFavoriteHandler);
});
