function login(){
  const u=document.getElementById("username").value;
  if(!u) return alert("Enter name");
  localStorage.setItem("user",u);
  location.href="landing.html";
}
