const BASE_BACKEND_URL = "http://localhost:8000/"

async function sendClipboardData() {
    const clipboardText = document.getElementById("paste-area").value
    if (clipboardText.length < 1) {
        alert("Clip content cannot be empty")
    }
    else {
        const payload = {
            "clipboardText": clipboardText
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
    
        outputElem.innerHTML = `Your clip is available at: <a href="${window.location.origin}/clip/${result.clip.clipId}" target="_blank">${window.location.origin}/clip/${result.clip.clipId}</a>`
        document.getElementById("output-div").appendChild(outputElem)
    
        document.getElementById("paste-area").value = ""
    }
    
}