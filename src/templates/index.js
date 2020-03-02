import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges;
    const author = data.ghostPage;
    const [formState, setFormState] = useState("");
    function processForm(e) {
        e.preventDefault();

        if (validateForm() === true) {
            sendData();
        } else {
            // formAlert("Please fill out both fields.");
            setFormState("error");
        }
    }

    function sendData() {
        // formAlert("One second...");
        setFormState("loading");
        var postURL = "https://hooks.zapier.com/hooks/catch/1963766/7ywzcv/";
        var http = new XMLHttpRequest();
        http.open("POST", postURL, true);
        http.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
        );
        var params =
            "first_name=" +
            "" +
            "&email_address=" +
            document.forms["joinform"]["email_address"].value +
            "&action=subscribe" +
            "&source_url=" +
            window.location.href;
        http.send(params);
        http.onload = function() {
            // formAlert("Thank you, check your email!");
            // document.getElementById("joinform").reset();
            console.log("success");
            setFormState("success");
        };
        http.onerror = function() {
            console.log("error");
            setFormState("error");
        };
    }

    function validateForm() {
        var returner = false;
        var x =
            // document.forms["joinform"]["first_name"].value.length *
            document.forms["joinform"]["email_address"].value.length;
        if (x !== 0) {
            returner = true;
        }
        return returner;
    }

    function formAlert(text) {
        document.getElementById("responsemsg").innerHTML =
            "<br><p><em>" + text + "</em></p>";
    }
    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
                <div className="container">
                    <section className="aboutgrid">
                        <a className="post-card">
                            <h2 className="post-card-title">
                                {author.meta_title}
                            </h2>
                            <p className="post-card-excerpt">
                                {author.meta_description}
                            </p>
                        </a>
                        <a className="post-card">
                            <div
                                className="post-card-image"
                                style={{
                                    "background-image": `url(${author.feature_image})`
                                }}
                            ></div>
                        </a>
                    </section>
                    <hr></hr>
                </div>
                <div id="subscribe" style={{ padding: "0 !important" }}>
                    <div
                        className="subscribe-form"
                        style={{ padding: "2vw !important" }}
                    >
                        <h1 className="subscribe-overlay-title">
                            Subscribe to HOOSHMAND.NET
                        </h1>
                        <p className="subscribe-overlay-description">
                            Stay up to date! Get posts delivered straight to
                            your inbox. Days of work go into each one.
                        </p>
                        <form
                            id="joinform"
                            data-members-form="subscribe"
                            className={formState}
                        >
                            <div className="form-group">
                                <input
                                    className="subscribe-email"
                                    data-members-email=""
                                    autocomplete="false"
                                    name="email_address"
                                    id="email_address"
                                    type="text"
                                    placeholder="Your best email"
                                    required
                                />
                                <button
                                    className="button primary"
                                    onClick={e => processForm(e)}
                                >
                                    <span className="button-content">
                                        Subscribe
                                    </span>
                                    <span className="button-loader">
                                        <svg
                                            version="1.1"
                                            id="loader-1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0px"
                                            y="0px"
                                            width="40px"
                                            height="40px"
                                            viewBox="0 0 40 40"
                                            enable-background="new 0 0 40 40"
                                        >
                                            <path
                                                opacity="0.2"
                                                fill="#000"
                                                d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
                                            ></path>
                                            <path
                                                fill="#000"
                                                d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
C22.32,8.481,24.301,9.057,26.013,10.047z"
                                                transform="rotate(324.068 20 20)"
                                            >
                                                <animateTransform
                                                    attributeType="xml"
                                                    attributeName="transform"
                                                    type="rotate"
                                                    from="0 20 20"
                                                    to="360 20 20"
                                                    dur="0.5s"
                                                    repeatCount="indefinite"
                                                ></animateTransform>
                                            </path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div class="message-success">
                                <strong>Great!</strong> Check your inbox and
                                click the link to confirm your subscription.
                            </div>
                            <div class="message-error" id="responsemsg">
                                Please enter a valid email address!
                            </div>
                        </form>
                    </div>
                </div>
                <div className="container">
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
    );
};

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    pageContext: PropTypes.object
};

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
    query GhostPostQuery($limit: Int!, $skip: Int!) {
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
        ghostPage(slug: { eq: "about" }) {
            meta_description
            meta_title
            og_title
            og_image
            og_description
            feature_image
        }
    }
`;
