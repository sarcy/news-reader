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
      newsArticles: []
    }

    this.getNewsSources = this.getNewsSources.bind(this);
    this.handleNewsSourceChange = this.handleNewsSourceChange.bind(this);
  }

  handleNewsSourceChange (e) {

    let newsArticles = Helpers.getNewsForSource(e.target.value);

    this.setState({
      isLoading : true
    });

    newsArticles.then(articles => {
      let articleColumns = [];

      articleColumns = Helpers.convertNewsArticlesList(articles);

      this.setState({
        isLoading   : false,
        newsArticles: articleColumns
      });
    });

  }

  getNewsSources () {
    let newsSources = Helpers.getNewsSources();
    newsSources.then(sources => {

      let mappedSources = sources.map((source, index) => {
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
  }

  render() {
    
    let loadingDiv = '';
    if (this.state.isLoading) {
      loadingDiv = <LoadingDiv />;
    }

    return (
      <div className='large-12 columns'>
          <Header />

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
