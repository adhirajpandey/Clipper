const BASE_BACKEND_URL = window.location.origin + "/"

const savePremiumClipData = async function () {
	try {
		const clipboardText = document.getElementById("paste-area").value
		const clipPassword = document.getElementById("clip-password").value
		const customSlug = document.getElementById("custom-slug").value
		let payload = {}

		if (clipboardText.length < 1) {
			alert("Clip content cannot be empty")
		} else {
			payload.clipboardText = clipboardText
			if (clipPassword.length >= 1) {
				payload.clipPassword = clipPassword
			}
			if (customSlug.length >= 1) {
				payload.customSlug = customSlug
			}

			console.log(payload)

			const response = await fetch(
				BASE_BACKEND_URL + "premium" + "/clip" + "/save",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			)

			const result = await response.json()

			if (response.status != 200) {
				alert(result.message)
			} else {
				document.getElementById("output-div").innerHTML = ""

				const outputElem = document.createElement("div")
				outputElem.classList.add("text-xl", "font-bold")

				outputElem.innerHTML = `Clip Link: <a href="${window.location.origin}/clip/${result.clip.clipId}" target="_blank">${window.location.origin}/clip/${result.clip.clipId}</a>`
				document.getElementById("output-div").appendChild(outputElem)

				document.getElementById("qrcode-img").src =
					`${window.location.origin}/images/qrcodes/${result.clip.clipId}.png`
				document.getElementById("qrcode-div").classList.remove("hidden")

				document.getElementById("paste-area").value = ""
				document.getElementById("clip-password").value = ""
				document.getElementById("custom-slug").value = ""
			}
		}
	} catch (error) {
		alert("Error saving premium clip")
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
				body: JSON.stringify(payload),
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
		.addEventListener("click", savePremiumClipData)
})
