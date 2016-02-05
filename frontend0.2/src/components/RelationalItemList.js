// require('styles/App.css');

import React, {
  Component,
  PropTypes
} from 'react';

class RelationalItemList extends Component {
    render() {
        return (
            <ul>
                {this.props.relationalItems.map((show, index) =>
                          <li {...show}
                                key={index}
                                >{show.title}</li>
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
