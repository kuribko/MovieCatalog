package org.kuribko.moviecatalog.repository;

import org.kuribko.moviecatalog.model.Movie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.ArrayList;
import java.util.List;

public class MovieRepositoryImpl implements MovieRepositoryCustom {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Movie> search(String searchString, List<String> genres, List<String> countries, int skip, int limit) {
        List<Criteria> criterias = new ArrayList<>();

        log.info(String.format("Querying DB [searchString='%s', skip=%d, limit=%d genres=%s, countries=%s]", searchString, skip, limit, genres, countries));
        if (searchString != null && !"".equals(searchString)) {
            criterias.add(new Criteria().orOperator(
                    Criteria.where(Movie.FIELD_ORIGINAL_NAME).regex(searchString, "i"),
                    Criteria.where(Movie.FIELD_RUSSIAN_NAME).regex(searchString, "i")
            ));
        }

        if (genres != null && !genres.isEmpty()) {
            criterias.add(new Criteria().where(Movie.FIELD_GENRES).all(genres));
        }

        if(countries!=null && !countries.isEmpty()){
            criterias.add(new Criteria().where(Movie.FIELD_COUNTRIES).all(countries));
        }

        Criteria finalCriteria;
        if(criterias.isEmpty()){
            finalCriteria = new Criteria();
        }else {
            finalCriteria = new Criteria().andOperator(criterias.toArray(new Criteria[criterias.size()]));
        }

        Query query = Query.query(finalCriteria);
        if(skip<0){
            skip = 0;
        }
        query.skip(skip);

        if(limit>0) {
            query.limit(limit);
        }
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
        genres.sort((a,b)->a.compareTo(b));
        return genres;
    }

    @Override
    public List<String> findAllCountries() {
        List<String> countries = mongoTemplate.getCollection(Movie.COLLECTION_NAME).distinct(Movie.FIELD_COUNTRIES);
        countries.sort((a,b)->a.compareTo(b));
        return countries;
    }

}
