let screeningsContainer = document.getElementById('screenings');
let previousContainer = document.getElementById('previous-screenings');
let eventsContainer = document.getElementById('events');

function addEventLinks(data, container) {
  for (let i = 0; i < data.length; i++) {
    const info = data[i];
    const element = document.createElement('div');
    const bookHTML = !!info.book
      ? `<div><a class="button" href="${info.book}">Boka</a></div`
      : '';
    const summaryHTML = `<span class=summary-title>${info.title || ''}</span> ${
      info.time || ''
    }`;
    const detailsHTML = `<p>${
      info.description || ''
    }</p><div>${bookHTML}</div><div class=trailer>${info.trailer || ''}</div>`;
    element.innerHTML = `<article><details><summary>${summaryHTML}</summary>${detailsHTML}</details><article>`;
    container.appendChild(element);
  }
}

let res = fetch('./data/events.json')
  .then((response) => response.json())
  .then((json) => {
    screeningsContainer && addEventLinks(json.screenings, screeningsContainer);
    previousContainer && addEventLinks(json.previous, previousContainer);
    eventsContainer && addEventLinks(json.events, eventsContainer);
  });
