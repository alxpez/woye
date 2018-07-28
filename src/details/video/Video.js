import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const API = 'AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA'
const finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&part=id&type=video&maxResults=1&videoEmbeddable=true&q=`

class Video extends Component {

  static props = {
    classes: PropTypes.object.isRequired,
    searchString: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
  }

  state = {
    videoLink: ''
  }

  componentWillReceiveProps() {
    fetch(finalURL + encodeURI(this.props.searchString))
      .then((response) => response.json())
      .then((responseJson) => {
        const results = responseJson.items.map(obj => "https://www.youtube.com/embed/" + obj.id.videoId);
        this.setState({ videoLink: results[0] });
      })
      .catch((error) => {
        console.error(error);
      });
  }



  render() {
    const { videoLink } = this.state
    const { searchString, classes, isMobile } = this.props

    return (
      <div className={isMobile ? classes.rootMobile : classes.rootDesktop}>
        <iframe className={classes.videoFrame}
          title={"Result for " + searchString}
          src={videoLink}
          allowFullScreen>
        </iframe>
      </div>
    );
  }
}

const styles = theme => ({
  rootDesktop: {
    zIndex: 1,
    position: 'fixed',
    height: 180,
    width: 320,
    bottom: theme.spacing.unit * 3,
    left: 255 + (theme.spacing.unit * 3),
  },
  rootMobile: {
    zIndex: 1,
    position: 'fixed',
    height: 90,
    width: 160,
    bottom: theme.spacing.unit * 3,
    left: theme.spacing.unit * 3,
  },
  videoFrame: {
    height: '100%',
    width: '100%',
    border: 'none',
  },
});

export default withStyles(styles)(Video);