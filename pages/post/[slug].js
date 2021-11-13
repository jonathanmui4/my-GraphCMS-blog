import { getPosts, getPostDetails } from "../../services";
import CommentsForm from "../../components/comments/comments-form";
import Comments from "../../components/comments/comments";
import PostDetail from "../../components/posts/post-detail";
import Author from "../../components/posts/author";
import PostWidget from "../../components/posts/post-widget";
import CategoriesWidget from "../../components/categories-widget";

function PostDetailsPage(props) {
    const { post } = props;

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={post} />
                    <Author author={post.author}/>
                    <CommentsForm slug={post.slug}/>
                    <Comments slug={post.slug}/>
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative mt-8 top-8 lg:sticky">
                        <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
                        <CategoriesWidget />
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const posts = await getPosts();

    return {
        paths: posts.map(({node: {slug}}) => ({params: {slug}})),
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;

    const data = await getPostDetails(slug);

    return {
        props: { post: data },
        revalidate: 600
    }
}

export default PostDetailsPage;