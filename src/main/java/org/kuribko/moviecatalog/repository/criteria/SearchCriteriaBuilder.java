package org.kuribko.moviecatalog.repository.criteria;

import org.kuribko.moviecatalog.model.Movie;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class SearchCriteriaBuilder {
    private static final String FLOAT_PATTERN = "[+-]?([0-9]*[.])?[0-9]+";
    private static final String KP_GREATER = "kp>";
    private static final String KP_LESS = "kp<";
    private static final String IMDB_GREATER = "imdb>";
    private static final String IMDB_LESS = "imdb<";


    public Query createSearchQuery(String searchString, List<String> genres, List<String> countries) {
        List<Criteria> finalCriterias = new ArrayList<>();
        if (searchString != null && !"".equals(searchString)) {
            List<String> words = Arrays.stream(searchString.split(" "))
                    .map(String::trim).filter(s -> !"".equals(s)).collect(Collectors.toList());

            for (String word : words) {
                List<Criteria> wordCriterias = new ArrayList<>();

                wordCriterias.add(Criteria.where(Movie.FIELD_ORIGINAL_NAME).regex(word, "i"));
                wordCriterias.add(Criteria.where(Movie.FIELD_RUSSIAN_NAME).regex(word, "i"));
                wordCriterias.add(Criteria.where(Movie.FIELD_GENRES).regex(word, "i"));
                wordCriterias.add(Criteria.where(Movie.FIELD_PRODUCERS).regex(word, "i"));
                wordCriterias.add(Criteria.where(Movie.FIELD_ACTORS).regex(word, "i"));

                addYearCriteria(word, wordCriterias);
                addKinopoiskCriteria(word, wordCriterias);
                addImdbCriteria(word, wordCriterias);


                finalCriterias.add(new Criteria().orOperator(wordCriterias.toArray(new Criteria[wordCriterias.size()])));
            }
        }

        addGenreFilters(genres, finalCriterias);
        addCountryFilters(countries, finalCriterias);

        Criteria singleCriteria;
        if (finalCriterias.isEmpty()) {
            singleCriteria = new Criteria();
        } else {
            singleCriteria = new Criteria().andOperator(finalCriterias.toArray(new Criteria[finalCriterias.size()]));
        }

        return Query.query(singleCriteria);
    }

    private void addYearCriteria(String word, List<Criteria> criteriaList) {
        // year
        if (word.matches("\\d+")) {
            int year = Integer.valueOf(word);
            criteriaList.add(new Criteria().where(Movie.FIELD_YEAR).is(year));
        }

        // year range
        if (word.matches("\\d+-\\d+")) {
            String[] years = word.split("-");
            int yearFrom = Integer.valueOf(years[0]);
            int yearTo = Integer.valueOf(years[1]);
            criteriaList.add(new Criteria().where(Movie.FIELD_YEAR).gte(yearFrom).lte(yearTo));
        }
    }

    private void addImdbCriteria(String word, List<Criteria> criteriaList) {
        // imdb raiting
        if ( word.matches(IMDB_GREATER+FLOAT_PATTERN) || word.matches(IMDB_LESS+FLOAT_PATTERN)) {
            if(word.contains(IMDB_GREATER)){
                float val = Float.valueOf(word.replace(IMDB_GREATER,""));
                criteriaList.add(new Criteria().where(Movie.FIELD_IMDB_RAITING).gte(val));
            }else{
                float val = Float.valueOf(word.replace(IMDB_LESS,""));
                criteriaList.add(new Criteria().where(Movie.FIELD_IMDB_RAITING).lte(val));
            }
        }
    }

    private void addCountryFilters(List<String> countries, List<Criteria> criteriasAnd) {
        if (countries != null && !countries.isEmpty()) {
            criteriasAnd.add(new Criteria().where(Movie.FIELD_COUNTRIES).all(countries));
        }
    }

    private void addGenreFilters(List<String> genres, List<Criteria> criteriasAnd) {
        if (genres != null && !genres.isEmpty()) {
            criteriasAnd.add(new Criteria().where(Movie.FIELD_GENRES).all(genres));
        }
    }

    private void addKinopoiskCriteria(String word, List<Criteria> criteriaList) {
        // kinopoisk raiting
        if ( word.matches(KP_GREATER+FLOAT_PATTERN) || word.matches(KP_LESS+FLOAT_PATTERN)) {
            if(word.contains(KP_GREATER)){
                float val = Float.valueOf(word.replace(KP_GREATER,""));
                criteriaList.add(new Criteria().where(Movie.FIELD_KINOPOISK_RAITING).gte(val));
            }else{
                float val = Float.valueOf(word.replace(KP_LESS,""));
                criteriaList.add(new Criteria().where(Movie.FIELD_KINOPOISK_RAITING).lte(val));
            }
        }
    }
}
