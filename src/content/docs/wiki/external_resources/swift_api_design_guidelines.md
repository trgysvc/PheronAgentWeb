Title: Live Content

Description: Fetched live

Source: https://swift.org/documentation/api-design-guidelines/

---

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>API Design Guidelines | Swift.org</title>
  
  <meta name="author" content="Apple Inc." />
  <meta name="viewport" content="width=device-width initial-scale=1" />
  
  <link rel="license" href="/LICENSE.txt" />
  <link rel="stylesheet" media="all" href="/assets/stylesheets/application.css" />
  <link rel="shortcut icon" sizes="16x16 24x24 32x32 48x48 64x64" type="image/vnd.microsoft.icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
  <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
  <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
  <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
  <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
  <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
  <link rel="mask-icon" href="/assets/images/icon-swift.svg" color="#F05339" />
  <link rel="alternate" type="application/atom+xml" title="Swift.org (Atom Feed)" href="/atom.xml" />

  
  <link rel="canonical" href="https://swift.org/documentation/api-design-guidelines/" />
  

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@SwiftLang" />
  
  <meta name="twitter:title" content="Swift.org" />
  <meta name="twitter:description" content="Swift is a general-purpose programming language built using a modern approach to safety, performance, and software design patterns." />
  

  <meta property="og:site_name" content="Swift.org" />
  <meta property="og:image" content="https://swift.org/apple-touch-icon-180x180.png" />
  
  
  <meta property="og:title" content="Swift.org" />
  <meta property="og:url" content="https://swift.org" />
  <meta property="og:description" content="Swift is a general-purpose programming language built using a modern approach to safety, performance, and software design patterns." />
  
</head>

<body>

<script src="/assets/javascripts/color-scheme-toggle.js"></script>
<header class="site-navigation">
    <div class="wrapper">
      <h1 class="logo">
        <a href="/" title="Swift.org"> <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 191.186 59.391"><path fill="#F05138" d="M59.387 16.45a82.463 82.463 0 0 0-.027-1.792c-.035-1.301-.112-2.614-.343-3.9-.234-1.307-.618-2.523-1.222-3.71a12.464 12.464 0 0 0-5.453-5.452C51.156.992 49.941.609 48.635.374c-1.288-.232-2.6-.308-3.902-.343a85.714 85.714 0 0 0-1.792-.027C42.23 0 41.52 0 40.813 0H18.578c-.71 0-1.419 0-2.128.004-.597.004-1.195.01-1.792.027-.325.009-.651.02-.978.036-.978.047-1.959.133-2.924.307-.98.176-1.908.436-2.811.81A12.503 12.503 0 0 0 3.89 3.89a12.46 12.46 0 0 0-2.294 3.158C.992 8.235.61 9.45.374 10.758c-.231 1.286-.308 2.599-.343 3.9a85.767 85.767 0 0 0-.027 1.792C-.001 17.16 0 17.869 0 18.578v22.235c0 .71 0 1.418.004 2.128.004.597.01 1.194.027 1.791.035 1.302.112 2.615.343 3.901.235 1.307.618 2.523 1.222 3.71a12.457 12.457 0 0 0 5.453 5.453c1.186.603 2.401.986 3.707 1.22 1.287.232 2.6.31 3.902.344.597.016 1.195.023 1.793.027.709.005 1.417.004 2.127.004h22.235c.709 0 1.418 0 2.128-.004.597-.004 1.194-.011 1.792-.027 1.302-.035 2.614-.112 3.902-.343 1.306-.235 2.521-.618 3.707-1.222a12.461 12.461 0 0 0 5.453-5.452c.604-1.187.987-2.403 1.222-3.71.231-1.286.308-2.6.343-3.9.016-.598.023-1.194.027-1.792.004-.71.004-1.419.004-2.129V18.578c0-.71 0-1.419-.004-2.128z"/><path fill="#FFF" d="m47.06 36.66-.004-.004c.066-.224.134-.446.191-.675 2.465-9.821-3.55-21.432-13.731-27.546 4.461 6.048 6.434 13.374 4.681 19.78-.156.571-.344 1.12-.552 1.653-.225-.148-.51-.316-.89-.527 0 0-10.127-6.252-21.103-17.312-.288-.29 5.852 8.777 12.822 16.14-3.284-1.843-12.434-8.5-18.227-13.802.712 1.187 1.558 2.33 2.489 3.43C17.573 23.932 23.882 31.5 31.44 37.314c-5.31 3.25-12.814 3.502-20.285.003a30.646 30.646 0 0 1-5.193-3.098c3.162 5.058 8.033 9.423 13.96 11.97 7.07 3.039 14.1 2.833 19.336.05l-.004.007c.024-.016.055-.032.08-.047.214-.116.428-.234.636-.358 2.516-1.306 7.485-2.63 10.152 2.559.654 1.27 2.041-5.46-3.061-11.74z"/><path id="logotype" d="M81.93 38.542c.465 4.12 4.394 6.822 9.852 6.822 5.185 0 8.924-2.701 8.924-6.44 0-3.22-2.265-5.185-7.478-6.495l-5.048-1.282c-7.26-1.801-10.534-5.077-10.534-10.48 0-6.658 5.813-11.27 14.082-11.27 8.022 0 13.726 4.639 13.917 11.325h-5.32c-.41-4.093-3.74-6.604-8.734-6.604-4.94 0-8.378 2.538-8.378 6.249 0 2.892 2.13 4.612 7.369 5.95l4.202 1.09c8.133 1.993 11.462 5.159 11.462 10.863 0 7.259-5.759 11.816-14.928 11.816-8.514 0-14.327-4.53-14.763-11.543h5.376zM140.049 49.43h-5.35l-6.249-21.776h-.109L122.12 49.43h-5.348l-7.914-28.518h5.184l5.513 22.896h.11l6.221-22.896h5.021l6.277 22.896h.11l5.512-22.896h5.13L140.05 49.43zM151.39 13.244c0-1.718 1.419-3.11 3.138-3.11 1.746 0 3.165 1.392 3.165 3.11 0 1.72-1.419 3.139-3.165 3.139a3.157 3.157 0 0 1-3.139-3.139zm.545 7.669h5.213V49.43h-5.213V20.913zM191.186 25.116v-4.204h-5.513v-6.821h-5.185v6.821h-9.964v-2.51c.027-2.538 1.01-3.603 3.357-3.603.764 0 1.528.083 2.156.192v-4.094a18.193 18.193 0 0 0-2.756-.218c-5.568 0-7.915 2.32-7.915 7.642v2.591h-3.983v4.204h3.983V49.43h5.185V25.116H180.488v16.838c0 5.512 2.101 7.64 7.559 7.64 1.174 0 2.51-.082 3.111-.218v-4.257c-.355.055-1.392.137-1.965.137-2.428 0-3.52-1.147-3.52-3.712V25.116h5.513z"/></svg> </a>
      </h1>
  
      <!-- desktop-navigation -->
      <nav class="desktop-navigation" role="navigation">
        <ul class="navigation-items">
  
  <li class="nav-item ">
    <a href="/documentation/" data-text="Docs"><span>Docs</span></a>
  </li>
  
  <li class="nav-item ">
    <a href="/community/" data-text="Community"><span>Community</span></a>
  </li>
  
  <li class="nav-item ">
    <a href="/packages/" data-text="Packages"><span>Packages</span></a>
  </li>
  
  <li class="nav-item ">
    <a href="/blog/" data-text="Blog"><span>Blog</span></a>
  </li>
  
  <li class="border">
    <span />
  </li>
  <li class="nav-item ">
    <a href="/install" data-text="Install"><span>Install <span>(6.3.2)</span></span></a>
  </li>
</ul>
      </nav>
  
      <!-- toggle -->
      <button
        id="menu-toggle"
        class="menu-item menu-toggle open"
        aria-expanded="false"
        aria-label="Toggle Navigation Menu"
      />
    </div>
  
    <!-- mobile-navigation -->
    <nav class="mobile-navigation" role="navigation">
        <ul class="navigation-items">
  
  <li class="nav-item ">
    <a href="/documentation/" data-text="Docs"><span>Docs</span></a>
  </li>
  
  <li class="nav-item ">
    <a href="/community/" data-text="Community"><span>Community</span></a>
  </li>
  
  <li class="nav-item ">
    <a href="/packages/" data-text="Packages"><span>Packages</span></a>
  </li>
  
  <li class="nav-item ">
    <a href="/blog/" data-text="Blog"><span>Blog</span></a>
  </li>
  
  <li class="border">
    <span />
  </li>
  <li class="nav-item ">
    <a href="/install" data-text="Install"><span>Install <span>(6.3.2)</span></span></a>
  </li>
</ul>
    </nav>
  </header>
  
<main role="main">
  <article class="page">
  
    
      <header>
        <h1>API Design Guidelines</h1>
      </header>
    
  

  <!--  -->
<style>
article pre {
    overflow: visible;
}
</style>

<!--  -->

<div class="info screenonly">
  <p>To facilitate use as a quick reference, the details of many guidelines
can be expanded individually. Details are never hidden when this page
is printed.
<input type="button" id="toggle" value="Expand all details now" onclick="show_or_hide_all()" /></p>
</div>

<h2 class="header-with-anchor" id="table-of-contents">Table of Contents <a title="Permalink for Table of Contents section" href="#table-of-contents">
            <?xml version="1.0" encoding="utf-8"?> <svg width="18px" height="18px" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="m 11.58824,9.823529 q 0,-0.294117 -0.20589,-0.499999 L 9.85294,7.794118 q -0.20588,-0.205883 -0.5,-0.205883 -0.30882,0 -0.52941,0.235295 0.0221,0.02206 0.13971,0.136029 0.11764,0.113971 0.15808,0.158088 0.0404,0.04412 0.1103,0.139706 0.0698,0.09559 0.0956,0.1875 0.0257,0.09191 0.0257,0.202206 0,0.294117 -0.20588,0.5 -0.20588,0.205882 -0.5,0.205882 -0.1103,0 -0.20221,-0.02573 Q 8.35293,9.301471 8.25733,9.231621 8.16173,9.161771 8.11763,9.121327 8.07353,9.080887 7.95954,8.963238 7.84557,8.845591 7.82351,8.823533 7.58086,9.051474 7.58086,9.360297 q 0,0.294118 0.20588,0.5 l 1.51471,1.522059 q 0.19853,0.19853 0.5,0.19853 0.29412,0 0.5,-0.191177 l 1.08088,-1.073529 q 0.20589,-0.205883 0.20589,-0.492648 z M 6.41912,4.639706 q 0,-0.294118 -0.20588,-0.5 L 4.69853,2.617647 q -0.20588,-0.205882 -0.5,-0.205882 -0.28677,0 -0.5,0.198529 L 2.61765,3.683823 q -0.20589,0.205883 -0.20589,0.492648 0,0.294117 0.20589,0.499999 l 1.52941,1.529412 q 0.19853,0.19853 0.5,0.19853 0.30882,0 0.52941,-0.227942 Q 5.15437,6.15441 5.03676,6.040441 4.91912,5.92647 4.87868,5.882353 4.83828,5.838233 4.76838,5.742647 q -0.0698,-0.09559 -0.0956,-0.1875 -0.0257,-0.09191 -0.0257,-0.202206 0,-0.294117 0.20588,-0.5 0.20588,-0.205882 0.5,-0.205882 0.1103,0 0.20221,0.02573 0.0919,0.02573 0.1875,0.09559 0.0956,0.06985 0.1397,0.110294 0.0441,0.04044 0.15809,0.158089 Q 6.15443,5.154409 6.17649,5.176467 6.41914,4.948526 6.41914,4.639703 z M 13,9.823529 q 0,0.882353 -0.625,1.492647 l -1.08088,1.07353 Q 10.68382,13 9.80147,13 q -0.88971,0 -1.5,-0.625 L 6.78676,10.852941 Q 6.17647,10.242647 6.17647,9.360294 q 0,-0.904412 0.64706,-1.536764 L 6.17647,7.176471 Q 5.54412,7.82353 4.64706,7.82353 q -0.88235,0 -1.5,-0.617648 L 1.617647,5.676471 Q 1,5.058824 1,4.176471 1,3.294118 1.625,2.683824 L 2.70588,1.610294 Q 3.31618,1 4.19853,1 q 0.88971,0 1.5,0.625 l 1.51471,1.522059 q 0.61029,0.610294 0.61029,1.492647 0,0.904412 -0.64706,1.536764 L 7.82353,6.823529 Q 8.45588,6.17647 9.35294,6.17647 q 0.88235,0 1.5,0.617648 l 1.52941,1.529411 Q 13,8.941176 13,9.823529 z"/></svg>
          </a></h2>

<ul id="markdown-toc">
  <li><a href="#introduction" id="markdown-toc-introduction">Introduction</a></li>
  <li><a href="#fundamentals" id="markdown-toc-fundamentals">Fundamentals</a></li>
  <li><a href="#naming" id="markdown-toc-naming">Naming</a>    <ul>
      <li><a href="#promote-clear-usage" id="markdown-toc-promote-clear-usage">Promote Clear Usage</a></li>
      <li><a href="#strive-for-fluent-usage" id="markdown-toc-strive-for-fluent-usage">Strive for Fluent Usage</a></li>
      <li><a href="#use-terminology-well" id="markdown-toc-use-terminology-well">Use Terminology Well</a></li>
    </ul>
  </li>
  <li><a href="#conventions" id="markdown-toc-conventions">Conventions</a>    <ul>
      <li><a href="#general-conventions" id="markdown-toc-general-conventions">General Conventions</a></li>
      <li><a href="#parameter-names" id="markdown-toc-parameter-names">Parameters</a></li>
      <li><a href="#argument-labels" id="markdown-toc-argument-labels">Argument Labels</a></li>
    </ul>
  </li>
  <li><a href="#special-instructions" id="markdown-toc-special-instructions">Special Instructions</a></li>
</ul>

<h2 id="introduction" class="header-with-anchor">Introduction <a title="Permalink for Introduction section" href="#introduction">
            <?xml version="1.0" encoding="utf-8"?> <svg width="18px" height="18px" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="m 11.58824,9.823529 q 0,-0.294117 -0.20589,-0.499999 L 9.85294,7.794118 q -0.20588,-0.205883 -0.5,-0.205883 -0.30882,0 -0.52941,0.235295 0.0221,0.02206 0.13971,0.136029 0.11764,0.113971 0.15808,0.158088 0.0404,0.04412 0.1103,0.139706 0.0698,0.09559 0.0956,0.1875 0.0257,0.09191 0.0257,0.202206 0,0.294117 -0.20588,0.5 -0.20588,0.205882 -0.5,0.205882 -0.1103,0 -0.20221,-0.02573 Q 8.35293,9.301471 8.25733,9.231621 8.16173,9.161771 8.11763,9.121327 8.07353,9.080887 7.95954,8.963238 7.84557,8.845591 7.82351,8.823533 7.58086,9.051474 7.58086,9.360297 q 0,0.294118 0.20588,0.5 l 1.51471,1.522059 q 0.19853,0.19853 0.5,0.19853 0.29412,0 0.5,-0.191177 l 1.08088,-1.073529 q 0.20589,-0.205883 0.20589,-0.492648 z M 6.41912,4.639706 q 0,-0.294118 -0.20588,-0.5 L 4.69853,2.617647 q -0.20588,-0.205882 -0.5,-0.205882 -0.28677,0 -0.5,0.198529 L 2.61765,3.683823 q -0.20589,0.205883 -0.20589,0.492648 0,0.294117 0.20589,0.499999 l 1.52941,1.529412 q 0.19853,0.19853 0.5,0.19853 0.30882,0 0.52941,-0.227942 Q 5.15437,6.15441 5.03676,6.040441 4.91912,5.92647 4.87868,5.882353 4.83828,5.838233 4.76838,5.742647 q -0.0698,-0.09559 -0.0956,-0.1875 -0.0257,-0.09191 -0.0257,-0.202206 0,-0.294117 0.20588,-0.5 0.20588,-0.205882 0.5,-0.205882 0.1103,0 0.20221,0.02573 0.0919,0.02573 0.1875,0.09559 0.0956,0.06985 0.1397,0.110294 0.0441,0.04044 0.15809,0.158089 Q 6.15443,5.154409 6.17649,5.176467 6.41914,4.948526 6.41914,4.639703 z M 13,9.823529 q 0,0.882353 -0.625,1.492647 l -1.08088,1.07353 Q 10.68382,13 9.80147,13 q -0.88971,0 -1.5,-0.625 L 6.78676,10.852941 Q 6.17647,10.242647 6.17647,9.360294 q 0,-0.904412 0.64706,-1.536764 L 6.17647,7.176471 Q 5.54412,7.82353 4.64706,7.82353 q -0.88235,0 -1.5,-0.617648 L 1.617647,5.676471 Q 1,5.058824 1,4.176471 1,3.294118 1.625,2.683824 L 2.70588,1.610294 Q 3.31618,1 4.19853,1 q 0.88971,0 1.5,0.625 l 1.51471,1.522059 q 0.61029,0.610294 0.61029,1.492647 0,0.904412 -0.64706,1.536764 L 7.82353,6.823529 Q 8.45588,6.17647 9.35294,6.17647 q 0.88235,0 1.5,0.617648 l 1.52941,1.529411 Q 13,8.941176 13,9.823529 z"/></svg>
          </a></h2>

<p>Delivering a clear, consistent developer experience when writing Swift code is largely defined by the names and idioms that appear in APIs.
These design guidelines explain how to make sure that your code feels like a part of the larger Swift ecosystem.</p>

<h2 id="fundamentals" class="header-with-anchor">Fundamentals <a title="Permalink for Fundamentals section" href="#fundamentals">
            <?xml version="1.0" encoding="utf-8"?> <svg width="18px" height="18px" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="m 11.58824,9.823529 q 0,-0.294117 -0.20589,-0.499999 L 9.85294,7.794118 q -0.20588,-0.205883 -0.5,-0.205883 -0.30882,0 -0.52941,0.235295 0.0221,0.02206 0.13971,0.136029 0.11764,0.113971 0.15808,0.158088 0.0404,0.04412 0.1103,0.139706 0.0698,0.09559 0.0956,0.1875 0.0257,0.09191 0.0257,0.202206 0,0.294117 -0.20588,0.5 -0.20588,0.205882 -0.5,0.205882 -0.1103,0 -0.20221,-0.02573 Q 8.35293,9.301471 8.25733,9.231621 8.16173,9.161771 8.11763,9.121327 8.07353,9.080887 7.95954,8.963238 7.84557,8.845591 7.82351,8.823533 7.58086,9.051474 7.58086,9.360297 q 0,0.294118 0.20588,0.5 l 1.51471,1.522059 q 0.19853,0.19853 0.5,0.19853 0.29412,0 0.5,-0.191177 l 1.08088,-1.073529 q 0.20589,-0.205883 0.20589,-0.492648 z M 6.41912,4.639706 q 0,-0.294118 -0.20588,-0.5 L 4.69853,2.617647 q -0.20588,-0.205882 -0.5,-0.205882 -0.28677,0 -0.5,0.198529 L 2.61765,3.683823 q -0.20589,0.205883 -0.20589,0.492648 0,0.294117 0.20589,0.499999 l 1.52941,1.529412 q 0.19853,0.19853 0.5,0.19853 0.30882,0 0.52941,-0.227942 Q 5.15437,6.15441 5.03676,6.040441 4.91912,5.92647 4.87868,5.882353 4.83828,5.838233 4.76838,5.742647 q -0.0698,-0.09559 -0.0956,-0.1875 -0.0257,-0.09191 -0.0257,-0.202206 0,-0.294117 0.20588,-0.5 0.20588,-0.205882 0.5,-0.205882 0.1103,0 0.20221,0.02573 0.0919,0.02573 0.1875,0.09559 0.0956,0.06985 0.1397,0.110294 0.0441,0.04044 0.15809,0.158089 Q 6.15443,5.154409 6.17649,5.176467 6.41914,4.948526 6.41914,4.639703 z M 13,9.823529 q 0,0.882353 -0.625,1.492647 l -1.08088,1.07353 Q 10.68382,13 9.80147,13 q -0.88971,0 -1.5,-0.625 L 6.78676,10.852941 Q 6.17647,10.242647 6.17647,9.360294 q 0,-0.904412 0.64706,-1.536764 L 6.17647,7.176471 Q 5.54412,7.82353 4.64706,7.82353 q -0.88235,0 -1.5,-0.617648 L 1.617647,5.676471 Q 1,5.058824 1,4.176471 1,3.294118 1.625,2.683824 L 2.70588,1.610294 Q 3.31618,1 4.19853,1 q 0.88971,0 1.5,0.625 l 1.51471,1.522059 q 0.61029,0.610294 0.61029,1.492647 0,0.904412 -0.64706,1.536764 L 7.82353,6.823529 Q 8.45588,6.17647 9.35294,6.17647 q 0.88235,0 1.5,0.617648 l 1.52941,1.529411 Q 13,8.941176 13,9.823529 z"/></svg>
          </a></h2>

<ul>
  <li>
    <p id="clarity-at-the-point-of-use"><strong>Clarity at the point of use</strong> is your most important goal.
Entities such as methods and properties are declared only once but
<em>used</em> repeatedly.  Design APIs to make those uses clear and
concise.  When evaluating a design, reading a declaration is seldom
sufficient; always examine a use case to make sure it looks
clear in context.</p>
  </li>
  <li>
    <p id="clarity-over-brevity"><strong>Clarity is more important than brevity.</strong>  Although Swift
code can be compact, it is a <em>non-goal</em>
to enable the smallest possible code with the fewest characters.
Brevity in Swift code, where it occurs, is a side-effect of the
strong type system and features that naturally reduce boilerplate.</p>
  </li>
  <li>
    <p id="write-doc-comment"><strong>Write a documentation comment</strong>
for every declaration. Insights gained by writing documentation can
have a profound impact on your design, so don’t put it off.</p>

    <div class="warning">
      <p>If you are having trouble describing your API’s
functionality in simple terms, <strong>you may have designed the wrong API.</strong></p>
    </div>

<input type="checkbox" class="detail">
    <div class="more">

      <ul>
        <li>
          <p><strong>Use Swift’s <a href="https://developer.apple.com/library/prerelease/mac/documentation/Xcode/Reference/xcode_markup_formatting_ref/">dialect of Markdown</a>.</strong></p>
        </li>
        <li>
          <p><strong>Begin with a summary</strong> that describes the entity being declared.
Often, an API can be completely understood from its declaration and
its summary.</p>

          <div class="language-swift highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c1">/// **Returns a "view" of `self` containing the same elements in**</span>
<span class="c1">/// **reverse order.**</span>
<span class="kd">func</span> <span class="nf">reversed</span><span class="p">()</span> <span class="o">-&gt;</span> <span class="kt">ReverseCollection</span><span class="o">&lt;</span><span class="k">Self</span><span class="o">&gt;</span>
</code></pre></div>          </div>

<input type="checkbox" class="detail">
          <div class="more">

            <ul>
              <li>
                <p><strong>Focus on the summary</strong>; it’s the most important part. Many
excellent documentation comments consist of nothing more than a
great summary.</p>
              </li>
              <li>
                <p><strong>Use a single sentence fragment</strong> if possible, ending with a
period.  Do not use a complete sentence.</p>
              </li>
              <li>
                <p><strong>Describe what a function or method <em>does</em> and what it
<em>returns</em></strong>, omitting null effects and <code class="language-plaintext highlighter-rouge">Void</code> returns:</p>

                <div class="language-swift highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c1">/// **Inserts** `newHead` at the beginning of `self`.</span>
<span class="k">mutating</span> <span class="kd">func</span> <span class="nf">prepend</span><span class="p">(</span><span class="n">_</span> <span class="nv">newHead</span><span class="p">:</span> <span class="kt">Int</span><span class="p">)</span>

<span class="c1">/// **Returns** a `List` containing `head` followed by the elements</span>
<span class="c1">/// of `self`.</span>
<span class="kd">func</span> <span class="nf">prepending</span><span class="p">(</span><span class="n">_</span> <span class="nv">head</span><span class="p">:</span> <span class="kt">Element</span><span class="p">)</span> <span class="o">-&gt;</span> <span class="kt">List</span>

<span class="c1">/// **Removes and returns** the first element of `self` if non-empty;</span>
<span class="c1">/// returns `nil` otherwise.</span>
<span class="k">mutating</span> <span class="kd">func</span> <span class="nf">popFirst</span><span class="p">()</span> <span class="o">-&gt;</span> <span class="kt">Element</span><span class="p">?</span>
</code></pre></div>                </div>

                <p>Note: in rare cases like <code class="language-plaintext highlighter-rouge">popFirst</code> above, the summary is formed
of multiple sentence fragments separated by semicolons.</p>
              </li>
              <li>
                <p><strong>Describe what a subscript <em>accesses</em></strong>:</p>

                <div class="language-swift highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c1">/// **Accesses** the `index`th element.</span>
<span class="nf">subscript</span><span class="p">(</span><span class="nv">index</span><span class="p">:</span> <span class="kt">Int</span><span class="p">)</span> <span class="o">-&gt;</span> <span class="kt">Element</span> <span class="p">{</span> <span class="k">get</span> <span class="k">set</span> <span class="p">}</span>
</code></pre></div>                </div>
              </li>
              <li>
                <p><strong>Describe what an initializer <em>creates</em></strong>:</p>

                <div class="language-swift highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c1">/// **Creates** an instance containing `n` repetitions of `x`.</span>
<span class="nf">init</span><span class="p">(</span><span class="n">count</span> <span class="nv">n</span><span class="p">:</span> <span class="kt">Int</span><span class="p">,</span> <span class="n">repeatedElement</span> <span class="nv">x</span><span class="p">:</span> <span class="kt">Element</span><span class="p">)</span>
</code></pre></div>                </div>
              </li>
              <li>
                <p>For all other declarations, <strong>describe what the declared entity <em>is</em></strong>.</p>

                <div class="language-swift highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c1">/// **A collection that** supports equally efficient insertion/removal</span>
<span class="c1">/// at any position.</span>
<span class="kd">struct</span> <span class="kt">List</span> <span class="p">{</span>

  <span class="c1">/// **The element at the beginning** of `self`, or `nil` if self is</span>
  <span class="c1">/// empty.</span>
  <span class="k">var</span> <span class="nv">first</span><span class="p">:</span> <span class="kt">Element</span><span class="p">?</span>
  <span class="o">...</span>
</code></pre></div>                </div>
              </li>
            </ul>

          </div>
        </li>
        <li>
          <p><strong>Optionally, continue</strong> with one or more paragraphs and bullet
items.  Paragraphs are separated by blank lines and use complete
sentences.</p>

          <div class="language-swift highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c1">/// Writes the textual representation of each    &lt;span class="graphic"&gt;←&lt;/span&gt;&lt;span class="commentary"&gt; Summary&lt;/span&gt;</span>
<span class="c1">/// element of `items` to the standard output.</span>
<span class="c1">///                                              &lt;span class="graphic"&gt;←&lt;/span&gt;&lt;span class="commentary"&gt; Blank line&lt;/span&gt;</span>
<span class="c1">/// The textual representation for each item `x` &lt;span class="graphic"&gt;←&lt;/span&gt;&lt;span class="commentary"&gt; Additional discussion&lt;/span&gt;</span>
<span class="c1">/// is generated by the expression `String(x)`.</span>
<span class="c1">///</span>
<span class="c1">/// - **Parameter separator**: text to be printed    &lt;span class="graphic"&gt;⎫&lt;/span&gt;</span>
<span class="c1">///   between items.                             &lt;span class="graphic"&gt;⎟&lt;/span&gt;</span>
<span class="c1">/// - **Parameter terminator**: text to be printed   &lt;span class="graphic"&gt;⎬&lt;/span&gt;&lt;span class="commentary"&gt; &lt;a href="https://developer.apple.com/library/prerelease/mac/documentation/Xcode/Reference/xcode_markup_formatting_ref/SymbolDocumentation.html#//apple_ref/doc/uid/TP40016497-CH51-SW14"&gt;Parameters section&lt;/a&gt;&lt;/span&gt;</span>
<span class="c1">///   at the end.                                &lt;span class="graphic"&gt;⎟&lt;/span&gt;</span>
<span class="c1">///                                              &lt;span class="graphic"&gt;⎭&lt;/span&gt;</span>
<span class="c1">/// - **Note**: To print without a trailing          &lt;span class="graphic"&gt;⎫&lt;/span&gt;</span>
<span class="c1">///   newline, pass `terminator: ""`             &lt;span class="graphic"&gt;⎟&lt;/span&gt;</span>
<span class="c1">///                                              &lt;span class="graphic"&gt;⎬&lt;/span&gt;&lt;span class="commentary"&gt; &lt;a href="https://developer.apple.com/library/prerelease/mac/documentation/Xcode/Reference/xcode_markup_formatting_ref/SymbolDocumentation.html#//apple_ref/doc/uid/TP40016497-CH51-SW13"&gt;Symbol commands&lt;/a&gt;&lt;/span&gt;</span>
<span class="c1">/// - **SeeAlso**: `CustomDebugStringConvertible`,   &lt;span class="graphic"&gt;⎟&lt;/span&gt;</span>
<span class="c1">///   `CustomStringConvertible`, `debugPrint`.   &lt;span class="graphic"&gt;⎭&lt;/span&gt;</span>
<span class="kd">public</span> <span class="kd">func</span> <span class="n">print</span><span class="o">&lt;</span><span class="kt">Target</span><span class="p">:</span> <span class="kt">OutputStreamType</span><span class="o">&gt;</span><span class="p">(</span>
  <span class="n">_</span> <span class="nv">items</span><span class="p">:</span> <span class="kt">Any</span><span class="o">...</span><span class="p">,</span> <span class="nv">separator</span><span class="p">:</span> <span class="kt">String</span> <span class="o">=</span> <span class="s">" "</span><span class="p">,</span> <span class="nv">terminator</span><span class="p">:</span> <span class="kt">String</span> <span class="o">=</span> <span class="s">"</span><span class="se">\n</span><span class="s">"</span><span class="p">)</span>
</code></pre></div>          </div>

<input type="checkbox" class="detail">
          <div class="more">

            <ul>
              <li>
                <p><strong>Use recognized
<a href="https://developer.apple.com/library/prerelease/mac/documentation/Xcode/Reference/xcode_markup_formatting_ref/SymbolDocumentation.html#//apple_ref/doc/uid/TP40016497-CH51-SW1">symbol documentation markup</a>
elements</strong> to add information beyond the summary, whenever
appropriate.</p>
              </li>
              <li>
                <p><strong>Know and use recognized bullet items with
<a href="https://developer.apple.com/library/prerelease/mac/documentation/Xcode/Reference/xcode_markup_formatting_ref/SymbolDocumentation.html#//apple_ref/doc/uid/TP40016497-CH51-SW13">symbol command syntax</a>.</strong> Popular development
tools such as Xcode give special treatment to bullet items that
start with the following keywords:</p>

                <table>
                  <tbody>
                    <tr>
                      <td><a href="https://developer.apple.com/library/prerelease/mac/documentation/Xcode/Reference/xcode_markup_formatting_ref/Attention.html">Attention</a></td>
                      <td><a href="https://developer.apple.com/library/prerelease/mac/documentation/Xcode/Reference/xcode_markup_formatting_ref/Author.html">Author</a></td>
                      <td><a href="https://developer.apple.com/library/prerelease/mac/documentation/Xcode/Reference/xcode_markup_formatting_ref/Authors.html">Authors</a></td>
                      <td><a href="https://developer.apple.com/library/prerelease/mac/documentation/Xcode/Reference/xcode_markup_formatting_ref/Bug.html">Bug</a></td>
                    </tr>
                    <tr>
                      <td><a href="https://developer.apple.com/library/prerelease/mac/documentation/Xcode/Reference/xcode_markup_formatting_ref/Complexity.html">Complexity</a></td>
                      <td><a href="https://developer.appl

