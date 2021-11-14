import {useEffect, useState} from "react";
import {getRecentCategoryPosts, getRecentPosts, getSimilarPosts} from "../../services";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

function PostWidget(props) {
    const {categories, slug, category} = props;
    const [relatedPosts, setRelatedPosts] = useState([]);

    const categoryArray = [category];


    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug)
                .then((result) => setRelatedPosts(result));
        } else if (category) {
            getRecentCategoryPosts(categoryArray)
                .then((result) => {
                    const sortedResult = result.sort((a,b) => (a.createdAt < b.createdAt) ? 1 : -1);
                    setRelatedPosts(sortedResult);
                });
        } else {
            getRecentPosts()
                .then((result) => {
                    const sortedResult = result.sort((a,b) => (a.createdAt < b.createdAt) ? 1 : -1);
                    setRelatedPosts(sortedResult);
                });
        }
    }, [slug, category]);

    return (
        <div className="bg-gray-100 shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            {

            }
            {relatedPosts.map((post) => {
                return (
                    <div key={post.title} className="flex items-center w-full mb-4">
                        <div className="w-16 flex-none">
                            <Image
                                src={post.image.url}
                                alt={post.title}
                                height={60}
                                width={60}
                                layout="responsive"
                                className="align-middle rounded-full"
                            />
                        </div>
                        <div className="flex-grow ml-4">
                            <p className="text-gray-500 font-xs">
                                {moment(post.createdAt).format('MMM DD, YYYY')}
                            </p>
                            <Link href={`/post/${post.slug}`} key={post.title} className="text-md">
                                {post.title}
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default PostWidget;