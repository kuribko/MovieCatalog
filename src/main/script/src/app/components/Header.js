import React from "react";
import Search from "../containers/Search";
import Synchronizer from "../containers/Synchronizer";

export const Header = (props)=> {
    return (
        <header>
            <div className="container navbar-inverse navbar-fixed-top">
                <nav>
                    <div className="container-fluid">
                        <div className="navbar-header col-md-3">
                            <a className="navbar-brand" href="/">Movie Catalog</a>&nbsp;
                        </div>

                        <Search/>

                        <div className="nav navbar-nav navbar-right col-md-3">
                            <Synchronizer/>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )

}