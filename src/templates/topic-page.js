import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import Card from "../components/card"
import CardSmall from "../components/cardSmall"
import Layout from "../components/layout"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"

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
        {/* 以下Component化したい */}
        <div className="sidebar">
          <h2 className="sidebar-header">Mailing List</h2>
          <div className="sidebar-emails">
            <h2>Mailing list here</h2>
            <p>Subscribe to my list for lots of great reasons</p>
            <form>
              <input type="text" id="email" aria-label="email" />
              <input
                type="submit"
                value="Subscribe"
                aria-label="subscribe"
              />{" "}
            </form>

            <span>Weekly updates, unsubscribe at any time</span>
          </div>
          <h2 className="sidebar-header">Popular Articles</h2>
          <div className="sidebar-popular">
            {/* {data.allMarkdownRemark.edges.map(({ node }, index) => {
              if (index > 2 && index < 5) {
                return (
                  <CardSmall
                    key={node.fields.slug}
                    slug={node.fields.slug}
                    frontmatter={node.frontmatter}
                  />
                )
              } else return null
            })} */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TopicPageTemplate
