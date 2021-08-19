import React from 'react'
import Metadata from '../../components/Metadata'
import Terms_Condition from '../../components/terms&condition'
const Terms_Condition_Page=()=>{
    const metacontent={title:"Terms of Services | Let's Eat",description:""}
    return(
        <>
        <Metadata metacontent={metacontent}/>
        <Terms_Condition/>
        </>
    )
}
export default Terms_Condition_Page;