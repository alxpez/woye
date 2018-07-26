import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ResultItem from './list/ResultItem';


class Result extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    resultArray: PropTypes.array.isRequired,
    isMobile: PropTypes.bool.isRequired,
    onResultSelect: PropTypes.func.isRequired,
    resultSelectedIndex: PropTypes.number.isRequired,
  }

  render() {
    const { classes, resultArray, isMobile, onResultSelect, resultSelectedIndex } = this.props

    const resultList = (
      <Grid item xs={12} md={4}>
        <List component="nav">
          {resultArray.map((i) =>
            <ResultItem key={i.index}
              item={i}
              selected={i.index === resultSelectedIndex}
              onSelect={() => onResultSelect(i.index)}>
            </ResultItem>
          )}
        </List>
      </Grid>
    )

    const details = (
      <Grid item xs={12} md={8}>
        <Paper className={classes.paper}>
          {resultArray[resultSelectedIndex].value}
        </Paper>
      </Grid>
    )

    return (
      <div className={classes.root}>
        <Grid container justify={'center'} spacing={24}>
          <Grid container spacing={0}>
            {isMobile ? null : resultList}
            {details}
          </Grid>
          <Grid item xs={12} md={8}>
            <Button onClick={() => this.props.onClear()}>CLEAR</Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 48,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 500,
  },
});

export default withStyles(styles)(Result);
