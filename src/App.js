import React, { Component } from "react";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Bar from "./Bar";
import ApiCardList from "./ApiCardList";
import { FormGroup, FormControlLabel } from "material-ui/Form";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";

class App extends Component {
  constructor() {
    super();

    this.state = {
      apis: [],
      filtered: [],
      categories: [],
      category: "",
      search: "",
      https: false,
      auth: false
    };
  }

  async componentWillMount() {
    let repo = "http://publicapis.org/api/entries";
    let apis = [];
    let categories = [];

    await fetch(repo)
      .then(response => response.json())
      .then(json => {
        // Sort API's by name
        apis = json["entries"].sort((a, b) => {
          let apiA = a.API.toUpperCase();
          let apiB = b.API.toUpperCase();

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

        // Save data in localStorage
        localStorage.setItem("apis", JSON.stringify(apis));
        localStorage.setItem("categories", JSON.stringify(categories));
      });

    this.setState({
      apis: apis,
      filtered: apis,
      categories: categories
    });
  }

  filterByCategory(category, filtered_apis) {
    return category === ""
      ? this.state.apis
      : this.state.apis.filter(api => api.Category === category);
  }

  filterByNameOrDescription(text, filtered_apis) {
    return filtered_apis.filter(
      api =>
        api.API.toLowerCase().includes(text.toLowerCase()) ||
        api.Description.toLowerCase().includes(text)
    );
  }

  filterByHTTPS(https, filtered_apis) {
    return https
      ? filtered_apis.filter(api => api.HTTPS === https)
      : filtered_apis;
  }

  filterByAuth(auth, filtered_apis) {
    return auth
      ? filtered_apis.filter(api => api.Auth !== null && api.Auth !== "")
      : filtered_apis;
  }

  async handleFilterValueChange(fieldName, fieldValue) {
    await this.setState({ [fieldName]: fieldValue });
    this.filter();
  }

  async filter() {
    let { apis, category, search, https, auth } = this.state;
    console.log(auth);
    let filtered_apis = await this.filterByCategory(category, apis);
    filtered_apis = await this.filterByNameOrDescription(search, filtered_apis);
    filtered_apis = await this.filterByHTTPS(https, filtered_apis);
    filtered_apis = await this.filterByAuth(auth, filtered_apis);

    this.setState({ filtered: filtered_apis });
  }

  render() {
    const { categories, filtered } = this.state;

    const styles = {
      appLayout: {
        paddingTop: 64
      },
      quantity: {
        margin: "20px 0"
      },
      gridFlex: {
        display: "flex",
        alignItems: "flex-end"
      }
    };

    return (
      <div style={styles.appLayout}>
        <Bar />
        <div style={{ padding: 20 }}>
          <div className="filters">
            <Grid container spacing={24}>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={3}
                xl={2}
                style={styles.gridFlex}
              >
                <FormControl style={{ width: "100%" }}>
                  <Input
                    placeholder="Search"
                    onChange={e =>
                      this.handleFilterValueChange("search", e.target.value)
                    }
                  />
                </FormControl>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={3}
                xl={2}
                style={styles.gridFlex}
              >
                <FormControl style={{ width: "100%" }}>
                  <InputLabel htmlFor="categories">Category</InputLabel>
                  <Select
                    value={this.state.category}
                    onChange={e =>
                      this.handleFilterValueChange("category", e.target.value)
                    }
                    input={<Input id="categories" />}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {categories.map((category, i) => (
                      <MenuItem key={i} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                item
                xs={6}
                sm={4}
                md={2}
                lg={1}
                xl={1}
                style={styles.gridFlex}
              >
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.https}
                        onChange={e =>
                          this.handleFilterValueChange(
                            "https",
                            e.target.checked
                          )
                        }
                        value="true"
                      />
                    }
                    label="HTTPS"
                  />
                </FormGroup>
              </Grid>

              <Grid
                item
                xs={6}
                sm={4}
                md={2}
                lg={1}
                xl={1}
                style={styles.gridFlex}
              >
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.auth}
                        onChange={e =>
                          this.handleFilterValueChange("auth", e.target.checked)
                        }
                        value="true"
                      />
                    }
                    label="Auth"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </div>

          <Typography type="title" color="inherit" style={styles.quantity}>
            Quantity: {filtered.length}
          </Typography>

          <ApiCardList apis={filtered} />

          {/* <Grid container spacing={24}>
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
            <Typography type="title" color="inherit">
              No public API's found.
            </Typography>
          }
          </Grid> */}
        </div>
      </div>
    );
  }
}

export default App;
