import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


class Header extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    onMenuClick: PropTypes.func.isRequired,
  }

  render() {
    const { classes, isMobile, onMenuClick } = this.props

    const menuButton = (
      <IconButton className={classes.menuButton}
        onClick={() => onMenuClick()}
        color="inherit"
        aria-label="Menu"
      >
        <MenuIcon />
      </IconButton>
    )

    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          {isMobile ? menuButton : null}
          <Typography variant="title"
            color="inherit"
            className={classes.flex}
          >
            WOYE
             </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}


const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

export default withStyles(styles)(Header);
