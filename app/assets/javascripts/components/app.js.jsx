import React from 'react';
import Header from './header';
import SearchBox from './search_box';
import RepositoryList from './repository_list';
import request from 'superagent';
import { Grid, Row } from 'react-bootstrap';

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
        <Header />
        <Grid>
          <Row>
            <SearchBox onSubmit={this.handleSubmit} onClear={this.handleClear} />
          </Row>
          <Row>
            <RepositoryList repositories={this.state.repositories} />
          </Row>
        </Grid>
      </div>
    );
  }
  
}

export default App;
