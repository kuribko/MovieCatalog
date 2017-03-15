package org.kuribko.moviecatalog.repository;

import org.kuribko.moviecatalog.model.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MovieRepository extends MongoRepository<Movie, String>, MovieRepositoryCustom {

    // https://www.javacodegeeks.com/2014/05/rocking-with-mongodb-on-spring-boot.html
    // http://www.baeldung.com/queries-in-spring-data-mongodb
//    @Query(value = "{$or: [{'originalName': ?0}, {'russianName': ?0}] }")
//    public List<Movie> search(String name);

    public Movie findOneByFullInfoUrl(String url);
}
