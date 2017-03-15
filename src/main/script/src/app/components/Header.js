import React from "react";
import Search from "./Search";

export const Header = (props)=> {
    return (
        <header>
            <div className="container navbar-inverse navbar-fixed-top">
                <nav>
                    <div className="container-fluid">
                        <div className="navbar-header col-md-3">
                            <a className="navbar-brand" href="/">Movie Catalog</a>
                        </div>

                        <Search/>

                        <ul className="nav navbar-nav navbar-right col-md-3">
                            <li><a href="/admin">Панель администрирования</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )

}