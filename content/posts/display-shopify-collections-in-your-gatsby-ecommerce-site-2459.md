---
type_of: > 
 article
id: > 
 211323
title: > 
 Display Shopify Collections in your Gatsby Ecommerce Site
description: > 
 GatsbyJS is used for JAMstack websites. You can create blogs and in this case, you can create ecommer...
published: > 
 true
published_at: > 
 2019-11-26T11:20:33.523Z
slug: > 
 display-shopify-collections-in-your-gatsby-ecommerce-site-2459
path: > 
 /idiglove/display-shopify-collections-in-your-gatsby-ecommerce-site-2459
url: > 
 https://dev.to/idiglove/display-shopify-collections-in-your-gatsby-ecommerce-site-2459
comments_count: > 
 1
public_reactions_count: > 
 10
page_views_count: > 
 1048
published_timestamp: > 
 2019-11-26T11:20:33Z
positive_reactions_count: > 
 10
cover_image: > 
 null
tag_list: > 
 gatsby,shopify,react,collections
canonical_url: > 
 https://dev.to/idiglove/display-shopify-collections-in-your-gatsby-ecommerce-site-2459
reading_time_minutes: > 
 2
---
GatsbyJS is used for JAMstack websites. You can create blogs and in this case, you can create ecommerce sites along with Shopify API. 

You need to go through this to setup your Shopify account:
[Ecommerce site with Gatsby and Shopify](https://www.gatsbyjs.org/docs/building-an-ecommerce-site-with-shopify/)

I'm assuming that you have configured your `gatsby-config.js` for the `gatsby-source-shopify` plugin

Collections are equivalent to categories in Shopify. If you have followed the tutorial in the link I gave above, you will be able to list all products. What about displaying Collections?

So in your `gatsby-node.js`

```javascript
const collections = await graphql(`
    query {
      allShopifyCollection (sort: { fields: [title] }) {
        edges {
          node {
            id
            title
            handle
            products {
              title
              images {
                originalSrc
              }
              shopifyId
              handle
              description
              availableForSale
              priceRange {
                maxVariantPrice {
                  amount
                }
                minVariantPrice {
                  amount
                }
              }
            }
          }
        }
      }
    }
  `)

  collections.data.allShopifyCollection.edges.forEach(({ node }) => {
    createPage({
      path: `/collection/${node.handle}`,
      component: path.resolve(`./src/components/Collection.js`),
      context: {
        collection: node,
        productCount: node.products.length
      },
    })
})  
```

We are going to create pages like `/collection/men` for Men collections. 

```javascript
context: {
        collection: node,
        productCount: node.products.length
      },
```

Here we are passing node from graphql as `collection` variable and `productCount` from counting the products by `node.products.length`.

Now create your Collection component, could be `Collection.js`

```javascript
const Collection = ({ pageContext }) => {
  const { collection, productCount } = pageContext


  ....


  return (
    { collection.products.map((product) => (
      <div key={product.shopifyId} className="col-md-4">
        <div className="card card-product-grid">
          <div className="img-wrap">
            <img src={product.images[0].originalSrc} alt={product.handle} />
          </div>
          <a href="#" className="title">{product.title}</a>
          <div className="price-wrap mt-2">
            <span className="price">${product.priceRange.minVariantPrice.amount}</span>
          </div>
        </div>
      </div>
    ))}
  )
```

Now you can access this collection if you have a link to it, like this: 

```javascript
{
   allShopifyCollection.edges.map((d, i) => 
        <DropdownItem key={i}>
            <Link to={`/collection/${d.node.handle}`} className="nav-link">{d.node.title}</Link>
        </DropdownItem>
    )
}

```

Hope it's helpful!

Cheers,

FM