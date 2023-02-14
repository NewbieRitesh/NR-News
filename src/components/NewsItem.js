import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { newsImg, newsTitle, newsDesc, newsUrl} = this.props;
        return (
            <div className="card m-1" style={{ maxWidth: "18rem"}}>
                <img src={newsImg} className="card-img-top" alt="error" />
                <div className="card-body">
                    <h5 className="card-title">{newsTitle}...</h5>
                    <p className="card-text">{newsDesc}...</p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">Read More</a>
                </div>
            </div>
        )
    }
}
