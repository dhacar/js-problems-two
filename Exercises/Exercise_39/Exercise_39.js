// script.js

const languageUrl = 'https://microsoft-translator-text-api3.p.rapidapi.com/languages';
const translateUrl = 'https://microsoft-translator-text-api3.p.rapidapi.com/translate';
const apiKey = '6d7caea299mshe31afe9e7bac51cp10809bjsn3a294c17e593';


const options = {
    headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
        'Content-Type': 'application/json'
    }
};

// Fetch languages and populate dropdowns
async function fetchLanguages() {
    try {
        const response = await fetch(languageUrl, { method: 'GET', headers: options.headers });
        if (!response.ok) throw new Error(`Failed to fetch languages: ${response.statusText}`);
        
        const data = await response.json();
        const languages = data.translation;

        const fromLangSelect = document.getElementById("fromLang");
        const toLangSelect = document.getElementById("toLang");

        for (const [code, lang] of Object.entries(languages)) {
            const option = document.createElement("option");
            option.value = code;
            option.textContent = lang.name;

            fromLangSelect.appendChild(option.cloneNode(true));
            toLangSelect.appendChild(option);
        }
    } catch (error) {
        console.error("Error fetching languages:", error);
        alert("Failed to load languages. Please check your API key and network connection.");
    }
}

// Translate text
async function translateText() {
    const fromLang = document.getElementById("fromLang").value;
    const toLang = document.getElementById("toLang").value;
    const textToTranslate = document.getElementById("textToTranslate").value;

    if (!fromLang || !toLang || !textToTranslate) {
        alert("Please select languages and enter text to translate.");
        return;
    }

    const bodyContent = JSON.stringify([{ text: textToTranslate }]);

    try {
        const response = await fetch(`${translateUrl}?to=${toLang}&from=${fromLang}&textType=plain`, {
            method: 'POST',
            headers: options.headers,
            body: bodyContent
        });

        if (!response.ok) throw new Error(`Translation request failed: ${response.statusText}`);
        
        const result = await response.json();
        document.getElementById("translatedText").textContent = result[0].translations[0].text;
    } catch (error) {
        console.error("Error translating text:", error);
        alert("Failed to translate text. Please try again.");
    }
}

// Initialize and add event listener
window.addEventListener("load", fetchLanguages);
document.getElementById("translateBtn").addEventListener("click", translateText);
