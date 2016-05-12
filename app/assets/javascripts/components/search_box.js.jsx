import React from 'react';
import { Form, FormGroup, FormControl, Button, Col, Glyphicon } from 'react-bootstrap';

class SearchBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const username = this.state.username.trim();
    if (!username) {
      return;
    }

    this.setState({username: username});
    this.props.onSubmit(username);
  }

  handleChange(e) {
    this.setState({username: e.target.value});
  }

  handleClear(e) {
    this.props.onClear();
    this.setState({username: ''});
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Col sm={10}>
          <FormGroup>
            <FormControl
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
                placeholder="Enter username"
                disabled={this.props.disabled}
            />
          </FormGroup>
        </Col>
        <Col sm={2}>
          <Button type="submit" disabled={!this.state.username || this.props.disabled} bsStyle="primary">
            <Glyphicon glyph="refresh" />{' '}
            Update
          </Button>
          {' '}
          <Button type="button" onClick={this.handleClear} disabled={this.props.disabled}>
            Clear
          </Button>
        </Col>
      </Form>
    );
  }
  
}

SearchBox.PropTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onClear: React.PropTypes.func.isRequired
};

export default SearchBox;
