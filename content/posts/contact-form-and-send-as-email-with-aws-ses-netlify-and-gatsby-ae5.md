---
type_of: > 
 article
id: > 
 268719
title: > 
 Contact Form and Send as Email with AWS SES, Netlify and Gatsby
description: > 
 This tutorial assumes you have Netlify, Gatsby and AWS SES set up. SES stands for Simple Email Servic...
published: > 
 true
published_at: > 
 2020-02-25T11:45:06.039Z
slug: > 
 contact-form-and-send-as-email-with-aws-ses-netlify-and-gatsby-ae5
path: > 
 /idiglove/contact-form-and-send-as-email-with-aws-ses-netlify-and-gatsby-ae5
url: > 
 https://dev.to/idiglove/contact-form-and-send-as-email-with-aws-ses-netlify-and-gatsby-ae5
comments_count: > 
 6
public_reactions_count: > 
 16
page_views_count: > 
 1749
published_timestamp: > 
 2020-02-25T11:45:06Z
positive_reactions_count: > 
 16
cover_image: > 
 null
tag_list: > 
 gatsby,react,aws,netlify
canonical_url: > 
 https://dev.to/idiglove/contact-form-and-send-as-email-with-aws-ses-netlify-and-gatsby-ae5
reading_time_minutes: > 
 2
---
This tutorial assumes you have Netlify, Gatsby and AWS SES set up. SES stands for Simple Email Service.

In the page you want to create a contact form, code your UI components like so:

```javascript
import React, { useState } from 'react'
import { Button, Form, Input } from 'reactstrap'
import axios from 'axios'

export default function Index() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const send = (e) => {
        e.preventDefault()

        axios.post('/.netlify/functions/ses-send-email', {
            name,
            email,
            message
        }).then((res) => {
            console.log(res)
        })
    }

    return (
        <div>
                <Form onSubmit={(e) => send(e)}>
                    Name
                    <Input type="text" required onChange={(e) => setName(e.target.value)} />
                    Email
                    <Input type="email" required onChange={(e) => setEmail(e.target.value)} />
                    Message
                    <Input type="textarea" required onChange={(e) => setMessage(e.target.value)}/>
                    <Button>Send Message</Button>
                </Form>
        </div>
    )
}
```

Use axios for calling your Netlify function.

In your root dir, create a file named `netlify.toml` with these inside:

```
[build]
    functions = "./functions"
```

Now create a folder and file accordingly
![New file](https://i.imgur.com/mqimYUD.png)

Your sending email function should look like this:

```javascript
exports.handler = async event => {
  const AWS = require("aws-sdk")

  let requestParams = JSON.parse(event.body)
  let name = requestParams.name
  let email = requestParams.email
  let message = requestParams.message

	AWS.config.update({
		accessKeyId: 'your-aws-access-key-here',
		secretAccessKey: 'your-secret-access-key-here',
		region: 'aws-region-here'
	})

	const ses = new AWS.SES({ apiVersion: "2010-12-01" })
    const params = {
      Destination: {
        ToAddresses: [email] // Email address/addresses that you want to send your email
      },
    //   ConfigurationSetName: <<ConfigurationSetName>>,
      Message: {
        Body: {
          Html: {
            // HTML Format of the email
            Charset: "UTF-8",
            Data:
              `<html>
                  <body>
                    From: ${name}
                    <br />
                    Message: ${message}
                  </body>
              </html>`
          },
          Text: {
            Charset: "UTF-8",
            Data: ""
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: "From Contact Form"
        }
      },
      Source: email
    }
    
    return ses.sendEmail(params).promise().then(data => {
        console.log("email submitted to SES", data);
        return {
          statusCode: 200,
          body: `Message sent`,
        }
      })
      .catch(error => {
        console.log(error);
        return {
          statusCode: 500,
          body: `Message unsuccesfully sent, error: ${error}`,
        }
    })
}
```

And there you go, publish to Netlify or use `netlify dev` to replicate sending emails on your local machine.