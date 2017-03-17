package org.kuribko.moviecatalog.parser;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;
import org.kuribko.moviecatalog.model.Movie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class NashnetSearchResultsParser implements SearchResultsParser {
    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Value("${nashnet.homepage}")
    private String homepage;

    @Override
    public List<Movie> parseHtml(String html) {

        Document doc = Jsoup.parse(html);
        return parse(doc);
    }

    @Override
    public List<Movie> parseFromUrl(String url) throws IOException {
        Document doc = Jsoup.connect(url).get();
        return parse(doc);
    }

    private List<Movie> parse(Document doc) {
        List<Movie> movies = new ArrayList<>();
        Elements movieElements = doc.body().getElementsByClass("video");

        for (Element m : movieElements) {
            Movie movie = new Movie();

            // original name
            String origName = m.select("h4").first().text();
            movie.setOriginalName(origName);

            // russian name
            Element rusNameElem = m.select("h4:has(a)").first();
            String rusName = rusNameElem.text();
            movie.setRussianName(rusName);

            // year
            Node yearNode = rusNameElem.nextSibling();
            String yearAndCountries = yearNode.toString().trim();
            String y = yearAndCountries.substring(0, yearAndCountries.indexOf(","));
            int year = Integer.valueOf(y);
            movie.setYear(year);

            // countries
            String countriesString = yearAndCountries.substring(yearAndCountries.indexOf(",") + 1);
            List<String> countries = Arrays.asList(countriesString.replaceAll("\\p{C}", "").split("-"))
                    .stream().map(String::trim).filter(s -> !"".equals(s)).collect(Collectors.toList());
            movie.setCountries(countries);

            // genres
            Node genreNode = yearNode.nextSibling().nextSibling();
            String genre = genreNode.toString().trim();
            List<String> genres = Arrays.asList(genre.replaceAll("\\p{C}", "").split("/"))
                    .stream().map(String::trim).filter(s -> !"".equals(s)).collect(Collectors.toList());
            movie.setGenres(genres);

            // producer
            Node producerNode = genreNode.nextSibling();
            String producer = "";
            if (producerNode.childNodes().size() > 1) {
                producer = producerNode.childNode(1).toString().trim();
            }
            List<String> producers = Arrays.asList(producer.replaceAll("\\p{C}", "").split(","))
                    .stream().map(String::trim).filter(s -> !"".equals(s)).collect(Collectors.toList());
            movie.setProducers(producers);

            // actors
            Node actorsNode = producerNode.nextSibling().nextSibling();
            String actor = "";
            List<String> actors = null;
            if (actorsNode != null) {
                if (actorsNode.childNodes().size() > 1) {
                    actor = actorsNode.childNode(1).toString().trim();
                }
                actors = Arrays.asList(actor.replaceAll("\\p{C}", "").split(","))
                        .stream().map(String::trim).filter(s -> !"".equals(s)).collect(Collectors.toList());
            }
            movie.setActors(actors);

            // full info url
            String fullInfoUrl = homepage + m.select("a").first().attr("href");
            movie.setFullInfoUrl(fullInfoUrl);

            // cover
            String imgUrl = m.getElementsByClass("cover").first().attr("style");
            imgUrl = homepage + imgUrl.substring(imgUrl.indexOf("url(") + 4, imgUrl.indexOf(")"));
            movie.setCover(imgUrl);

            // kinopoisk raiting
            String kp = m.getElementsByClass("kp").first().text().trim();
            float kinopoiskRating = 0;
            try {
                kinopoiskRating = Float.valueOf(kp);
            } catch (NumberFormatException e) {
                log.error(String.format("Could not transform kinopoiskRaiting to float. value=[%s] url=%s", kp, fullInfoUrl), e);
            }
            movie.setKinopoiskRating(kinopoiskRating);

            // imdb raiting
            String imdb = m.getElementsByClass("imdb").first().text().trim();
            float imdbRating = 0;
            try {
                imdbRating = Float.valueOf(imdb);
            } catch (NumberFormatException e) {
                log.error(String.format("Could not transform kinopoiskRaiting to float. value=[%s] url=%s", imdb, fullInfoUrl), e);
            }
            movie.setImdbRating(imdbRating);

            movies.add(movie);
        }

        if (movies.isEmpty()) {
            return null;
        }
        return movies;

    }
}
