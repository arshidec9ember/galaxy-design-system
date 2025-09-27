<markdown>
 # MD Editor suppoted text features
 </markdown>
<template>
  <div>
    <ZTextEditor
      :value="`# First level title

Markdown editor, vue3 version, developed with jsx templates and typescript, supports switching themes, prettier beautification of text, etc. Markdown editor, vue3 version, developed with jsx templates and typescript, supports switching themes, prettier beautification of text, etc. Markdown editor, vue3 version, developed with jsx templates and typescript, supports switching themes, prettier beautification of text, etc. Markdown editor, vue3 version, developed with jsx templates and typescript, supports switching themes, prettier beautification of text, etc. Markdown editor, vue3 version, developed with jsx templates and typescript, supports switching themes, prettier beautification of text, etc.

## Secondary title
~~~mermaid
flowchart TD
  Start --> Stop
~~~
### Level 3 heading

#### Level 4 heading

1. So even though we face the difficulties of today and tomorrow, I still have a dream.
2. It is a dream deeply rooted in the American dream.
3. I have a dream that one day this nation will rise up.
4. I have a dream that one day this nation will rise up.
5. I have a dream that one day this nation will rise up.
6. I have a dream that one day this nation will rise up.
7. I have a dream that one day this nation will rise up.
8. I have a dream that one day this nation will rise up.
9. I have a dream that one day this nation will rise up.
10. I have a dream that one day this nation will rise up.
11. I have a dream that one day this nation will rise up.
12. I have a dream that one day this nation will rise up.

Markdown editor, vue3 version, developed using jsx templates and typescript, supports switching themes, prettier beautification of text, etc.

- 123123123
- adeqeweqweqwe
- Yeah, call before five o'clock

  Markdown editor, vue3 version, developed using jsx templates and typescript, supports switching themes, prettier beautification of text, etc.

##### Level 5 heading

- 111111
  - 222222
    - 333333
      - 444444

According to the Planck length, the diameter of the observable universe is estimated to be 5.4 × 1061 times the Planck length (about 93 billion light years, or 8.8 × 1026 meters). The volume of the observable universe is 8.4 × 10184 cubic Planck lengths (Planck volume).

###### Level 6 heading

This is a paragraph under the 6-level heading.

An ordinary paragraph, an ordinary paragraph.

## [Link](https://imzbf.github.io/markdown-theme) in the title

Text in paragraphs is **bold**, <u>underline</u>, _italic, ~strikethrough~,\`code\`, superscript <sup>26</sup>, subscript <sub>26</sub>, [hyperlink](https://imzbf.github.io/markdown-theme),
<a href='https://imzbf.github.io/markdown-theme'>external link</a>

> Quote: This is quote. The text in the quote is **bold**, <u>underline</u>, _italic_, ~strikethrough~, superscript <sup>26</sup>, subscript <sub>26</sub>, [hyperlink](https://imzbf.github.io/markdown-theme).

This is a normal paragraph
## Block level code
~~~javascript [g1:yarn]
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
~~~

~~~js
const a = '1';
~~~
---

<https://markdown.com.cn>

---

> Multi-paragraph citation
>
> Images in citations
>
> ![Description of the image](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)
>
> List in Reference
>
> 1. Type
> 2. Default Value
>
> - Type
> - Default value
>
> Mission
>
> - [x] Open refrigerator door
> - [ ] Put the elephant in
> - [ ] Close refrigerator
>
> Title in citation
>
> | Nickname| Gender| From |
> | ---- | ------ | --------- |
> | Between | Aliens | China - Chongqing |
> | Between | Aliens | China - Chongqing |
> | Between | Aliens | China - Chongqing |
> | Between | Aliens | China - Chongqing |
>
> | Nickname| Gender| From |
> | ---- | ------ | --------- |
> | Between | Aliens | China - Chongqing |
> | Between | Aliens | China - Chongqing |
> | Between | Aliens | China - Chongqing |
> | Between | Aliens | China - Chongqing |
>>
> Code in References
>
> ~~~js
> const a = 1;
> ~~~
>
> Mathematical formulas in citations
>
> $x+y^{2x}$ inline
>
> Block Level
>
> $$
> \sqrt[3]{x}
> $$
>>
> Figures and tables in citations
>
> ~~~mermaid
> ---
> title: Example Git diagram
> ---
> gitGraph
>    commit
>    commit
>    branch develop
>    checkout develop
>    commit
>    commit
>    checkout main
>    merge develop
>    commit
>    commit
> ~~~
>
> Tips in citations
>
> !!! tip Supported types
>
> note、abstract、info、tip、success、question、warning
>
> failure、danger、bug、example、quote、hint、caution、error、attention
>
> !!!
>
> !!! info hometown
>
> A golden full moon hung in the deep blue sky, and below was the sandy beach, planted with endless green watermelons. Among them was a boy of about eleven or twelve years old, wearing a silver ring around his neck and holding a steel fork in his hand, stabbing a wild boar with all his might. But the wild boar twisted its body and escaped from under his crotch.
>
> This young man was Runtu. When I met him, he was only in his teens, which is about thirty years ago. My father was still alive at that time, and our family was well off, so I was a young master. That year, my family was in charge of a major sacrificial ceremony. This sacrifice only takes place once every thirty years, so it is very solemn. In the first month of the year, there are many statues and offerings. The sacrificial utensils are very exquisite. There are also many people worshipping, and the sacrificial utensils must be protected from theft. My family only has one busy month (there are three types of workers here: those who work for a certain family all year round are called long-term workers; those who work for others on a daily basis are called short-term workers; those who also farm and only work for a certain family during festivals and rent collection are called busy months), and he was too busy to handle it, so he told his father that he could ask his son Runtu to take care of the sacrificial utensils.
>
>
> !!!
>
> I am a normal quote

## picture

![Description of the image](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

## Multiple images per row

The pictures are all displayed inline:

![](https://img.shields.io/github/stars/imzbf/md-editor-v3?style=social) ![](https://img.shields.io/npm/dw/md-editor-v3) ![](https://img.shields.io/bundlephobia/min/md-editor-v3) ![](https://img.shields.io/github/license/imzbf/md-editor-v3) ![](https://img.shields.io/github/package-json/v/imzbf/md-editor-v3)

---

[![Rock images in the desert](https://markdown.com.cn/assets/img/shiprock.c3b9a023.jpg 'Shiprock')](https://markdown.com.cn) [![Rock images in the desert](https://markdown.com.cn/assets/img/shiprock.c3b9a023.jpg 'Shiprock')](https://markdown.com.cn) [![Rock images in the desert](https://markdown.com.cn/assets/img/shiprock.c3b9a023.jpg 'Shiprock')](https://markdown.com.cn)

---

### illustrate

- Type: boolean
- Default value: false

## Table Demonstration

| Nickname| Gender| From |
| ---- | ------ | --------- |
| Between | Aliens | China - Chongqing |
| Between | Aliens | China - Chongqing |
| Between | Aliens | China - Chongqing |
| Between | Aliens | China - Chongqing |
| Between | Aliens | China - Chongqing |

| Nickname| Gender| From |
| ---- | ------ | --------- |
| Between | Aliens | China - Chongqing |
| Between | Aliens | China - Chongqing |
| Between | Aliens | China - Chongqing |
| Between | Aliens | China - Chongqing |
| Between | Aliens | China - Chongqing |

| Nickname| Gender| From |
| ---- | ------ | --------- |
| Between | Aliens | China - Chongqing |
| Between | Aliens | China - Chongqing |
| Between | Aliens | China - Chongqing |
| Between | Aliens | China - Chongqing |
| Between | Aliens | China - Chongqing |

---

## 🐷 Mathematical formula

There are two modes

### 🐽 Inside the industry

$x+y^{2x}$

### 🐸 Block level

$$
\sqrt[3]{x}
$$

---

## 🐵 Charts
~~~mermaid
---
title: Example Git diagram
---
gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   commit
   checkout main
   merge develop
   commit
   commit
~~~

## 🙈 Tips

!!! note Supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! abstract supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! info Supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! tip Supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! success Supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! question Supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! warning Supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! failure Supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! danger Supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! bug Supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! example Supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! quote supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! hint supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! caution Supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! error Supported types

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!

!!! Supported types of attention

note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote, hint, caution, error, attention

!!!`"
      :toolbars="[
        'bold',
        'underline',
        'italic',
        'title',
        'strikeThrough',
        'sub',
        'sup',
        'quote',
        'unorderedList',
        'orderedList',
        'task',
        'codeRow',
        'code',
        'link',
        'image',
        'table',
        'mermaid',
        'katex',
        'revoke',
        'next',
        'save',
        'pageFullscreen',
        'fullscreen',
        'preview',
        'previewOnly',
        'htmlPreview',
        'catalog',
        'github'
      ]"
      :read-only="false"
      :input-box-width="'50%'"
      :editor-id="'full-editor'"
    />
  </div>
</template>
