import {useState, useEffect, Fragment} from "react";
import moment from "moment";
import parse from "html-react-parser";
import {getComments} from "../../services";

function Comments(props) {
    const {slug} = props;

    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(slug)
            .then((result) => setComments(result));
    }, []);

    return (
        <Fragment>
            {comments.length > 0 && (
                <div className="bg-gray-200 shadow-lg rounded-lg p-8 pb-12 mb-8">
                    <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                        {comments.length}
                        {' '}
                        {comments.length === 1 ? "comment" : "Comments"}
                    </h3>
                    {comments.map((comment) => (
                        <div key={comment.createdAt} className="border-b border-gray-300 mb-4 pb-4">
                            <p className="mb-4">
                                <span className="font-semibold">{comment.name}</span>
                                {' '}
                                on
                                {' '}
                                {moment(comment.createdAt).format('MMM DD, YYYY')}
                            </p>
                            <p className="whitespace-pre-line text-gray-700 w-full">{parse(comment.comment)}</p>
                        </div>
                    ))}
                </div>
            )}
        </Fragment>
    );
}

export default Comments;