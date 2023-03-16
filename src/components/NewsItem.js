import React from 'react'

export default function NewsItem(props) {
    let { newsImg, newsTitle, newsDesc, newsUrl, newsDate, newsAuthor, newsSourceName } = props;
    return (
        <div className="card m-2">
            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">
                {newsSourceName}</span>
            <img src={newsImg} style={{ maxHeight: "10rem", maxWidth: "min-content", margin: "auto" }} className="card-img-top" alt="error" />
            <div className="card-body "><></>
                <a href={newsUrl} target="_blank" rel="noreferrer" className='text-decoration-none'>
                    <h5 className="card-title restrict-line line-2 text-dark">{newsTitle}</h5>
                    <p className="card-text restrict-line line-2 text-dark">{newsDesc}</p>
                    <span className="d-block text-end">Read More</span></a>
                <p className="small">Author: {newsAuthor}</p>
                <p className="small">{new Date(newsDate).toLocaleString()}</p>
            </div>
        </div>
    )
}