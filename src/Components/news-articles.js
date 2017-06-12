import React from 'react';
import Helper from '../Utils/helper';

function NewsArticles (props) {

  let articleList = '';

  if (props.newsArticles.length !== 0) {

    articleList = props.newsArticles.map((articleRow, index) => {

      let smallerList = articleRow.map((article, index) => {

        let publishedDate = Helper.convertPublishedDate(article.publishedAt);

        return (
          <div className='large-6 medium-6 columns' key={ index }>
            <div className='callout primary'>
              <h6>
                <a href={ article.url } target='_blank' rel='noopener noreferrer'>
                  { article.title }
                </a>
              </h6>
              <p>{ article.description }</p>

              <div className='article-metadata'>
                <div className='metadata-wrapper'>
                  <small>Author: <b>{ article.author }</b></small><br />
                  <small>Published Date: <b>{ publishedDate }</b></small>
                </div>

                <div className='read-more-wrapper'>
                  <a className='button primary' href={ article.url } target='_blank' rel='noopener noreferrer'>
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      });

      return (
        <div className='row' key={ index }>
          { smallerList }
        </div>
      )
    });

  }

  return (
    <div>
      { articleList }
    </div>
  )
}

export default NewsArticles;