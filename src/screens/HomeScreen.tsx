import React, { useEffect } from "react";
import { shuffle } from "lodash-es";
import ScrollingList from "../components/ScrollingList";
import Spinner from '../components/Spinner';
import useHome from "../hooks/useHome";

const data = [
	{
		id: "43534",
		image: "https://images.mp3pam.com/demo/71v6WN02N1L.png",
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
		image: "https://i1.sndcdn.com/artworks-000157680374-y69r9w-t500x500.jpg",
		name: "Stereo Hearts",
		author: "Adam Levine",
		type: "track"
	},
	{
		id: "32424234",
		image: "https://www.reggaeville.com/fileadmin/user_upload/daville.jpg",
		name: "Always On My Mind",
		author: "Da'Ville",
		type: "artist"
	},
	{
		id: "2342343",
		image: "https://images.mp3pam.com/demo/artist3.jpg",
		name: "Vegetables",
		author: "jill111",
		type: "podcast"
	},
	{
		id: "afasdfsdfsad",
		image: "https://images.mp3pam.com/demo/artist2.jpg",
		name: "Water plant",
		author: "BkrmadtyaKarki",
		type: "track"
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
		type: "artist"
	},
	{
		id: "3243",
		image: "https://images.mp3pam.com/demo/71v6WN02N1L.png",
		name: "It Girl",
		author: "Jason Derulo",
		type: "track"
	},
	{
		id: "3453453",
		image: "https://images.mp3pam.com/demo/artist11.jpg",
		name: "Bike",
		author: "danfador",
		type: "podcast"
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
	const [loading, error, homeData] = useHome();
	// fetch home data
	useEffect(() => {
		console.log(homeData);
	}, [homeData])

	if (loading) return <Spinner.Full />;

	if (error) return <p>Error Loading new data. Please refresh the page.</p>;

	return (
		<>
			<h1>Home</h1>
			{categories.map(category => (
				<ScrollingList
					key={category}
					category={category}
					data={shuffle(data)}
				/>
			))}
		</>
	);
}
