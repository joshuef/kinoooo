// require('styles/App.css');

import React, {
  Component,
  PropTypes
} from 'react';

import { Link } from 'react-router'


class RelationalItemList extends Component {
    render() {
        return (
            <ul>
                {this.props.relationalItems.map((item, index) =>
                          <li {...item}
                                key={index}
                                ><Link to="/{item.name}">{item.name}</Link></li>
                )}
            </ul>
        )
    }
}

RelationalItemList.defaultProps = {
    relationalItems: []

};

RelationalItemList.propTypes = {
  relationalItems: PropTypes.array.isRequired
};

export default RelationalItemList;
