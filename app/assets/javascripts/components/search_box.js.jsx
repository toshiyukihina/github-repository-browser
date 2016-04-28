import React from 'react';

class SearchBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.state.username);
  }

  handleChange(e) {
    this.setState({username: e.target.value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} placeholder="Enter username" />
          <input type="submit" value="Update" disabled={!this.state.username} />
        </form>
      </div>
    );
  }
  
}

SearchBox.PropTypes = {
  onSubmit: React.PropTypes.func.isRequired
};

export default SearchBox;
