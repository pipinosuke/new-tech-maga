import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"

const Featured = ({ markdown }) => {
  
  if (!markdown) {
    return <div>...loading</div>
  } else {
    return (
      <div id="featured">
        {markdown.edges.map(({ node }, index) => {
          const content = JSON.parse(node.content)
          if (index === 0) {
            return (
              <figure
                key={node.slug}
                className="featured-link featured-main"
              >
                <Link to={node.slug}>
                  <div className="featured-overlay"></div>
                  <Image
                    fluid={getFluidGatsbyImage(content.image.filename)}
                  />
                  <figcaption>
                    <h2>{content.title}</h2>
                    {/* <span>{node.category}</span> */}
                  </figcaption>
                </Link>
              </figure>
            )
          } else if (index < 3) {
            return (
              <figure
                key={node.slug}
                className="featured-link featured-secondary"
              >
                <Link to={node.slug}>
                  <div className="featured-overlay"></div>
                  <Image
                    fluid={getFluidGatsbyImage(content.image.filename)}
                  />
                  <figcaption>
                    <h2>{content.title}</h2>
                    {/* <span>{node.frontmatter.category}</span> */}
                  </figcaption>
                </Link>
              </figure>
            )
          } else return null
        })}
      </div>
    )
  }
}
export default Featured
