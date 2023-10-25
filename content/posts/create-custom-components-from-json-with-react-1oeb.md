---
type_of: > 
 article
id: > 
 210292
title: > 
 Create custom components from JSON with React
description: > 
 Ever wondered how to create components (textboxes, dropdowns, textareas, etc) from a JSON file?  Note...
published: > 
 true
published_at: > 
 2019-11-24T00:25:38.645Z
slug: > 
 create-custom-components-from-json-with-react-1oeb
path: > 
 /idiglove/create-custom-components-from-json-with-react-1oeb
url: > 
 https://dev.to/idiglove/create-custom-components-from-json-with-react-1oeb
comments_count: > 
 0
public_reactions_count: > 
 39
page_views_count: > 
 2510
published_timestamp: > 
 2019-11-24T00:25:38Z
positive_reactions_count: > 
 39
cover_image: > 
 null
tag_list: > 
 react,javascript,component
canonical_url: > 
 https://dev.to/idiglove/create-custom-components-from-json-with-react-1oeb
reading_time_minutes: > 
 2
---
Ever wondered how to create components (textboxes, dropdowns, textareas, etc) from a JSON file?

Note: I'm using Hooks, so no class components

Here's how I do it:

So I have an external json file, could be named `data.json`:

```json
{
  "fields": [
            { 
                "id": "post-title",
                "name": "Post Title", 
                "fieldType": "text"
            },
            { 
                "id": "quantity",
                "name": "Quantity", 
                "fieldType": "number"
            },
            { 
                "id": "expiry",
                "name": "Expiry", 
                "fieldType": "date"
            },
            { 
                "id": "product-details",
                "name": "Product Details", 
                "fieldType": "textarea"
            },
            { 
                "id": "product-details-wysiwyg",
                "name": "Product Details", 
                "fieldType": "wysiwyg"
            },
            { 
                "id": "type",
                "name": "Type", 
                "fieldType": "dropdown",
                "options": [
                    {
                        "value": "basic",
                        "text": "Basic"
                    },
                    {
                        "value": "pro",
                        "text": "Pro"
                    },
                    {
                        "value": "premium",
                        "text": "Premium"
                    }
                ]
            }
        ] 
}
```

Inside you return function:

```javascript
{
  data.fields.map((a, i) =>
     <div key={i}>
         { renderComponents(a) }
     </div> 
 )
}

```

```javascript
const renderComponents = (field) => {
        switch (field.fieldType) {
            case 'text' :
                return <>
                        <label className="label">{field.name}</label>
                        <input type="text" placeholder="Type here..." className="textbox"></input>

                        <DropdownSidebar id={field.id} name={field.name} 
                        values={state.triggerFields}
                        handleChangeDropdown={changeByDropdown} />
                    </>
            case 'number' :
                return <>
                        <label className="label">{field.name}</label>
                        <input type="number" defaultValue={1} className="textbox"
                        ></input>
                    </>
            case 'date' :
                return <>
                        <label className="label">{field.name}</label>
                        <DatePicker
                            onChange={(date) => setDate(date, field.id)}
                            value={stateDate}
                        />
                    </>
            case 'textarea' :
                return <>
                        <label className="label">{field.name}</label>
                        <textarea maxLength={100} rows={5} cols={30} draggable={false} 
                        ></textarea>
                    </>
            case 'dropdown' :
                return <>
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle caret>
                            {field.name}
                            </DropdownToggle>
                            <DropdownMenu>
                                {
                                    field.options.map((o, i) => 
                                        <DropdownItem key={i} value={o.value} onClick={() => onChangeDropdown(o.value, o.text, field.id)}>{o.text}</DropdownItem>
                                    )
                                }
                            </DropdownMenu>
                        </Dropdown>
                    </>
            case 'wysiwyg' :
                return <>
                        <label className="label">{field.name}</label>
                        <FroalaEditorComponent
                            tag='textarea'
                            config={{
                                placeholderText: 'Edit Your Content Here!',
                                charCounterCount: false,
                                toolbarInline: false,
                                toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 
                                'subscript', 'superscript', '-', 'paragraphFormat', 'align', 
                                'formatOL', 'formatUL', 'indent', 'outdent', '-', 'insertImage', 
                                'insertLink', 'insertFile', 'insertVideo', 'undo', 'redo', 'textColor', 'inlineStyle'],
                                toolbarVisibleWithoutSelection: true,
                                inlineStyles: {
                                    'Big Red': 'font-size: 20px; color: red;',
                                    'Small Blue': 'font-size: 14px; color: blue;'
                                }
                            }}
                            model={model}
                            onModelChange={(model) => saveEditor(model, field.id)}
                        />
                    </>
            default :
                return <></>
        }
    }
```

Some notes:

For some components there I use these:

```javascript
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import DatePicker from 'react-date-picker'
import FroalaEditorComponent from 'react-froala-wysiwyg'
```

This solution only solves components that are used once. Next time, I will tackle how to use  components like dropdowns that toggles that appear more than once in your component.

Cheers,
FM