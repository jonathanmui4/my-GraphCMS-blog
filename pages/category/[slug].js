import {getCategories, getCategoryPosts, getPostDetails, getPosts} from "../../services";
import CategoriesWidget from "../../components/categories-widget";
import PostWidget from "../../components/posts/post-widget";
import PostCard from "../../components/posts/post-card";
import {useRouter} from "next/router";
import Loader from "../../components/loader";
import {Fragment} from "react";
import Head from "next/head";

function CategoryPage(props) {
    const {posts, category} = props;
    const router = useRouter();

    //Show loading screen if unable to load props
    if(router.isFallback) {
        return <Loader />;
    }

    return (
        <Fragment>
            <Head>
                <title>{category}</title>
                <meta
                    name='description'
                    content={'posts from ' + category}
                />
            </Head>
            <div className="container mt-4 mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        {posts.map((post, index) => (
                            <PostCard key={index} post={post.node} />
                        ))}
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-8">
                            <PostWidget category={category} />
                            <CategoriesWidget />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export async function getStaticPaths() {
    const categories = await getCategories();

    return {
        paths: categories.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;

    const data = await getCategoryPosts(slug);
    const sortedPosts = data.sort((a,b) => (a.createdAt > b.createdAt) ? 1 : -1);

    return {
        props: { posts: sortedPosts, category: slug },
        revalidate: 600
    }
}

export default CategoryPage;