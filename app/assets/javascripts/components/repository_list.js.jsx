import React from 'react';
import Repository from './repository';
import { Table, Alert, Glyphicon } from 'react-bootstrap';

class RepositoryList extends React.Component {

  render() {
    const repositoryNodes = (repos) => {
      const repositoryNodes = repos.map((repo) => {
        return (<Repository key={repo.id} name={repo.name} description={repo.description} />);
      });

      return (
        <Table responsive striped condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {repositoryNodes}
          </tbody>
        </Table>
      );
    };
    
    const noRepositoryAlert = () => {
      return (
        <Alert bsStyle="info">
          <Glyphicon glyph="info-sign" />{' '}
          No repositories are exist.
        </Alert>
      )
    };

    const repos = this.props.repositories;
    return repos.length > 0 ? repositoryNodes(repos) : noRepositoryAlert();
  }
  
}

RepositoryList.PropTypes = {
  repositories: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default RepositoryList;
