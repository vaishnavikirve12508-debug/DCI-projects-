


        const form = document.getElementById("validationForm");
        const numberInput = document.getElementById("number");
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirmPassword");
        const successMessage = document.getElementById("successMessage");
        function showError(input, errorId, message) {
            document.getElementById(errorId).textContent = message;

            input.classList.add("invalid");
            input.classList.remove("valid");
        }
        function clearError(input, errorId) {
            document.getElementById(errorId).textContent = "";

            input.classList.remove("invalid");
            input.classList.remove("valid");
        }
        function markValid(input, errorId) {
            document.getElementById(errorId).textContent = "";

            input.classList.remove("invalid");
            input.classList.add("valid");
        }
        function validateNumber() {
            const value = numberInput.value.trim();

            if (value === "") {
                showError(numberInput, "numberError",
                    "Please enter a number.");
                return false;
            }
            const number = Number(value);

            if (!Number.isInteger(number)) {
                showError(numberInput, "numberError",
                    "Only whole numbers are allowed.");
                return false;
            }
            if (number < 1 || number > 10) {
                showError(numberInput, "numberError",
                    "Error! Number must be between 1 and 10.");
                return false;
            }
            markValid(numberInput, "numberError");
            return true;
        }
        function validateUsername() {
            const username = usernameInput.value.trim();

            if (username === "") {
                showError(usernameInput, "usernameError",
                    "Please enter a username.");
                return false;
            }
            if (!/^[a-zA-Z]+$/.test(username)) {
                showError(usernameInput, "usernameError",
                    "Only uppercase and lowercase letters are allowed. No numbers or symbols.");
                return false;
            }

            markValid(usernameInput, "usernameError");
            return true;
        }

        function validatePassword() {
            const password = passwordInput.value;

            if (password === "") {
                showError(passwordInput, "passwordError",
                    "Please enter a password.");
                return false;
            }

            if (!/^[0-9]+$/.test(password)) {
                showError(passwordInput, "passwordError",
                    "Password must contain numbers only (0–9).");
                return false;
            }

            markValid(passwordInput, "passwordError");
            return true;
        }
        function validateConfirmPassword() {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (confirmPassword === "") {
                showError(confirmPasswordInput, "confirmPasswordError",
                    "Please confirm your password.");
                return false;
            }

            if (password !== confirmPassword) {
                showError(confirmPasswordInput, "confirmPasswordError",
                    "Passwords do not match!");
                return false;
            }

            markValid(confirmPasswordInput, "confirmPasswordError");
            return true;
        }
        numberInput.addEventListener("input", () => {
            validateNumber();
            successMessage.classList.remove("show");
        });
        usernameInput.addEventListener("input", () => {
            validateUsername();
            successMessage.classList.remove("show");
        });
        passwordInput.addEventListener("input", () => {
            validatePassword();
            if (confirmPasswordInput.value !== "") {
                validateConfirmPassword();
            }
            successMessage.classList.remove("show");
        });

        confirmPasswordInput.addEventListener("input", () => {
            validateConfirmPassword();
            successMessage.classList.remove("show");
        });
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const numberValid = validateNumber();
            const usernameValid = validateUsername();
            const passwordValid = validatePassword();
            const confirmPasswordValid = validateConfirmPassword();
            const isFormValid =
                numberValid &&
                usernameValid &&
                passwordValid &&
                confirmPasswordValid;
            if (isFormValid) {
                successMessage.classList.add("show");
            } else {
                successMessage.classList.remove("show");
                const firstInvalid = form.querySelector(".invalid");
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        });