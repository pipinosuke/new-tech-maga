import React from "react"
import Layout from "../components/layout"

import { Link, graphql, useStaticQuery } from "gatsby"

import Card from "../components/card"
import CardSmall from "../components/cardSmall"
import SEO from "../components/seo"

const TagPageTemplate = ({ pageContext }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              tags
              category
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  console.log(data)
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark

  const edgesWithTag = edges.filter(({ node }) => {
    return node.frontmatter.tags.includes(tag)
  })

  const tagHeader = `${edgesWithTag.length} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout pageType="Tag">
      <div>
        <h2 className="tagPageHeader">{tagHeader}</h2>
        <div className="two-column-layout">
          <div className="cards-layout">
            <h2 id="articles-title">Articles</h2>
            {edgesWithTag.map(({ node }, index) => {
              return (
                <Card
                  key={node.id}
                  slug={node.fields.slug}
                  frontmatter={node.frontmatter}
                />
              )
            })}
          </div>
          <div className="sidebar">
            <h2 className="sidebar-header">Mailing List</h2>
            <div className="sidebar-emails">
              <h2>Mailing list here</h2>
              <p>Subscribe to my list for lots of great reasons</p>
              <form>
                <input type="text" id="email" />
                <input type="submit" value="Subscribe" />
              </form>
              <span>Weekly updates, unsubscribe at any time</span>
            </div>
            <h2 className="sidebar-header">Popular Articles</h2>
            <div className="sidebar-popular">
              {data.allMarkdownRemark.edges.map(({ node }, index) => {
                if (index > 2 && index < 5) {
                  return (
                    <CardSmall
                      key={node.id}
                      slug={node.fields.slug}
                      frontmatter={node.frontmatter}
                    />
                  )
                } else return null
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TagPageTemplate
