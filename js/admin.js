auth.onAuthStateChanged(user => {

    if (!user) {

        window.location.href = "login.html";

    }

});

const table = document.getElementById("studentTable");

const totalStudents = document.getElementById("totalStudents");
const maleStudents = document.getElementById("maleStudents");
const femaleStudents = document.getElementById("femaleStudents");
const totalCountries = document.getElementById("totalCountries");

const search = document.getElementById("search");

let students = [];

// Load all students
db.collection("students")
  .orderBy("registeredAt", "desc")
  .onSnapshot((snapshot) => {
    
    students = [];
    
    snapshot.forEach((doc) => {
      students.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    displayStudents(students);
    updateStats(students);
    
  });

// Display students

function displayStudents(data) {
  
  table.innerHTML = "";
  
  data.forEach(student => {
    
    table.innerHTML += `
        <tr>

            <td>${student.fullname}</td>
            <td>${student.whatsapp}</td>
            <td>${student.status}</td>
            <td>${student.institution}</td>
            <td>${student.country}</td>

            <td>

                <button
                    class="action-btn view-btn"
                    onclick="viewStudent('${student.id}')">

                    View

                </button>

            </td>

        </tr>
        `;
    
  });
  
}


const modal = document.getElementById("studentModal");
const details = document.getElementById("studentDetails");

function viewStudent(id) {
  
  const student = students.find(s => s.id === id);
  
  details.innerHTML = `

<h3>Personal Information</h3>

<div class="detail"><strong>Full Name:</strong> ${student.fullname}</div>
<div class="detail"><strong>WhatsApp:</strong> ${student.whatsapp}</div>
<div class="detail"><strong>Email:</strong> ${student.email}</div>
<div class="detail"><strong>Gender:</strong> ${student.gender}</div>
<div class="detail"><strong>Date of Birth:</strong> ${student.dob}</div>
<div class="detail"><strong>Country:</strong> ${student.country}</div>
<div class="detail"><strong>State:</strong> ${student.state}</div>
<div class="detail"><strong>LGA:</strong> ${student.lga}</div>

<hr>

<h3>Academic Information</h3>

<div class="detail"><strong>Status:</strong> ${student.status}</div>
<div class="detail"><strong>Institution:</strong> ${student.institution}</div>
<div class="detail"><strong>Level:</strong> ${student.level}</div>
<div class="detail"><strong>Course:</strong> ${student.course}</div>

<hr>

<h3>Maths League Information</h3>

<div class="detail"><strong>Invitation:</strong> ${student.invite}</div>
<div class="detail"><strong>Expectation:</strong> ${student.expectation}</div>
<div class="detail"><strong>Meaning of Mathematics:</strong> ${student.meaning}</div>
<div class="detail"><strong>Favourite Topic:</strong> ${student.topic}</div>

`;
  
  modal.style.display = "flex";
  
}

document.getElementById("closeModal").onclick = () => {
  
  modal.style.display = "none";
  
};

window.onclick = (e) => {
  
  if (e.target === modal) {
    
    modal.style.display = "none";
    
  }
  
};



// Statistics
function updateStats(data) {
  
  totalStudents.textContent = data.length;
  
  maleStudents.textContent =
    data.filter(s => s.gender === "Male").length;
  
  femaleStudents.textContent =
    data.filter(s => s.gender === "Female").length;
  
  const countries = [...new Set(data.map(s => s.country))];
  
  totalCountries.textContent = countries.length;
  
}

// Search
search.addEventListener("input", () => {
  
  const keyword = search.value.toLowerCase();
  
  const filtered = students.filter(student =>
    
    (student.fullname || "").toLowerCase().includes(keyword) ||
    (student.email || "").toLowerCase().includes(keyword) ||
    (student.phone || "").toLowerCase().includes(keyword) ||
    (student.country || "").toLowerCase().includes(keyword)
    
  );
  
  displayStudents(filtered);
  
});

document.getElementById("logoutBtn").addEventListener("click", async () => {

    await auth.signOut();

    window.location.href = "login.html";

});