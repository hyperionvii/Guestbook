import fetch from 'isomorphic-unfetch'
import DisplayBook from '../components/DisplayBook.js'
import { Container } from 'next/app'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
})

const Main = (props) => {
  const { classes } = props
  return (
    <Container>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </head>
      <Grid container className={classes.root}>
        <DisplayBook {...props}/>
      </Grid>
    </Container>
  )
}

Main.getInitialProps = async () => {
  const res = await fetch('http://localhost:4899/api/guestbook')
  const data = await res.json()

  return {
    data
  }
}

export default withStyles(styles)(Main);
