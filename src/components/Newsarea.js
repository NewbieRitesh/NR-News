import React from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Newsarea(props) {
    const firstUpperLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    }
    return (
        <>
            <InfiniteScroll
                dataLength={props.articles.length}
                next={props.fetchMoreData}
                hasMore={(props.articles.length) !== props.totalResults}
                loader={<Loading />}
            >
                <div className="container">
                    <h2 className='text-center m-3'>{props.searchText ? `News about ${props.searchText}` : `${firstUpperLetter(props.category)} Headlines`}</h2>
                    <div className="row">
                        {props.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    newsImg={element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="}
                                    newsTitle={element.title ? element.title : "Title Not Available"}
                                    newsDesc={element.description ? element.description : "Description is not available"}
                                    newsUrl={element.url}
                                    newsDate={element.publishedAt ? element.publishedAt : "no dates available"}
                                    newsAuthor={element.author ? element.author : "Unknown"}
                                    newsSourceName={element.source.name ? element.source.name : "Unknown"} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
};
