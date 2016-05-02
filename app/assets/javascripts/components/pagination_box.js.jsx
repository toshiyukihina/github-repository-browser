import React from 'react';
import { Pagination } from 'react-bootstrap';

class PaginationBox extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      activePage: 1
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({activePage: eventKey});
  }

  render() {
    return (
      <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          bsSize="medium"
          items={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect} />
    );
  }

}

export default PaginationBox;
