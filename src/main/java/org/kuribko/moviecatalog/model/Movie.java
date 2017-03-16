package org.kuribko.moviecatalog.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Document(collection = Movie.COLLECTION_NAME)
public class Movie {
    public static final String COLLECTION_NAME = "movies";
    public static final String FIELD_RUSSIAN_NAME = "russianName";
    public static final String FIELD_ORIGINAL_NAME = "originalName";
    public static final String FIELD_YEAR = "year";
    public static final String FIELD_GENRES = "genres";
    public static final String FIELD_COUNTRIES = "countries";

    @Id
    private String id;
    private String russianName;
    private String originalName;
    private int year;
    private String fullInfoUrl;
    private String cover;
    private List<String> genres;
    private List<String> countries;
    private List<String> producers;
    private List<String> actors;
    private float kinopoiskRating;
    private float imdbRating;

    public Movie() {
    }

    public Movie(String russianName, String originalName, int year, String fullInfoUrl) {
        this.russianName = russianName;
        this.originalName = originalName;
        this.year = year;
        this.fullInfoUrl = fullInfoUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Movie)) return false;

        Movie movie = (Movie) o;

        if (year != movie.year) return false;
        if (!russianName.equals(movie.russianName)) return false;
        if (originalName != null ? !originalName.equals(movie.originalName) : movie.originalName != null) return false;
        return fullInfoUrl != null ? fullInfoUrl.equals(movie.fullInfoUrl) : movie.fullInfoUrl == null;

    }

    @Override
    public int hashCode() {
        int result = russianName.hashCode();
        result = 31 * result + (originalName != null ? originalName.hashCode() : 0);
        result = 31 * result + year;
        return result;
    }

    public String getRussianName() {
        return russianName;
    }

    public void setRussianName(String russianName) {
        this.russianName = russianName;
    }

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getFullInfoUrl() {
        return fullInfoUrl;
    }

    public void setFullInfoUrl(String fullInfoUrl) {
        this.fullInfoUrl = fullInfoUrl;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public List<String> getCountries() {
        return countries;
    }

    public void setCountries(List<String> countries) {
        this.countries = countries;
    }

    public String getId() {
        return id;
    }

    public List<String> getProducers() {
        return producers;
    }

    public void setProducers(List<String> producers) {
        this.producers = producers;
    }

    public List<String> getActors() {
        return actors;
    }

    public void setActors(List<String> actors) {
        this.actors = actors;
    }

    public float getKinopoiskRating() {
        return kinopoiskRating;
    }

    public void setKinopoiskRating(float kinopoiskRating) {
        this.kinopoiskRating = kinopoiskRating;
    }

    public float getImdbRating() {
        return imdbRating;
    }

    public void setImdbRating(float imdbRating) {
        this.imdbRating = imdbRating;
    }

    @Override
    public String toString() {
        return russianName + " / " + originalName + " (" + year + "): " + fullInfoUrl;
    }
}
