import Image from 'next/image';

function PostCard(props) {
    const { post } = props;

    console.log(post);

    return (
        <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
            <div className="relative overflow-hidden shadow-md pb-80 mb-6">
                <Image
                    src={post.image.url}
                    alt={post.title}
                    width={150}
                    height={100}
                    layout="responsive"
                    className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
                />
            </div>
        </div>
    );
}

export default PostCard;