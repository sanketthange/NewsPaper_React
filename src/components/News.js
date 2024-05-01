import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { wait } from '@testing-library/user-event/dist/utils';

export class News extends Component {

  constructor() {
    super()
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=b8b5361529f042f8b520311325ea8a76&page=1&pageSize=20";

    let data = await fetch(url);

    let parsedata = await data.json();

    this.setState({ articles: parsedata.articles ,
                    totalarticles: parsedata.totalResults
                 });

  }

  handleprevious= async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b8b5361529f042f8b520311325ea8a76&page=${this.state.page-1}&pageSize=20`;
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({ articles: parsedata.articles ,
                    page : this.state.page-1
    });

  }

  handleonnest= async()=>{
   
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b8b5361529f042f8b520311325ea8a76&page=${this.state.page+1}&pageSize=20`;
      let data = await fetch(url);
      let parsedata = await data.json();
      this.setState({ articles: parsedata.articles ,
                      page : this.state.page+1
      });
  
    
   

  }

  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center'>This is top head lines</h1>

        <div className="row my-3">

          {this.state.articles.map((element) => {
            return <div className="col-md-4 key={element.url}">
              <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} url={element.url} />
            </div>

          })}

        </div>

        <div>
          <div className="container d-flex justify-content-between">
            <button  disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevious}>&larr; Previous</button>

            <button  disabled={this.state.page+1 >Math.ceil(this.state.totalarticles/20)} type="button" className="btn btn-dark" onClick={this.handleonnest}>Next &rarr;</button>
          </div>

        </div>


      </div>
    )
  }
}

export default News
