import React from 'react';
import { Pagination } from 'react-bootstrap';

class PaginationBox extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      activePage: props.activePage
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    this.props.onSelect(eventKey);

    this.setState({activePage: eventKey});
  }

  render() {
    return (
      <Pagination
          prev
          next
          first
          last
          boundaryLinks
          bsSize="medium"
          items={this.props.items}
          maxButtons={5}
          activePage={this.state.activePage}
          onSelect={this.handleSelect} />
    );
  }

}

PaginationBox.defaultProps = {
  activePage: 1,
  items: 5
};

export default PaginationBox;
