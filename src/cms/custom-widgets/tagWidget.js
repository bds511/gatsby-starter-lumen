import React, { PureComponent } from 'react';
import Chips, { Chip } from 'react-chips'

export default class TagWidget extends PureComponent {
  onChange = chips => {
    this.props.onChange({chips});
  }

  render() {
    return (
      <Chips
        suggetion={["hello","good"]}
        onChange={this.onChange}
      />
    );
  }
}