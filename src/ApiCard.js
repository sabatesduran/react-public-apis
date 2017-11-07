import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import LinkIcon from 'material-ui-icons/Link';
import HttpsIcon from 'material-ui-icons/Https';
import { red, green, grey } from 'material-ui/colors';

class ApiCard extends Component {
  render() {
    const { api } = this.props;
    
    const classes = {
      card: {
        minHeight: 260,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
      category: {
        marginBottom: 12,
        color: grey[500],
      },
      actions: {
        justifyContent: "space-around",
      },
      flexCenter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      link: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: grey[500],
      }
    };

    return (
      <div>
        <Card style={classes.card}>
          <CardContent>
            <h3>{api.API}</h3>
            <p style={classes.category}>{api.Category}</p>
            <p>{api.Description}</p>
          </CardContent>

          <CardActions style={classes.actions}>
            <div style={classes.flexCenter}>
              <span>HTTPS:</span>
              <HttpsIcon style={ { color: api.HTTPS ? green[500] : red[500] } } /> 
            </div>

            <div style={classes.flexCenter}>
              <span>AUTH:</span>
              <span style={ { color: api.Auth ? green[500] : red[500] } }>
                &nbsp; {api.Auth ? api.Auth : "NO"}
              </span>
            </div>

            <a style={classes.link} href={api.Link} target="_blank"><LinkIcon /></a>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default ApiCard;