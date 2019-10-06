'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
  const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
    console.log(links)
    
const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event)

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active')
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active')
    }
    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    //console.log('clickedElement (with plus): ' + clickedElement);
    this.classList.add('active')
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active')
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active')
    }
    /* get 'href' attribute from the clicked link */
    let articleSelector = this.getAttribute('href')
    console.log(articleSelector)
    /* find the correct article using the selector (value of 'href' attribute) */
    let correctArticle = document.querySelector(articleSelector)
    console.log(correctArticle)
    /* add class 'active' to the correct article */
    correctArticle.classList.add('active')
}




/*const articleId = document.getElementById('.posts article.id')
  const articleTitle = document.querySelector('.posts article.post-title')
  
<li><a href="articleID"><span>articleTitle</span></a></li> = document.getElementById('.posts article.id')
*/
const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks() {

    /* remove contents of titleList */
    let titleList = document.querySelector(optTitleListSelector)
    clearTitles()

    function clearTitles() {
        titleList.innerHTML = ""
    }
    /* find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector)
    let html = '';

    for (let article of articles) {
        article.querySelector(optTitleSelector)
    const articleId = article.getAttribute("id")
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML

    /* get the title from the title element */
    
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML)
    /* insert link into titleList */
    html = html + linkHTML;
    /*console.log("Articles:", articles)
    console.log('ArticleId:', articleId)
    console.log('ArticleTitle:', articleTitle)
    Konsole dla sparwdzania błędów*/
}
titleList.insertAdjacentHTML('beforebegin',html) //innerHTML) = html;
console.log(links)
}

generateTitleLinks();