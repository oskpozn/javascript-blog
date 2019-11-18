'use strict';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');
  //console.log(event);
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  this.classList.add('active');
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  let articleSelector = this.getAttribute('href');
  console.log(articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */
  let correctArticle = document.querySelector(articleSelector);
  console.log(correctArticle);
  /* add class 'active' to the correct article */
  correctArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optArticleAuthorList = '.list.authors',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = ''){
  /* remove contents of titleList */
  let titleList = document.querySelector(optTitleListSelector);
  clearTitles();
  function clearTitles() {
    titleList.innerHTML = '';
  }
  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + ' </span></a></li>';
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.insertAdjacentHTML('afterbegin', html);
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
  console.log(links);
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {max: 0, min: 999999};
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const classNumber = Math.floor((count-params.min)/(params.max)*optCloudClassCount+1.99);
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    let tagList = article.querySelector(optArticleTagsSelector);
    //console.log('tagList: '+tagList);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    //console.log('Article:'+article);
    let articleTags = article.getAttribute('data-tags');
    //console.log('Article Tags:'+articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href=#'+tag+'>'+tag+'</a></li> ';
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagList.insertAdjacentHTML('afterbegin', html);
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a href ="#'+ tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"> ' + tag + /*'(' + allTags[tag] + )*/'</a></li>';
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  console.log(allTagsHTML);
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(event);
  console.log('clickedElement:', clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href in tagClickHandler: ', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#', '');
  //console.log('Clicked tag: '+tag);
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('.list.tags a.active');
  console.log('activeTags: ', activeTags);
  // const tagLinks = tag.classList.includes('active'); |źle
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagLinks: ', tagLinks);
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  //console.log('generatetitlelinks: ',generateTitleLinks('[data-tags~="' + tag + '"]'));
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.list.tags a, .list-tags');
  //const tagLinks = document.querySelectorAll('tags')
  console.log('tagLinks of addClickListenersToTags: ', tagLinks);
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleAuthorSelector);
  let html ='';
  let allAuthors = {};
  for (let article of articles) {
    let articleAuthor = article.innerHTML.split(' ')[1] + ' '+ article.innerHTML.split(' ')[2]; //powinno dać 'by *author*'
    let author = article.innerHTML.split(' ')[1].toLowerCase()+'-'+article.innerHTML.split(' ')[2].toLowerCase();
    //console.log('articleAuthor: ', articleAuthor);
    if (allAuthors[articleAuthor]) {
      //console.log('ten author juz istnieje');
    } else {
      //console.log('dodajemy authora');
      const linkHTML = '<li><a href="#"><span class="author-name" author="'+author+'">'+articleAuthor+'</span></a></li>';
      html = html + linkHTML;
      allAuthors[articleAuthor] = 1;
    }
  }
  const authorList = document.querySelector(optArticleAuthorList);
  console.log('html: ', authorList);
  authorList.insertAdjacentHTML('afterbegin', html);


  const links = document.querySelectorAll('.list.authors a');
  console.log('links from generateauthors: ', links);
  for (let link of links) {
    link.addEventListener('click',authorClickHandler);
  }
  //console.log('authorList: ', authorList)
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  //const href = clickedElement.querySelector('span').innerHTML;
  //const href = clickedElement.getAttribute('author');
  const href = clickedElement.querySelector('span').innerHTML.toLowerCase().split(' ')[0]+'-'+clickedElement.querySelector('span').innerHTML.toLowerCase().split(' ')[1];
  console.log('authorHref: ',href);
  const activeAuthors = document.querySelectorAll('.list.authors a.active');
  console.log('activeAuthors: ', activeAuthors);
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }
  const authorLinks = document.querySelectorAll('a[author="'+href+'"]');
  console.log('authorLinks: ', authorLinks);
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
    console.log('authorLink: ', authorLink);
  }
  generateTitleLinks('[author = "'+href+'"]');
}


