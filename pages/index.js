import Head from 'next/head';
import PostCard from "../components/posts/post-card";
import PostWidget from "../components/posts/post-widget";
import Categories from "../components/categories";
import Hero from "../components/hero";
import {Fragment} from "react";

export default function Home() {

    const DUMMY_POSTS = [
        {
            title: 'React Testing',
            excerpt: 'Learn React Testing'
        },
        {
            title: 'Tailwind tutorial',
            excerpt: 'Tailwind tutorial'
        },
    ];

    return (
        <Fragment>
            <Hero />
            <div className="container mx-auto px-10 mb-8">
                <Head>
                    <title>Jonathan's Blog</title>
                    <meta
                        name='description'
                        content='An average NUS Computer Engineering student sharing about his life.'
                    />
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        {DUMMY_POSTS.map((post, index) => {
                            return (
                                <PostCard post={post} key={post.title} />
                            );
                        })}
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative top-8 lg:sticky">
                            <PostWidget />
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
