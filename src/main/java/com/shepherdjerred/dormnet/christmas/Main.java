package com.shepherdjerred.dormnet.christmas;

import com.shepherdjerred.dormnet.christmas.routes.Router;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import spark.Spark;

import static spark.Spark.*;

public class Main {

    public static final Logger logger = LogManager.getLogger(Main.class);

    public static void main(String[] args) {
        port(getHerokuPort());
        staticFiles.location("/assets");
        new Router().setupRoutes();
    }

    static int getHerokuPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 80;
    }

    public static void stop() {
        Spark.stop();
    }
}