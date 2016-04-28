import React from 'react';
import Repository from './repository';

class RepositoryList extends React.Component {

  render() {
    const repositoryNodes = this.props.repositories.map((repository) => {
      return (
        <Repository
            key={repository.id}
            name={repository.name}
            description={repository.description}
        />
      );
    });

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {repositoryNodes}
          </tbody>
        </table>
      </div>
    );
  }
  
}

RepositoryList.PropTypes = {
  repositories: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default RepositoryList;
