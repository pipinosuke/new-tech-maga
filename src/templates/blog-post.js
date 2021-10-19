import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "gatsby-image"
import SEO from "../components/seo"
import Card from "../components/card"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"
import Markdown from "react-markdown"

class ArticleTemplate extends Component {
  render() {
    const { data, pageContext } = this.props
    const { topic } = pageContext
    const post = data.storyblokEntry
    const content = JSON.parse(post.content)

    // const similarPosts = data.allStoryblokEntry.edges
    //   .filter(item => {
    //     return (
    //       item.node.category === topic &&
    //       item.node.title !== post.title
    //     )
    //   })
    //   .filter((item, index) => {
    //     return index < 2
    //   })

    return (
      <Layout pageType="Post">
        <SEO
          title={content.title}
          description={content.description}
        />
        <div id="article">
          <header>
            <h1 className="article-title">{content.title}</h1>
            <p className="article-date">{post.published_at}</p>
            <div className="article-tags">
              {/* {content.tags.map(tag => (
                <Link
                  className="tag"
                  key={tag}
                  to={`/${tag
                    .split(" ")
                    .join("-")
                    .split("/")
                    .join("-")
                    .toLowerCase()}`}
                >
                  {tag}
                </Link>
              ))} */}
            </div>
            <Image
              fluid={getFluidGatsbyImage(content.image.filename)}
              className="article-image"
            ></Image>
          </header>

          <Markdown
              className="article-markdown"
              children={content.body}
          />


          <div>
            {/* {similarPosts.length > 0 && (
              <h3 id="similar-posts-header">
                Other {this.props.pageContext.topic} Tutorials
              </h3>
            )} */}

            {/* <section>
              {similarPosts.map(({ node }) => {
                return (
                  <Card
                    key={node.slug}
                    title={node.frontmatter.title}
                    slug={node.fields.slug}
                    date={node.frontmatter.date}
                    description={node.frontmatter.description}
                    excerpt={node.excerpt}
                    frontmatter={node.frontmatter}
                  />
                )
              })}
            </section> */}
          </div>
        </div>
      </Layout>
    )
  }
}

export default ArticleTemplate
export const pageQuery = graphql`
  query ArticleBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    storyblokEntry(slug: {eq: $slug}) {
      id
      published_at(formatString: "MMMM DD, YYYY")
      content
    }
    allStoryblokEntry(filter: {full_slug: {regex: "/^article.*/"}}) {
      edges {
        node {
          id
          slug
          content
        }
      }
    }
  }
`
