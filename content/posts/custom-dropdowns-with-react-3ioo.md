---
type_of: > 
 article
id: > 
 210400
title: > 
 Custom dropdowns with React
description: > 
 Ok if you followed my last post:  https://dev.to/idiglove/create-custom-components-from-json-with-rea...
published: > 
 true
published_at: > 
 2019-11-24T11:59:38.606Z
slug: > 
 custom-dropdowns-with-react-3ioo
path: > 
 /idiglove/custom-dropdowns-with-react-3ioo
url: > 
 https://dev.to/idiglove/custom-dropdowns-with-react-3ioo
comments_count: > 
 2
public_reactions_count: > 
 6
page_views_count: > 
 2665
published_timestamp: > 
 2019-11-24T11:59:38Z
positive_reactions_count: > 
 6
cover_image: > 
 null
tag_list: > 
 react,reactstrap,component,dropdown
canonical_url: > 
 https://dev.to/idiglove/custom-dropdowns-with-react-3ioo
reading_time_minutes: > 
 1
---
Ok if you followed my last post: 
https://dev.to/idiglove/create-custom-components-from-json-with-react-1oeb

I showed there how to create custom components from a json file with React.
How about dropdowns where you need to store its values and each dropdown has its own toggle (if you're using a library like Reactstrap)?

Here's how I did it:

```javascript
const [dropdowns, setDropdowns] = useState({})
const [savedDropdowns, setSavedDropdowns] = useState({})

const toggleDropdown = (i) => {
    setDropdowns({...dropdowns, [i]: !dropdowns[i]})
}

const onChangeDropdown = (value, id) => {
    setSavedDropdowns({...savedDropdowns, [id]: value})
}
```

Inside your function where you render your custom components:

```javascript
<Dropdown 
   isOpen={dropdowns[id]} toggle={() => toggleDropdown(id)}
    >
        <DropdownToggle caret>
            {id}
        </DropdownToggle>
        <DropdownMenu>
            {options.map((o, oi) => {
                return <DropdownItem key={oi} value={o.value}
onClick={() => onChangeDropdown(o.value, id)}>{o.name}</DropdownItem>
            })}
        </DropdownMenu>
</Dropdown>
```

Hope you get something out of this.

Cheers,
FM