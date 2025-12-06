import { graphqlClient, GET_HOME_PAGE } from '@/lib/graphql';
import { notFound } from 'next/navigation';
import type { HomePageResponse } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import BlogCard from '@/components/blog-card';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default async function HomePage() {
  try {
    const { page, posts } = await graphqlClient.request<HomePageResponse>(GET_HOME_PAGE);

    if (!page) {
      return notFound();
    }

    return (
      <>
        <section className="max-w-7xl mx-auto bg-white">
            <div className="flex flex-col md:flex-row max-w-screen-xl px-4 mx-auto lg:gap-8">
                <div className="mr-auto place-self-center lg:col-span-7 w-1/2">
                    <h1 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">{page.title}</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg" dangerouslySetInnerHTML={{ __html: page.content || ''  }} />
                    <Link href="#" 
                    className="button inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-gray-100">
                        Subscriu-te
                    </Link> 
                </div>
                {page.featuredImage?.node?.sourceUrl && (
                <div className="lg:mt-0 lg:col-span-5 lg:flex rounded-lg relative w-1/2 h-auto">
                    <Image src={page.featuredImage.node.sourceUrl} alt="mockup" fill className="object-cover relative w-full h-auto aspect-[16/9] rounded-lg" />
                </div>                
                )}
            </div>
        </section>
        <section className="max-w-7xl mx-auto py-16 px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Noticies destacades</h2>
            <Link 
              href="/blog" 
              className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors no-underline"
            >
              Totes les notícies
              <ArrowRightIcon className="w-5 h-5 ml-2 text-red-600" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.nodes.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </>
    );
  } catch (error) {
    return notFound();
  }
}
