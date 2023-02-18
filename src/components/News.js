import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  static defaultProps = {
    pageSize: 18,
    category: 'general'
  }
  static propsType = {
    pageSize: Number,
    category: String,
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      hasMore: true
    }
  }
  async componentDidMount() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(50)
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      totalResults: parsedData.totalResults,
    })
    this.props.setProgress(100)
  }
  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: this.state.page + 1,
      hasMore: false
    })
  }
  firstUpperLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }
  render() {
    let {category, pageSize} = this.props
    return (
      <>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={(this.state.articles.length + pageSize) !== this.state.totalResults}
          loader={<Loading />}
        >
          <div className="container">
          <h2 className='text-center m-2'>{this.firstUpperLetter(category)} Headlines</h2>
          {/* <h2>{this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1).toLowerCase()}</h2> */}
          <div className="row">
            {this.state.articles.map((element) => {
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
}
