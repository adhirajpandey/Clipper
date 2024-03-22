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
		clipElem.classList.add("max-w", "p-4", "my-2")

		const clipIdElem = document.createElement("div")
		clipIdElem.classList.add("text-lg", "font-bold")
		clipIdElem.innerHTML = clip.clipId

		const clipStringElem = document.createElement("div")
		clipStringElem.classList.add("text-sm", "text-gray-500")
		clipStringElem.innerHTML = clip.clipString

		clipElem.appendChild(clipIdElem)
		clipElem.appendChild(clipStringElem)
		clipList.appendChild(clipElem)
	})
}

document.addEventListener("DOMContentLoaded", fetchDashboardData)
