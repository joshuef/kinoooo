// require('styles/App.css');

import React, {
  Component,
  PropTypes
} from 'react';

import { Link } from 'react-router';
import Sole from './Sole';
import _ from 'lodash';
import { getSingularItemType } from '../shared/getItemType';
import 'styles/KinosNav.css';

// import SearchProps from './SearchProps';

class KinosNav extends Component {


    render() {

        return (
            <ul>
                <li className="nav__li"><Link to="/">It's Kino Time</Link></li>
                <li className="nav__li"><Link to="/shows">all shows</Link></li>
                <li className="nav__li"><Link to="/places">all places</Link></li>
                <li className="nav__li"><Link to="/places/flagged/isFreiluft">freiluft only</Link></li>
            </ul>
        )
    }
}

KinosNav.defaultProps = {
    relationalItems: []

};

KinosNav.propTypes = {
  relationalItems: PropTypes.array.isRequired
};

export default KinosNav;
