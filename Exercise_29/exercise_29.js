
async function fetchJSONData() {
    console.log("Start fetching JSON data...");
    const data = await new Promise((resolve) => setTimeout(() => resolve({ key: "value" }), 2000));
    console.log("Fetched JSON Data:", data);
}
fetchJSONData();
console.log("This message runs immediately and is not blocked.");
