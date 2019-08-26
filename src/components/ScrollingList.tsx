import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { Link } from "react-router-dom";

import Thumbnail from "./Thumbnail";
import ListInterface from "../interfaces/ListInterface";

const useStyles = makeStyles(theme => ({
	container: {
		marginBottom: 20
	},
	list: {
		display: "flex",
		flexWrap: "nowrap",
		overflowX: "auto"
	},
	thumbnail: {
		width: 175,
		marginRight: 21
	},
	link: { color: "#fff", textDecoration: "none" },
	listHeader: {
		borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
		paddingBottom: 3,
		paddingHorizontal: 0,
		display: "flex",
		justifyContent: "space-between",
		marginBottom: 15
	},
	category: {
		margin: 0,
		fontSize: 16
	}
}));

const ScrollingList = (props: { data: ListInterface[]; category: string }) => {
	const { data, category } = props;
	const styles: any = useStyles();
	let domElement: any = null;

	const scroll = (dir: string) => {
		const distance = 400;
		if (dir === "left") {
			domElement.scrollLeft -= distance;
		} else {
			domElement.scrollLeft += distance;
		}

		console.log("clientWidth", domElement.clientWidth);
		console.log("offsetWidth", domElement.offsetWidth);
		console.log("scrollWidth", domElement.scrollWidth);
	};

	return (
		<div className={styles.container}>
			<div className={styles.listHeader}>
				<Link to="/cat/konpa" className={styles.link}>
					<h2 className={styles.category}>{category}</h2>
				</Link>
				<div className={styles.arrows}>
					<KeyboardArrowLeft onClick={() => scroll("left")} />
					&nbsp;
					<KeyboardArrowRight onClick={() => scroll("right")} />
				</div>
			</div>
			<div
				className={styles.list}
				ref={el => {
					domElement = el;
				}}
			>
				{data.map((list, index) => (
					<Thumbnail key={index} className={styles.thumbnail} list={list} />
				))}
			</div>
		</div>
	);
};

export default ScrollingList;