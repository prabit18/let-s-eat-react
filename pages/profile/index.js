import React, { useEffect } from 'react'
import { UserAction } from '../../redux/actions/user.action';
import Profile from '../../components/profile';
import { connect } from 'react-redux';
import { dataService } from '../../services';
const ProfilePage=(props)=>{
    useEffect(()=>{
       props.getProfile();
    },[])
    console.log('profile',props.Profile);
    return(
        <>
        <Profile data={props.Profile}/>
        </>
    )
}
const mapStateToProps = (state) => {
    const {
      Profile
    } = state
    return {Profile}
  }
  const actionCreator = {
    getProfile: UserAction.getProfile,
  }
  
  export default connect(mapStateToProps, actionCreator)(ProfilePage);