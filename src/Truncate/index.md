#### **Examples** ####

##### Single line truncate
``` jsx
var originalText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

<div style={{ width: '200px', height: '20px', border: '1px solid' }}>
  <Truncate text={originalText} />
</div>
```

##### Multi line truncate
``` jsx
var originalText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
<div style={{ width: '300px', height: '100px', border: '1px solid' }}>
  <Truncate
    ellipsis="..."
    multiline
    resisableByWindow
    text={originalText}
  />
</div>
```
