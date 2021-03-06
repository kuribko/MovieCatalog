package org.kuribko.moviecatalog.service;

import org.kuribko.moviecatalog.model.Movie;
import org.kuribko.moviecatalog.repository.MovieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> search(String searchString, List<String> genres, List<String> requestedCountries, int skip, int limit, String sortField){
        return movieRepository.search(searchString, genres, requestedCountries, skip, limit, sortField);
    }

    public Movie findOneByUrl(String url){
        return movieRepository.findOneByFullInfoUrl(url);
    }

    public List<Movie> findAll(){
      return  movieRepository.findAll();
    }

    public boolean save(Movie movie){
        Movie m = movieRepository.findOneByNameAndYear(movie.getRussianName(), movie.getOriginalName(), movie.getYear());
        if(m==null) {
            m = movieRepository.save(movie);
//            log.info("Saved: "+m);
            return true;
        }else{
//            log.info("Skipping save as it already exists: "+m);
            return false;
        }
    }

    public long count(){
        return movieRepository.count();
    }

    public List<String> findAllGenres(){
        return movieRepository.findAllGenres();
    }

    public List<String> findAllCountries(){
        return movieRepository.findAllCountries();
    }

    public long count(String searchString, List<String> requestedGenres, List<String> requestedCountries) {
        return movieRepository.count(searchString, requestedGenres, requestedCountries);
    }
}
