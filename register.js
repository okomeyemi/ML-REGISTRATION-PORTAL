const countrySelect = document.getElementById("country");
const stateSelect = document.getElementById("state");

let countries = [];

fetch("data/countries.json")
    .then(response => response.json())
    .then(data => {

        countries = data;

        data.forEach(country => {

            const option = document.createElement("option");

            option.value = country.name;
            option.textContent = country.name;

            countrySelect.appendChild(option);

        });

    });

countrySelect.addEventListener("change", () => {

    stateSelect.innerHTML =
        '<option value="">Select State / Province</option>';

    const selectedCountry = countries.find(
        c => c.name === countrySelect.value
    );

    if (!selectedCountry) return;

    if (!selectedCountry.states.length) {

        stateSelect.disabled = true;

        return;

    }

    stateSelect.disabled = false;

    selectedCountry.states.forEach(state => {

        const option = document.createElement("option");

        option.value = state.name;
        option.textContent = state.name;

        stateSelect.appendChild(option);

    });

});



const agree = document.getElementById("agree");
const submitBtn = document.getElementById("submitBtn");

agree.addEventListener("change", () => {
    submitBtn.disabled = !agree.checked;
});


const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
const fullname = document.getElementById("fullname").value.trim();
const whatsapp = document.getElementById("whatsapp").value.trim();
const email = document.getElementById("email").value.trim().toLowerCase();
const gender = document.getElementById("gender").value;
const dob = document.getElementById("dob").value;

const country = document.getElementById("country").value;
const state = document.getElementById("state").value;
const lga = document.getElementById("lga").value.trim();

const status = document.getElementById("status").value;
const institution = document.getElementById("institution").value.trim();
const level = document.getElementById("level").value.trim();
const course = document.getElementById("course").value.trim();

const invite = document.getElementById("invite").value;
const expectation = document.getElementById("expectation").value.trim();
const meaning = document.getElementById("meaning").value.trim();
const topic = document.getElementById("topic").value.trim();
    
    try {
        
        // Check if phone already exists
        const phoneCheck = await db.collection("students")
            .where("whatsapp", "==", whatsapp)
            .get();
        
        if (!phoneCheck.empty) {
            alert("This WhatsApp number has already been registered.");
            return;
        }
        
        // Check if email already exists
        const emailCheck = await db.collection("students")
            .where("email", "==", email)
            .get();
        
        if (!emailCheck.empty) {
            alert("This email address has already been registered.");
            return;
        }
        
        // Save student
await db.collection("students").add({
    fullname,
    whatsapp,
    email,
    gender,
    dob,
    country,
    state,
    lga,
    status,
    institution,
    level,
    course,
    invite,
    expectation,
    meaning,
    topic,
    registeredAt: firebase.firestore.FieldValue.serverTimestamp()
});
        
        alert("Registration Successful!");
        
        form.reset();
        
        window.location.href = "success.html";
        
    } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again.");
    }
    
});