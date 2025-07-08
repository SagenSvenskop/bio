// TODO: filter movies based on column

/**
 * Fetches content from a public google sheet
 */
async function fetchData() {
  const API_KEY = 'AIzaSyCOCzq09ujrAuT7L5OuvmSEh-PQSHE2X8w';
  const SPREADSHEET_ID = '14UVhAXFQAorZhPUP63SKYv4MCdc1__DJJno-C2uKNEY';
  const RANGE = 'filmer!A43:F51'; // Adjust range as needed

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

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
function displayData(data) {
  const currentMovies = document.getElementById('screenings');

  data.forEach((movieInfoRow) => {
    const newArticle = addMovieArticle(document, movieInfoRow);
    currentMovies.appendChild(newArticle);
  });
}

// main functionality
const data = await fetchData();
displayData(data.values);
