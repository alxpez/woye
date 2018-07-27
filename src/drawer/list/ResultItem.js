import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import EyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';


class ResultItem extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  render() {
    const { item, onSelect, selected, classes } = this.props

    return (
      <div className={selected ? classes.selected : classes.default}>
        <ListItem button
          divider
          onClick={() => onSelect()}
        >
          <ListItemIcon>
            {item.visited ? <EyeOutlinedIcon /> : <EyeIcon />}
          </ListItemIcon>
          <ListItemText primary={item.value} />
        </ListItem>
      </div>
    )
  }
}

const styles = {
  default: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  selected: {
    backgroundColor: 'rgba(0,0,0,0.12)'
  },
}

export default withStyles(styles)(ResultItem);