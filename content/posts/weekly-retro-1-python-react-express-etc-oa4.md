---
type_of: > 
 article
id: > 
 210406
title: > 
 Weekly Retro #1 - Python, React, Express, etc
description: > 
 I like the idea of looking back, digesting what you have learned and sharing it to people who will be...
published: > 
 true
published_at: > 
 2019-11-24T12:28:24.671Z
slug: > 
 weekly-retro-1-python-react-express-etc-oa4
path: > 
 /idiglove/weekly-retro-1-python-react-express-etc-oa4
url: > 
 https://dev.to/idiglove/weekly-retro-1-python-react-express-etc-oa4
comments_count: > 
 0
public_reactions_count: > 
 6
page_views_count: > 
 128
published_timestamp: > 
 2019-11-24T12:28:24Z
positive_reactions_count: > 
 6
cover_image: > 
 null
tag_list: > 
 weeklyretro,python,react,javascript
canonical_url: > 
 https://dev.to/idiglove/weekly-retro-1-python-react-express-etc-oa4
reading_time_minutes: > 
 1
---
I like the idea of looking back, digesting what you have learned and sharing it to people who will be able to relate to it.

I learned a lot of things this week. 

*1) Python - List Comprehensions*

I'm a new learner of Python and so far I'm enjoying it. I'm subscribed to Trey Hunner and Python Morsels. Check it out!

So there a syntax in python for shortcuts of for loops and even nested loops, which I still find confusing, still need to get used to it. It's called list comprehensions.

So this:

```python
doubled_odds = []
for n in numbers:
    if n % 2 == 1:
        doubled_odds.append(n * 2)
```

Can be translated to:

```python
doubled_odds = [n * 2 for n in numbers if n % 2 == 1]
```

*2) React and Express with uploading files to Google Cloud Storage*

I have done uploading to AWS using AWS Amplify. So now I had a task to use GCP instead. You can check my post here about that: https://dev.to/idiglove/file-upload-with-react-express-and-google-cloud-storage-with-folder-structure-2i5j

*3) Amazon coding challenges*

I didn't do a good job with that. I really need to practice more.

Here's a list of some possible questions that they will ask.

https://leetcode.com/discuss/interview-question/344650/Amazon-Online-Assessment-Questions


Cheers,
FM