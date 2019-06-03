import React, { Component } from 'react';
import NewsSource from './news-source';
import NewsArticles from './news-articles';
import LoadingDiv from './loading';
import Header from './header';
import Footer from './footer';
import Helpers from '../Utils/helper';

// Import the stylesheets
import '../Styles/foundation.min.css';
import '../Styles/app.css';

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isLoading   : true,
      newsSource  : '',
      newsSources : [],
      newsArticles: [],
      newsTitle   : '',
      localStorageAllowed : false
    }

    this.getNewsSources = this.getNewsSources.bind(this);
    this.handleNewsSourceChange = this.handleNewsSourceChange.bind(this);
  }

  handleNewsSourceChange (e) {

    let selectedNewsSource = e.target.value;
    //let newsArticles = Helpers.getNewsForSource(selectedNewsSource);
    let newsTitle = Helpers.getSourceName(this.state.newsSources, selectedNewsSource);

    if (this.state.localStorageAllowed) {
      let readNewsSource = {
        key   : e.target.value,
        name  : newsTitle
      }
      Helpers.setLastReadNewsSource(readNewsSource);
    }

    let newsSource = {
      key   : selectedNewsSource,
      name  : newsTitle
    }

    this.renderTheNews(newsSource);

  }

  /**
   * Read the last news source from localStorage and then show the news.
   */
  showLastReadSource = () => {

    let lastReadSource = Helpers.getLastReadNewsSource();
    console.log('lastReadSource', lastReadSource);

    if (lastReadSource === '' || lastReadSource === undefined || lastReadSource === null) {
      return;
    } else {

      this.renderTheNews(lastReadSource);

    }
  }

  renderTheNews = (newsSource) => {
    let newsArticles = Helpers.getNewsForSource(newsSource.key);

    this.setState({
      isLoading : true
    });

    newsArticles.then(articles => {
      let articleColumns = [];

      articleColumns = Helpers.convertNewsArticlesList(articles);

      this.setState({
        isLoading   : false,
        newsArticles: articleColumns,
        newsTitle   : newsSource.name
      });
    });

  }

  getNewsSources () {
    let newsSources = Helpers.getNewsSources();
    newsSources.then(sources => {

      let mappedSources = sources.map((source) => {
        return {
          id    : source.id,
          name  : source.name
        };
      });

      this.setState({
        isLoading   : false,
        newsSources : mappedSources
      });

    });
  }

  componentWillMount () {
    this.getNewsSources();

    if (Helpers.checkForLocalStorage()) {
      this.setState({ localStorageAllowed : true });

      this.showLastReadSource();
    }
  }

  render() {
    
    let loadingDiv = '';
    if (this.state.isLoading) {
      loadingDiv = <LoadingDiv />;
    }

    return (
      <div className='large-12 columns'>
          <Header newsTitle={ this.state.newsTitle } />

          <main>

            <NewsSource newsSources={ this.state.newsSources } onchange={ this.handleNewsSourceChange } />
            
            <NewsArticles newsArticles={ this.state.newsArticles } />

          </main>

          <Footer />

          { loadingDiv }

        </div>
    );
  }
}

export default App;
