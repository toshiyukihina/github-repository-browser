import React from 'react';
import Header from './header';
import SearchBox from './search_box';
import PaginationBox from './pagination_box';
import RepositoryList from './repository_list';
import request from 'superagent';
import { Grid, Row, Alert, Glyphicon } from 'react-bootstrap';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      queryParams: {
        username: '',
        page: 1,
        perPage: 10
      },
      res: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  fetchRepositories(params) {
    request.get(`https://api.github.com/users/${params.username}/repos?page=${params.page}&per_page=${params.perPage}`)
           .end((err, res) => {
             this.setState({
               queryParams: {
                 username: params.username,
                 page: params.page,
                 perPage: params.perPage
               },
               res: res
             });
           });
  }

  handleSubmit(username) {
    const { page, perPage } = this.state.queryParams;

    this.fetchRepositories({
      username: username,
      page: page,
      perPage: perPage
    });
  }

  handleClear() {
    this.setState({
      queryParams: {
        username: '',
        page: 1,
        perPage: 10
      },
      res: null
    });
  }

  handleSelect(eventKey) {
    const { username, perPage } = this.state.queryParams;

    this.fetchRepositories({
      username: username,
      page: eventKey,
      perPage: perPage
    });
  }

  repositoryList(res) {
    return (<RepositoryList repositories={res.body} />);
  }

  errorAlert(res) {
    return (
      <Alert bsStyle="danger">
        <Glyphicon glyph="exclamation-sign"></Glyphicon>{' '}
        {`${res.statusText} (${res.status})`}
      </Alert>
    );
  }

  promptAlert() {
    return (
      <Alert bsStyle="info">
        Enter a valid username and click update button.
      </Alert>
    );
  }

  resultNode() {
    const res = this.state.res
    if (res) {
      if (res.ok) {
        return this.repositoryList(res);
      } else {
        return this.errorAlert(res);
      }
    } else {
      return this.promptAlert();
    }
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
            {this.resultNode()}
          </Row>
          <Row style={{textAlign: 'center'}}>
            <PaginationBox onSelect={this.handleSelect} />
          </Row>
        </Grid>
      </div>
    );
  }
  
}

export default App;
