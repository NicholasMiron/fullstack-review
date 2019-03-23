import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';


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
    axios.get('/repos')
    .then(response => response.data)
    .then((data) => {
      this.setState({repos: data}, () => {
        console.log('Client: get request success');
      });
    })
    .catch(err => {
      console.log('Client: get request failed')
    })
  }
  
  search (term) {
    console.log(`${term} was searched`);
    
    let options = {
      'username': term
    }
    
    axios.post('/repos', options)
    .then(response => {
      console.log('Client: post request success')
      this.getRepos();
    })
    .catch(err => console.log('Client: post request failed'))
   
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