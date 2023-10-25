---
type_of: > 
 article
id: > 
 1613765
title: > 
 Nested Layouts in NextJS (App Router)
description: > 
 Introduction   At work, we are going to create a new system and we have a scenario where we...
published: > 
 true
published_at: > 
 2023-09-27T23:43:50.852Z
slug: > 
 nested-layouts-in-nextjs-app-router-6f
path: > 
 /idiglove/nested-layouts-in-nextjs-app-router-6f
url: > 
 https://dev.to/idiglove/nested-layouts-in-nextjs-app-router-6f
comments_count: > 
 0
public_reactions_count: > 
 3
page_views_count: > 
 245
published_timestamp: > 
 2023-09-27T23:43:50Z
positive_reactions_count: > 
 3
cover_image: > 
 null
tag_list: > 
 nextjs,react,frontend,javascript
canonical_url: > 
 https://dev.to/idiglove/nested-layouts-in-nextjs-app-router-6f
reading_time_minutes: > 
 3
---
## **Introduction**

At work, we are going to create a new system and we have a scenario where we have a page that can have multiple layouts.

The whole system is still being planned out and many unknown variables remain. As far as I understand, each component in the layout can be passed in with an identifier or ID. 

Here is a straightforward representation of what we want for the UI:

![Initial Layout](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/64crd6t9gf22284ptoip.png)

## **Problem**

The **main problem** we are trying to solve is that this layout can be changed as the user has the ability to choose a different layout at a point in time. Let's also assume that a component may need to know a specific identifier to render its data. For example, Header might need a uuid, Body might need an id and the same for Sidebar.

## **Solutions**

There are three approaches to this on how we will organize the URL structure:

### Approach 1:

```
* logic: /[layout]/[header]/[body]/[sidebar]
* actual: /layout1/header2/body2/sidebar2 or /layout2/header3/body2/sidebar4
```

Pros:
* We can pass data in the route in each layout, for example: `/layout1/uuid/id/id`

### Approach 2:

```
* logic: /[layout]
* actual: /layout1 or /layout2
```

Pros:
* Simple, clean and more scalable

### Approach 3:

```
logic and actual: /layout1/header1/left2/right2
```

Pros:
* Has more control than others 


## Let's get into coding

We have decided to go with Approach 2 at work because of our current use case but in this article, we will go with Approach 1.

I have never worked with App Router before this, so let me know if I do some things wrong or unnecessary :)

I won't go through the details of setting up the project, you can go ahead and see the docs for that. The important thing is we are going to use App Router in this article.

Let's start with the folder structure:

![Folder structure](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ctpxlyh4y7faa5o82oup.png)

Observe that each folder ([layout], [sidebar]) has both a `layout` and a `page`.


### Layouts

Layout is more like the root component of that folder. It can hold the UI structure and the placement of the `children` props.

The main idea here is the `children`. 
There are two scenarios: 

1 - Rendering the current route: Let's say you're in the [body] route which is something like `/layout1/header1/body1`, the children will have the `[body]/page.tsx`. 


![Render current route](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oimt82j9881o2l2gmwe0.png)


2 - Rendering the nested route: Now let's say you're in the [sidebar] route which is something like `/layout1/header1/body1/sidebar1`, the children in your [body]/layout.tsx will render the [sidebar]/page.tsx


![Render nested route](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ormpxewffg3qfua2wzbg.png)



For more context, here is the Body layout:
```tsx
const BodyLayout = ({ params, children }) => {
  const { body } = params ?? {};
  return (
    <div className="w-full h-[200px] flex">
      <div className="w-full h-full w-[70%] bg-green-100 text-black">
        {body}
      </div>
      <div className="w-full h-full w-[30%] bg-blue-100 text-black">
        {children}
      </div>
    </div>
  );
};

export default BodyLayout;
```

and the Body page:
```tsx
const Body = () => {
  return <div>Body</div>;
};

export default Body;
```



### Pages

They call this the leaf. You can compose your UI here, fetch data as it is a Server Component and it will be outputted as children in the current route.

## **Conclusion**

NextJS has done a great job in nested layouts and is a great matchup for the same thing with Remix. 

I hope my article was clear and concise. 

Cheers,
FM