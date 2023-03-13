import React, { useEffect } from 'react'
import { useState } from 'react';
import Newsarea from './Newsarea';

export default function News(props) {

  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const getNews = async (e) => {
    if (props.searchText) {
      let url = `https://newsapi.org/v2/everything?q=${props.searchText}&apiKey=${props.apiKey}&page=${page}&pagesize=20`
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults <= 100 ? parsedData.totalResults : 100)
      e.preventDefault()
    }
    else {
      props.setProgress(10)
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`
      let data = await fetch(url);
      props.setProgress(30)
      let parsedData = await data.json();
      props.setProgress(50)
      setArticles(parsedData.articles)
      setPage(page + 1)
      setTotalResults(parsedData.totalResults)
      props.setProgress(100)
    }
  }
  useEffect(() => {
    getNews();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    if (props.searchText) {
      let url = `https://newsapi.org/v2/everything?q=${props.searchText}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=20`
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setPage(page + 1)
      console.log(totalResults)
    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setPage(page + 1)
    }
  }

  return (
    <Newsarea fetchMoreData={fetchMoreData} articles={articles} totalResults={totalResults} category={props.category} />
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