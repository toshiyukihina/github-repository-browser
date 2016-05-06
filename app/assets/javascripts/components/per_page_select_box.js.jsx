import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

class PerPageSelectBox extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const options = () => {
      return [10, 25, 50].map((perPage) => {
        return (<option key={perPage} value={perPage}>{perPage}</option>);
      });
    };
    
    return (
      <FormGroup controlId="perPageSelect">
        <FormControl componentClass="select" placeholder="select" onChange={this.onChange}>
          {options()}
        </FormControl>
      </FormGroup>
    );
  }
  
}

export default PerPageSelectBox;
