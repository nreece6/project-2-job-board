// $(function() {
//     // Configure Autocomplete
//     $("#tags").autocomplete({
//       source: function(request, response) {
//         // Fetch search results from the server
//         $.ajax({
//           url: "/search",
//           dataType: "json",
//           data: {
//             term: request.term
//           },
//           success: function(data) {
//             response(data); // Pass the results to the Autocomplete widget
//           }
//         });
//       },
//       select: function(event, ui) {
//         let jobId = ui.item.value;
//         window.location.href = "/job/" + jobId; // Redirect to the job details page
//       }
//     })
//   });
let searchedJobArray = [];
$(document).ready(function () {
  $("#tags").on("input", function () {
    var searchText = $(this).val();

    if (searchText.length >= 3) {
      fetch(`http://localhost:3001/search?term=${searchText}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          searchedJobArray = [];
          searchedJobArray.push(data);
          console.log("searched job array", searchedJobArray[0]);
          // build an array
          var jobObject = data.map(function (item) {
            return item.job_name;
          });

          console.log(jobObject);

         

          

          $("#tags").autocomplete({
            source: jobObject,
            select: function(event, ui) {
              // Redirect to a new URL when a selection is made
              var selectedName = ui.item.value;
              // window.location.href = "http://example.com/" + selectedName;
              let desiredId = null;
              
              for (let i = 0; i < searchedJobArray.length; i++) {
                if (searchedJobArray[i].job_name === searchText) {
                  desiredId = searchedJobArray[i].id;
                  break; // Exit the loop once the desired object is found
                }
              }
            
            console.log(desiredId); // Output: 1
          }
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
});

//   // Configure Autocomplete
//   $("#tags").autocomplete({
//     source:function(request, response) {
//       // Fetch search results from the server
//       fetch("http://localhost:3001/search?term=software")
//         .then(function(response) {

//           return response.json();
//         })
//         .then(function(data) {
//           console.log(data)
//           response(data); // Pass the results to the Autocomplete widget
//         })
//         .catch(function(error) {
//           console.log(error);
//         });
//     } ,

//   });

// console.log('search')

//http://localhost:3001/search?term=software
