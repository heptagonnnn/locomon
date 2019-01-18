import Locomon from "../dist";





document.getElementById("test").addEventListener("change", (e) => {

  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  Locomon.post("/bgupload/dtres/backend/picture/upload", {
    data: formData
  })
    .then(res => {
      console.log(res);
    })
});


document.getElementById("test_btn").addEventListener("click", () => {
  document.getElementById("test").click();
});