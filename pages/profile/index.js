import React, { useEffect } from 'react'
import { UserAction } from '../../redux/actions/user.action';
import Profile from '../../components/profile';
import { connect } from 'react-redux';
import { dataService } from '../../services';
import { useRouter } from 'next/router';

const ProfilePage=(props)=>{
    const router=useRouter()
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