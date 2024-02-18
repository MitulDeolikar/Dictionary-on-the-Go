const wrapper = document.querySelector(".wrapper"),
    searchInput = wrapper.querySelector("input"),
    infoText = wrapper.querySelector(".info"),
    synonyms = wrapper.querySelector(".synonyms .list"),
    volumeIcon=wrapper.querySelector(".word i")
    let audio;

// function data(result, word) {
//     if (result.title) {
//         infoText.innerHTML = `Cant find the meaning of <span>"${word}"</span> . Please try searching for another word or check for any errors in the word you searched`
//     }
//     else {
//         console.log(result)
//         wrapper.classList.add("active")

//         let def=result[0].meanings[0].definitions[0],
//         phonetics=`${result[0].meanings[0].partOfSpeech}/${result[0].phonetics[0].text}/`
//         //passing response data to html element
//         document.querySelector(".word p").innerText=result[0].word
//         document.querySelector(".word span").innerText=phonetics
//         document.querySelector(".meaning span").innerText=def.definition
//         document.querySelector(".example span").innerText=def.example
//         synonyms.innerHTML=""

//         for (let i = 0; i < 5; i++) {
//             let tag = `<span>${def.synonyms[i]}, </span>`;
//             synonyms.insertAdjacentHTML("beforeend",tag);//passing 5 synonyms inside synonyms div

//         }

//     }
// }

function data(result, word) {
    if (result.title) {
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please try searching for another word or check for any errors in the word you searched.`;
    } else {
        console.log("API response structure:", result);
        wrapper.classList.add("active");

        if (result[0].meanings && result[0].meanings[0] && result[0].meanings[0].definitions[0] && result[0].phonetics && result[0].phonetics[0]) {
            let def = result[0].meanings[0].definitions[0],
                phonetics = `${result[0].meanings[0].partOfSpeech}/${result[0].phonetics[0].text}/`;

            // Passing response data to HTML elements
            document.querySelector(".word p").innerText = result[0].word;
            document.querySelector(".word span").innerText = phonetics;
            document.querySelector(".meaning span").innerText = def.definition;
            document.querySelector(".example span").innerText = def.example;

            // Adjusted the audio URL to use "https:" instead of "https:"
            audio = new Audio("https:" + result[0].phonetics[0].audio);

            if (def.synonyms && def.synonyms[0] !== undefined) {
                synonyms.parentElement.style.display = "block";
                // Clear previous synonyms
                synonyms.innerHTML = "";
                for (let i = 0; i < Math.min(def.synonyms.length, 5); i++) {
                    let tag = `<span>${def.synonyms[i]}, </span>`;
                    synonyms.insertAdjacentHTML("beforeend", tag);
                }
            } else {
                synonyms.parentElement.style.display = "none";
            }
        } else {
            console.log("Invalid API response structure.");
        }
    }
}

// Rest of your code remains unchanged




function fetchApi(word) {
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    //fetching api response and returning it with parsing into js obj and in another then
    //method calling data function with passing api response and searched word as an argument
    fetch(url).then(res => res.json()).then(result => data(result, word))
}

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value)
    }
});
volumeIcon.addEventListener("click",()=>{
    audio.play();
});