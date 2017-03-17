package org.kuribko.moviecatalog.service;

import org.kuribko.moviecatalog.controller.SynchronizerController;
import org.kuribko.moviecatalog.events.SynchronizationEvent;
import org.kuribko.moviecatalog.model.Movie;
import org.kuribko.moviecatalog.parser.SearchResultsParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class NashNetSynchronizationService {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    public static final int SYNC_PERIOD = 3;

    @Autowired
    private SearchResultsParser parser;

    @Autowired
    private SynchronizerController synchronizerController;

    @Autowired
    private MovieService movieService;

    @Value("${nashnet.homepage}/?start=")
    private String searchUrl;

    @Value("${nashnet.movies-per-page}")
    private int moviesPerPage;

    private AtomicInteger pageNumber = new AtomicInteger(0);

    private ScheduledExecutorService scheduler;
    private AtomicInteger newMoviesCounter = new AtomicInteger(0);
    private AtomicInteger parsedMoviesCounter = new AtomicInteger(0);
    private volatile String status = "off";

    synchronized public void start() {
        if (scheduler == null) {
            scheduler = Executors.newScheduledThreadPool(1);
            scheduler.scheduleAtFixedRate(new SynchronizationTask(), 0, SYNC_PERIOD, TimeUnit.SECONDS);
        }
        status = "on";
        sendChangedEvent();
        log.info("Service started");
    }

    synchronized public void stop() {
        if (scheduler != null) {
            scheduler.shutdown();
        }
        scheduler = null;
        status = "off";
        sendChangedEvent();
        log.info("Service stopped");
    }

    private class SynchronizationTask implements Runnable {
        @Override
        public void run() {
            String url = searchUrl + (pageNumber.getAndIncrement() * moviesPerPage);
            log.info("Parsing page: " + url);
            try {
                List<Movie> newMovies = new ArrayList<>();


                List<Movie> movies = null;
                try {
                    movies = parser.parseFromUrl(url);

                }catch (RuntimeException e){
                    log.error("Error in parser", e);
                    throw e;
                }

                if(movies==null){
                    log.info("Reached the end of site. Stopping");
                    stop();
                }

                log.info(movies.size() + " movies parsed");
                parsedMoviesCounter.addAndGet(movies.size());

                for (Movie m : movies) {
                    if (movieService.save(m)) {
                        newMoviesCounter.incrementAndGet();
                        newMovies.add(m);
                    }
                }

                sendChangedEvent(newMovies);


            } catch (IOException e) {
                log.error("Stopping service due to connection problems: " + e);
                stop();
            }

        }
    }

    private void sendChangedEvent(List<Movie> newMovies) {
        SynchronizationEvent event = new SynchronizationEvent(status);
        event.setMovies(newMovies);
        event.setNewMoviesCount(newMoviesCounter.get());
        event.setTotalMoviesCount(movieService.count());
        event.setParsedMoviesCount(parsedMoviesCounter.get());
        synchronizerController.sendEvent(event);
    }

    private void sendChangedEvent() {
        sendChangedEvent(null);
    }
}
