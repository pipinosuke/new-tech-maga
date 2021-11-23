import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import Card from "../components/card"
import CardSmall from "../components/cardSmall"
import Layout from "../components/layout"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"
import Sidebar from "../components/sidebar"

const TopicPageTemplate = ({ pageContext }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      allStoryblokEntry(filter: {field_component: {eq: "Post"}}) {
        edges {
          node {
              id
              slug
              full_slug
              content
          }
        }
      }
    }
  `)

  const { topic } = pageContext
  const { edges } = data.allStoryblokEntry

  const edgesWithTopic = edges.filter(({ node }) => {
    return JSON.parse(node.content).category.slug === topic
  })

  const topicData = data.allStoryblokEntry.edges.filter(({ node }) => {
    return JSON.parse(node.content).category.slug === topic.toLowerCase().replace(" ", "-")
  })[0].node

  const topicInfo = JSON.parse(topicData.content).category

  return (
    <Layout pageType="Topic">
      <div className="topic-page-header">
        <h1>{topicInfo.name}</h1>
        <Image
          className="topic-page-image"
          fluid={getFluidGatsbyImage(topicInfo.content.icon.filename)}
          alt={topicInfo.name}
        />{" "}
      </div>
      <div className="flex-layout">
        <div className="cards">
          <h2 id="articles-title">Articles</h2>
          {edgesWithTopic.map(({ node }, index) => {
            return (
              <Card
                key={node.slug}
                slug={"/"+ node.slug}
                content={JSON.parse(node.content)}
              />
            )
          })}
        </div>
        <Sidebar poplularPosts={data.allStoryblokEntry.edges}/>
      </div>
    </Layout>
  )
}

export default TopicPageTemplate
