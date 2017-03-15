import Config from 'Config';

export default {
    URLS: {
        movies: Config.serverUrl + "/api/movies?q=",
        genres: Config.serverUrl + "/api/genres",
        countries: Config.serverUrl + "/api/countries"
    }
}