package org.kuribko.moviecatalog.parser;

import org.kuribko.moviecatalog.model.Movie;

import java.io.IOException;
import java.util.List;

public interface SearchResultsParser {
    List<Movie> parseHtml(String html);
    List<Movie> parseFromUrl(String url) throws IOException;
}
