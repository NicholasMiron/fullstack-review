import React from 'react';

const RepoList = (props) => {
  
  const renderRepos = props.repos.map(repo => {
    return<li>
            <h2>Repo: {repo.name}</h2>
            <p><b>Author: </b>{repo.full_name}</p>
            <p><b>URL:</b> {repo.html_url}</p>
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