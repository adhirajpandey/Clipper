const loginUser = async function () {
	try {
		const username = document.getElementById("username").value
		const password = document.getElementById("password").value

		if (username === "" || password === "") {
			alert("Username and password are required")
		} else {
			const userData = { email: username, password: password }

			const response = await fetch("/user/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			})

			if (response.status === 200) {
				const result = await response.json()
				const token = result.token
				// localStorage.setItem("token", token)
				document.cookie = `clipper-token=${token};`
				window.location.href = "/premium"
			} else {
				alert("Invalid email or password")
			}
		}
	} catch (error) {
		alert("Error logging in")
	}
}
