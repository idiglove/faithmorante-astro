---
type_of: > 
 article
id: > 
 209951
title: > 
 File upload with React, Express and Google Cloud Storage with folder structure
description: > 
 For the front end, we will use FilePond. It has a plugin for React for file uploads that supports pre...
published: > 
 true
published_at: > 
 2019-11-23T06:34:18.025Z
slug: > 
 file-upload-with-react-express-and-google-cloud-storage-with-folder-structure-2i5j
path: > 
 /idiglove/file-upload-with-react-express-and-google-cloud-storage-with-folder-structure-2i5j
url: > 
 https://dev.to/idiglove/file-upload-with-react-express-and-google-cloud-storage-with-folder-structure-2i5j
comments_count: > 
 13
public_reactions_count: > 
 21
page_views_count: > 
 10090
published_timestamp: > 
 2019-11-23T06:34:18Z
positive_reactions_count: > 
 21
cover_image: > 
 null
tag_list: > 
 googlecloudstorage,express,react,fileupload
canonical_url: > 
 https://dev.to/idiglove/file-upload-with-react-express-and-google-cloud-storage-with-folder-structure-2i5j
reading_time_minutes: > 
 2
---
For the front end, we will use FilePond. It has a plugin for React for file uploads that supports previews, validations, drag and drop, etc.
NOTE: This tutorial assumes that you know how to setup React and Express.


Start by yarn/npm installing these:

`react-filepond`
`filepond`
`filepond-plugin-image-preview`
`filepond-plugin-image-exif-orientation`

```javascript
import { FilePond, registerPlugin } from "react-filepond"
import "filepond/dist/filepond.min.css"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
```

Filepond component looks like this

```javascript
<FilePond 
  files={imgCollection}
  allowMultiple={true}
  server={null}
  instantUpload={false}
  onupdatefiles={(fileItems) => onFileChange(fileItems)}>
</FilePond>
```

I use a form submit to trigger uploading of file/s.

Form:

```javascript
<form onSubmit={onSubmit}>
    <div className="form-group">
        <button className="btn btn-primary" type="submit">Upload</button>
    </div>
    <div className="filepond-wrapper">
        <FilePond 
            files={imgCollection}
            allowMultiple={true}
            server={null}
            instantUpload={false}
            onupdatefiles={(fileItems) => onFileChange(fileItems)}>
        </FilePond>
    </div>
</form>
```

Functions and states:

```javascript
    const [imgCollection, setImgCollection] = useState('')

    const onFileChange = (files) => {
        let items = files.map(fileItem => fileItem.file)
        setImgCollection([...imgCollection, items])
    }

    const onSubmit = (e) => {
        e.preventDefault()

        var formData = new FormData()

        for (let img in imgCollection[0]) {
            formData.append('imgCollection', imgCollection[0][img])
        }

        formData.append('folder', 'folder-name')

        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/`, formData, {
        }).then(res => {
            console.log(res.data)
        })
    }
```

Install `multer` in your api folder.
In your Express API:

```javascript
var express = require('express');
var router = express.Router();
var path = require('path')
var multer  = require('multer')
var upload = multer().array('imgCollection')

router.post('/', function(req, res, next) {
  // Imports the Google Cloud client library.
  const {Storage} = require('@google-cloud/storage');

  const storage = new Storage({projectId: 'gcp-project-id', keyFilename: path.join(__dirname, '../creds.json')});

  try {
    async function uploadFile(file, folder) {
      let bucketName = 'bucket-name'
      let bucket = storage.bucket(bucketName)

      let newFileName = folder + '/' + file.originalname;

      let fileUpload = bucket.file(newFileName);
      const blobStream = fileUpload.createWriteStream({
          metadata: {
              contentType: file.mimetype
          }
      });

      blobStream.on('error', (error) => {
          console.log('Something is wrong! Unable to upload at the moment.' + error);
      });

      blobStream.on('finish', () => {
          const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`; //image url from firebase server
          console.log(url)

      });

      blobStream.end(file.buffer);
    }

    upload(req, res, function(err) {
      let files = req.files

      for (let file in files) {
        uploadFile(files[file], req.body.folder)
      }

      if(err) {
          return res.end("Error uploading file." + err);
      }
      res.end("File is uploaded");
    })
  } catch (err) {
    res.send(err)
  }
});

module.exports = router;
```

And that's it!

Hope you liked it.

Rock on,
FM