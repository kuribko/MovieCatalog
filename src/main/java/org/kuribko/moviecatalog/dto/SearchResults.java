package org.kuribko.moviecatalog.dto;

import org.kuribko.moviecatalog.model.Movie;

import java.util.List;

public class SearchResults {
    private long count;
    private long totalCount;
    private int page;
    private int pageSize;
    private List<Movie> movies;

    public SearchResults(long count, long totalCount, List<Movie> movies, int page, int pageSize) {
        this.count = count;
        this.movies = movies;
        this.totalCount = totalCount;
        this.page = page;
        this.pageSize = pageSize;
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

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
}
