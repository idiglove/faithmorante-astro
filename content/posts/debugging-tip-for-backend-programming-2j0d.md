---
type_of: > 
 article
id: > 
 469405
title: > 
 Debugging tip for backend programming
description: > 
 In over 5 years of professional programming, I have to say personally most of the toughest daily task...
published: > 
 true
published_at: > 
 2020-09-30T00:42:26.153Z
slug: > 
 debugging-tip-for-backend-programming-2j0d
path: > 
 /idiglove/debugging-tip-for-backend-programming-2j0d
url: > 
 https://dev.to/idiglove/debugging-tip-for-backend-programming-2j0d
comments_count: > 
 0
public_reactions_count: > 
 3
page_views_count: > 
 80
published_timestamp: > 
 2020-09-30T00:42:26Z
positive_reactions_count: > 
 3
cover_image: > 
 null
tag_list: > 
 debugging,tips,backend
canonical_url: > 
 https://dev.to/idiglove/debugging-tip-for-backend-programming-2j0d
reading_time_minutes: > 
 1
---
In over 5 years of professional programming, I have to say personally most of the toughest daily tasks to do is debugging. Especially user journeys where you don't know why a certain thing happened. You try to replicate the problem, but there are times that it just seems to be a big mystery. 

I know logging and audit trails can help, but I have thought something more of an easy way to do it. 

On every insert and update transactions, the DB table should have two columns: `file_name` and `function_name`

`file_name`: this means the transaction happened in this file. This helps when your repository is huge and there are multiple transactions in same table in other parts of the codebase

`function_name`: this drills down which part of file the transaction happened. Line numbers doesn't have to be saved since they are mostly changed as time progresses and codes change by the team.

So that's it, it has helped me in a particular "mystery" case. What do you think about it? Have you used this? Is this helpful? What are your debugging tips?

Cheers!
FM