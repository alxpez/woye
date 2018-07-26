import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import { parser } from 'parsist';
import Main from './main/Main';
import Result from './result/Result';
import Header from './header/Header';
import MobileResult from './result/MobileResult';


export default class App extends Component {

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

    return (
      <React.Fragment>
        <CssBaseline />
        <Header isMobile={isMobile && raw !== ''}
          onMenuClick={() => this.toggleDrawerHandler(!isDrawerOpen)} />
        {
          isMobile
            ? <MobileResult isOpen={isDrawerOpen}
              resultArray={resultArray}
              resultSelectedIndex={resultSelectedIndex}
              onResultSelect={(index) => this.resultSelectHandler(index)}
              onToggleDrawer={(status) => this.toggleDrawerHandler(status)} />
            : null
        }{
          (raw === '')
            ? <Main onSearch={(e) => this.searchHandler(e)} />
            : <Result isMobile={isMobile}
              resultArray={resultArray}
              resultSelectedIndex={resultSelectedIndex}
              onClear={() => this.clearHandler()}
              onResultSelect={(index) => this.resultSelectHandler(index)} />
        }
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
    this.setState({ raw: '' })
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
