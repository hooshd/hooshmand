import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Index = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
                <div className="container">
                    <!-- Dana -->
                        <style>
                            .aboutgrid {
                                display: grid;
                                justify-content: space-between;
                                    grid-gap: 30px;
                                    grid-template-columns: 1fr 1fr;
                                }

                                @media (max-width:680px) {
                                    .aboutgrid {
                                        grid-template-columns: 1fr
                                    }
                                }

                            </style>
                            <section class="aboutgrid">
                                <a class="post-card">
                                    <h2 class="post-card-title">About Dana Hooshmand</h2>
                                    <p class="post-card-excerpt">I write about startup operations, technology, coding and motorcycles. I create guides on doing difficult things with minimal resources. I also write about exploring foreign cultures by studying language, sport and art at my other site, Discover Discomfort.</p>
                                </a>
                                <a class="post-card">
                                    <div class="post-card-image" style="background-image: url(&quot;https://hooshmand.net/content/images/size/w1000/2019/12/Dana---motorcycle-1.jpg&quot;);"></div>
                                </a>
                            </section>
                            <hr>
                            <!-- Dana -->
                    <section className="post-feed">
                        {posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    )
}

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        limit: $limit,
        skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
