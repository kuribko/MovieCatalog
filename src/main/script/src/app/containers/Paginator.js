import React from "react";
import {connect} from "react-redux";
import {changePage} from "../actions/filterActions";

class Paginator extends React.Component {

    getPageNumbers(currentPage) {
        // console.log("current page: ", currentPage);
        const range = 2;

        let dif = 0;
        let start = currentPage - range;
        if (start < 1) {
            dif = 1 - start;
            start = 1;
        }

        let end = currentPage + range + dif;
        let pages = [];
        for (var i = start; i <= end; i++) {
            pages.push(i);
        }
        // console.log("start and end", start, end);
        return pages;
    }

    render() {

        let currentPage = this.props.currentPage;
        let pages = this.getPageNumbers(currentPage);

        return (
            <nav aria-label="Page navigation" className="text-center">
                <b>
                    <ul className="pagination">
                        <li onClick={ ()=> this.props.changePage(this.props.currentPage-1)}>
                            <a href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>

                        {
                            pages.map((page)=> {
                                if (page === currentPage) {
                                    return (
                                        <li key={page} className="active" onClick={ ()=> this.props.changePage(page)}>
                                            <a href="#">{page}</a>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li key={page} onClick={ ()=> this.props.changePage(page)}>
                                            <a href="#">{page}</a>
                                        </li>
                                    )
                                }
                            })
                        }

                        <li onClick={ ()=> this.props.changePage(this.props.currentPage+1)}>
                            <a href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </b>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.filterReducer.currentPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePage: (pageNumber) => {
            dispatch(changePage(pageNumber));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator)