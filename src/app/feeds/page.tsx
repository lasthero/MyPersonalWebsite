
import Link from "next/link";
export const dynamic = 'force-dynamic';

async function fetchHackerNewsTopStories() {
    try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const storyIds = await response.json();

        // Limit the number of stories to fetch
        const numStories = 10; // Adjust as needed
        const topStoryIds = storyIds.slice(0, numStories);

        // Fetch details of each top story
        const stories = await Promise.all(
            topStoryIds.map(async (storyId: string) => {
                const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
                return await storyResponse.json();
            })
        );

        return stories;
    } catch (error) {
        console.error('Error fetching Hacker News top stories:', error);
        return null;
    }
}

export default async function IndexPage() {

    const stories = await fetchHackerNewsTopStories();
    // console.log(stories);
    return (
    <>
      <h1>Here are some technical blogs/posts/articles for my daily reads:</h1>
      <br />
      <ul>
      {stories && stories.map((item: any, ind: number) => <li key={`feed_${ind}`}><Link className="underline hover:text-gray-300" href={item.url} target="_blank">{item.title} by {item.by}</Link></li>)}
      </ul>
    </>
    );
  }