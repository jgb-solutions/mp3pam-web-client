// @flow
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { shuffle } from "lodash-es";
import ScrollingList from "../components/ScrollingList";

const data = [
	{
		id: "43534",
		image: "https://images.mp3pam.com/demo/artist9.jpg",
		name: "Breakfast",
		author: "jill111",
		type: "album"
	},
	{
		id: "fsafsfasd",
		image: "https://images.mp3pam.com/demo/artist8.jpg",
		name: "Tasty burger",
		author: "director90",
		type: "album"
	},
	{
		id: "safksdf",
		image: "https://images.mp3pam.com/demo/artist7.jpg",
		name: "Camera",
		author: "Danson67",
		type: "album"
	},
	{
		id: "afasdfsdfssdkad",
		image: "https://images.mp3pam.com/demo/artist6.jpg",
		name: "Morning",
		author: "fancycrave1",
		type: "album"
	},
	{
		id: "23423423",
		image: "https://images.mp3pam.com/demo/artist5.jpg",
		name: "Hats",
		author: "Hans",
		type: "album"
	},
	{
		id: "32424234",
		image: "https://images.mp3pam.com/demo/artist4.jpg",
		name: "Honey",
		author: "fancycravel",
		type: "album"
	},
	{
		id: "2342343",
		image: "https://images.mp3pam.com/demo/artist3.jpg",
		name: "Vegetables",
		author: "jill111",
		type: "album"
	},
	{
		id: "afasdfsdfsad",
		image: "https://images.mp3pam.com/demo/artist2.jpg",
		name: "Water plant",
		author: "BkrmadtyaKarki",
		type: "album"
	},
	{
		id: "as234234",
		image: "https://images.mp3pam.com/demo/artist1.jpg",
		name: "Mushrooms",
		author: "PublicDomainPictures",
		type: "album"
	},
	{
		id: "949493",
		image: "https://images.mp3pam.com/demo/artist10.jpg",
		name: "Olive oil",
		author: "congerdesign",
		type: "album"
	},
	{
		id: "3243",
		image: "https://images.mp3pam.com/demo/artist9.jpg",
		name: "Sea star",
		author: "821292",
		type: "album"
	},
	{
		id: "3453453",
		image: "https://images.mp3pam.com/demo/artist11.jpg",
		name: "Bike",
		author: "danfador",
		type: "album"
	}
];

const categories: string[] = [
	"Featured",
	"Rap",
	"Compas",
	"Pop",
	"Reggae",
	"Roots"
];
export default function Home() {
	return (
		<>
			<h1>Home</h1>
			{categories.map(category => (
				<ScrollingList category={category} data={shuffle(data)} />
			))}
		</>
	);
}
