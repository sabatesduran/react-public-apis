import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import LinkIcon from 'material-ui-icons/Link';

class ApiCard extends Component {
  render() {
    const { api } = this.props;
    const classes = theme => ({
      card: {
        // minWidth: 275,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
      },
      pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
      },
    });

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography type="headline" component="h2">
              {api.API}
            </Typography>
            <Typography type="body1" className={classes.pos}>
              {api.Category}
            </Typography>
            <Typography component="p">
              {api.Description}
            </Typography>
          </CardContent>
          <CardActions>
            <Typography type="body1" className={classes.title}>
              HTTPS: {api.HTTPS ? "YES" : "NO"}
            </Typography>
            <Typography type="body1" className={classes.title}>
              AUTH: {api.Auth ? api.Auth : "NO"}
            </Typography>
            <IconButton aria-label="External link">
              <LinkIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default ApiCard;