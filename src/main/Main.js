import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Options from './options/Options';
import Input from './input/Input';

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

  render() {
    const { classes, isMobile, inputValue, localeValue, categoryValue, delimitersValue } = this.props;
    const { onSearch, onInputChange, onDelimitersChange, onCategoryChange, onLocaleChange } = this.props;

    return (
      <main className={classes.root}>
        <div className={classes.mainContainer}>
          <div className={classes.toolbar} />

          <Options localeValue={localeValue}
            categoryValue={categoryValue}
            delimitersValue={delimitersValue}
            onDelimitersChange={(e) => onDelimitersChange(e)}
            onCategoryChange={(e) => onCategoryChange(e)}
            onLocaleChange={(e) => onLocaleChange(e)} />

          <Input isMobile={isMobile}
            value={inputValue}
            onChange={(e) => onInputChange(e)} />

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

export default withStyles(styles)(Main);
