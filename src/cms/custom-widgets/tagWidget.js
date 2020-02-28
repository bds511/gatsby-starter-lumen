import React, { PureComponent } from "react";
import Chips from "react-chips";


export default class CustomWidgetControl extends PureComponent {
  onChange = chips => {
    this.props.onChange(chips);
  };
  render() {
    return (
      <div>
        <Chips
          suggestions={[]}
          onChange={this.onChange}
          value={this.props.value}
          createChipKeys={[13]}
        />
      </div>
    );
  }
}


