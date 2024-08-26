let screeningsContainer = document.getElementById('screenings');
let previousContainer = document.getElementById('previous-screenings');
let eventsContainer = document.getElementById('events');

function addEventLinks(data, container) {
    for (let i = 0; i < data.length; i++) {
        let element = document.createElement("div");
        let isBookable = !data[i]["book"]
        element.innerHTML = isBookable 
          ? `<p><a href="${data[i]["url"]}">${data[i]["place"]}</a> ${data[i]["time"]} <a class="button" href="${data[i]["book"]}">Boka</a> </p>`
          : `<p><a href="${data[i]["url"]}">${data[i]["place"]}</a> ${data[i]["time"]} </p>`;
        container.appendChild(element);
    };
}

let res = fetch("./data/events.json")
    .then((response) => response.json())
    .then((json) => {
        screeningsContainer && addEventLinks(json.screenings, screeningsContainer);
        previousContainer && addEventLinks(json.previous, previousContainer);
        eventsContainer && addEventLinks(json.events, eventsContainer);
    });
