import Link from 'next/link';
import { graphqlClient, GET_ALL_POSTS } from '@/lib/graphql';
import { PostsResponse } from '@/lib/types';
import BlogCard from '@/components/blog-card';

export default async function Blog() {
    const { posts } = await graphqlClient.request<PostsResponse>(GET_ALL_POSTS);
    return (
        <section className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center mb-8">
                <h2 className="text-3xl font-bold text-center">Noticies</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.nodes.map(post => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}