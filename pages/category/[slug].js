import {getCategories, getCategoryPosts, getPostDetails, getPosts} from "../../services";
import CategoriesWidget from "../../components/categories-widget";
import PostWidget from "../../components/posts/post-widget";
import PostCard from "../../components/posts/post-card";
import {useRouter} from "next/router";
import Loader from "../../components/loader";

function CategoryPage(props) {
    const {posts, category} = props;
    const router = useRouter();

    //Show loading screen if unable to load props
    if(router.isFallback) {
        return <Loader />;
    }

    return (
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
    )
}

export async function getStaticPaths() {
    const categories = await getCategories();

    return {
        paths: categories.map(({ slug }) => ({ params: { slug } })),
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;

    const data = await getCategoryPosts(slug);

    return {
        props: { posts: data, category: slug },
        revalidate: 600
    }
}

export default CategoryPage;