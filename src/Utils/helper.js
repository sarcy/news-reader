import axios from 'axios';
import Constants from './constants';

function getNewsSources () {
  let sourcesURL = Constants.NEWSAPI_URL + Constants.SLASH + Constants.NEWSAPI_VERSION 
    + Constants.SLASH + Constants.NEWSAPI_SOURCES + '?apiKey=' + Constants.NEWSAPI_KEY;
  return axios.get(sourcesURL);
}

function getNewsForSource (source) {
  let newsURL = Constants.NEWSAPI_URL + Constants.SLASH + Constants.NEWSAPI_VERSION
    + Constants.SLASH + Constants.NEWSAPI_ARTICLES + '?source=' + source + '&apiKey='
    + Constants.NEWSAPI_KEY;
  
  return axios.get(newsURL);
}

function normalizeValue (value) {

  // return the original value if it is not an integer.
  if (parseInt(value, 10) === undefined 
    || isNaN(parseInt(value, 10))) {

    return value;

  }

  if (value < 10) {
    return '0' + value;
  }

  return value;
}

let Helpers = {

  getNewsSources : function () {
    let newsSources = getNewsSources()
      .then(response => response.data.sources)
      .catch(error => error);

    return newsSources;
  },

  getNewsForSource : function (source) {
    let newsArticles = getNewsForSource (source)
      .then(response => response.data.articles )
      .catch(error => error);

    return newsArticles;
  },

  convertNewsArticlesList : function (articles) {
    let smallerList = [];

    if (articles === null || articles === undefined) return smallerList;

    for (let i = 0; i < articles.length/2; i++) {
      let a1 = articles[2*i];
      let a2 = articles[(2*i)+1];

      if (a2 !== undefined) {
        smallerList[i] = [a1,a2];
      } else {
        smallerList[i] = [a1];
      }
    }

    return smallerList;
  },

  convertPublishedDate : function (publishedDate) {
    let convertedDate = '';

    let pubDate = new Date(publishedDate);
    
    convertedDate = normalizeValue(pubDate.getDate())
                  + Constants.SPACE 
                  + Constants.MONTHS[pubDate.getMonth()]
                  + Constants.SPACE 
                  + pubDate.getFullYear() 
                  + Constants.SPACE 
                  + pubDate.toTimeString();

    return convertedDate;
  },

  checkForLocalStorage : function () {
    if (window.localStorage !== 'undefined') {
      return true;
    }

    return false;
  },

  setLastReadNewsSource : function (newsSource) {
    window.localStorage.setItem(Constants.STORAGE_NEWS_SOURCE, JSON.stringify(newsSource));
  },

  getLastReadNewsSource : function () {
    let newsSource = window.localStorage.getItem(Constants.STORAGE_NEWS_SOURCE);

    if (newsSource !== undefined && newsSource !== '') {
      return JSON.parse(newsSource);
    }

    return '';
  },

  getSourceName : function (newsSources, sourceKey) {

    if (newsSources === '' || newsSources === undefined || newsSources.length <= 0) {
      return '';
    } else {
      let sourceName = newsSources.filter((source) => {
        if (source.id === sourceKey) {
          return source;
        }
      });

      return sourceName[0].name;
    }
  }

}

export default Helpers;