import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const wikiURL = 'https://en.m.wikipedia.org/wiki/Special:Search?search='


class Wiki extends Component {

  static props = {
    classes: PropTypes.object.isRequired,
    searchString: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
  }


  render() {
    const { searchString, classes } = this.props

    return (
      <div className={classes.root}>
        <iframe id="wikiFrame"
          className={classes.wikiframe}
          title={"Result for " + searchString}
          width="100%"
          height="100%"
          src={wikiURL + encodeURI(searchString)}>
        </iframe>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    position: 'relative',
    top: 0,
  },
  wikiframe: {
    border: 'none',
    height: '100%',
    width: '100%',
  },
});

export default withStyles(styles)(Wiki);