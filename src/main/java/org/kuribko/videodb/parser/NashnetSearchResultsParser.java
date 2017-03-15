package org.kuribko.videodb.parser;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;
import org.kuribko.videodb.model.Movie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class NashnetSearchResultsParser implements SearchResultsParser {
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
            String countriesString = yearAndCountries.substring(yearAndCountries.indexOf(",")+1);
            List<String> countries = Arrays.asList(countriesString.replaceAll("\\p{C}", "").split("-"))
                    .stream().map(String::trim).filter(s->!"".equals(s)).collect(Collectors.toList());
            movie.setCountries(countries);

            // genres
            String genre = yearNode.nextSibling().nextSibling().toString().trim();
            List<String> genres = Arrays.asList(genre.replaceAll("\\p{C}", "").split("/"))
                    .stream().map(String::trim).filter(s->!"".equals(s)).collect(Collectors.toList());
            movie.setGenres(genres);

            // full info url
            String fullInfoUrl = homepage + m.select("a").first().attr("href");
            movie.setFullInfoUrl(fullInfoUrl);

            // cover
            String imgUrl = m.getElementsByClass("cover").first().attr("style");
            imgUrl = homepage+imgUrl.substring(imgUrl.indexOf("url(")+4, imgUrl.indexOf(")"));
            movie.setCover(imgUrl);


            movies.add(movie);
        }

        if(movies.isEmpty()){
            return null;
        }
        return movies;

    }
}
