import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import PDFViewer from '../components/pdfViewer';
import { getResumeUrl } from "@/lib/s3";


const EVENTS_QUERY = `*[_type == "myBio"]{content}`;

export default async function IndexPage() {
  const bios = await sanityFetch<SanityDocument[]>({ query: EVENTS_QUERY });
  const resumeUrl = await getResumeUrl();


  return (

    <article className="p-4">
      {bios[0].content.map((c: any) => (
        c.children.map((child: any, ind: number) => <p key={`bio_${ind}`}>{child.text}</p>)
      ))}
      <div>
        <br />
        <PDFViewer src={resumeUrl} />
      </div>
    </article>
  );
}