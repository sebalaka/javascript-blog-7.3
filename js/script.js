'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//   const links = document.querySelectorAll('.titles a');
//   console.log('links:', links);
// });

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  // console.log('Link was clicked!');
  // console.log(event);
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }


  /* [DONE] add class 'active' to the clicked link */
  // const addActiveLink = document.querySelectorAll('.titles a');
  // addActiveLink.classList.add('active')
  // for (let addActive of addActiveLink) {
  //   addActive.classList.add('active');
  // }
  clickedElement.classList.add('active');
  // console.log('clickedElement:', clickedElement);
  // console.log('clickedElement (with plus): ' + clickedElement);
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const hrefAttribute = clickedElement.getAttribute('href');
  // console.log(hrefAttribute);
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const correctArticle = document.querySelector(hrefAttribute);
  // console.log(correctArticle);
  /* [DONE] add class 'active' to the correct article */
  correctArticle.classList.add('active');
}




const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors .list';



function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  let html = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    // console.log(articleId);
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // console.log(linkHTML);
    /* create HTML of the link */
    // titleList.innerHTML = titleList.innerHTML + linkHTML;
    titleList.insertAdjacentHTML('afterbegin', linkHTML);
    /* insert link into titleList */

    html = html + linkHTML;
  }


  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();


function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };
  console.log(params);

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    // wartość minimalna l tagow
    params.min = Math.min(tags[tag], params.min);

    console.log(tag + ' is used ' + tags[tag] + ' times');
  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  // classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);
  return classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    /* END LOOP: for every article: */


  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  // console.log(allTags);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    // allTagsHTML += '<li><a href="#' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a></li>';
    // allTagsHTML += '<li><a class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + " " + 'href="#' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a></li>';
    // const tagLinkHTML = '<li><a href="#' + tag + " " + 'class=" calculateTagClass(allTags[tag], tagsParams)"' + '">' + tag + ' (' + allTags[tag] + ')' + '</a></li>';
    // console.log('tagLinkHTML:', tagLinkHTML);
    // console.log('allTagsHtml:', allTagsHTML);
    // allTagsHTML += tagLinkHTML;
    const tagLinkHTML = '<li><a class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  console.log(allTagsHTML);

  console.log(calculateTagClass);
}

generateTags();



function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  // const href = clickedElement(href);
  const href = clickedElement.getAttribute('href');
  // const href = document.querySelectorAll('.titles a.active');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeLinks);

  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {
    /* remove class active */
    activeLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const correctTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log(correctTags);
  /* START LOOP: for each found tag link */
  for (let correctTag of correctTags) {
    /* add class active */
    correctTag.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log(tagLinks);
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();


function calculateAuthorsParams(authors) {
  const params = {
    max: 0,
    min: 999999
  };
  for (let author in authors) {
    if (authors[author] > params.max) {
      params.max = authors[author];
    }
    if (authors[author] < params.mix) {
      params.min = authors[author];
    }
  }
  return params;
}

function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  const classValue = optCloudClassPrefix + classNumber;
  return classValue;
}

function generateAuthors() {
  /* find all articles */
  let allAuthors = {};
  const authors = document.querySelectorAll(optArticleSelector);
  // let html = '';

  /* START LOOP: for every article: */
  for (let author of authors) {
    /* find tags wrapper */
    const authorWrapper = author.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const authorTags = author.getAttribute('data-author');
    // console.log(articleTags);
    /* split tags into array */
    // console.log(articleTagsArray);
    /* START LOOP: for each tag */
    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + authorTags + '">' + authorTags + '</a></li>';
    console.log(linkHTML);
    /* add generated code to html variable */

    html = html + linkHTML;
    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    // authorWrapper.innerHTML = html;
    authorWrapper.insertAdjacentHTML('afterend', linkHTML);
    if(!allAuthors[author]) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    const authorList = document.querySelector('.authors');
    const authorsParams = calculateAuthorsParams(allAuthors);
    let allAuthorsHTML = '';
    
    for (let author in allAuthors) {
      // const authorLinkHTML = '<li><a href="#tag-' + author + '">' + author + ' ' + '(' + calculateAuthorClass(allAuthors[author], authorsParams) + ')' + '</a></li>' + ' '; 
      const authorLinkHTML = '<li><a class="' + calculateAuthorClass(allAuthors[author], authorsParams) + '" href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
      // const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ') </a></li>'
      console.log(authorLinkHTML);
      allAuthorsHTML += authorLinkHTML;
    }
    authorList.innerHTML = allAuthorsHTML;
    /* END LOOP: for every article: */
  }

}

generateAuthors();

function addClickListenersToAuthors (event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  console.log(href);
  const tag = href.replace('#author-', '');
  console.log(tag);
  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  const correctTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log(correctTags);
  for (let correctTag of correctTags) {
    correctTag.classList.add('active');
  }

  generateTitleLinks('[data-author~="' + tag + '"]');
}

function authorClickHandler () {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  console.log(authorLinks);
  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', addClickListenersToAuthors);
    /* END LOOP: for each link */
  }
}

authorClickHandler();