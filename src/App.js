import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import parser from 'parsist';
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
    resultArray: [],
    resultSelectedIndex: 0,
    raw: '',
    delimiters: '[\\.\\,\\n\\*\\#\\@\\<\\>\\;]',
    category: '',
    locale: 'en',
  }

  componentDidMount() {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkViewport.bind(this));
  }

  render() {
    const { isMobile, raw, delimiters, category, locale, resultArray, isDrawerOpen, resultSelectedIndex } = this.state
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
      <Header isMobile={isMobile && (resultArray.length > 0)}
        onMenuClick={() => this.toggleDrawerHandler(!isDrawerOpen)} />
    )

    const detailsView = (
      <Details resultSelected={resultArray[resultSelectedIndex]}
        onClear={() => this.clearHandler()}
        isMobile={isMobile} />
    )

    const mainView = (
      <Main isMobile={isMobile}
        inputValue={raw}
        delimitersValue={delimiters}
        categoryValue={category}
        localeValue={locale}
        onSearch={() => this.searchHandler()}
        onInputChange={(e) => this.inputChangeHandler(e)}
        onDelimitersChange={(e) => this.delimitersChangeHandler(e)}
        onCategoryChange={(e) => this.categoryChangeHandler(e)}
        onLocaleChange={(e) => this.localeChangeHandler(e)} />
    )

    const drawer = (
      <Results isOpen={isDrawerOpen}
        isMobile={isMobile}
        resultArray={resultArray}
        resultSelectedIndex={resultSelectedIndex}
        onResultSelect={(index) => this.resultSelectHandler(index)}
        onToggleDrawer={(status) => this.toggleDrawerHandler(status)} />
    )

    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            {header}
            {(resultArray.length > 0) ? drawer : null}
            {(resultArray.length === 0) ? mainView : detailsView}
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

  searchHandler() {
    this.setState({ resultArray: this.processResults(this.state.raw, this.state.delimiters) })
  }

  inputChangeHandler(value) {
    this.setState({ raw: value })
  }

  delimitersChangeHandler(value) {
    this.setState({ delimiters: value })
  }

  categoryChangeHandler(value) {
    this.setState({ category: value })
  }

  localeChangeHandler(value) {
    this.setState({ locale: value })
  }

  clearHandler() {
    this.setState({
      resultArray: [],
      resultSelectedIndex: 0,
    })
  }

  checkViewport(e) {
    this.setState({ isMobile: (window.innerWidth <= 960) });
  }

  isSearchClear() {
    return (this.state.resultArray.length === 0)
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
