import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ClearAllIcon from '@material-ui/icons/ClearAll';


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
        <Paper className={classes.paper}>
          {resultSelected.value}
        </Paper>
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
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingLeft: 250 + (theme.spacing.unit * 3),
    minWidth: 0,
  },
  mobile: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  toolbar: theme.mixins.toolbar,
});

export default withStyles(styles)(Details);
