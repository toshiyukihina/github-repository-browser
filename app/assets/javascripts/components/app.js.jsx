import React from 'react';
import SearchBox from './search_box';
import RepositoryList from './repository_list';
import request from 'superagent';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      repositories: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleSubmit(username) {
    request.get(`https://api.github.com/users/${username}/repos`)
           .end((err, res) => {
             if (res.ok) {
               this.setState({repositories: res.body});
             } else {
               console.error(err);
             }
           });
  }

  handleClear() {
    this.setState({repositories: []});
  }

  render() {
    return (
      <div>
        <SearchBox onSubmit={this.handleSubmit} onClear={this.handleClear} />
        <RepositoryList repositories={this.state.repositories} />
      </div>
    );
  }
  
}

export default App;
