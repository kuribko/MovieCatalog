<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head>
    <title>Movie catalog</title>
    <meta charset="UTF-8"/>
    <meta http-equiv="Content-Type" content="text/html"/>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
          integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>

<header>
    <div class="container navbar-inverse navbar-fixed-top">
        <nav>
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">Movie Catalog</a>
                </div>

                <ul class="nav navbar-nav navbar-left">
                    <li><a href="/">На сайт</a></li>
                </ul>

                <!-- Collect the nav links, forms, and other content for toggling -->
            </div><!-- /.container-fluid -->
        </nav>
    </div>
</header>

<div class="main container">
    <div>
        <iframe name="donothing" style="display:none;"></iframe>
        <form id="start" action="/admin/synchronizer/start" method="get" target="donothing">
            <button type="submit">Start</button>
        </form>
        <form id="stop" action="/admin/synchronizer/stop" method="get" target="donothing" style="display:none;">
            <button type="submit">Stop</button>
        </form>
    </div>
    <br>
    <div id="progressContainer">Click "Start" button to start synchronization</div>
    <br>
    <div id="moviesContainer">...</div>

    <script type="text/javascript">
        //check for browser support
        if (typeof(EventSource) !== "undefined") {
            //create an object, passing it the name and location of the server side script
            var eSource = new EventSource("/admin/synchronizer/sse");
            //detect message receipt
            eSource.onmessage = function (event) {
                //write the received data to the page
                var syncEvent = JSON.parse(event.data);

                document.getElementById("progressContainer").innerHTML = "<b>Processed: " + syncEvent.parsedMoviesCount
                        + "</br> Total: " + syncEvent.totalMoviesCount
                        + "<br><br>New: " + syncEvent.newMoviesCount + "</br>"

                if (syncEvent.movies != null) {
                    var moviesHtml = "";
                    for (var i = 0; i < syncEvent.movies.length; i++) {
                        var movie = syncEvent.movies[i];
                        moviesHtml += movie.russianName + " / " + movie.originalName + " (" + movie.year + ")<br>";
                    }
                    document.getElementById("moviesContainer").innerHTML = moviesHtml + document.getElementById("moviesContainer").innerHTML;
                }

                if (syncEvent.status === "on") {
                    document.getElementById("start").style.display = "none";
                    document.getElementById("stop").style.display = "block";
                } else {
                    document.getElementById("start").style.display = "block";
                    document.getElementById("stop").style.display = "none";
                }
            };
        }
        else {
            document.getElementById("serverData").innerHTML = "Whoops! Your browser doesn't receive server-sent events.";
        }</script>

</div>
</body>
</html>