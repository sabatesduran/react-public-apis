import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import LinkIcon from 'material-ui-icons/Link';
import HttpsIcon from 'material-ui-icons/Https';
import { red, green, grey } from 'material-ui/colors';

class ApiCard extends Component {
  render() {
    const { api } = this.props;
    
    const classes = {
      card: {
        minHeight: 220,
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
            <Typography type="headline" component="h2">
              {api.API}
            </Typography>

            <Typography component="p" style={classes.category}>
              {api.Category}
            </Typography>

            <Typography component="p">
              {api.Description}
            </Typography>
          </CardContent>

          <CardActions style={classes.actions}>

            <Typography component="p" style={classes.flexCenter}>
              <span>HTTPS:</span>
              <HttpsIcon style={ { color: api.HTTPS ? green[500] : red[500] } } /> 
            </Typography>

            <Typography component="p" style={classes.flexCenter}>
              <span>AUTH:</span>
              <span style={ { color: api.Auth ? green[500] : red[500] } }>
                &nbsp; {api.Auth ? api.Auth : "NO"}
              </span>
            </Typography>

            <Button href={api.Link} style={classes.link}>
              <LinkIcon />
            </Button>
            
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default ApiCard;