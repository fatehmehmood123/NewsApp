import React, { Component } from 'react'

export default class NewsItems extends Component {
  render() {
    let {title,description,imageUrl,url,author,date,source} = this.props;
    return (

        <div className="card" >
        <img src={imageUrl} className="card-img-top" alt="..."  />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={url}  rel="noreferrer" target="_blank" className="btn btn-primary btn-sm">Read more</a>
          <p className="card-text"><small className="text-muted">Last updated by {author?author:"Unknown"} at {new Date(date).toGMTString()}</small></p>
          <p className="card-text"><small className="text-muted">Source : {source?source:"Unknown"}</small></p>
          
        </div>
      </div>

    )
  }
}
