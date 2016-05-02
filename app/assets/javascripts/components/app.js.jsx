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
      res: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSubmit(username) {
    request.get(`https://api.github.com/users/${username}/repos`)
           .end((err, res) => {
             this.setState({res: res});
           });
  }

  handleClear() {
    this.setState({res: null});
  }

  handleSelect(eventKey) {
    console.log(`* eventKey=${eventKey}`);
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
            <PaginationBox onSelect={this.handleSelect} />
          </Row>
          <Row>
            {this.resultNode()}
          </Row>
        </Grid>
      </div>
    );
  }
  
}

export default App;
