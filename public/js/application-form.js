// const email = document.querySelector("#exampleFormControlInput1").value
// const Name = document.querySelector("#Name").value
// const years_ex = document.querySelector("#exampleFormControlSelect1").value
// const description = document.querySelector("#exampleFormControlTextarea1").value




function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  
  document.getElementById("submitBtn").addEventListener("click", () => {
    const email = document.querySelector("#exampleFormControlInput1").value
const Name = document.querySelector("#Name").value
const years_ex = document.querySelector("#exampleFormControlSelect1").value
const description = document.querySelector("#exampleFormControlTextarea1").value

    let postid = uuidv4();
    let inputElem = document.getElementById("pdf");
    let file = inputElem.files[0];
    // Create new file so we can rename the file
    let blob = file.slice(0, file.size, "doucment/pdf");
    let resume =`https://storage.googleapis.com/jobposting-board/${postid}_post.pdf`


    //  const nerLink = element.setAttribute('#resume', `herf='${resume}'`)
     let newFile = new File([blob], `${postid}_post.pdf`, { type: "doucment/pdf" });
    // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
    let formData = new FormData();
    formData.append("pdf", newFile);
    document.getElementById("resume").href = `https://storage.googleapis.com/jobposting-board/${postid}_post.pdf`

    fetch("http://localhost:3001/application", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then(function (){
        
    fetch("http://localhost:3001/application")
    .then((res) => res.json())
    .then((data) => {
    
      
    } )
  
   
    fetch("http://localhost:3001/api/applicants",{
     
           method: "POST",
      body: JSON.stringify({ Name, email, years_ex, description, resume}),
      headers: { "Content-Type": "application/json" },
     
    
    }).then(console.log(resume)
      

    
  
   );
//   
      })
    
  });
