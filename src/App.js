import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();

    this.state = {
      apis: [],
    }
  }

  async componentWillMount() {
    let repo = "https://raw.githubusercontent.com/toddmotto/public-apis/master/json/entries.min.json";
    let apis = [];

    await fetch(repo).then(function(response) {
      return response.json();
    }).then(function(json) {
      apis = json['entries'];
      localStorage.setItem('apis',JSON.stringify(apis));
    });

    this.setState({'apis': apis});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React - Public API's</h1>
        </header>
        <ul>
          {
            this.state.apis.map((api, i) => {
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
