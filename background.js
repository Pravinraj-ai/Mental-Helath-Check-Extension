const apiToken = "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";  // 🔥 Replace with your Hugging Face API Token

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "analyze_query") {
        fetch("https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: message.query })
        })
        .then(response => response.json())
        .then(data => {
            console.log("🔍 API Response:", data);

            if (data[0] && data[0][0].label === "NEGATIVE") {
                chrome.scripting.executeScript({
                    target: { tabId: sender.tab.id },
                    function: showPopup
                });
            }
        })
        .catch(error => console.error("❌ API Error:", error));
    }
});

// ✅ Function to Show Popup
function showPopup() {
    alert("⚠️ Mental Health Warning:\n\nIf you're struggling, please reach out for help. ❤️");
}
