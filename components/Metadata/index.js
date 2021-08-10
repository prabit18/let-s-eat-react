import React from 'react'
import Head from 'next/head'
const Metadata=()=>{
    return(
    <>
    <Head>
              <title>Order Food Online from Best Restaurants Around You | Let's Eat</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <meta name="description" content="Order food online from restaurants and get it delivered"/>
              <meta name="keywords" content="Food store pickup, Food delivery"/>
              <meta content="Lets Eat" property="og:title" />
              <meta content="Online food order." property="og:description"/>
              <meta content="/images/le-logo.svg" property="og:image"/>
              <meta content="https://staging.letseat.co.uk" property="og:url" />
            </Head>
    </>)
}
export default Metadata;