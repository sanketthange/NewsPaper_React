import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title , description, imageurl, url,author ,date}  = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
          <img src={!imageurl?"https://cdn.ndtv.com/common/images/ogndtv.png":imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className='text-muted'>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={url}  target='blank' className="btn btn-sm btn-primary">Read more....</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
