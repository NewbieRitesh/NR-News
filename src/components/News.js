import React, { useEffect } from 'react'
import { useState } from 'react';
import Loading from './Loading';
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News(props) {

  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const getNews = async() =>   {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${props.apiKey}&pageSize=${pageSize}&page=${page}`
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(50)
    setArticles(parsedData.articles)
    setPage(page + 1)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100)
  }
  useEffect(() => {
    getNews();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${props.apiKey}&pageSize=${pageSize}&page=${page}`
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setPage(page + 1)
  }
  const firstUpperLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  let { category, pageSize } = props
  return (
    <>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={(articles.length) !== totalResults}
        loader={<Loading />}
      >
        <div className="container">
          <h2 className='text-center m-3'>{firstUpperLetter(category)} Headlines</h2>
          <div className="row">
            {articles.map((element) => {
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
}

News.propsType = {
  pageSize: Number,
  category: String
}
News.defaultProps = {
  pageSize: 18,
  category: 'general'
}