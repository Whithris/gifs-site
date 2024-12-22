import React, { useEffect } from 'react';
import { Grid, Gif } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

const giphyFetch = new GiphyFetch('TwXZUqUN6cYCNHG37QyiTDyj4yuhhTtm');

type GifGridProps = {
  query: string; 
  onGifSelect: (gifUrl: string) => void;
};

const GifGrid = ({ query, onGifSelect }: GifGridProps) => {
  
  const fetchGifs = (offset: number) =>
    giphyFetch.search(query || 'new year', { offset, limit: 10 });

  return <Grid 
    key={query}
    fetchGifs={fetchGifs} 
    onGifClick={(gif, e) => {
      e.preventDefault();
      onGifSelect(gif.images.original.url);
    }}
    width={376} 
    columns={3} 
    gutter={6} 
    />;
};

export default GifGrid;