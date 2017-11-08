import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../logo.svg';
import { fetchPosts } from '../actions/index'

class homePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: 'backend-data'
    }
  }

  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    return (
      <div className="App">
        <div className="navbar navbar-default" style={{backgroundColor: 'coral'}}>
          <h3>Posting Engine</h3>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Talking to the backend yields these categories: <br/>
          {this.state.backend}
        </p>
      </div>
    );
  }
}

function mapStateToProps({posts}){
	return {posts: posts}
}


export default connect(mapStateToProps, { fetchPosts })(homePosts)