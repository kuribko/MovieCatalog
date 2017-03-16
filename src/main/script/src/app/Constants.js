import Config from 'Config';

export default {
    URLS: {
        movies: Config.serverUrl + "/api/movies?q=",
        genres: Config.serverUrl + "/api/genres",
        countries: Config.serverUrl + "/api/countries",
        SSE: {
            events: Config.serverUrl + "/admin/synchronizer/sse",
            start: Config.serverUrl + "/admin/synchronizer/start",
            stop: Config.serverUrl + "/admin/synchronizer/stop"
        }
    }
}