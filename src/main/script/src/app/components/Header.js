import React from "react";
import Search from "../containers/Search";
import Synchronizer from "../containers/Synchronizer";
import Sorter from "../containers/Sorter";

export const Header = (props)=> {
    return (
        <header>
                <nav className="container navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header col-lg-3 col-md-3 col-sm-3 col-xs-0">
                            <a className="navbar-brand" href="/">Movie Catalog</a>&nbsp;
                        </div>

                        <Search/>

                        <div className="nav navbar-right col-md-3 col-md-3 col-sm-3 col-xs-4 ">
                            <Synchronizer/>
                        </div>
                    </div>
                </nav>
        </header>
    )

}