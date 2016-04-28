import React from 'react';

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
    
    this.props.onSubmit(username);
  }

  handleChange(e) {
    this.setState({username: e.target.value.trim()});
  }

  handleClear(e) {
    this.props.onClear();
    this.setState({username: ''});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.username} onChange={this.handleChange} placeholder="Enter username" />
          <input type="submit" value="Update" disabled={!this.state.username} />
          <input type="button" value="Clear" onClick={this.handleClear} />
        </form>
      </div>
    );
  }
  
}

SearchBox.PropTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onClear: React.PropTypes.func.isRequired
};

export default SearchBox;
