---
type_of: > 
 article
id: > 
 1606514
title: > 
 Rotating a vertical rectangle image using React-cropper
description: > 
 For those who are using react-cropper package (https://github.com/react-cropper/react-cropper/), and...
published: > 
 true
published_at: > 
 2023-09-20T19:46:21.283Z
slug: > 
 rotating-a-vertical-rectangle-image-using-react-cropper-3pc5
path: > 
 /idiglove/rotating-a-vertical-rectangle-image-using-react-cropper-3pc5
url: > 
 https://dev.to/idiglove/rotating-a-vertical-rectangle-image-using-react-cropper-3pc5
comments_count: > 
 0
public_reactions_count: > 
 0
page_views_count: > 
 46
published_timestamp: > 
 2023-09-20T19:46:21Z
positive_reactions_count: > 
 0
cover_image: > 
 null
tag_list: > 
 react,rotateimage,javascript,ui
canonical_url: > 
 https://dev.to/idiglove/rotating-a-vertical-rectangle-image-using-react-cropper-3pc5
reading_time_minutes: > 
 2
---
For those who are using react-cropper package (https://github.com/react-cropper/react-cropper/), and has issues with rotating images, you're reading the correct post.

react-cropper uses cropperjs under the hood. And cropperjs has multiple github issues regarding auto-fit issues when rotating.

Here's the modal we use with the image inside the Cropper

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xjkwmvxk4kqdothw51ba.png)


After rotating, the image goes out of bounds and looks cropped out. I played around with setCropBoxData and setCanvasData and nothing worked. Until I came to find out that this is more like a scaling problem. 

I created a helper function to handle scaling for these types of images. 
```javascript
/**
   * This function scales the image when a vertical rectangle image is being rotated.
   * The goal is to auto fit the image inside the container width.
   */
  const handleScaleVerticalImg = (cropperRef) => {
    const imgData = cropperRef.current.cropper.getImageData();
    const containerData = cropperRef.current.cropper.getContainerData();
    const isVertImg = imgData?.naturalWidth < imgData?.naturalHeight;

    if (isVertImg && [90, 270, -90, -270].includes(imgData?.rotate)) {
      const height =
        imgData?.height < imgData?.naturalHeight
          ? imgData?.height
          : imgData?.naturalHeight;

      // img height is it's width after rotating
      cropperRef.current.cropper.scale(containerData.width / height);
    } else {
      cropperRef.current.cropper.scale(1);
    }
  };
```

Breakdown of code:
```javascript
if (isVertImg && [90, 270, -90, -270].includes(imgData?.rotate)) {
```

This checks if the image is vertical and is rotated sideways.

```javascript
const height =
        imgData?.height < imgData?.naturalHeight
          ? imgData?.height
          : imgData?.naturalHeight;
```

imgData?.height is the container height, and we should get the smallest from these two. This is to ensure that when it rotates, the scale is calculated correctly.


```javascript
cropperRef.current.cropper.scale(containerData.width / height);
```

The image's width should scale down according to the container's width. In this case we are basing the image width from the height as when it rotates sideways, the height becomes the width.

After rotating, this is now what happens:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1w796pzpub26njyz4def.png)



That's it, if you have any questions feel free to comment below!

Cheers,
FM
