import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import { parser } from './utils/parsist';
import Main from './main/Main';
import Details from './details/Details';
import Header from './header/Header';
import Results from './results/Results';


class App extends Component {

  static props = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    isMobile: false,
    isDrawerOpen: false,
    raw: '',
    resultArray: [],
    resultSelectedIndex: 0,
    delimiters: '[\\.\\,\\n\\*\\t\\r]',
  }

  componentDidMount() {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkViewport.bind(this));
  }

  render() {
    const { isMobile, raw, resultArray, isDrawerOpen, resultSelectedIndex } = this.state
    const { classes } = this.props

    const theme = createMuiTheme({
      palette: {
        type: 'dark',
        primary: {
          light: '#4b4b4b',
          main: '#232323',
          dark: '#000000',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ff5a36',
          main: '#ff0000',
          dark: '#c20000',
          contrastText: '#fff',
        },
      },
    });

    const header = (
      <Header isMobile={isMobile && raw !== ''}
        onMenuClick={() => this.toggleDrawerHandler(!isDrawerOpen)} />
    )

    const content = (
      (raw === '')
        ? <Main onSearch={(e) => this.searchHandler(e)} />
        : <Details resultSelected={resultArray[resultSelectedIndex]}
          onClear={() => this.clearHandler()}
          isMobile={isMobile} />
    )

    const drawer = (
      (raw !== '')
        ? <Results isOpen={isDrawerOpen}
          isMobile={isMobile}
          resultArray={resultArray}
          resultSelectedIndex={resultSelectedIndex}
          onResultSelect={(index) => this.resultSelectHandler(index)}
          onToggleDrawer={(status) => this.toggleDrawerHandler(status)} />
        : null
    )

    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            {header}
            {drawer}
            {content}
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }

  toggleDrawerHandler(newStatus) {
    this.setState({ isDrawerOpen: newStatus })
  }

  resultSelectHandler(index) {
    this.setState({ resultSelectedIndex: index })
  }

  searchHandler(e) {
    this.setState({ resultArray: this.processResults(e.rawText, this.state.delimiters) })
    this.setState({ raw: e.rawText })
  }

  clearHandler() {
    this.setState({
      raw: '',
      resultArray: [],
      resultSelectedIndex: 0,
    })
  }

  checkViewport(e) {
    this.setState({ isMobile: (window.innerWidth <= 960) });
  }

  processResults(raw, delimiters) {
    return parser(raw, delimiters).map((i, index) => {
      return {
        index: index,
        value: i,
        visited: false
      }
    })
  }
}


const styles = theme => ({
  root: {
    minHeight: '100%',
    backgroundColor: '#000',
  },
})


export default withStyles(styles)(App);
