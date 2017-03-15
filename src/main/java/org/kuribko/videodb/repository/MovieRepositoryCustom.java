package org.kuribko.videodb.repository;

import org.kuribko.videodb.model.Movie;

import java.util.List;

public interface MovieRepositoryCustom {
    public List<Movie> search(String name, List<String> genres, List<String> countries, int skip, int limit);
    public Movie findOneByNameAndYear(String russianName, String originalName, int year);
    public List<String> findAllGenres();
    public List<String> findAllCountries();
}
