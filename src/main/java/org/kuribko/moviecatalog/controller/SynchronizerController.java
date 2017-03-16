package org.kuribko.moviecatalog.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.kuribko.moviecatalog.events.SynchronizationEvent;
import org.kuribko.moviecatalog.service.NashNetSynchronizationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Iterator;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

@CrossOrigin

@RestController()
@RequestMapping(value = "/admin")
public class SynchronizerController {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    private Queue<SseEmitter> emitters = new ConcurrentLinkedQueue<>();
    @Autowired
    private NashNetSynchronizationService nashNetSynchronizationService;

    @RequestMapping("/synchronizer/sse")
    public SseEmitter sse() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

        emitters.add(emitter);
        emitter.onCompletion(() -> emitters.remove(emitter));

        return emitter;
    }

    @RequestMapping("")
    public String home() {
        return "admin";
    }

    public void sendEvent(SynchronizationEvent accountsProcessEvent) {
        ObjectMapper mapper = new ObjectMapper();
        String message = null;
        try {
            message = mapper.writeValueAsString(accountsProcessEvent);
        } catch (JsonProcessingException e) {
            log.error("Could not process JSON: " + e);
        }

        Iterator<SseEmitter> iterator = emitters.iterator();
        while (iterator.hasNext()) {
            SseEmitter sseEmitter = iterator.next();
            try {
                sseEmitter.send(message);
            } catch (IOException e) {
                sseEmitter.complete();
                emitters.remove(sseEmitter);
                log.error("Could not send SSE: " + e.getMessage());
            }
        }
    }

    @RequestMapping("/synchronizer/start")
    public String start() {
        nashNetSynchronizationService.start();
        return "sse started";
    }

    @RequestMapping("/synchronizer/stop")
    public String stop() {
        nashNetSynchronizationService.stop();
        return "sse stopped";
    }
}
