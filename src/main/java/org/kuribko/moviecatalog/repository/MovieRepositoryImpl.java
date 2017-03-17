package org.kuribko.moviecatalog.repository;

import org.kuribko.moviecatalog.model.Movie;
import org.kuribko.moviecatalog.repository.criteria.SearchCriteriaBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class MovieRepositoryImpl implements MovieRepositoryCustom {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private SearchCriteriaBuilder searchCriteriaBuilder;


//    @Override
//    public List<Movie> search(String searchString, List<String> genres, List<String> countries, int skip, int limit) {
//        List<CriteriaDefinition> criterias = new ArrayList<>();
//
//        log.info(String.format("Querying DB [searchString='%s', skip=%d, limit=%d genres=%s, countries=%s]", searchString, skip, limit, genres, countries));
//
//        Query query;
//        if (searchString != null && !"".equals(searchString)) {
//            List<String> words = Arrays.stream(searchString.split(" "))
//                    .map(String::trim).filter(s -> !"".equals(s)).collect(Collectors.toList());
//            TextCriteria criteria = TextCriteria.forDefaultLanguage()
//                    .matchingAny(words.toArray(new String[words.size()])).caseSensitive(false);
//            query = TextQuery.queryText(criteria)
//                    .sortByScore();
//        } else {
//            Criteria criteria = new Criteria();
//            query = Query.query(criteria);
//            if (skip < 0) {
//                skip = 0;
//            }
//        }
//
//
//        query.skip(skip);
//
//        if (limit > 0) {
//            query.limit(limit);
//        }
//        return mongoTemplate.find(query, Movie.class);
//    }

    @Override
    public List<Movie> search(String searchString, List<String> genres, List<String> countries, int pageNumber, int pageSize) {
//        log.info(String.format("Querying DB [searchString='%s', skip=%d, limit=%d genres=%s, countries=%s]", searchString, skip, limit, genres, countries));
        Query query = searchCriteriaBuilder.createSearchQuery(searchString, genres, countries);
        query.with(new PageRequest(pageNumber, pageSize));
        return mongoTemplate.find(query, Movie.class);
    }



    @Override
    public Movie findOneByNameAndYear(String russianName, String originalName, int year) {
        Criteria criteria = new Criteria().andOperator(Criteria.where(Movie.FIELD_ORIGINAL_NAME).is(originalName),
                Criteria.where(Movie.FIELD_RUSSIAN_NAME).is(russianName),
                Criteria.where(Movie.FIELD_YEAR).is(year)
        );
        return mongoTemplate.findOne(Query.query(criteria), Movie.class);
    }

    @Override
    public List<String> findAllGenres() {
        List<String> genres = mongoTemplate.getCollection(Movie.COLLECTION_NAME).distinct(Movie.FIELD_GENRES);
        genres.sort((a, b) -> a.compareTo(b));
        return genres;
    }

    @Override
    public List<String> findAllCountries() {
        List<String> countries = mongoTemplate.getCollection(Movie.COLLECTION_NAME).distinct(Movie.FIELD_COUNTRIES);
        countries.sort((a, b) -> a.compareTo(b));
        return countries;
    }

    @Override
    public long count(String searchString, List<String> genres, List<String> countries) {
        Query query = searchCriteriaBuilder.createSearchQuery(searchString, genres, countries);
        return mongoTemplate.count(query, Movie.class);
    }

}
