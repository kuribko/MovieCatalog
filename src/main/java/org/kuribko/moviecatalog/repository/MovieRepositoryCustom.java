package org.kuribko.moviecatalog.repository;

import org.kuribko.moviecatalog.model.Movie;

import java.util.List;

public interface MovieRepositoryCustom {
    List<Movie> search(String name, List<String> genres, List<String> countries, int pageNumber, int pageSize, String sortField);

    Movie findOneByNameAndYear(String russianName, String originalName, int year);

    List<String> findAllGenres();

    List<String> findAllCountries();

    long count(String searchString, List<String> requestedGenres, List<String> requestedCountries);
}
