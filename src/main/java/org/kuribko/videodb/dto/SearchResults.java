package org.kuribko.videodb.dto;

import org.kuribko.videodb.model.Movie;

import java.util.List;

public class SearchResults {
    private long count;
    private long totalCount;
    private int page;
    private List<Movie> movies;

    public SearchResults(int count, long totalCount, List<Movie> movies, int page) {
        this.count = count;
        this.movies = movies;
        this.totalCount = totalCount;
        this.page = page;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }
}
