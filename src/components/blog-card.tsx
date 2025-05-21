import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/lib/types';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function BlogCard({ post }: { post: Post }) {
  const date = new Date(post.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105 h-full flex flex-col">
        <div className="relative h-48 w-full">
          <Image
            src={post.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
            alt={post.featuredImage?.node?.altText || post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600">
            {post.title}
          </h2>
          <div className="flex items-center mb-4 text-sm text-gray-600">
            <UserCircleIcon className="w-6 h-6 text-gray-600 mr-2" />
            <span>{post.author?.node?.name}</span>
            <span className="mx-2">•</span>
            <span>{date}</span>
          </div>
          <div 
            className="text-gray-600 line-clamp-3 flex-grow"
            dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
          />
        </div>
      </article>
    </Link>
  );
}
