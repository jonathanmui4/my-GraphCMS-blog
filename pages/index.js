import Head from 'next/head';
import PostCard from "../components/posts/post-card";
import PostWidget from "../components/posts/post-widget";
import CategoriesWidget from "../components/categories-widget";
import Hero from "../components/hero";
import {Fragment} from "react";
import {getPosts} from "../services";
import FeaturedPosts from "../components/sections/featured-posts";

export default function Home(props) {
    const {posts} = props;

    return (
        <Fragment>
            <Head>
                <title>Jonathan's Blog</title>
                <meta
                    name='description'
                    content='An average NUS Computer Engineering (CEG) student sharing about his student life, projects and module reviews.'
                />
                <meta
                    name='keywords'
                    content='nus, ceg, computer engineering, student life'
                />
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Hero />
            <div className="container pt-4 mx-auto px-10 mb-8">
                <FeaturedPosts />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        {posts.map((post, index) => {
                            return (
                                <PostCard post={post.node} key={post.node.title} />
                            );
                        })}
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative top-8 lg:sticky">
                            <PostWidget />
                            <CategoriesWidget />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export async function getStaticProps() {
    const posts = (await getPosts()) || [];
    const sortedPosts = posts.sort((a,b) => (a.createdAt > b.createdAt) ? 1 : -1);

    return {
        props: {posts: sortedPosts},
        revalidate: 600
    };
}
