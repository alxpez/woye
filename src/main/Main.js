import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Options from './options/Options';
import Input from './input/Input';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class Main extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
    inputValue: PropTypes.string.isRequired,
    localeValue: PropTypes.string.isRequired,
    categoryValue: PropTypes.string.isRequired,
    delimitersValue: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onDelimitersChange: PropTypes.func.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    onLocaleChange: PropTypes.func.isRequired,
  }

  state = {
    showAdvanced: false,
  }

  render() {
    const { classes, isMobile, inputValue, localeValue, categoryValue, delimitersValue } = this.props
    const { onSearch, onInputChange, onDelimitersChange, onCategoryChange, onLocaleChange } = this.props
    const { showAdvanced } = this.state

    const options = (
      <Options isMobile={isMobile}
        localeValue={localeValue}
        categoryValue={categoryValue}
        delimitersValue={delimitersValue}
        onDelimitersChange={(e) => onDelimitersChange(e)}
        onCategoryChange={(e) => onCategoryChange(e)}
        onLocaleChange={(e) => onLocaleChange(e)} />
    )

    const showAdvancedButton = (
      <Button color="secondary"
        className={classes.optsButton}
        onClick={this.toggleAdvancedOptions.bind(this, showAdvanced)}
      >
        {showAdvanced ? "Hide advanced options" : "Show advanced options"}
        <Icon>{showAdvanced ? 'arrow_drop_up' : 'arrow_drop_down'}</Icon>
      </Button>
    )

    const introduction = (
      <div>
        <Typography variant="display1" align={isMobile ? "center" : "left"} gutterBottom>
          What's this for?
        </Typography>
        <Typography align="justify" paragraph>
          Insert plain text and get information from Wikipedia and the most relevant video from Youtube, for each keyword. Try the following example and see the results:
        </Typography>
        <Typography className={classes.quoteText} align="justify" color="textSecondary" paragraph>
          Fortnite.. ,#Plato . ;@Rihanna  , the silence of the lambs#  #*meme *Michael Jackson . white shark >;. > sequoia
        </Typography>
        <Divider />
      </div>
    )

    return (
      <main className={classes.root}>
        <div className={classes.mainContainer}>
          <div className={classes.toolbar} />
          {introduction}
          <Input isMobile={isMobile}
            value={inputValue}
            onChange={(e) => onInputChange(e)} />
          {showAdvancedButton}
          {showAdvanced ? options : null}
          <Button variant="fab"
            color="secondary"
            aria-label="Search"
            className={classes.fab}
            onClick={() => onSearch()}
          >
            <SearchIcon />
          </Button>
        </div>
      </main>
    )
  }

  toggleAdvancedOptions(currentState) {
    this.setState({ showAdvanced: !currentState })
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
    marginBottom: theme.spacing.unit * 2,
  },
  quoteText: {
    borderLeft: '3px solid rgba(255, 255, 255, 0.7)',
    paddingLeft: theme.spacing.unit,
    marginLeft: theme.spacing.unit
  },
  optsButton: {
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
});

export default withStyles(styles)(Main);
