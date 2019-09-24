import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import {
  Menu,
  Container,
  Button,
  Popup,
  Grid,
  Segment
} from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { openModal } from "../../modals/modalActions";
import { logout } from "../../auth/authActions";
import { callHelp, callRefill, makeActive } from "../../event/eventActions";

const actions = {
  openModal,
  logout,
  callHelp,
  callRefill,
  makeActive
};

const mapState = state => ({
  tables: state.firestore.ordered.TableStatus,
  auth: state.auth
});

class NavBar extends Component {
  /*state = {
    authenticated: false
  };*/

  handleSignIn = () => {
    this.props.openModal("LoginModal");

    /*this.setState({
        authenticated: true
      })*/
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    /*this.setState({   //state no longer used with redux
        authenticated: false
      })*/
    this.props.logout();
    this.props.history.push("/");
  };

  handleHelp = () => {
    let chosenTable = this.props.tables.filter(table => {
      return table.TableID === 1;
    });
    console.log(chosenTable);
    this.props.callHelp(chosenTable);
  };

  handleActive = () => {
    let chosenTable = this.props.tables.filter(table => {
      return table.TableID === 1;
    });
    console.log(chosenTable);
    this.props.makeActive(chosenTable);
  };

  handleRefill = () => {
    let chosenTable = this.props.tables.filter(table => {
      return table.TableID === 1;
    });
    console.log(chosenTable);
    this.props.callRefill(chosenTable);
  };

  render() {
    const { auth, tables } = this.props; //destructuring, came from state before redux
    const authenticated = auth.authenticated;

    {
      tables && this.handleActive();
    }

    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item floated="left" header>
            Table: 1
          </Menu.Item>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/baseline_restaurant_white_18dp.png" alt="logo" />
            Carlo De Fromaggio
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Main" />
          <Popup wide trigger={<Menu.Item name="Games" />} on="click">
            <Grid divided columns="equal">
              <Grid.Column>
                <Segment>
                  <a
                    href="http://gamebucket1.s3-website.us-east-2.amazonaws.com"
                    target="_blank"
                  >
                    <h2>Pong</h2>
                  </a>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <a
                    href="http://gamebucket2.s3-website.us-east-2.amazonaws.com/"
                    target="_blank"
                  >
                    <h2>Snake</h2>
                  </a>
                </Segment>
              </Grid.Column>
            </Grid>
          </Popup>
          <Menu.Item>
            <Button
              onClick={this.handleHelp}
              floated="right"
              color="yellow"
              positive
              inverted
              content="Help"
            />
          </Menu.Item>
          <Menu.Item>
            <Button
              onClick={this.handleRefill}
              floated="right"
              color="teal"
              positive
              inverted
              content="Refill"
            />
          </Menu.Item>
          <Menu.Item>
            <Button
              as={Link}
              to="/createEvent"
              floated="right"
              positive
              inverted
              content="Checkout"
            />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "TableStatus" }])(NavBar));
