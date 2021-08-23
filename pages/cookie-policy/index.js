import React from 'react';
import CookiePolicy from '../../components/cookies-policy';
import Metadata from '../../components/Metadata';
const CookiePolicyPage=()=>{
    const metacontent={title:"Cookie-Policy | Let's Eat",description:""}
    return(
        <>
        <Metadata metacontent={metacontent}/>
        <CookiePolicy/>
        </>
    )
}
export default CookiePolicyPage;