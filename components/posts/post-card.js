function PostCard(props) {
    const { post } = props;

    return (
        <div>
            {post.title}
            {post.excerpt}
        </div>
    );
}

export default PostCard;