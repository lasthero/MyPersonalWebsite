import Link from "next/link";
export const dynamic = 'force-dynamic';

async function getData() {
    const username = 'chihho.chou';
    const mediumRssUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(`https://medium.com/feed/@${username}`)}`;
    // const mediumRssUrl = `https://medium.com/feed/@${username}`;

    try {
      console.log('fetching: ', mediumRssUrl);
        const response = await fetch(mediumRssUrl);
        console.log('Response status:', response.status);
        const data = await response.json();
        // console.log(data.items[0]);
        const articles = data.items.slice(0, 5).map((item: any) => ({
          title: item.title,
          link: item.link,
        }));
    
        return {
          props: {
            articles,
          },
        };
      } catch (error) {
        console.error('Error fetching Medium articles:', error);
        return {
          props: {
            articles: [],
          },
        };
      }
  }

export default async function IndexPage() {
  const data = await getData();
  // console.log('data', data.props.articles);
  return (
    <>
        <h1>I tried to start writing some technical articles. Here are my published articles. More to come!</h1>
        <br />
        <ul>
            {data.props.articles.map((a: any, ind: number) => <li key={`article_${ind}`}><Link className="underline hover:text-gray-300" href={a.link} target="_blank">{a.title}</Link></li>)}
        </ul>
    </>)
};