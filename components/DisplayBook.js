import React from 'react'
// import ReactDOM from 'react-dom';
import {Button, Input, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export let send = {}

const styles = theme => ({
  main: {
    marginTop: 180,
  },
  guestButton: {
    marginBottom: 20
  },
  paper: {
    minWidth: 270,
    marginBottom: 20,
    textAlign: 'center'
  }
})

class GuestbookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentWillMount(event) {
    fetch('http://localhost:4899/api/guestbook')
    .then(response =>
      response.json())
    .then((data) => {
      console.log('DATA', data)
      this.setState({ data })
    })
  }

  render() {
    const { classes } = this.props
    console.log(this.state)
    return (
      <Grid container className={classes.main} direction="column" justify="space-between" alignItems="center" spacing={16}>
        <Button className={classes.guestButton} variant="contained" color="primary" href="/index"> Return to Guestbook Submission </Button>
        {this.state.data.map(x => (
          <div>
            <Paper className={classes.paper}>
              <p> {x.name} </p>
              <p> {x.message} </p>
            </Paper>
          </div>
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(GuestbookForm);
