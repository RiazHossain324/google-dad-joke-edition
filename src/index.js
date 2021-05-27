import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import SearchForm from './SearchForm';
import './App.css';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerm: '',
      jokes: [],
      isFetchingJoke: false
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchJokes = this.searchJokes.bind(this);
  }

  searchJokes(limit = 20) {
    this.setState({ isFetchingJoke: true });
    fetch(`https://icanhazdadjoke.com/search?term=${this.state.searchTerm}&limit=${limit}`, 
    {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        const jokes = json.results;
        this.setState({
          jokes,
          isFetchingJoke: false
        });
      });
  }

  onSearchChange(value) {
    this.setState({ searchTerm: value });
  }

  renderJokes() {
    return (
      <ul className="jokes-list">
        {this.state.jokes.map(item => <li key={item.id}>{item.joke}</li>)}
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <img className="logo" alt="dad-jokes" src="/google-dad-jokes-logo.png" />
        <SearchForm 
          onFormSubmit={this.searchJokes}
          onSearchValueChange={this.onSearchChange}
          isSearching={this.state.isFetchingJoke}
          onSingleSearchClick={() => this.searchJokes(1)}
        />
        {this.state.isFetchingJoke
        ? 'Loading joke...'
        : this.renderJokes()}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
