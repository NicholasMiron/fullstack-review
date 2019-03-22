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
    $.ajax({
      type:'GET',
      url:'/repos',
      success:(data) => this.setState({repos:data}, () => console.log(this.state.repos)),
      failure: () => console.log('I failed')
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
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(options),
      success: () => console.log('Search Sent'),
      failre: (err) => console.error(err)
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