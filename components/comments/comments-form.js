import {useEffect, useRef, useState} from "react";
import {submitComment} from "../../services";

function CommentsForm(props) {
    const {slug} = props;

    const [fieldError, setFieldError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [localStorage, setLocalStorage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const commentRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const storeDataRef = useRef();

    useEffect(() => {
        nameRef.current.value = window.localStorage.getItem('name');
        emailRef.current.value = window.localStorage.getItem('email');
    }, []);

    function handleCommentSubmission() {
        setFieldError(false);
        setEmailError(false);

        //Destructured from commentRef.current.value etc...
        //aka const comment = commentRef.current.value
        const {value: comment} = commentRef.current;
        const {value: name} = nameRef.current;
        const {value: email} = emailRef.current;
        const {checked: storeData} = storeDataRef.current;

        if(!comment || comment.trim() === '' || !name || name.trim() === '' || !email ) {
            setFieldError(true);
            if (!email.includes('@')) {
                setEmailError(true);
            }
            return;
        }

        const commentObj = {
            name, email, comment, slug
        };

        if (storeData) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('name', name);
            window.localStorage.removeItem('email', email);
        }

        submitComment(commentObj)
            .then((res) => {
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 3000);
            });
    }

    return(
        <div className="bg-gray-100 shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                Ask me anything or leave a comment
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-4">

            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea
                    ref={commentRef}
                    className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700"
                    placeholder="Comment or ask me anything"
                    name="comment"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    ref={nameRef}
                    className="py-4 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700"
                    placeholder="Name"
                    name="name"
                />
                <input
                    type="text"
                    ref={emailRef}
                    className="py-4 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700"
                    placeholder="Email"
                    name="email"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <input
                        ref={storeDataRef}
                        type="checkbox"
                        id="storeData"
                        name="storeData"
                        value="true"
                    />
                    <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">
                        Save my email and name for the next time I leave a comment.
                    </label>
                </div>
            </div>
            {fieldError && <p className="text-xs text-red-500">All fields are required.</p>}
            {emailError && <p className="text-xs text-red-500">Invalid email address!</p>}
            <div className="grid grid-cols-2 gap-3 mt-8">
                <button
                    type="button"
                    onClick={handleCommentSubmission}
                    className="transition duration-500 ease hover:bg-green-900 inline-block bg-blue-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
                >
                    Post
                </button>
                {showSuccessMessage && <span className="text-sm float-right font-semibold mt-1 text-green-500">Successfully submitted post! Your comment will be posted upon approval by page admin!</span>}
            </div>
        </div>
    );
}

export default CommentsForm;