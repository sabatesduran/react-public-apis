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

  filterByCategory(category, filtered_apis) {
    return category === "" ? this.state.apis : this.state.apis.filter(api => api.Category === category);
  }

  filterByHTTPS(https, filtered_apis) {
    return https ? this.state.filtered.filter(api => api.HTTPS === https) : filtered_apis;
  }

  filterByAuth(auth, filtered_apis) {
    return auth ? filtered_apis.filter(api => api.Auth !== null) : filtered_apis;
  }
  
  async filter() {
    let filtered = await this.filterByCategory(document.getElementById("categories").value, this.state.apis);
    filtered = await this.filterByHTTPS(document.getElementById("https").checked, filtered);
    filtered = await this.filterByAuth(document.getElementById("auth").checked, filtered);
    this.setState({ filtered: filtered });
  }

  render() {
    const { categories, filtered } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React - Public API's</h1>
        </header>
        <ul>
          <select id="categories" onChange={(e) => this.filter()}>
            <option value="">All</option>
            { categories.map((category, i) => <option key={i} value={category}>{category}</option>) }
          </select>
          <input id="https" type="checkbox" onChange={(e) => this.filter()}/> HTTPS
          <input id="auth" type="checkbox" onChange={(e) => this.filter()}/> Auth
          <p>Quantity: {filtered.length}</p>
          {
            filtered.map((api, i) => {
              return (
                <li key={i}>
                  {api.API}
                  <ul>
                    <li>Description: {api.Description}</li>
                    <li>Category: {api.Category}</li>
                    <li>Link: {api.Link}</li>
                    <li>HTTPS: {api.HTTPS ? "Yes" : "No"}</li>
                    <li>Auth: {api.Auth ? api.Auth : "No"}</li>
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
