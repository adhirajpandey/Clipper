async function fetchDashboardData() {
	try {
		const response = await fetch("/premium/dashboard", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
		const data = await response.json()

		const clips = data.clips
		const email = data.email

		await populateDashboard(email, clips)
	} catch (error) {
		console.log("Error fetching dashboard data:", error)
	}
}

async function populateDashboard(email, clips) {
	document.getElementById("email").innerHTML = "(" + email + ")"
	const clipList = document.getElementById("clipList")
	clipList.innerHTML = ""

	clips.forEach((clip) => {
		const clipElem = document.createElement("div")
		clipElem.classList.add(
			"max-w",
			"p-4",
			"my-2",
			"border-b",
			"border-gray-200"
		)

		clipIdBtnContainer = document.createElement("div")
		clipIdBtnContainer.classList.add("flex", "justify-between")

		const clipIdElem = document.createElement("a")
		clipIdElem.classList.add("text-lg", "font-bold")
		clipIdElem.href = "/clip/" + clip.clipId
		clipIdElem.innerHTML = clip.clipId

		const deleteClipBtn = document.createElement("button")
		deleteClipBtn.classList.add(
			"text-white",
			"text-sm",
			"hover:bg-red-600",
			"inline-flex",
			"items-center",
			"justify-center",
			"rounded-md",
			"px-3",
			"py-2",
			"bg-red-700"
		)
		deleteClipBtn.setAttribute("clip-id", clip.clipId)
		deleteClipBtn.addEventListener("click", deleteClip)
		deleteClipBtn.innerHTML = "Delete"

		const clipStringElem = document.createElement("div")
		clipStringElem.classList.add("text-sm", "text-gray-500", "mt-1")
		clipStringElem.innerHTML = clip.clipString

		clipIdBtnContainer.appendChild(clipIdElem)
		clipIdBtnContainer.appendChild(deleteClipBtn)

		clipElem.appendChild(clipIdBtnContainer)
		clipElem.appendChild(clipStringElem)
		clipList.appendChild(clipElem)
	})
}

function deleteClip() {
	const clipId = this.getAttribute("clip-id")
	const clipElem = this.parentElement.parentElement
	clipElem.remove()

	fetch("/premium/clip", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ clipId }),
	})
}

document.addEventListener("DOMContentLoaded", fetchDashboardData)
