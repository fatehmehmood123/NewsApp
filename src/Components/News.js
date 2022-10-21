import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
  static defaultProps = {
    pageSize: 8,
    country: "us",
    category: "general",
    totalResults:0
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  articles = [];
  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("I am a constructor of News js");
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
    };
    document.title=`${this.capitalizeFirstLetter( this.props.category)} - News Monkey`;
  }
  async updateNews(){
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc791076d35e41fb8f961e58b371f827&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    // this.props.setProgress(30);
    let parsedData = await data.json();
    // this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }
  // handlePrevClick = async () => {
  //   this.setState({
  //     page:this.state.page-1
  //   })
  //   this.updateNews();
  // };

  // handleNextClick = async () => {
    // this.setState({
    //   page:this.state.page+1
    // })
  //   this.updateNews();
  //   }

  fetchMoreData = async () => {
    this.setState({
      page:this.state.page+1
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc791076d35e41fb8f961e58b371f827&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // loading: false,
    });
  };
  
  render() {
    return (
      <>
        <h2 className="text-center my-3">News-Monkey | Top {this.capitalizeFirstLetter( this.props.category)} headlines </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={(this.state.articles.length-this.props.pageSize) !== this.state.totalResults}
          loader={<Spinner/>}
        >
            {console.log(this.state.articles.length)}
            {console.log(this.state.totalResults)}
            {console.log(this.state.totalResults)}
            
            <div className="container">

        <div className="row">
          {
            this.state.articles.map((element) => {
              return (
                <React.Fragment key={element.url}>
                <div className="col-md-4 my-2">
                  <NewsItems
                  source={element.source.name}
                  author={element.author}
                  date={element.publishedAt}
                  title={element.title}
                  url={element.url}
                  description={element.description}
                  imageUrl={
                    !element.urlToImage
                    ? "https://static.politico.com/84/19/d81cb5804677900fe894040c90b9/senate-manchin-12332.jpg"
                    : element.urlToImage
                  }
                  
                  />
                </div>
                  </React.Fragment>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-primary"
            onClick={this.handlePrevClick}
          >
            &laquo; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            id="nextBtn"
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next &raquo;
          </button>
        </div> */}
      </>
    );
  }
}
