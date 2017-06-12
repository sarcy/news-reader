import React from 'react';

export default function NewsSource (props) {

  let sources = props.newsSources;

  let newsSources = sources.map(function(source) {
    return (<option key={ source.id } value={ source.id }>{ source.name }</option>);
  });

  return (
    <select onChange={ props.onchange } defaultValue=''>
      <option value='' disabled>Select a news source</option>
      { newsSources }
    </select>
  );
}