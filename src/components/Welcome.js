import React,{Component} from 'react';

export default class Welcome extends Component {

  render() {
    return (
      <div id="head">
          {this.props.status}
      </div>
    );
  }
}
