import React from 'react';
import Constants from '../Utils/constants';

export default function Footer () {

  return (
    <footer>
      <p>Built with love using <a href='https://facebook.github.io/react/'>React</a>, 
      &nbsp;<a href={ Constants.NEWSAPI_URL }>NewsAPI</a>, and hosted on <a href='https://surge.sh'>Surge.Sh</a></p>
    </footer>
  )
};