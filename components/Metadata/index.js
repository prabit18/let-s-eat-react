import React from 'react'
import Head from 'next/head'
const Metadata=(props)=>{
  //console.log("metadata",props.metacontent)
    return(
    <>
    <Head>
              <title>{props.metacontent.title}</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <meta name="description" content={props.metacontent.description}/>
              <meta name="keywords" content="restaurants, order food, order online, order food online, food, delivery, food delivery, home delivery, fast, hungry, quickly, offer, discount, takeaway, cuisine, pizza, burger, biryani, dessert, juice, dosa"/>
              <meta property="og:type" content="website"/>
              <meta name="og_site_name" property="og:site_name" content="Letseat.co.uk"/>
              <meta  property="og:title" content={props.metacontent.title}/>
              <meta  property="og:description" content={props.metacontent.description}/>
              <meta  property="og:image" content="/images/le-logo.svg"/>
              <meta  property="og:url" content="http://localhost:3000"/>
            </Head>
    </>)
}
export default Metadata;