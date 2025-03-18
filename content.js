const query = new URLSearchParams(window.location.search).get("q");
if (query) {
    chrome.runtime.sendMessage({ type: "analyze_query", query: query });
}
