import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import { getFluidGatsbyImage } from 'gatsby-storyblok-image'

const Card = ({ content, slug }) => {
  return (
    <figure className="card-styles">
      <Link to={slug}>
        <Image
          className="card-image"
          fluid={getFluidGatsbyImage(content.image.filename)}
        />
      </Link>

      <figcaption>
        <Link to={`/${content.category.slug.toLowerCase().replace(" ", "-")}`}>
          <div className="card-topic">{content.category.name}</div>
        </Link>
        <Link to={slug}>
          <h3>{content.title}</h3>
        </Link>
      </figcaption>
    </figure>
  )
}
export default Card
