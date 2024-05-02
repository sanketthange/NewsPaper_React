import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps={
    country: 'in',
    pageSize:6,
    category:'general',
  }

  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title=`News- ${this.props.category}`
  }

  async newupdate(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b8b5361529f042f8b520311325ea8a76&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);

    let parsedata = await data.json();

    this.setState({ articles: parsedata.articles ,
                    totalarticles: parsedata.totalResults,
                    loading : false
                 });
  }

  async componentDidMount() {
  this.newupdate();
  }

  handleprevious= async()=>{
    this.setState({page : this.state.page-1 });
    this.newupdate();
  }

  handleonnest= async()=>{
      this.setState({ page : this.state.page+1,});
      this.newupdate();
  

  }

  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center'>This is top head lines</h1>
         {this.state.loading && <Spinner/>} 
        <div className="row my-3">

          {this.state.articles.map((element) => {
            return <div className="col-md-4 key={element.url}">
              <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt}/>
            </div>

          })}

        </div>

        <div>
          <div className="container d-flex justify-content-between">
            <button  disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevious}>&larr; Previous</button>

            <button  disabled={this.state.page+1 >Math.ceil(this.state.totalarticles/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleonnest}>Next &rarr;</button>
          </div>

        </div>


      </div>
    )
  }
}

export default News
