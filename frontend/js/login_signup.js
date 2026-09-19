const choiceCard = document.getElementById("choiceCard");

const signupChoice = document.getElementById("signupChoice");
const loginChoice = document.getElementById("loginChoice");

const signupCard = document.getElementById("signupCard");
const loginCard = document.getElementById("loginCard");

const signupBack = document.getElementById("signupBack");
const loginBack = document.getElementById("loginBack");

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");


/* ================= SHOW SIGN UP ================= */

signupChoice.addEventListener("click", function () {

    choiceCard.classList.add("hidden");
    signupCard.classList.add("active");

});


/* ================= SHOW LOGIN ================= */

loginChoice.addEventListener("click", function () {

    choiceCard.classList.add("hidden");
    loginCard.classList.add("active");

});


/* ================= BACK FROM SIGN UP ================= */

signupBack.addEventListener("click", function () {

    signupCard.classList.remove("active");
    choiceCard.classList.remove("hidden");

});


/* ================= BACK FROM LOGIN ================= */

loginBack.addEventListener("click", function () {

    loginCard.classList.remove("active");
    choiceCard.classList.remove("hidden");

});


/* ================= EMAIL VALIDATION ================= */

function validEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* ================= SIGN UP ================= */

signupForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username =
        document.getElementById("signupUsername");

    const email =
        document.getElementById("signupEmail");

    const password =
        document.getElementById("signupPassword");

    const usernameError =
        document.getElementById("signupUsernameError");

    const emailError =
        document.getElementById("signupEmailError");

    const passwordError =
        document.getElementById("signupPasswordError");

    let valid = true;


    /* Clear old errors */

    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";


    /* Username */

    if (username.value.trim() === "") {

        usernameError.textContent =
            "Please enter your username.";

        valid = false;

    } else if (username.value.trim().length < 3) {

        usernameError.textContent =
            "Username must contain at least 3 characters.";

        valid = false;

    }


    /* Email */

    if (email.value.trim() === "") {

        emailError.textContent =
            "Please enter your email.";

        valid = false;

    } else if (!validEmail(email.value.trim())) {

        emailError.textContent =
            "Please enter a valid email address.";

        valid = false;

    }


    /* Password */

    if (password.value === "") {

        passwordError.textContent =
            "Please create a password.";

        valid = false;

    } else if (password.value.length < 6) {

        passwordError.textContent =
            "Password must contain at least 6 characters.";

        valid = false;

    }


    /* ================= SIGN UP SUCCESS ================= */

    if (valid) {

        /*
           Save login state in browser.
           This is what tells index.html
           that the user is logged in.
        */

        localStorage.setItem(
            "chordoraUserLoggedIn",
            "true"
        );

        /*
           Go back to home page.
        */

        window.location.href = "../../index.html";

    }

});


/* ================= LOGIN ================= */

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username =
        document.getElementById("loginUsername");

    const email =
        document.getElementById("loginEmail");

    const password =
        document.getElementById("loginPassword");

    const usernameError =
        document.getElementById("loginUsernameError");

    const emailError =
        document.getElementById("loginEmailError");

    const passwordError =
        document.getElementById("loginPasswordError");

    let valid = true;


    /* Clear old errors */

    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";


    /* Username */

    if (username.value.trim() === "") {

        usernameError.textContent =
            "Please enter your username.";

        valid = false;

    } else if (username.value.trim().length < 3) {

        usernameError.textContent =
            "Username must contain at least 3 characters.";

        valid = false;

    }


    /* Email */

    if (email.value.trim() === "") {

        emailError.textContent =
            "Please enter your email.";

        valid = false;

    } else if (!validEmail(email.value.trim())) {

        emailError.textContent =
            "Please enter a valid email address.";

        valid = false;

    }


    /* Password */

    if (password.value === "") {

        passwordError.textContent =
            "Please enter your password.";

        valid = false;

    } else if (password.value.length < 6) {

        passwordError.textContent =
            "Password must contain at least 6 characters.";

        valid = false;

    }


    /* ================= LOGIN SUCCESS ================= */

    if (valid) {

        /*
           Save login state in browser.
        */

        localStorage.setItem(
            "chordoraUserLoggedIn",
            "true"
        );

        /*
           Return to home page.
        */

        window.location.href = "../../index.html";

    }

});

