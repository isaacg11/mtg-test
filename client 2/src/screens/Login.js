
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import Styles from '../styles'

class LoginPage extends React.Component {
  state = {
    username: '',
    password: ''
  }

  setValue(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  login(e) {
    e.preventDefault();
    axios.post('/users/login', this.state).then((results) => {
      localStorage.setItem('token', results.data.token)
      window.location.pathname = "/home";
    })

  }

  render() {
    return(
      <div style={Styles.bgColor}>
        <form onSubmit={e => this.login(e)}>
          <Container>
            <Row>
              <Col style={Styles.arial}>
                <h3 style={Styles.red} >Login</h3>
              </Col>
            </Row>
            <Row>
              <Col style={Styles.arial}>
                <input
                  placeholder="username"
                  name="username"
                  onChange={e => this.setValue(e)}
                />
              </Col>
            </Row>
            <Row>
              <Col style={Styles.arial}>
                <input
                  placeholder="password"
                  name="password"
                  onChange={e => this.setValue(e)}
                />
              </Col>
            </Row>
            <Row>
              <Col style={Styles.arial}>
                <Button color="info" type='submit'>Submit</Button>
              </Col>
            </Row>
            <Row>
              <Col style={Styles.arial}>
                <p>Haven't registered? Click <a href="https://tappedmtg.herokuapp.com/register">here</a></p>
              </Col>
            </Row>
          </Container>
        </form>
      </div>
    )
  }
}
export default LoginPage;