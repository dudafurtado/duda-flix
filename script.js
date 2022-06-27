const movies = document.querySelector('.movies')

let inicio = 0
let fim = 5

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false').then(resposta => {

    const promiseBody = resposta.json()

    promiseBody.then((body) => {
        const showMovies = body.results.slice(inicio, fim)
        showMovies.forEach(function (cadaFilme) {
            const movie = document.createElement('div')
            movie.classList.add('movie')
            movie.style.backgroundImage = `url(${cadaFilme.poster_path})`

            const movieInfo = document.createElement('div')
            movieInfo.classList.add('movie__info')

            const movieTitle = document.createElement('span')
            movieTitle.classList.add('movie__title')
            movieTitle.textContent = cadaFilme.title

            const movieRating = document.createElement('span')
            movieRating.classList.add('movie__rating')
            movieRating.textContent = cadaFilme.vote_average

            const estrela = document.createElement('img')
            estrela.src = './assets/estrela.svg'

            movieRating.append(estrela)
            movieInfo.append(movieTitle, movieRating)
            movie.append(movieInfo)
            movies.append(movie)
        })
    })
})



const input = document.querySelector('.input')

input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return

    const inputValue = event.target.value
    console.log(inputValue)
    const todosOsMovies = document.querySelectorAll('.movie')

    todosOsMovies.forEach(function (cadaMovie) {
        if (inputValue.trim() === '' || !inputValue) {
            cadaMovie.classList.remove('hidden')
        } else {
            const title = cadaMovie.querySelector('.movie__title')
            console.log(title)

            if (title.textContent.toLowerCase() === inputValue.toLowerCase()) {
                cadaMovie.classList.remove('hidden')
            } else {
                cadaMovie.classList.add('hidden')
            }
        }
    })
})


fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR').then(resposta => {
    const promiseBody = resposta.json()

    promiseBody.then(body => {
        const highlightVideo = document.querySelector('.highlight__video')
        highlightVideo.style.backgroundImage = `url(${body.backdrop_path})`

        const highlightTitle = document.querySelector('.highlight__title')
        highlightTitle.textContent = body.title

        const highlightRating = document.querySelector('.highlight__rating')
        highlightRating.textContent = body.vote_average

        const highlightGenres = document.querySelector('.highlight__genres')

        const highlightLaunch = document.querySelector('.highlight__launch')
        highlightLaunch.textContent = body.release_date

        const highlightDescription = document.querySelector('.highlight__description')
        highlightDescription.textContent = body.overview
    })
})

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR').then(resposta => {
    const promiseBody = resposta.json()

    promiseBody.then(body => {
        const key = body.results[0].key

        const highlightVideoLink = document.querySelector('.highlight__video-link')
        highlightVideoLink.href = `https://www.youtube.com/watch?v=${key}`
    })
})


const allMovies = document.querySelectorAll('.movie')
const modalHidden = document.querySelector('.modal hidden')

allMovies.forEach(eachMovie => {
    eachMovie.addEventListener('click', () => {
        modalHidden.classList.toggle('hidden')


        fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${movie.id}?language=pt-BR`).then(resposta => {
            console.log(resposta)
            const promiseBody = resposta.json()

            promiseBody.then(body => {
                console.log(body)

                const modalTitle = document.querySelector('.modal__title')
                modalTitle.textContent = body.title

                const modalImg = document.querySelector('.modal__img')
                modalImg.src = body.backdrop_path

                const modalDescription = document.querySelector('.modal__description')
                modalDescription.textContent = body.overview

                const modalAverage = document.querySelector('modal__average')
                modalAverage.textContent = body.vote_average

                body.genre.forEach(eachGenre => {
                    const modalGenre = document.createElement('span')
                    modalGenre.classList.add('modal__genre')
                    modalGenre.textContent = eachGenre.name

                    const modalGenres = docuement.querySelector('.modal__genres')
                    modalGenres.append(modalGenre)
                })
            })
        })
    })
})

const modalClose = document.querySelector('.modal__close')

modalClose.addEventListener('click', () => {
    modalHidden.classList.toggle('hidden')
})