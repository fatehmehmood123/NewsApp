import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  page = 30;
  countryName = "in";
  state= {
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <>
      <Router>
        <Navbar/>
        <LoadingBar
        color='red'
        height={2}
        progress={this.state.progress}        
        loaderSpeed={100}
         />
        <Routes>
        <Route exact path="/business" element={ <News setProgress={this.setProgress}   pageSize={this.page} key="business" country={this.countryName} category="business"/>} /> 
        <Route exact path="/entertainment" element={ <News setProgress={this.setProgress}   pageSize={this.page} key="entertainment" country={this.countryName} category="entertainment"/>} /> 
        <Route exact path="/" element={ <News setProgress={this.setProgress}   pageSize={this.page} key="general" country={this.countryName} category="general"/>} /> 
        <Route exact path="/health" element={ <News setProgress={this.setProgress}   pageSize={this.page} key="health" country={this.countryName} category="health"/>} /> 
        <Route exact path="/science" element={ <News setProgress={this.setProgress}   pageSize={this.page} key="science" country={this.countryName} category="science"/>} /> 
        <Route exact path="/sports" element={ <News setProgress={this.setProgress}   pageSize={this.page} key="sports" country={this.countryName} category="sports"/>} /> 
        <Route exact path="/technology" element={ <News setProgress={this.setProgress}   pageSize={this.page} key="technology" country={this.countryName} category="technology"/>} /> 
        </Routes>
      </Router>
            </>
    )
  }
}
