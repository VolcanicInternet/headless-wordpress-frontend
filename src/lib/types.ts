export interface Page {
    id: string;
    title: string;
    content: string;
    featuredImage: {
        node: {
            sourceUrl: string;
            altText: string;
        }
    }
}

export interface Post {
    id: string;
    title: string;
    slug: string;
    date: string;
    content: string;
    featuredImage?: {
        node?: {
        sourceUrl: string;
        altText?: string;
        };
    };
    author?: {
        node?: {    
            name: string;
            avatar: {
                url: string;
            };
        };
    };
    excerpt?: string;
}

export interface HomePageResponse {
    page: Page;
    posts: {
        nodes: Post[];
    }
}

export interface PageResponse {
    page: Page;
}

export interface PostResponse {
    post: Post;
}

export interface PostsResponse {
    posts: {
        nodes: Post[];
    }
}