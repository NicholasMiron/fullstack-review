import React from 'react';

const RepoList = (props) => {
  let style = {
    'textDecorationLine': 'none',
    'color': 'black'
  }
  const renderRepos = props.repos.map((repo, i) => {
    
    return<li key={i}>
            <h2>Repo: {repo.name}</h2>
            <p><b>Author: </b>{repo.full_name}</p>
            <p><b>URL:</b> <a style={style} href={repo.html_url}>{repo.html_url}</a></p>
            <p><b>Watchers:</b> {repo.watchers}</p>
          </li>
  })
  
  return(
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      <ol>{renderRepos}</ol>
    </div>
)};

export default RepoList;