function checkLoggedIn() {
	if (document.cookie.indexOf("clipper-token") !== -1) {
		return true
	} else {
		return false
	}
}

function logout() {
	document.cookie =
		"clipper-token=;expires=" + new Date(0).toGMTString() + ";path=/"
	window.location.href = "/"
}

function buttonChange() {
	loginBtn = document.getElementById("login-btn")
	signupBtn = document.getElementById("signup-btn")

	if (checkLoggedIn()) {
		loginBtn.classList.remove("bg-indigo-100")
		loginBtn.classList.remove("text-black")
		loginBtn.classList.remove("hover:bg-indigo-200")
		loginBtn.classList.add("bg-red-800")
		loginBtn.classList.add("hover:bg-red-600")
		loginBtn.classList.add("text-white")
		loginBtn.innerHTML = "Logout"

		signupBtn.classList.add("hidden")
	} else {
		loginBtn.classList.remove("bg-red-800")
		loginBtn.classList.remove("hover:bg-red-600")
		loginBtn.classList.remove("text-white")
		loginBtn.classList.add("bg-indigo-100")
		loginBtn.classList.add("text-black")
		loginBtn.classList.add("hover:bg-indigo-200")
		loginBtn.innerHTML = "Login"

		signupBtn.classList.remove("hidden")
	}
}

document.addEventListener("DOMContentLoaded", function () {
	buttonChange()
	document.getElementById("login-btn").addEventListener("click", function () {
		if (checkLoggedIn()) {
			logout()
			buttonChange()
		} else {
			window.location.href = "/login"
		}
	})
})
