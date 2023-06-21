const nameEl = document.getElementById('name_id')
const userId = nameEl.getAttribute("data-user-id")
const removeFavoriteButton = document.getElementById("remove-favorite")
console.log(userId)
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
      document.location.replace('/profile');
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
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

removeFavoriteButton.addEventListener('click',delButtonHandler)

//  fetch(`http://localhost:3001/api/users/${userId}`).then((response) => response.json())
//   .then((data) => {
//     const jobName = data.favorites[0].jobPosting.job_name;
//     console.log(jobName)})
  

// document
//   .querySelector('.new-job-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);


  // getUserData()
 