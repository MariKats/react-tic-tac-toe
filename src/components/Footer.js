import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';

const navStyle = {
  backgroundColor: '#969696'
}

export default class Footer extends Component {

  render() {
    return (
      <div className="footer">
        <div className="btn-group">
          <button className="button" onClick={this.props.reset}><i className="material-icons md-dark">replay</i></button>
          <NavLink className="button" to="/two-player-game" activeStyle={navStyle} exact><i className="material-icons md-dark">people</i></NavLink>
          <NavLink className="button" to="/one-player-game" activeStyle={navStyle} exact><i className="material-icons md-dark">person</i></NavLink>
        </div>
      </div>
    );
  }
}
