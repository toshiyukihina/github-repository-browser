import React from 'react';

class Repository extends React.Component {

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.description}</td>
      </tr>
    );
  }
  
}

Repository.PropTypes = {
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired
};

export default Repository;
