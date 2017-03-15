<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Movie Catalog (${totalMovies})</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
          integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="/js/filter.js"></script>

<header>
    <div class="container navbar-inverse navbar-fixed-top">
        <nav>
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/">Movie Catalog</a>
                </div>

                <ul class="nav navbar-nav navbar-left">
                    <li><a href="/admin">Панель администрирования</a></li>
                </ul>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <form id="searchForm" class="navbar-form navbar-right" method="get" action="/search">
                        <div id="search" class="input-group">
                            <input type="text" class="form-control" placeholder="Что ищем?" name="q"
                                   value="${searchString}">
                            <c:forEach items="${requestedGenres}" var="genre" varStatus="loopRequestedGenres">
                                <input type="hidden" name="genre" value="${genre}"/>
                            </c:forEach>
                            <c:forEach items="${requestedCountries}" var="country" varStatus="loopRequestedCountries">
                                <input type="hidden" name="country" value="${country}"/>
                            </c:forEach>
                            <span class="input-group-btn">
                                     <button class="btn btn-default" type="submit">
                                         <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                     </button>
                                </span>
                        </div>
                    </form>


                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
    </div>
</header>

<c:set var="moviesPerRow" scope="session" value="4"/>
<div class="main container">
    <%--movies table--%>
    <div class="col-md-10">
        <div class="row">
            <c:forEach items="${movies}" var="movie" varStatus="loop">
                <c:if test="${(loop.index+1)%moviesPerRow==0}">
                    <div class="row">
                </c:if>
                <div class="movie-cell col-md-3">
                    <a href="${movie.fullInfoUrl}">
                        <div class="movie text-center">


                            <b><c:out value="${movie.originalName}"/></b>

                            <div class="cover" style="background-image: url(${movie.cover})">
                                    <%--<a href="${movie.fullInfoUrl}">--%>
                                    <%--<img class="cover" src="<c:url value="${movie.cover}"/>"/>--%>
                                    <%--</a>--%>
                            </div>

                            <b><c:out value="${movie.russianName}"/></b><br>

                            <small>
                                <c:out value="${movie.year}"/> /
                                <c:forEach items="${movie.countries}" var="country" varStatus="loopCountries">
                                    ${country}${!loopCountries.last ? ', ' : ''}
                                </c:forEach>

                                <br>
                                <c:forEach items="${movie.genres}" var="genre" varStatus="loopGenres">
                                    ${genre}${!loopGenres.last ? ', ' : ''}
                                </c:forEach>
                            </small>
                        </div>
                    </a>
                </div>
                <c:if test="${(loop.index+1)%moviesPerRow==0}">
                    </div>
                </c:if>
            </c:forEach>
        </div>
    </div>

    <%--filters--%>
    <div id="filterPanel" class="col-md-2">
        <div class="panel">
            <div class="panel-body">
                <%--genres--%>
                <b>Жанры</b>
                <ul id="genresContainer" class="filterList">
                    <%--requested genres--%>
                    <c:forEach items="${requestedGenres}" var="genre" varStatus="loopRequestedGenres">
                        <li id="genreFilter${loopRequestedGenres.index}" value="${genre}" class="filterOn">
                            <a href="#"
                               onclick="filterOnClick('genreFilter${loopRequestedGenres.index}', '#genresContainer', 'genre')">${genre}</a>
                        </li>
                    </c:forEach>

                    <%--available genres--%>
                    <c:forEach items="${availableGenres}" var="genre" varStatus="loopAvailableGenres">
                        <li id="genreFilter${requestedGenres.size()+loopAvailableGenres.index}" value="${genre}">
                            <a href="#"
                               onclick="filterOnClick('genreFilter${requestedGenres.size()+loopAvailableGenres.index}', '#genresContainer', 'genre')">${genre}</a>
                        </li>
                    </c:forEach>
                </ul>

                <b>Страны</b>
                <ul id="countriesContainer" class="filterList">
                    <%--requested countrie--%>
                    <c:forEach items="${requestedCountries}" var="country" varStatus="loopRequestedCountries">
                        <li id="countryFilter${loopRequestedCountries.index}" value="${country}" class="filterOn">
                            <a href="#"
                               onclick="filterOnClick('countryFilter${loopRequestedCountries.index}', '#countriesContainer', 'country')">${country}</a>
                        </li>
                    </c:forEach>

                    <%--available countries--%>
                    <c:forEach items="${availableCountries}" var="country" varStatus="loopAvailableCountries">
                        <li id="countryFilter${requestedCountries.size()+loopAvailableCountries.index}"
                            value="${country}">
                            <a href="#"
                               onclick="filterOnClick('countryFilter${requestedCountries.size()+loopAvailableCountries.index}', '#countriesContainer', 'country')">${country}</a>
                        </li>
                    </c:forEach>
                </ul>
            </div>
        </div>
    </div>
</div>


<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
        crossorigin="anonymous"></script>
</body>
</html>