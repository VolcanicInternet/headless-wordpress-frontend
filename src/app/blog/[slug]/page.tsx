import { graphqlClient, GET_POST_BY_SLUG } from '@/lib/graphql';
import { PostResponse } from '@/lib/types';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface PageProps {
    params: { slug: string };
}

function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

export default async function BlogPost({ params }: PageProps) {
    const { slug } = await params;
    const { post } = await graphqlClient.request<PostResponse>(GET_POST_BY_SLUG, {
        slug,
    });

    const date = new Date(post.date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const readingTime = calculateReadingTime(post.content);

    return (
        <article className="max-w-7xl mx-auto px-4">
            <Link 
            href="/blog" 
            className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors no-underline mb-10"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 text-red-600" />
            Tornar
        </Link>
            <div className="grid grid-cols-2 gap-8 bg-red-600 p-8 rounded-lg">
                <div className="flex flex-col gap-4">
                    <h1 className="text-5xl font-bold text-white">{post.title}</h1>
                    <div className="flex flex-row gap-2">
                        <div className="flex items-center text-white">
                            <UserCircleIcon className="w-6 h-6 text-white mr-2" />
                            <span className="font-medium text-white">{post.author?.node?.name}</span>
                        </div>
                        <span className="text-white">•</span>
                        <span className="text-white">{date}</span>
                        <span className="text-white">•</span>
                        <span className="text-white">{readingTime} min de lectura</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                {post.featuredImage?.node?.sourceUrl && (
                    <div className="lg:mt-0 lg:col-span-5 lg:flex rounded-lg relative w-full h-[300px]">
                        <Image 
                            src={post.featuredImage.node.sourceUrl} 
                            alt={post.featuredImage.node.altText || "Imagen destacada"} 
                            fill 
                            className="object-cover relative w-full aspect-[16/9] rounded-lg" 
                        />
                    </div>
                )}
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    );
}