import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
export default class ProfileDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
   logouthandler(){
    localStorage.clear()
    window.location.reload();
    // console.log('calling this function')
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onMouseEnter() {
    this.setState({dropdownOpen: true});
  }

  onMouseLeave() {
    this.setState({dropdownOpen: false});
  }

  render() {
    return (
      
      <Dropdown className="d-inline-block dropdown-sec" onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <img src="../../images/login.svg" alt="login"/>
        <DropdownToggle caret>
          {this.props.profile}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem >Profile</DropdownItem>
          <DropdownItem >Orders</DropdownItem>
          <DropdownItem href="/favourites">Favourites</DropdownItem>
          <DropdownItem>Rewards</DropdownItem>
          <DropdownItem>Notifications</DropdownItem>
          <DropdownItem>Reviews</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem onClick={this.logouthandler}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
