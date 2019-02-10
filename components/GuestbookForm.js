import React from 'react'
// import ReactDOM from 'react-dom';
import {Button, Input, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export let send = {}

const styles = theme => ({
  main: {
    marginTop: 180
  },
  name: {
    width: 240,
    marginBottom: 20
  },
  message: {
    width: 240,
  },
  submit: {
    marginTop: 20,
    textAlign: 'center'
  },
  guestButton: {
    margin: 20
  }
})

class GuestbookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('Thank you for your guestbook submission ' + this.state.name + ' of ' + this.state.message);

    const newGuest = this.state

    fetch('/api/guestbook', {
      method: 'POST',
      body: JSON.stringify(newGuest),
      headers: {"Content-Type": "application/json"}
    }).then(function(response){
      return response.json()
    })
  }

  render() {
    const { classes } = this.props

    return (
      <Grid container className={classes.main} direction="column" justify="space-between" alignItems="center" spacing={16}>
        <form onSubmit={this.handleSubmit}>
          <Grid item>
            <Input className={classes.name} type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange} />
          </Grid>
          <Grid item>
            <TextField className={classes.message} type="text" placeholder="Message" name="message" multiline rows="4" varient="outlined" value={this.state.message} onChange={this.handleChange} />
          </Grid>
          <Grid className={classes.submit}>
            <Button variant="contained" color="primary" type="submit" value="Submit"> Submit </Button>
          </Grid>
        </form>
        <Button className={classes.guestButton} variant="contained" color="primary" href="/guestbook"> See Guestbook </Button>
      </Grid>
    );
  }
}

export default withStyles(styles)(GuestbookForm);
