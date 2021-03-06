import { graphql } from "gatsby"
import React from "react"
import SbEditable from "storyblok-react"
// import DynamicComponent from "../components/dynamicComponent"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({data}) => {
  let story = data.storyblokEntry
  story.content = JSON.parse(story.content)

  // const components = story.content.body.map(blok => {
  //   return (<DynamicComponent blok={blok} key={blok._uid} />)
  // })
 
  return (
    <Layout>
      <SEO title={story.content.title} />
      <div id="about">
        <h2>About Blog Boost Starter</h2>
        <p>
          <strong>Gatsby Starter Blog Boost</strong> is a Netlify CMS powered
          Gatsby Blog with a wide range of features already configured.
        </p>

        <p>
          This starter is a great way to get blogging using a content manager
          while learning and practicing <strong>JavaScript</strong>,{" "}
          <strong>React</strong>, <strong>Gatsby</strong>, and{" "}
          <strong>GraphQL</strong>,
        </p>

        <div className="about-icons">
          <span role="img" aria-label="Laptop.">
            💻
          </span>
          <span role="img" aria-label="Rocket.">
            🚀
          </span>
        </div>

        <h3>Thanks for visiting!!</h3>
        <h1></h1>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query AboutQuery {
    storyblokEntry(slug: {eq: "about"}) {
      content
      name
    }
  }
`


export default AboutPage
