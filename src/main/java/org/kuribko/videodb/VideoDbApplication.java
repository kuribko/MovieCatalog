package org.kuribko.videodb;

import org.kuribko.videodb.service.NashNetSynchronizationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VideoDbApplication implements CommandLineRunner{

	private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private NashNetSynchronizationService syncService;

	public static void main(String[] args) {
		SpringApplication.run(VideoDbApplication.class, args);
	}

	@Override
	public void run(String... strings) throws Exception {
		log.info("Application started");
//        syncService.start();
	}
}
