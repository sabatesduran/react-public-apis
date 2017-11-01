import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();

    this.state = {
      apis: [],
      filtered: [],
      categories: []
    }
  }

  async componentWillMount() {
    let repo = "https://raw.githubusercontent.com/toddmotto/public-apis/master/json/entries.min.json";
    let apis = [];
    let categories = [];

    await fetch(repo).then(function(response) {
      return response.json();
    }).then(function(json) {
      apis = json['entries'];

      // Get unique categories
      categories = [...new Set(apis.map(api => api.Category))];

      localStorage.setItem('apis',JSON.stringify(apis));
      localStorage.setItem('categories',JSON.stringify(categories));
    });

    this.setState({
      apis: apis,
      filtered: apis,
      categories: categories
    });
  }

  filterByCategory(e) {
    let filtered = e.target.value === "" ? this.state.apis : this.state.apis.filter(api => api.Category === e.target.value)
    this.setState({ filtered: filtered });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React - Public API's</h1>
        </header>
        <ul>
          <select name="categories" onChange={(e) => this.filterByCategory(e)}>
            <option value=""></option>
            { this.state.categories.map((category, i) => <option key={i} value={category}>{category}</option>) }
          </select>
          {
            this.state.filtered.map((api, i) => {
              return (
                <li key={i}>
                  {api.API}
                  <ul>
                    <li>Description: {api.Description}</li>
                    <li>Category: {api.Category}</li>
                    <li>Link: {api.Link}</li>
                    <li>HTTPS: {api.HTTPS ? "Yes" : "No"}</li>
                    <li>Auth: {api.Auth ? "Yes" : "No"}</li>
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
