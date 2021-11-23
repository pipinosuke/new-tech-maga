import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"

const Card = ({ content, slug }) => {
  return (
    <figure className="card-small-styles">
      <Link to={slug}>
        <Image
          className="card-small-image"
          fluid={getFluidGatsbyImage(content.image.filename)}
        />
      </Link>

      <figcaption>
        <Link to={slug}>
          <h3>{content.title}</h3>
        </Link>
        <Link to={`/${content.category.slug.toLowerCase().replace(" ", "-")}`}>
          <span className="card-small-topic">{content.category.name}</span>
        </Link>
      </figcaption>
    </figure>
  )
}
export default Card
