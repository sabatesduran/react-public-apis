import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

import Bar from './Bar';
import ApiCard from './ApiCard';

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
      // Sort API's by name
      apis = json['entries'].sort( (a, b) => { 
        let  apiA = a.API.toUpperCase();
        let  apiB = b.API.toUpperCase();

        if (apiA < apiB) {
          return -1;
        }
        if (apiA > apiB) {
          return 1;
        }

        return 0;
      });

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

  filterByNameOrDescription(text, filtered_apis) {
    text = text.toLowerCase();
    return filtered_apis.filter(api => api.API.toLowerCase().includes(text) || api.Description.toLowerCase().includes(text));
  }

  filterByHTTPS(https, filtered_apis) {
    return https ? filtered_apis.filter(api => api.HTTPS === https) : filtered_apis;
  }

  filterByAuth(auth, filtered_apis) {
    return auth ? filtered_apis.filter(api => api.Auth !== null) : filtered_apis;
  }
  
  async filter() {
    let filtered = await this.filterByCategory(document.getElementById("categories").value, this.state.apis);
    filtered = await this.filterByNameOrDescription(document.getElementById("search").value, filtered);
    filtered = await this.filterByHTTPS(document.getElementById("https").checked, filtered);
    filtered = await this.filterByAuth(document.getElementById("auth").checked, filtered);
    this.setState({ filtered: filtered });
  }

  render() {
    const { categories, filtered } = this.state;

    return (
      <div className="App">
        <Bar />
        <div style={{ padding: 20 }}>
          <input id="search" type="text" onChange={(e) => this.filter()}/>
          <select id="categories" onChange={(e) => this.filter()}>
            <option value="">All</option>
            { categories.map((category, i) => <option key={i} value={category}>{category}</option>) }
          </select>
          <input id="https" type="checkbox" onChange={(e) => this.filter()}/> HTTPS
          <input id="auth" type="checkbox" onChange={(e) => this.filter()}/> Auth
          <p>Quantity: {filtered.length}</p>

          <Grid container spacing={24}>
          {
            filtered.length ? 
            filtered.map((api, i) => {
              return (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <ApiCard api={api} />
                </Grid>
              )
            })
            :
            <p>No Api's found.</p>
          }
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
