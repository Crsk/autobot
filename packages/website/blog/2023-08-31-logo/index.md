---
slug: logo
title: Logo
authors:
  name: Christopher Kiessling
  title: Ninja Software Engineer
  url: https://github.com/crsk
  image_url: https://github.com/crsk.png
tags: []
---

import ReactPlayer from 'react-player'
import video from './video1.mp4'
import video2 from './video2.mp4'
import image1 from './logo-structure.png'
import image2 from './logo-app.png'

<ReactPlayer playing loop muted url={video} />
<img src={image1}/>
<img src={image2}/>
<ReactPlayer controls url={video2} />
