// Data ranges
// Adjust range as needed
let MOVIE_RANGE = 'filmer!A6:F500';
let INFO_RANGE = 'info!B6:C100';

/**
 * Fetches content from a public google sheet
 */
async function fetchData(range) {
  const API_KEY = 'AIzaSyCOCzq09ujrAuT7L5OuvmSEh-PQSHE2X8w';
  const SPREADSHEET_ID = '14UVhAXFQAorZhPUP63SKYv4MCdc1__DJJno-C2uKNEY';
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}

/**
 * Creates an article element with the movie details
 * @param {*} document
 * @param {*} movieInfo
 * @returns the article element
 */
function addMovieArticle(document, movieInfo) {
  const date = movieInfo[1];
  const title = movieInfo[2];
  const description = movieInfo[3];
  const bookingUrl = movieInfo[4];
  const trailerHTML = movieInfo[5];

  // summary
  const spanMovieTitle = document.createElement('span');
  spanMovieTitle.classList.add('summary-title');
  spanMovieTitle.innerText = title;

  const spanMovieDate = document.createElement('span');
  spanMovieDate.innerText = ' ' + date;

  const summary = document.createElement('summary');
  summary.appendChild(spanMovieTitle);
  summary.appendChild(spanMovieDate);

  // details
  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.textContent = description;

  const detailsContent = document.createElement('div');
  detailsContent.appendChild(descriptionParagraph);

  // booking button
  if (bookingUrl) {
    const bookButton = document.createElement('a');
    bookButton.classList.add('button');
    bookButton.setAttribute('href', bookingUrl);
    bookButton.innerText = 'Boka';

    detailsContent.appendChild(bookButton);
  }

  // trailer iframe
  if (trailerHTML) {
    const trailer = document.createElement('div');
    trailer.innerHTML = trailerHTML;

    detailsContent.appendChild(trailer);
  }

  const details = document.createElement('details');
  details.appendChild(summary);
  details.appendChild(detailsContent);

  // article
  const article = document.createElement('article');
  article.appendChild(details);

  return article;
}

/**
 * Displays data
 */
function displayScreeningData(data) {
  const currentMovies = document.getElementById('screenings');

  data.forEach((movieInfoRow) => {
    if (movieInfoRow[0]) {
      const newArticle = addMovieArticle(document, movieInfoRow);
      currentMovies.appendChild(newArticle);
    }
  });
}
/**
 * Displays website information
 */
function displayWebsiteInfo(data) {
  data.forEach((info) => {
      const element = document.getElementById(info[0]);
      if (element && info[1]) {
        element.innerHTML = info[1];
      }
  })
}

// main functionality
const screeningData = await fetchData(MOVIE_RANGE);
displayScreeningData(screeningData.values);

const infoTextData = await fetchData(INFO_RANGE);
displayWebsiteInfo(infoTextData.values);
