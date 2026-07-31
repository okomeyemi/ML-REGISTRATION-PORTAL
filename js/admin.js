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