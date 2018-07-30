import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

class Input extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  }

  render() {
    const { classes, isMobile, onChange, value } = this.props;

    const theme = createMuiTheme({
      palette: {
        type: 'dark',
        primary: {
          light: '#ff5a36',
          main: '#ff0000',
          dark: '#c20000',
          contrastText: '#fff',
        },
      },
    })

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <TextField className={classes.textField}
            onChange={(e) => onChange(e.target.value)}
            label="Insert plain text"
            value={value}
            multiline
            rowsMax={isMobile ? 10 : 'auto'} />
        </MuiThemeProvider>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
  },
  mainContainer: {
    minHeight: '100%',
    width: '100%',
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
  },
  textField: {
    width: '100%',
    height: '100%',
    marginTop: theme.spacing.unit * 2,
  },
  toolbar: theme.mixins.toolbar,
});

export default withStyles(styles)(Input);
