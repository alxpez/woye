import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ResultItem from './list/ResultItem';


class MobileResults extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggleDrawer: PropTypes.func.isRequired,
    resultArray: PropTypes.array.isRequired,
    onResultSelect: PropTypes.func.isRequired,
    resultSelectedIndex: PropTypes.number.isRequired,
  }

  render() {
    const { classes, resultArray, isOpen, onToggleDrawer, resultSelectedIndex, onResultSelect } = this.props

    const resultList = (
      <div className={classes.list}>
        <List component="nav">
          {resultArray.map((i) =>
            <ResultItem key={i.index}
              item={i}
              selected={i.index === resultSelectedIndex}
              onSelect={() => onResultSelect(i.index)}
            >
            </ResultItem>
          )}
        </List>
      </div>
    )

    return (
      <div>
        <Drawer open={isOpen} onClose={() => onToggleDrawer(false)}>
          <div tabIndex={0}
            role="button"
            onClick={() => onToggleDrawer(false)}
            onKeyDown={() => onToggleDrawer(false)}
          >
            {resultList}
          </div>
        </Drawer>
      </div>
    )
  }
}

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}

export default withStyles(styles)(MobileResults);
