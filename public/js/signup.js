const signupUser = async function () {
	try {
		const username = document.getElementById("username").value
		const password = document.getElementById("password").value

		if (username === "" || password === "") {
			alert("Username and password are required")
		} else {
			const userData = { email: username, password: password }

			const response = await fetch("/user/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			})

			if (response.status === 200) {
				window.location.href = "/login"
			} else {
				alert("Invalid Inputs")
			}
		}
	} catch (error) {
		alert("Error Signing Up")
	}
}
