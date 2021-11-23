import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { FaAngleDoubleRight } from "react-icons/fa"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"
import CardSmall from "../components/cardSmall"
import Featured from "../components/featured"
import Search from "../components/search"

const IndexPage = (props) => {
  const data = useStaticQuery(graphql`
    {
      tagsGroup: allMarkdownRemark(limit: 100) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
      allStoryblokEntry(filter: {field_component: {eq: "Post"}}) {
        edges {
          node {
              id
              slug
              full_slug
              content
              published_at
            }
          }
        }
      }
  `)
  const [queryType, query] = props.location.search.split("=")

  if (queryType === "?s" && query.length > 0) {
    return (
      <Layout>
        {/* <Search
          markdown={data.allMarkdownRemark}
          tagsGroup={data.tagsGroup}
          query={query}
        /> */}
      </Layout>
    )
  } else {
    return (
      <Layout>
        <SEO title="Home" slug="/" />
        <Featured markdown={data.allStoryblokEntry} />
        <div className="flex-layout">
          <div className="cards">
            <h2 id="articles-title">Articles</h2>
            {data.allStoryblokEntry.edges.map(({ node }, index) => {
              if (index < 3) {
                return null
              } else {
                return (
                  <Card
                    key={node.id}
                    slug={node.slug}
                    content={JSON.parse(node.content)}
                  />
                )
              }
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
            <div>
              {data.allStoryblokEntry.edges.map(({ node }, index) => {
                if (index > 2 && index < 5) {
                  return (
                    <CardSmall
                      key={node.id}
                      slug={node.slug}
                      content={JSON.parse(node.content)}
                    />
                  )
                } else return null
              })}
            </div>
          </div>
        </div>
        <Link to="/archive/2" id="archive-link">
          More Articles
          <FaAngleDoubleRight className="icon-right" />
        </Link>{" "}
        <br />
      </Layout>
    )
  }
}

export default IndexPage
