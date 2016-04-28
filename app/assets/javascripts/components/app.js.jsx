import React from 'react';
import SearchBox from './search_box';
import RepositoryList from './repository_list';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      repositories: [
        { id: '1', name: 'angular-ui-router', description: 'A sample program using angular-ui-router.' },
        { id: '2', name: 'angular-chat', description: 'A chat program using Angular.js.' },
        { id: '3', name: 'hello-redux', description: 'My first redux.' },
        { id: '4', name: 'dotfiles', description: 'My dotfiles.' }
      ]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(username) {
    // TODO: Fetch repository list via Github API
  }

  render() {
    return (
      <div>
        <SearchBox onSubmit={this.handleSubmit} />
        <RepositoryList repositories={this.state.repositories} />
      </div>
    );
  }
  
}

export default App;
