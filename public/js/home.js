const paginationNav = document.getElementById("pagination-nav");
const paginationList = paginationNav.querySelector("ul.pagination");

const totalPages = parseInt(paginationNav.getAttribute('data-totalPages'));
const currentPage = parseInt(paginationNav.getAttribute('data-currentPage'));

// Function to generate pagination list
function generatePaginationList(totalPages) {
  paginationList.innerHTML = ""; // Clear the existing list items

  // Add the previous button after generating the list
  const previousListItem = document.createElement("li");
  previousListItem.classList.add("page-item");
  const previousLink = document.createElement("a");
  previousLink.classList.add("page-link");
  previousLink.href = `https://protected-refuge-18602-b5474f6525e3.herokuapp.com//?page=${currentPage-1}&limit=5`;
  if (currentPage === 1) {
    previousLink.classList.add('disabled');
  } else {
    previousLink.classList.remove('disabled');
  }
  previousLink.textContent = "Previous";
  previousListItem.appendChild(previousLink);
  paginationList.appendChild(previousListItem);

  // Create the list items dynamically
  for (let i = 1; i <= totalPages; i++) {
    const listItem = document.createElement("li");
    listItem.classList.add("page-item");

    const link = document.createElement("a");
    link.classList.add("page-link");
    link.href = `https://protected-refuge-18602-b5474f6525e3.herokuapp.com/?page=${i}&limit=5`;
    link.textContent = i;

    if (i === currentPage) {
      link.classList.add("active"); // Add the active class to the current page button
    }

    link.addEventListener("click", function () {
      // Remove the active class from all buttons
      const activeLinks = paginationList.querySelectorAll("a.page-link.active");
      activeLinks.forEach((activeLink) => {
        activeLink.classList.remove("active");
      });

      // Add the active class to the clicked button
      this.classList.add("active");
    });

    listItem.appendChild(link);
    paginationList.appendChild(listItem);
  }

  // Add the "Next" button after generating the list
  const nextListItem = document.createElement("li");
  nextListItem.classList.add("page-item");
  const nextLink = document.createElement("a");
  nextLink.classList.add("page-link");
  nextLink.href = `/?page=${currentPage + 1}&limit=5`;
  if (currentPage === totalPages) {
    nextLink.classList.add('disabled');
  }
  nextLink.textContent = "Next";
  nextListItem.appendChild(nextLink);
  paginationList.appendChild(nextListItem);
}

// Call the function with the desired page count
generatePaginationList(totalPages);
