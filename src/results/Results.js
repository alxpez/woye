import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ResultItem from './item/ResultItem';


class Result extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    onToggleDrawer: PropTypes.func.isRequired,
    resultArray: PropTypes.array.isRequired,
    onResultSelect: PropTypes.func.isRequired,
    resultSelectedIndex: PropTypes.number.isRequired,
  }

  render() {
    const { classes, resultArray, isOpen, isMobile, onToggleDrawer, resultSelectedIndex, onResultSelect } = this.props

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

    const temporaryDrawer = (
      <div tabIndex={0}
        role="button"
        onClick={() => onToggleDrawer(false)}
        onKeyDown={() => onToggleDrawer(false)}
      >
        {resultList}
      </div>
    )

    const clippedDrawer = (
      <div>
        <div className={classes.toolbar} />
        {resultList}
      </div>
    )

    return (
      <Drawer open={isOpen}
        variant={isMobile ? 'temporary' : 'permanent'}
        onClose={() => onToggleDrawer(false)}
      >
        {isMobile ? temporaryDrawer : clippedDrawer}
      </Drawer>
    )
  }
}

const styles = theme => ({
  list: {
    width: 250,
  },
  toolbar: theme.mixins.toolbar,
})

export default withStyles(styles)(Result);
