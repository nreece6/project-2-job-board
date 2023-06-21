function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  
  document.getElementById("submitBtn").addEventListener("click", () => {
    let postid = uuidv4();
    let inputElem = document.getElementById("imgfile");
    let file = inputElem.files[0];
    // Create new file so we can rename the file
    let blob = file.slice(0, file.size, "doucment/pdf");
     let newFile = new File([blob], `${postid}_post.pdf`, { type: "doucment/pdf" });
    // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
    let formData = new FormData();
    formData.append("imgfile", newFile);
    fetch("https://protected-refuge-18602-b5474f6525e3.herokuapp.com//application", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then(function (){
        
    fetch("https://protected-refuge-18602-b5474f6525e3.herokuapp.com//application")
    .then((res) => res.json())
    .then((x) => console.log(x))
    // fetch("http://localhost:3001/api/applicants",{
    //     method: "POST"
    //     body:
    // })
//   
      })
    
  });
