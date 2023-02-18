import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { newsImg, newsTitle, newsDesc, newsUrl, newsDate, newsAuthor, newsSourceName} = this.props;
        return (
            <div className="card m-2">
                <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">
                    {newsSourceName}</span>
                <img src={newsImg} style={{ maxHeight: "10rem", maxWidth: "min-content", margin: "auto" }} className="card-img-top" alt="error" />
                <div className="card-body "><></>
                    <h5 className="card-title restrict-line line-2">{newsTitle}</h5>
                    <p className="card-text restrict-line line-2">{newsDesc}</p>
                    <p className="small">Author: {newsAuthor}</p>
                    <p className="small">{new Date(newsDate).toLocaleString()}</p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">Read More</a>
                </div>
            </div>
        )
    }
}
