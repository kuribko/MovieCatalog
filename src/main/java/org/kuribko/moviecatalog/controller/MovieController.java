package org.kuribko.moviecatalog.controller;

import org.kuribko.moviecatalog.model.Movie;
import org.kuribko.moviecatalog.service.MovieService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class MovieController {
    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MovieService movieService;

    @RequestMapping(value = {"/main", "/search"})
    public String search(@RequestParam(value = "q", required = false) String searchString,
                         @RequestParam(value = "genre", required = false) List<String> requestedGenres,
                         @RequestParam(value = "country", required = false) List<String> requestedCountries,
                         Model model) {

        if (searchString == null) {
            searchString = "";
        } else {
            searchString = searchString.trim();
        }

        List<Movie> results;
        String totalMovies;
        //results and totalMovies
        if (isSearchAndFilterEmpty(searchString, requestedGenres, requestedCountries)) {
            results = movieService.findAll();
            totalMovies = Long.toString(movieService.count());
        } else {
            results = movieService.search(searchString, requestedGenres, requestedCountries, 0, -1);
            totalMovies = results.size() + "/" + movieService.count();
        }

        // available genres
        List<String> availableGenres = movieService.findAllGenres();
        if (requestedGenres != null && requestedGenres != null) {
            availableGenres.removeAll(requestedGenres);
        }

        // available countries
        List<String> availableCountries = movieService.findAllCountries();
        if (availableCountries != null && requestedCountries != null) {
            availableCountries.removeAll(requestedCountries);
        }

        //model
        model.addAttribute("movies", results);
        model.addAttribute("searchString", searchString);
        model.addAttribute("availableGenres", availableGenres);
        model.addAttribute("requestedGenres", requestedGenres);
        model.addAttribute("availableCountries", availableCountries);
        model.addAttribute("requestedCountries", requestedCountries);
        model.addAttribute("totalMovies", totalMovies);

        log.info(String.format("Search by [%s, %s, %s] returns %d results", searchString, requestedGenres, requestedCountries, results.size()));

        return "index";
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
