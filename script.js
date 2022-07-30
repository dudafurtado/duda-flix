const root = document.querySelector('body');

const movies = document.querySelector('.movies');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');
const input = document.querySelector('.input');

const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal__img');
const toCloseModal = document.querySelector('.modal__close');

const theme = document.querySelector('.btn-theme');

let start = 0;
let end = 5;

let currentMovies = [];
let currentTheme = 'light';

const displayMovies = (start, end) => {
    movies.textContent = '';

    const showMovies = currentMovies.slice(start, end);
    showMovies.forEach(function (eachMovie) {
        const movie = document.createElement('div');
        movie.classList.add('movie');
        movie.style.backgroundImage = `url(${eachMovie.poster_path})`;
        movie.addEventListener('click', () => {
            modal.classList.toggle('hidden');
            createModal(eachMovie.id);
        });

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie__info');

        const movieTitle = document.createElement('span');
        movieTitle.classList.add('movie__title');
        movieTitle.textContent = eachMovie.title;

        const movieRating = document.createElement('span');
        movieRating.classList.add('movie__rating');
        movieRating.textContent = eachMovie.vote_average;

        const estrela = document.createElement('img');
        estrela.src = './assets/estrela.svg';

        movieInfo.append(movieTitle, estrela, movieRating);
        movie.append(movieInfo);
        movies.append(movie);
    });
}

const loadMovies = (start, end) => {
    fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false').then(resposta => {

        const promiseBody = resposta.json();

        promiseBody.then((body) => {
            currentMovies = body.results;
            displayMovies(start, end);
        })
    });
}

loadMovies(start, end);

prev.addEventListener('click', () => {
    if (start === 0) {
        start = 15;
        end = 20;
    } else {
        start -= 5;
        end -= 5;
    }

    return displayMovies(start, end);
});

next.addEventListener('click', () => {
    if (end === 20) {
        start = 0;
        end = 5;
    } else {
        start += 5;
        end += 5;
    }
    
    return displayMovies(start, end);
});

const searchMovies = (inputValue, start, end) => {
    fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${inputValue}`).then(resposta => {

        const promiseBody = resposta.json();

        promiseBody.then((body) => {
            currentMovies = body.results;
            displayMovies(start, end);
        });
    });
}

input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;

    start = 0;
    end = 5;
    displayMovies(start, end);

    if (input.value) {
        searchMovies(input.value, start, end);
    } else {
        loadMovies(start, end);
    }

    input.value = '';
});

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/718789?language=pt-BR').then(resposta => {
    const promiseBody = resposta.json()

    promiseBody.then(body => {
        const highlightVideo = document.querySelector('.highlight__video');
        highlightVideo.style.backgroundImage = `url(${body.backdrop_path})`;

        const highlightTitle = document.querySelector('.highlight__title');
        highlightTitle.textContent = body.title;

        const highlightRating = document.querySelector('.highlight__rating');
        highlightRating.textContent = body.vote_average;

        const highlightGenres = document.querySelector('.highlight__genres');
        highlightGenres.textContent = body.genres.map((genre) => {
            return genre.name;
        }).join(', ');

        const highlightLaunch = document.querySelector('.highlight__launch');
        highlightLaunch.textContent = new Date(body.release_date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day:'numeric'});

        const highlightDescription = document.querySelector('.highlight__description');
        highlightDescription.textContent = body.overview;
    });
});

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/718789/videos?language=pt-BR').then(resposta => {
    const promiseBody = resposta.json();

    promiseBody.then(body => {
        const key = body.results[0].key;

        const highlightVideoLink = document.querySelector('.highlight__video-link');
        highlightVideoLink.href = `https://www.youtube.com/watch?v=${key}`;
    })
})

const createModal = (movieId) => {
    root.style.overflow = 'hidden';
    modal.style.overflowY = 'scroll';

    fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${movieId}?language=pt-BR`).then(resposta => {
        const promiseBody = resposta.json();

        promiseBody.then(body => {
            const modalTitle = document.querySelector('.modal__title');
            modalTitle.textContent = body.title;

            modalImg.src = body.backdrop_path;

            const modalDescription = document.querySelector('.modal__description');
            modalDescription.textContent = body.overview;

            const modalAverage = document.querySelector('.modal__average');
            modalAverage.textContent = body.vote_average;

            const modalGenres = document.querySelector('.modal__genres');
            modalGenres.textContent = '';

            body.genres.forEach(genre => {
                const modalGenre = document.createElement('span');
                modalGenre.classList.add('modal__genre');
                modalGenre.textContent = genre.name;

                modalGenres.append(modalGenre);
            });
        });
    });
}

toCloseModal.addEventListener('click', () => {
    modal.classList.toggle('hidden');
    root.style.overflowY = 'scroll';
    modalImg.src = '';
});

theme.addEventListener('click', () => {
    if (currentTheme === 'light') {
        currentTheme = 'dark';

        theme.src = './assets/dark-mode.svg';
        prev.src = './assets/seta-esquerda-branca.svg';
        next.src = './assets/seta-direita-branca.svg';

        root.style.setProperty('--background-color', '#000');
        root.style.setProperty('--shadow-color', '0px 4px 8px rgba(255, 255, 255, 0.15)');
        root.style.setProperty('--color', '#FFF');
        root.style.setProperty('--highlight-background', '#242424');
        root.style.setProperty('--highlight-color', 'rgba(255, 255, 255, 0.7)');
        root.style.setProperty('--highlight-description', '#FFFFFF');
    } else {
        currentTheme = 'light';

        theme.src = './assets/light-mode.svg';
        prev.src = './assets/seta-esquerda-preta.svg';
        next.src = './assets/seta-direita-preta.svg';

        root.style.setProperty('--background-color', '#FFF');
        root.style.setProperty('--shadow-color', '0px 4px 8px rgba(0, 0, 0, 0.15)');
        root.style.setProperty('--color', '#000');
        root.style.setProperty('--highlight-background', '#FFF');
        root.style.setProperty('--highlight-color', 'rgba(0, 0, 0, 0.7)');
        root.style.setProperty('--highlight-description', '#000');
        
    }
});