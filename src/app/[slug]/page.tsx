import { graphqlClient, GET_PAGE_BY_SLUG } from '@/lib/graphql';
import type { PageResponse, Page } from '@/lib/types';
import Image from 'next/image';

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  
  const { page } = await graphqlClient.request<PageResponse>(GET_PAGE_BY_SLUG, {
    slug,
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
      {page.featuredImage?.node?.sourceUrl && (
        <div className="lg:mt-0 lg:col-span-5 lg:flex rounded-lg relative w-full h-[500px] mb-8">
          <Image 
            src={page.featuredImage.node.sourceUrl} 
            alt={page.featuredImage.node.altText || "Imagen destacada"} 
            fill 
            className="object-cover relative w-full aspect-[16/9] rounded-lg" 
          />
        </div>                
      )}
      <div className="w-full" dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}