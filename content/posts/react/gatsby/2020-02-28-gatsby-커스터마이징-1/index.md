---
template: post
title: GATSBY 커스터마이징(1)
draft: true
date: 2020-02-28T08:14:58.599Z
description: Netlify CMS 커스터마이징
category: React
tags:
  - React
  - Gatsby
---
## GATSBY 커스터마이징(1) - Netlify CMS



이 글은 gatsby-starter-lumen 기준으로 작성되었습니다.

다른 스타터 라이브러리랑 구조가 상당히 다르기에 다른 라이브러리를 쓰신다면 참조만 해주세요.



우선 모든것을 다 설명하기에는...

제 필력이 부족하기에



Gatsby의 Tutorial을 읽고 따라하시고 옵니다.

커스터마이징 생각보다 많이 어려웠습니다.



삽질한건 최대한 빼두고 자세히 적어보겠습니다.





## Netlify CMS 설정

static > admin >config.yml에서 Netlify의 form을 설정할 수 있습니다.

저는 fileds의 slug는 일단 제외 시켰습니다.

slug를 내가 직접 적고싶진 않거든요.

그리고 fields에 Category를 select로 바꾸었습니다.

직접 타이핑으로 카테고리를 적기에는 위험부담이 너무 크거든요... 오타로 한글자만 달라도 다른 카테고리가 되어 버립니다.

그렇게 아래와 같이 작성하였습니다.

```yml
#static/admin/config.yml

collections:
  - name: "posts"
    label: "Posts"
    folder: "content/posts"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    preview_path: "posts/{{fields.slug}}"
    fields:
      - {
          label: "Template",
          name: "template",
          widget: "hidden",
          default: "post",
        }
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Draft", name: "draft", widget: "boolean", default: true }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Description", name: "description", widget: "text" }
      - {
          label: "Category",
          name: "category",
          widget: "select",
          options: ["Django", "React", "Vue", "알고리즘", "TIL", "기타","일상"],
        }
      - { label: "Body", name: "body", widget: "markdown" }
      - { label: "Tags", name: "tags", widget: "tags" }

  - name: "pages"
    label: "Pages"
    folder: "content/pages"
    create: true
    fields:
      - {
          label: "Template",
          name: "template",
          widget: "hidden",
          default: "page",
        }
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Draft", name: "draft", widget: "boolean", default: true }
      - { label: "Body", name: "body", widget: "markdown" }

```



Tags widget에 tags가 들어있는데 이건 제가 또 따로 시도해본 커스텀 위젯입니다.





### Netlify CMS - Custom widget

Netlify CMS의 위젯들은 너무 허접하기 그지없습니다.

그래서 저는 커스텀 위젯을 하나 만들었습니다.

원래는 태그에 자동완성을 넣어서  내가 이미 작성했던 태그들과 비슷하게 적을 수 있도록 만든것이었는데... 안되더군요.



일단은 만들어보겠습니다.



저는 react-chips를 가져 왔습니다.

```shell
npm install react-chips
```



그리고 src>cms>custom-widgets폴더를 만들고 tagWidgets.js파일을 작성했습니다.



```react
//src/cms/custom-widgets/tagWidgets.js

import React, { PureComponent } from "react";
import Chips from "react-chips";

export default class CustomWidgetControl extends PureComponent {
  onChange = chips => {
    this.props.onChange(chips);
  };
  render() {
    return (
      <div>
        <Chips
          suggestions={[]}
          onChange={this.onChange}
          value={this.props.value}
          createChipKeys={[13]}
        />
      </div>
    );
  }
}
```

createChipKeys는 추가 키를 설정할 수 있습니다. 기본이 콤마라 13-엔터 키를 넣었습니다.

Chips에 suggestions에 string의 리스트를 넣으면 해당 리스트들이 자동완성 됩니다.



원래는 suggestions에 기존의 태그들을 넣을 예정이었는데...

이 파일에서는 Gatsby 관련 요소를 import 할 수 없습니다.

```react
 import {} from "gatsby"
```

만 해도 터미널이 날뜁니다.



이제 이 위젯을 등록합니다. 아래 두 줄만 추가하면 됩니다.

```react
//src/cms/index.js


import TagWidget from './custom-widgets/tagWidget'
CMS.registerWidget('tags',TagWidget)

```

이렇게 등록하면 config.yml 파일에서 위젯을 설정 할 수 있습니다.



이제 netlify cms에서 좀 더 쉽게 태그를 등록할 수 있습니다.