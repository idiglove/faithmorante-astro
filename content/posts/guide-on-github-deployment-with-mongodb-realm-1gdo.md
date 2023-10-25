---
type_of: > 
 article
id: > 
 928685
title: > 
 Guide on Github deployment with MongoDB Realm
description: > 
 Hi, me and a friend teamed up for the MongoDB hackathon. And I'm super excited for it! With our idea,...
published: > 
 true
published_at: > 
 2021-12-16T23:50:28.866Z
slug: > 
 guide-on-github-deployment-with-mongodb-realm-1gdo
path: > 
 /idiglove/guide-on-github-deployment-with-mongodb-realm-1gdo
url: > 
 https://dev.to/idiglove/guide-on-github-deployment-with-mongodb-realm-1gdo
comments_count: > 
 0
public_reactions_count: > 
 6
page_views_count: > 
 253
published_timestamp: > 
 2021-12-16T23:50:28Z
positive_reactions_count: > 
 6
cover_image: > 
 null
tag_list: > 
 mongodb,realm,atlashackathon,github
canonical_url: > 
 https://dev.to/idiglove/guide-on-github-deployment-with-mongodb-realm-1gdo
reading_time_minutes: > 
 2
---
Hi, me and a friend teamed up for the MongoDB hackathon. And I'm super excited for it! With our idea, it seems like Realm would be the cool features to utilize for this. 

It sounds like AWS Lambdas, so I kind of have an idea how this works. And so I was looking for a way to integrate github deployment to my Realm app. Turns out they do have that option! But I hit some roadblocks:

- In the docs, it says there should be an [app configuration](https://docs.mongodb.com/realm/manage-apps/configure/config/), but there were so many folders, which ones are actually required?
- What's the best way? To start with an empty repo or with the app config?

1. I advise you guys to start with a repo with an /app and a realm_config.json inside it
2. Link your github account in Realm.

![link github to realm](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ah7w9hd33fllj3xs64qn.png)

It should practically look like that. Make sure the directory  points to `/app` (the docs says its on /dist, and that really confused me), and enable Automatic Deployment so that everytime you make changes in your repo, it will deploy here

3. Then to populate your repo, go to Environment Tab, and choose Development, hit Save

![environment tab](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v60zmctdtk538woqd10m.png)

4. Go to History Tab, there should be a button saying: `Review Draft & Deploy`. Click that and deploy it, what it does is the changes merges to your repo and it populates your app directory

That should be it, let me know if this helped you,

Cheers!
FM