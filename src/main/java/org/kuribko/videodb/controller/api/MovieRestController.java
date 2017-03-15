package org.kuribko.videodb.controller.api;

import org.kuribko.videodb.dto.SearchResults;
import org.kuribko.videodb.model.Movie;
import org.kuribko.videodb.service.MovieService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class MovieRestController {
    private Logger log = LoggerFactory.getLogger(this.getClass());
    private static final int MOVIES_PER_PAGE = 24;

    @Autowired
    private MovieService movieService;

    @RequestMapping(value = {"/movies"})
    public SearchResults search(@RequestParam(value = "q", required = false) String searchString,
                                @RequestParam(value = "genre", required = false) List<String> requestedGenres,
                                @RequestParam(value = "country", required = false) List<String> requestedCountries,
                                @RequestParam(value = "p", required = false, defaultValue = "1") int page) {
        if (searchString == null) {
            searchString = "";
        } else {
            searchString = searchString.trim();
        }

        List<Movie> movies;
        long totalMovies = movieService.count();
        int skip = (page-1)*MOVIES_PER_PAGE;
        //results and totalMovies
//        if (isSearchAndFilterEmpty(searchString, requestedGenres, requestedCountries)) {
//            movies = movieService.findAll();
//        } else {
//            movies = movieService.search(searchString, requestedGenres, requestedCountries, skip, MOVIES_PER_PAGE);
//        }
            movies = movieService.search(searchString, requestedGenres, requestedCountries, skip, MOVIES_PER_PAGE);
        log.info(String.format("Returning %d movies", movies.size()));

        return new SearchResults(movies.size(), totalMovies, movies, page);
    }

    @RequestMapping(value = {"/genres"})
    public List<String> genres() {
        return movieService.findAllGenres();
    }

    @RequestMapping(value = {"/countries"})
    public List<String> countries() {
        return movieService.findAllCountries();
    }


    private boolean isSearchAndFilterEmpty(String searchString, List<String> requestedGenres, List<String> requestedCountries) {
        return (searchString == null || "".equals(searchString.trim()))
                && isNullOrEmpty(requestedGenres)
                && isNullOrEmpty(requestedCountries);
    }

    private boolean isNullOrEmpty(List list) {
        return list == null || (list != null && list.isEmpty());
    }

}
