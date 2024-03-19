let lecturesContainer = document.getElementById('lectures');
let trainingsContainer = document.getElementById('trainings');

function addEventLinks(data, container) {
    for (let i = 0; i < data.length; i++) {
        let element = document.createElement("div");
        element.innerHTML = `<p><a href="${data[i]["url"]}">${data[i]["place"]}</a>: ${data[i]["time"]}</p>`;
        container.appendChild(element);
    };
}

let res = fetch("./data/events.json")
    .then((response) => response.json())
    .then((json) => {
        lecturesContainer && addEventLinks(json.lectures, lecturesContainer);
        trainingsContainer && addEventLinks(json.trainings, trainingsContainer);
    });
