// @flow
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { shuffle } from 'lodash-es';
import ScrollingList from '../components/ScrollingList';

const data = [
  {
    img: '/assets/images/OMVR-Bad-News-2016-2480x2480.jpg',
    title: 'Breakfast',
    author: 'jill111',
    cols: 2,
    featured: true
  },
  {
    img: '/assets/images/artist8.jpg',
    title: 'Tasty burger',
    author: 'director90'
  },
  {
    img: '/assets/images/artist7.jpg',
    title: 'Camera',
    author: 'Danson67'
  },
  {
    img: '/assets/images/artist6.jpg',
    title: 'Morning',
    author: 'fancycrave1',
    featured: true
  },
  {
    img: '/assets/images/artist5.jpg',
    title: 'Hats',
    author: 'Hans'
  },
  {
    img: '/assets/images/artist4.jpg',
    title: 'Honey',
    author: 'fancycravel'
  },
  {
    img: '/assets/images/artist3.jpg',
    title: 'Vegetables',
    author: 'jill111',
    cols: 2
  },
  {
    img: '/assets/images/artist2.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki'
  },
  {
    img: '/assets/images/artist1.jpg',
    title: 'Mushrooms',
    author: 'PublicDomainPictures'
  },
  {
    img: '/assets/images/artist10.jpg',
    title: 'Olive oil',
    author: 'congerdesign'
  },
  {
    img: '/assets/images/artist9.jpg',
    title: 'Sea star',
    cols: 2,
    author: '821292'
  },
  {
    img: '/assets/images/artist11.jpg',
    title: 'Bike',
    author: 'danfador'
  }
];

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <ScrollingList listTitle="Featured" data={shuffle(data)} />
      <ScrollingList listTitle="Rap" data={shuffle(data)} />
      <ScrollingList listTitle="Compas" data={shuffle(data)} />
      <ScrollingList listTitle="Reggae" data={shuffle(data)} />
      <ScrollingList listTitle="Roots" data={shuffle(data)} />
      <ScrollingList listTitle="Pop" data={shuffle(data)} />
    </>
  );
}
