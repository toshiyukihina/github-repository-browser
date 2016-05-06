import React from 'react';
import Header from './header';
import SearchBox from './search_box';
import PerPageSelectBox from './per_page_select_box';
import PaginationBox from './pagination_box';
import RepositoryList from './repository_list';
import request from 'superagent';
import url from 'url';
import querystring from 'querystring';
import { Grid, Row, Col, Alert, Glyphicon } from 'react-bootstrap';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      queryParams: {
        username: '',
        page: 1,
        perPage: 10
      },
      pageParams: {
        items: 10
      },
      res: null
    };

    this.handleQueryByUsername = this.handleQueryByUsername.bind(this);
    this.handleClearQueryResult = this.handleClearQueryResult.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePerPageChange = this.handlePerPageChange.bind(this);
  }

  getLastPage(res) {
    if (!res.ok) {
      return -1;
    }
      
    const linkHeader = res.headers['link'];
    if (!linkHeader) {
      return -1;
    }

    const links = linkHeader.split(',');
    for (const link of links) {
      const spl = link.split(';');
      const last = spl[1].trim().match(/last/)
      if (last) {
        const urlStr = spl[0].trim();
        const urlObj = url.parse(urlStr.substring(urlStr.indexOf('<') + 1, urlStr.indexOf('>')));
        return parseInt(querystring.parse(urlObj.query).page);
      }
    }

    return -1;
  }

  fetchRepositories(params) {
    request.get(`https://api.github.com/users/${params.username}/repos?page=${params.page}&per_page=${params.perPage}`)
           .end((err, res) => {
             const state = {
               queryParams: {
                 username: params.username,
                 page: params.page,
                 perPage: params.perPage
               },
               res: res
             };

             const lastPage = this.getLastPage(res);
             if (lastPage > 0) {
               state.pageParams = { items: lastPage };
             }

             this.setState(state);
           });
  }

  handleQueryByUsername(username) {
    let queryParams = this.state.queryParams;
    queryParams.username = username;

    this.fetchRepositories(queryParams);
  }

  handleClearQueryResult() {
    let queryParams = this.state.queryParams;
    queryParams.username = '';
    
    this.setState({
      queryParams: queryParams,
      res: null
    });
  }

  handlePageChange(eventKey) {
    let queryParams = this.state.queryParams;
    queryParams.page = eventKey;

    this.fetchRepositories(queryParams);
  }

  handlePerPageChange(perPage) {
    console.log(`perPage changed: ${perPage}`);
  }

  render() {
    const queryResult = () => {
      const repositoryList = (res) => {
        return (<RepositoryList repositories={res.body} />);
      };

      const errorAlert = (res) => {
        return (
          <Alert bsStyle="danger">
            <Glyphicon glyph="exclamation-sign"></Glyphicon>{' '}
            {`${res.statusText} (${res.status})`}
          </Alert>
        );
      };
      
      const promptAlert = (res) => {
        return (
          <Alert bsStyle="info">
            Enter a valid username and click update button.
          </Alert>
        );
      };

      const res = this.state.res
      if (res) {
        return res.ok ? repositoryList(res) : errorAlert(res);
      } else {
        return promptAlert();
      }
    };
    
    const paginationBox = () => {
      const res = this.state.res;
      if (res && res.ok && res.body.length > 0) {
        // Show 'PaginationBox' only if some repositories exist.
        return <PaginationBox onSelect={this.handlePageChange} items={this.state.pageParams.items} />;
      }
    };
    
    return (
      <div>
        <Header />
        <Grid>
          <Row><SearchBox onSubmit={this.handleQueryByUsername} onClear={this.handleClearQueryResult} /></Row>
          <Row>
            <Col md={2}>
              <PerPageSelectBox onChange={this.handlePerPageChange} />
            </Col>
          </Row>
          <Row>{queryResult()}</Row>
          <Row style={{textAlign: 'center'}}>{paginationBox()}</Row>
        </Grid>
      </div>
    );
  }
  
}

export default App;
