package org.kuribko.videodb.parser;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.kuribko.videodb.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class NashnetSearchResultsParserTest {

    @Autowired
    private NashnetSearchResultsParser parser;

    @Test
    public void testParseTerminatorSearchResults() {
        // given
        String html = readFile("html/nashnet/terminator_search_results.html");
        List<Movie> expectedMovies = Arrays.asList(
                new Movie("Терминатор", "Terminator, The", 1984, "http://video.nash.net.ua/film/10676"),
                new Movie("Терминатор: Генезис", "Terminator Genisys", 2015, "http://video.nash.net.ua/film/21055"),
                new Movie("Терминатор 2: Судный день", "Terminator 2: Judgment Day", 1991, "http://video.nash.net.ua/film/11162"),
                new Movie("Терминатор: Да придет спаситель", "Terminator Salvation", 2009, "http://video.nash.net.ua/film/16688"),
                new Movie("Терминатор 3. Восстание машин", "Terminator 3. Rise Of The Machines", 2003, "http://video.nash.net.ua/film/10677")
        );

        // when
        List<Movie> parsedMovies = parser.parseHtml(html);

        // then
//        parsedMovies.forEach(System.out::println);
        assertNotNull("Parse result should not be null", parsedMovies);
        assertEquals("Incorrect movies count", 5, parsedMovies.size());
        assertTrue("Incorrect parsing results", parsedMovies.containsAll(expectedMovies));
    }

    @Test
    public void testEmptySearchResults(){
        // given
        String html = readFile("html/nashnet/empty_search_results.html");

        // when
        List<Movie> parsedMovies = parser.parseHtml(html);

        // then
        assertNull("Parse result for empty page should be null", parsedMovies);
    }

    private Path getFilePath(String filename) {
        java.net.URL url = this.getClass().getResource("/" + filename);
        try {
            return Paths.get(url.toURI());
        } catch (URISyntaxException e) {
            fail("ERROR: Can't resolve file path to: " + filename);
        }
        return null;
    }

    private String readFile(String filename) {
        byte[] encoded = new byte[0];
        Path path = getFilePath(filename);
        try {
            encoded = Files.readAllBytes(path);
        } catch (IOException e) {
            e.printStackTrace();
            fail("Cant resolve file: " + filename);
        }
        return new String(encoded, StandardCharsets.UTF_8);
    }
}