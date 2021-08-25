import React, { useEffect } from 'react'
import { UserAction } from '../../redux/actions/user.action';
import Profile from '../../components/profile';
import { connect } from 'react-redux';
import { dataService } from '../../services';
import { useRouter } from 'next/router';
import Metadata from '../../components/Metadata';

const ProfilePage=(props)=>{
    const router=useRouter()
    useEffect(()=>{
        props.getProfile();
    },[])
    const metacontent={title:`${props.Profile.first_name} ${props.Profile.last_name} | Let's Eat`,description:""}
    return(
        <>
        <Metadata metacontent={metacontent}/>
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