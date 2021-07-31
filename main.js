let IMG = document.querySelector('.img');
let TEXT = document.getElementById('text');
let movies;
let MODAL_IMG = document.querySelector('.modal_img');
let CONTENT = document.querySelector('.content');
let CONTAINER = document.querySelector('.container');
//block modal
let TITLE = document.querySelector('.title');
let ABOUT_MOVIE = document.querySelector('.about_movie');
let ABOUT_WRITTEN = document.querySelector('.about_written');
let ABOUT_DIRECTED = document.querySelector('.about_directed');
let ABOUT_STARTING = document.querySelector('.about_starting');
let ABOUT_BOXOFFICE = document.querySelector('.about_boxoffice');
let ABOUT_AWARDS = document.querySelector('.about_awards');
let ABOUT_RATINGS = document.querySelector('.about_ratings');
let ABOUT_GENRE = document.querySelector('.about_genre');


document.getElementById('get').addEventListener('click', () => {
    if (TEXT.value) {
        CONTAINER.innerHTML = '';
        getAllData(TEXT.value);
        TEXT.value = '';
    };
});

function render(data) {

    console.log(data);
    data.forEach(element => {
        CONTAINER.innerHTML +=
            `<div class="img">
                <div class="picture" style="background-image: url(${element.Poster})"></div>
                <div class="footer">
                    <h2>${element.Title}</h2>
                    <h5>${element.Year}</h5>
                    <h5>${element.Type}</h5>
                    <button onclick="detailsInfo()" data-id="${element.imdbID}" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">More details</button>
                </div>
            </div>`;
    });
};

function getAllData(movies) {
    const XHR = new XMLHttpRequest();
    XHR.open('GET', `http://www.omdbapi.com/?s=${movies}&apikey=eeb56d4b`);
    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4 && XHR.status === 200) {
            let data = JSON.parse(XHR.responseText);
            render(data.Search);
        };
    };
    XHR.send();
};

function detailsInfo() {
    const id = event.target.dataset.id;
    const XHR = new XMLHttpRequest();
    XHR.open('GET', `http://www.omdbapi.com/?i=${id}&apikey=eeb56d4b`);
    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4 && XHR.status === 200) {
            let data = JSON.parse(XHR.responseText);
            console.log('more', data);
            MODAL_IMG.style.backgroundImage = `url(${data.Poster})`;
            TITLE.textContent = data.Title;
            ABOUT_MOVIE.textContent = data.Plot;
            ABOUT_GENRE.textContent = data.Rated + data.Genre;
            ABOUT_WRITTEN.innerHTML = `<span class="head_size">Written by: </span>${data.Writer}`;
            ABOUT_DIRECTED.innerHTML = `<span class="head_size">Directed by: </span>${data.Director}`;
            ABOUT_STARTING.innerHTML = `<span class="head_size">Starting: </span>${data.Actors}`;
            ABOUT_BOXOFFICE.innerHTML = `<span class="head_size">BoxOffice: </span>${data.BoxOffice}`;
            ABOUT_AWARDS.innerHTML = `<span class="head_size">Awards: </span>${data.Awards}`;
            ABOUT_RATINGS.innerHTML = `<span class="head_size">BoxOffice: </span><br>${data.Ratings[0].Source} ${data.Ratings[0].Value}<br>${data.Ratings[1].Source} ${data.Ratings[1].Value}<br>${data.Ratings[2].Source} ${data.Ratings[2].Value}`;
        };
    };
    XHR.send();
};

