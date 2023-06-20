$(function() {
    // Configure Autocomplete
    $("#tags").autocomplete({
      source: function(request, response) {
        // Fetch search results from the server
        $.ajax({
          url: "/search",
          dataType: "json",
          data: {
            term: request.term
          },
          success: function(data) {
            response(data); // Pass the results to the Autocomplete widget
          }
        });
      },
      select: function(event, ui) {
        console.log(ui)
        let jobId = ui.item.value;
        window.location.href = "/job/" + jobId 
        
        ; // Redirect to the job details page
      }
    })
  });

  