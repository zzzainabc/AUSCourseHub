const emailInput = document.getElementById("email");
const idInput = document.getElementById("id");
const passwordInput = document.getElementById("password");
const nameInput = document.getElementById("fullName");
const authAction = document.getElementById('authAction');
const message = document.getElementById("message");
const btn = document.querySelector(".btn-login");
const authForm = document.getElementById("authForm");

function handleAuth(event) {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const id = idInput.value.trim();
    const name = nameInput.value.trim();

    // reset message
    message.textContent = "";

    // check for inputs
	if (email === "" || password === "" || (authAction.value === 'signup' && (id === "" || name === ""))) {
	    event.preventDefault();
	    message.style.color = "red";
	    message.textContent = "Please fill in all fields!";
	    return;
	}

	if (authAction.value === 'signup') {
	    // do validation checks
	    if (id === "" || name === "" || email === "" || password === "") {
	        event.preventDefault(); // Stop ONLY if there is an error
	        message.textContent = "All fields are required for signup!";
	        return;
	    }
		alert("Sign-up successful! Now please login.");
	}

    if (authAction.value === 'login') {
        console.log("Submitting login form...");
    }
}
    
    
// attach the listener to the FORM from servlet
authForm.addEventListener("submit", handleAuth);

function toggleAuthMode() {
    const formTitle = document.getElementById('formTitle');
    const formSubtitle = document.getElementById('formSubtitle');
    const nameField = document.getElementById('nameField');
    const idField = document.getElementById('idField');
    const submitBtn = document.getElementById('submitbutton');
    const toggleText = document.getElementById('toggleText');
    const toggleLink = document.getElementById('toggleLink');

    message.textContent = "";

    if (authAction.value === 'login') {
        authAction.value = 'signup';
        formTitle.innerText = 'Create Account';
        formSubtitle.innerText = 'Join the AUS Course Hub community';
        nameField.style.display = 'block';
        idField.style.display = 'block';
        submitBtn.innerText = 'Sign Up';
        toggleText.innerText = 'Already have an account?';
        toggleLink.innerText = 'Login';
    }
	
	else {
        authAction.value = 'login';
        formTitle.innerText = 'AUS Course Hub';
        formSubtitle.innerText = 'Sign in to access your course workspace';
        nameField.style.display = 'none';
        idField.style.display = 'none';
        submitBtn.innerText = 'Login';
        toggleText.innerText = "Don't have an account?";
        toggleLink.innerText = 'Sign Up';
    }
}