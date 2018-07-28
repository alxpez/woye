import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import Video from './video/Video';
import Wiki from './wiki/Wiki';


class Details extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    resultSelected: PropTypes.object.isRequired,
  }

  render() {
    const { classes, isMobile, resultSelected } = this.props

    return (
      <main className={isMobile ? classes.mobile : classes.desktop}>
        <div className={classes.toolbar} />
        <div className={classes.paper}>
          <Wiki isMobile={isMobile} searchString={resultSelected.value} />
          <Video isMobile={isMobile} searchString={resultSelected.value} />
        </div>
        <Button variant="fab"
          color="secondary"
          aria-label="Search"
          className={classes.fab}
          onClick={() => this.props.onClear()}
        >
          <ClearAllIcon />
        </Button>
      </main>
    )
  }
}

const styles = theme => ({
  desktop: {
    marginLeft: 255,
    width: 'calc(100% - 255px)',
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  mobile: {
    width: '100%',
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    width: '100%',
    top: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 0,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

export default withStyles(styles)(Details);
