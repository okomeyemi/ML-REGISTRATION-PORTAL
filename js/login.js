const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  
  e.preventDefault();
  
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  
  try {
    
    await window.auth.signInWithEmailAndPassword(email, password);
    
    alert("Login Successful!");
    
    window.location.href = "admin.html";
    
  } catch (error) {
    
    alert(error.message);
    
  }
  
});