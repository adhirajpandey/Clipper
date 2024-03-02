const BASE_BACKEND_URL = "http://localhost:8000/"

const saveGeneralClipData = async function () {
	const clipboardText = document.getElementById("paste-area").value
	const payload = {}
	console.log(window.location.href)
	if (clipboardText.length < 1) {
		alert("Clip content cannot be empty")
	} else {
		const payload = {
			clipboardText: clipboardText,
		}

		const response = await fetch(BASE_BACKEND_URL + "clip/" + "save", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})

		const result = await response.json()
		console.log(result.clip.clipId)

		document.getElementById("output-div").innerHTML = ""

		const outputElem = document.createElement("div")
		outputElem.classList.add("text-xl", "font-bold")

		outputElem.innerHTML = `Clip Link: <a href="${window.location.origin}/clip/${result.clip.clipId}" target="_blank">${window.location.origin}/clip/${result.clip.clipId}</a>`
		document.getElementById("output-div").appendChild(outputElem)

		document.getElementById("paste-area").value = ""
	}
}

const savePremiumClipData = async function () {
	try {
		const clipboardText = document.getElementById("paste-area").value
		const clipPassword = document.getElementById("clip-password").value
		let payload = {}

		if (clipboardText.length < 1) {
			alert("Clip content cannot be empty")
		} else {
			if (clipPassword.length < 1) {
				payload = {
					clipboardText: clipboardText,
				}
				console.log(payload)
			} else {
				payload = {
					clipboardText: clipboardText,
					clipPassword: clipPassword,
				}
			}

			const response = await fetch(
				BASE_BACKEND_URL + "premium" + "/clip" + "/save",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization:
							"Bearer " + localStorage.getItem("token"),
					},
					body: JSON.stringify(payload),
				}
			)

			const result = await response.json()
			console.log(result)

			document.getElementById("output-div").innerHTML = ""

			const outputElem = document.createElement("div")
			outputElem.classList.add("text-xl", "font-bold")

			outputElem.innerHTML = `Clip Link: <a href="${window.location.origin}/clip/${result.clip.clipId}" target="_blank">${window.location.origin}/clip/${result.clip.clipId}</a>`
			document.getElementById("output-div").appendChild(outputElem)

			document.getElementById("paste-area").value = ""
			document.getElementById("clip-password").value = ""
		}
	} catch (error) {
		alert("Error saving premium clip")
	}
}

function checkUserTypeAndSaveClip() {
	// const userType = localStorage.getItem("userType")
	const userType = "premium"
	saveClip(userType)
}

function saveClip(userType) {
	if (userType == "premium") {
		savePremiumClipData()
	} else {
		saveGeneralClipData()
	}
}

async function checkPassword() {
	const clipId = window.location.href.split("/").pop()
	const password = document.getElementById("password").value
	const payload = {
		clipId: clipId,
		clipPassword: password,
	}
	try {
		const response = await fetch(
			BASE_BACKEND_URL + "premium" + "/clip" + "/view",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload)
			}
		)
	
		const result = await response.json()

		document.getElementById("password").value = ""

		if (result.message === "Valid Password") {
			document.body.innerHTML = ""
			const clip = result.clip
			const formattedClipString = `<pre>${clip.clipString}</pre>`
			
			document.body.removeAttribute("class")
			document.body.innerHTML = formattedClipString
	
		} else {
			alert("Invalid Password")
		}
	} catch (error) {
		alert("Error checking password")
	}
} 




	


document.addEventListener("DOMContentLoaded", function () {
	document
		.getElementById("save-clip-btn")
		.addEventListener("click", checkUserTypeAndSaveClip)
})
