import { CiSearch } from 'react-icons/ci';
import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './searchbar.module.scss';

class Searchbar extends Component {
  state = {
    search: '',
  };
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.search.trim());
    this.reset();
  };
  reset() {
    this.setState({
      search: '',
    });
  }
  render() {
    const { search } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchform} onSubmit={handleSubmit}>
          <button
            type="submit"
            className={`${styles.button} ${styles.icon}`}
            disabled={this.props.isLoading}
          >
            <CiSearch />
          </button>
          <input
            onChange={handleChange}
            name="search"
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            required
            placeholder="Search images and photos"
            value={search}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
