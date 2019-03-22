import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  componentDidMount() {
    this.getRepos();
  }

  getRepos() {
    $.ajax({
      type:'GET',
      url:'/repos',
      success:(data) => {
        this.setState({repos:data}, () => console.log(this.state.repos))
      },
      error: () => console.log('I failed')
    })
  }


  search (term) {
    console.log(`${term} was searched`);
    let options = {
      username: term
    }
  
    $.ajax({
      type:'post',
      url: '/repos',
      contentType: 'application/json',
      data: JSON.stringify(options),
      success: (data) => {
        console.log('Search Sent')
        this.getRepos();
      },
      error: (err) => {
        console.log('error in ajax post');
        console.log(err);
      }

    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));