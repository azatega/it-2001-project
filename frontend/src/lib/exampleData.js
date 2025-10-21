import examplePost1Image from "@/assets/example-post-1.jpg";
import examplePost2Image from "@/assets/example-post-2.jpg";

export const examplePosts = [
	{
		slug: "example-post-1",
		title: "How to Find a Good Duo Partner for League",
		excerpt: "Apparently harder than finding a spouse.",
		imageUrl: examplePost1Image,
		date: "2025-02-01",
		category: { name: "League of Legends" }
	},
	{
		slug: "example-post-2",
		title: "How to Get Over Lose Streaks",
		excerpt:
			"Sometimes, through no fault of your own, you find yourself on a losing streak. Here's how to cope.",
		imageUrl: examplePost2Image,
		date: "2025-02-02",
		category: { name: "Tilt Management" }
	},
];