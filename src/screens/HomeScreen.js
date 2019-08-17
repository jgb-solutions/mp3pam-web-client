// @flow
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { shuffle } from 'lodash-es';
import ScrollingList from '../components/ScrollingList';

const data = [
  {
    img: 'https://images.mp3pam.com/demo/OMVR-Bad-News-2016-2480x2480.jpg',
    title: 'Breakfast',
    author: 'jill111',
    cols: 2,
    featured: true
  },
  {
    img: 'https://images.mp3pam.com/demo/artist8.jpg',
    title: 'Tasty burger',
    author: 'director90'
  },
  {
    img: 'https://images.mp3pam.com/demo/artist7.jpg',
    title: 'Camera',
    author: 'Danson67'
  },
  {
    img: 'https://images.mp3pam.com/demo/artist6.jpg',
    title: 'Morning',
    author: 'fancycrave1',
    featured: true
  },
  {
    img: 'https://images.mp3pam.com/demo/artist5.jpg',
    title: 'Hats',
    author: 'Hans'
  },
  {
    img: 'https://images.mp3pam.com/demo/artist4.jpg',
    title: 'Honey',
    author: 'fancycravel'
  },
  {
    img: 'https://images.mp3pam.com/demo/artist3.jpg',
    title: 'Vegetables',
    author: 'jill111',
    cols: 2
  },
  {
    img: 'https://images.mp3pam.com/demo/artist2.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki'
  },
  {
    img: 'https://images.mp3pam.com/demo/artist1.jpg',
    title: 'Mushrooms',
    author: 'PublicDomainPictures'
  },
  {
    img: 'https://images.mp3pam.com/demo/artist10.jpg',
    title: 'Olive oil',
    author: 'congerdesign'
  },
  {
    img: 'https://images.mp3pam.com/demo/artist9.jpg',
    title: 'Sea star',
    cols: 2,
    author: '821292'
  },
  {
    img: 'https://images.mp3pam.com/demo/artist11.jpg',
    title: 'Bike',
    author: 'danfador'
  }
];

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <ScrollingList category="Featured" data={shuffle(data)} />
      <ScrollingList category="Rap" data={shuffle(data)} />
      <ScrollingList category="Compas" data={shuffle(data)} />
      <ScrollingList category="Reggae" data={shuffle(data)} />
      <ScrollingList category="Roots" data={shuffle(data)} />
      <ScrollingList category="Pop" data={shuffle(data)} />
    </>
  );
}
