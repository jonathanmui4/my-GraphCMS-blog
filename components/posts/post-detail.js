import {Fragment} from "react";
import Image from "next/image";
import moment from "moment";

function PostDetail(props) {
    const {post} = props;
    console.log(post.content.raw.children);
    function getContentFragment(index, text, obj, type, href) {
        let modifiedText = text;

        if(href) {
            modifiedText = (
                <a key={index} href={href} target="_blank" className="transition duration-200 hover:underline text-blue-500">
                    {text}
                </a>
            );
        }

        //Check object
        if (obj) {
            if (obj.bold) {
                modifiedText = (<b key={index}>{text}</b>);
            }
            if (obj.italic) {
                modifiedText = (<em key={index}>{text}</em>);
            }
            if (obj.underline) {
                modifiedText = (<u key={index}>{text}</u>);
            }
            if (obj.bold && obj.underline) {
                modifiedText = (<b key={index}><u>{text}</u></b>);
            }
        }

        //Check type of object
        switch (type) {
            case 'heading-three':
                return (
                    <h3 key={index} className="text-xl font-semibold mb-4">
                        {modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
                    </h3>
                );
            case 'paragraph':
                return (
                    <p key={index} className="mb-8">
                        {modifiedText.map((item, i) => {
                            return (
                                <Fragment key={i}>{item}</Fragment>
                            );
                        })}
                    </p>
                );
            case 'heading-4':
                return (
                    <h4 key={index} className="text-md font-semibold mb-4">
                        {modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
                    </h4>
                );
            case 'image':
                return (
                    <Image
                        src={obj.src}
                        key={index}
                        alt={obj.title}
                        height={obj.height}
                        width={obj.width}
                        layout="responsive"
                    />
                );
            case 'bulleted-list': //Not working yet
                return (
                    <ul className="list-disc">
                        <li>
                            {modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
                        </li>
                    </ul>
                );
            case 'numbered-list': //Not working yet
                return (
                    <ul className="list-decimal">
                        <li>
                            {modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
                        </li>
                    </ul>
                );
            case 'block-quote':
                return (
                    <blockquote className="bg-gray-300 text-black text-center">
                        {modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
                    </blockquote>
                );
            default:
                return modifiedText;
        }

    }

    return (
        <div className="bg-gray-100 shadow-lg rounded-lg lg:p-8 pb-12 mt-8 mb-8">
            <div className="relative overflow-hidden shadow-md pb-20 mb-6">
                <Image
                    src={post.image.url}
                    alt={post.title}
                    height={350}
                    width={600}
                    layout="responsive"
                    className="object-top rounded-t-lg"
                />
            </div>
            <div className="px-4 lg:px-0">
                <div className="flex items-center mb-8 w-full">
                    {/*<div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">*/}
                    {/*    <Image*/}
                    {/*        src={post.author.photo.url}*/}
                    {/*        alt={post.author.name}*/}
                    {/*        width={30}*/}
                    {/*        height={30}*/}
                    {/*        className="rounded-full align-middle"*/}
                    {/*    />*/}
                    {/*    <p className="inline align-middle text-gray-700 ml-2 text-lg">*/}
                    {/*        {post.author.name}*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                    <div className="font-medium text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                        {moment(post.createdAt).format('MMM DD, YYYY')}
                    </span>
                    </div>
                </div>
                <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
                {post.content.raw.children.map((typeObj, index) => {
                    const children = typeObj.children.map((item, itemIndex) => {
                        if (item.type === "link") {
                            return getContentFragment(itemIndex, item.children[0].text, item, null, item.href);
                        }
                        return getContentFragment(itemIndex, item.text, item);
                    });
                    return getContentFragment(index, children, typeObj, typeObj.type);
                })}
            </div>
        </div>
    );
}

export default PostDetail;