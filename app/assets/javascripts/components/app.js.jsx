import React from 'react';
import Header from './header';
import SearchBox from './search_box';
import PerPageSelectBox from './per_page_select_box';
import PaginationBox from './pagination_box';
import RepositoryList from './repository_list';
import request from 'superagent';
import url from 'url';
import querystring from 'querystring';
import Promise from 'bluebird';
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
      queryResult: null
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
    return new Promise((resolve, reject) => {
      request.get(`https://api.github.com/users/${params.username}/repos?page=${params.page}&per_page=${params.perPage}`)
             .end((err, res) => {
               res.ok ? resolve(res) : reject(res);
             });
    });
  }

  onQuerySucceeded(params, res) {
    const state = {
      queryParams: params,
      queryResult: res
    };

    const lastPage = this.getLastPage(res);
    if (lastPage > 0) {
      state.pageParams = { items: lastPage };
    }

    this.setState(state);
  }

  onQueryFailed(res) {
    this.setState({ queryResult: res });
  }

  updateRespositories(params) {
    this.fetchRepositories(params)
        .then((res) => {
          this.onQuerySucceeded(params, res);
        })
        .catch((res) => {
          this.onQueryFailed(res);
        })
        .finally(() => {
          console.log('done');
        });
  }

  handleQueryByUsername(username) {
    let params = this.state.queryParams;
    params.username = username;

    this.updateRespositories(params);
  }

  handlePageChange(eventKey) {
    let params = this.state.queryParams;
    params.page = eventKey;

    this.updateRespositories(params);
  }

  handlePerPageChange(perPage) {
    let params = this.state.queryParams;
    params.page = 1;
    params.perPage = perPage;

    this.updateRespositories(params);
  }

  handleClearQueryResult() {
    let queryParams = this.state.queryParams;
    queryParams.username = '';
    
    this.setState({
      queryParams: queryParams,
      queryResult: null
    });
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

      const res = this.state.queryResult
      if (res) {
        return res.ok ? repositoryList(res) : errorAlert(res);
      } else {
        return promptAlert();
      }
    };
    
    const paginationBox = () => {
      const res = this.state.queryResult;
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
