const BASE_BACKEND_URL = window.location.origin + "/"

const saveGeneralClipData = async function () {
	try {
		const clipboardText = document.getElementById("paste-area").value
		const payload = {}
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

			document.getElementById("output-div").innerHTML = ""

			const outputElem = document.createElement("div")
			outputElem.classList.add("text-xl", "font-bold")

			outputElem.innerHTML = `<a href="${window.location.origin}/clip/${result.clip.clipId}" target="_blank" class="underline">${window.location.origin}/clip/${result.clip.clipId}</a> \n
									<a class="text-sm text-slate-400" href="${window.location.origin}/images/qrcodes/${result.clip.clipId}.png" target="_blank"> (Show QR Code)</a>`
			document.getElementById("output-div").appendChild(outputElem)

			document.getElementById("paste-area").value = ""
		}
	} catch (error) {
		alert("Error saving clip")
	}
}

document.addEventListener("DOMContentLoaded", function () {
	document
		.getElementById("save-clip-btn")
		.addEventListener("click", saveGeneralClipData)
})
