package org.kuribko.videodb.events;

import org.kuribko.videodb.model.Movie;

import java.util.List;

public class SynchronizationEvent {
    private String status;
    private List<Movie> movies;
    private long newMoviesCount;
    private long totalMoviesCount;
    private long parsedMoviesCount;

    public SynchronizationEvent(String status) {
        this.status = status;
    }

    public long getNewMoviesCount() {
        return newMoviesCount;
    }

    public void setNewMoviesCount(long newMoviesCount) {
        this.newMoviesCount = newMoviesCount;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getTotalMoviesCount() {
        return totalMoviesCount;
    }

    public void setTotalMoviesCount(long totalMoviesCount) {
        this.totalMoviesCount = totalMoviesCount;
    }

    public long getParsedMoviesCount() {
        return parsedMoviesCount;
    }

    public void setParsedMoviesCount(long parsedMoviesCount) {
        this.parsedMoviesCount = parsedMoviesCount;
    }
}
