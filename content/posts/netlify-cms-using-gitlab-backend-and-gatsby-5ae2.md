---
type_of: > 
 article
id: > 
 216478
title: > 
 Netlify CMS using Gitlab backend and Gatsby
description: > 
 I have done Netlify CMS with Github before using Git-Gateway, but when I tried it with Gitlab, it doe...
published: > 
 true
published_at: > 
 2019-12-07T02:29:46.376Z
slug: > 
 netlify-cms-using-gitlab-backend-and-gatsby-5ae2
path: > 
 /idiglove/netlify-cms-using-gitlab-backend-and-gatsby-5ae2
url: > 
 https://dev.to/idiglove/netlify-cms-using-gitlab-backend-and-gatsby-5ae2
comments_count: > 
 0
public_reactions_count: > 
 7
page_views_count: > 
 1190
published_timestamp: > 
 2019-12-07T02:29:46Z
positive_reactions_count: > 
 7
cover_image: > 
 null
tag_list: > 
 gatsby,netlify,gitlab,cms
canonical_url: > 
 https://dev.to/idiglove/netlify-cms-using-gitlab-backend-and-gatsby-5ae2
reading_time_minutes: > 
 2
---
I have done Netlify CMS with Github before using Git-Gateway, but when I tried it with Gitlab, it doesn't seem to work; and when you hit a blocker, you gotta try another way. So this time I tried Gitlab backend. 

NOTE: To continue with this tutorial, you should have a Gatsby project hosted in Netlify. 

[How to create a Gatsby site](https://faithmorante.netlify.com/blog/how-i-created-my-website-without-spending-a-dime)

[Netlify CMS with Github](https://faithmorante.netlify.com/blog/how-to-create-free-cms-with-netlify-cms-and-gatsby)

Once you have your Gatsby site hosted in Netlify. 

1) Enable Identity in your Netlify dashboard
2) Under Identity Settings, choose Gitlab as your External Provider
![External Provider](https://res.cloudinary.com/dqsru56x5/image/upload/v1575684745/external_provide_onbgib.png)
3) Follow the first two steps here 
[Gitlab implicit auth](https://www.netlifycms.org/docs/authentication-backends/#client-side-implicit-grant-gitlab)
4) Create a folder in your repo in root. 
![config.yml inside static/admin/](https://res.cloudinary.com/dqsru56x5/image/upload/v1575684906/static_admin_punthi.png)
5) Your config.yml should look something like this: 
```yml
backend:
  name: gitlab
  repo:  # Path to your GitLab repository
  auth_type: implicit # Required for implicit grant
  app_id: # Application ID from your GitLab settings

media_folder: static/assets
public_folder: assets

collections:
  - name: events
    label: Events
    folder: events
    create: true
    fields:
      - { name: path, label: Path }
      - { name: date, label: Date, widget: date }
      - { name: title, label: Title }
      - { name: thumbnail, label: Thumbnail, widget: image }
      - { name: tags, label: Tags, widget: list }
      - { name: body, label: Body, widget: markdown }
```
6) So I have an Events collection with markdown files in it. That will serve as the content under my Events. For that to work, you should have an `events` folder with a sample markdown file inside. 
7) Also npm install/ yarn add this `gatsby-transformer-remark`
8) In your gatsby-config.js, add this:
```javascript
`gatsby-transformer-remark`,
{
    resolve: `gatsby-source-filesystem`,
    options: {
        name: `events`,
        path: `${__dirname}/events/`,
    },
},
```
9) In your gatsby-node.js, add this:
```javascript
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
};

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
      query {
        allMarkdownRemark {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        path
                    }
                }
            }
        }
      }
    `)
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(`./src/templates/post.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
        //   slug: node.fields.slug,
        },
      })
    })
}
```

What this does is creating pages from each markdown in your events folder.

10) In your `src/templates/post.js file`, add this:
```javascript
import React from "react";
import { graphql } from 'gatsby'

export default ({ data }) => {
    const post = data.markdownRemark

    return (
        <div>
            <div className="content blog-content">
                <h1>{post.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </div>
    );
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
```

When you go to your `{domain}.netlify.com/admin/` and sign in, you should see something like this:

![Netlify Admin](https://res.cloudinary.com/dqsru56x5/image/upload/v1575685735/events_issbne.png)

Cheers,
FM
