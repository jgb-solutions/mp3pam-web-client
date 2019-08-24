// @flow
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { shuffle } from "lodash-es";
import ScrollingList from "../components/ScrollingList";

const data = [
	{
		id: "43534",
		image: "https://images.mp3pam.com/demo/artist9.jpg",
		title: "Breakfast",
		author: "jill111"
	},
	{
		id: "fsafsfasd",
		image: "https://images.mp3pam.com/demo/artist8.jpg",
		title: "Tasty burger",
		author: "director90"
	},
	{
		id: "safksdf",
		image: "https://images.mp3pam.com/demo/artist7.jpg",
		title: "Camera",
		author: "Danson67"
	},
	{
		id: "afasdfsdfssdkad",
		image: "https://images.mp3pam.com/demo/artist6.jpg",
		title: "Morning",
		author: "fancycrave1",
		featured: true
	},
	{
		id: "23423423",
		image: "https://images.mp3pam.com/demo/artist5.jpg",
		title: "Hats",
		author: "Hans"
	},
	{
		id: "32424234",
		image: "https://images.mp3pam.com/demo/artist4.jpg",
		title: "Honey",
		author: "fancycravel"
	},
	{
		id: "2342343",
		image: "https://images.mp3pam.com/demo/artist3.jpg",
		title: "Vegetables",
		author: "jill111",
		cols: 2
	},
	{
		id: "afasdfsdfsad",
		image: "https://images.mp3pam.com/demo/artist2.jpg",
		title: "Water plant",
		author: "BkrmadtyaKarki"
	},
	{
		id: "as234234",
		image: "https://images.mp3pam.com/demo/artist1.jpg",
		title: "Mushrooms",
		author: "PublicDomainPictures"
	},
	{
		id: "949493",
		image: "https://images.mp3pam.com/demo/artist10.jpg",
		title: "Olive oil",
		author: "congerdesign"
	},
	{
		id: "3243",
		image: "https://images.mp3pam.com/demo/artist9.jpg",
		title: "Sea star",
		cols: 2,
		author: "821292"
	},
	{
		id: "3453453",
		image: "https://images.mp3pam.com/demo/artist11.jpg",
		title: "Bike",
		author: "danfador"
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
