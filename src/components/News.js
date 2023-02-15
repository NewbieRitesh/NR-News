import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'

export default class News extends Component {
  static defaultProps = {
    pageSize: 18,
    category: 'general'
  }
  static propsType = {
    pageSize: Number,
    category: String
  }
  articles = [];
  constructor() {
    super();
    this.state = {
      articl: this.articles,
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1bdd8d155c1e4330a37612d399d7d6a4&pageSize=${this.props.pageSize}&page=1`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articl: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  handleNextClick = async () => {
    if (this.state.page < Math.ceil(this.state.totalResults / this.props.pageSize)) {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1bdd8d155c1e4330a37612d399d7d6a4&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`
      this.setState({ loading: true })
      let data = await fetch(url)
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articl: parsedData.articles,
        loading: false
      })
    }
  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1bdd8d155c1e4330a37612d399d7d6a4&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articl: parsedData.articles,
      loading: false
    })
  }
  
  render() {

    return (
      <div>
        <h2>{this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} news</h2>
        {this.state.loading && <Loading />}
        <div className="row">
          {!this.state.loading && this.state.articl.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem
                newsImg={element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="}
                newsTitle={element.title ? element.title : "Title Not Available"}
                newsDesc={element.description ? element.description : "Description is not available"}
                newsUrl={element.url}
                newsDate={element.publishedAt ? element.publishedAt : "no dates available"}
                newsAuthor={element.author ? element.author : "Unknown"} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between m-2">
          <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-sm btn-dark">&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} className="btn btn-sm btn-dark">Next &rarr;</button>
        </div>
      </div>
    )
  }
}