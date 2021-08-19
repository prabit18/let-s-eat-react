import React from 'react';
import Metadata from '../../components/Metadata';
import PrivacyPolicy from '../../components/privacy-policy';
const Privacy_Policy=()=>{
    const metacontent={title:"Privacy Policy | Let's Eat",description:""}
    return(
        <>
        <Metadata metacontent={metacontent}/>
        <PrivacyPolicy/>
        </>
    )
}
export default Privacy_Policy;