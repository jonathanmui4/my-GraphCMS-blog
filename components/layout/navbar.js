import Link from 'next/link';
import Logo from './logo';
import {useEffect, useState} from "react";
import {getCategories} from "../../services";

function Navbar() {
    const [categories, setCategories] = useState([]);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories));
    }, []);

    function mobileMenuButtonHandler() {
        setShowMobileMenu(!showMobileMenu);
    }

    return (
        <nav className="bg-gray-700">
            <div className="w-full h-16 mx-auto px-2">
                <div className="flex justify-between">
                    <div className="py-3 space-x-4">
                        <Link href="/">
                            <span className="text-gray-50 text-xs active:text-gray-200 lg:text-sm cursor-pointer">
                                <Logo/>
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-1">
                        {categories.map((category) => (
                            <Link key={category.slug} href={`/category/${category.slug}`}>
                                <span
                                    className="transition duration-500 hover:text-blue-300 py-5 px-3 text-gray-50 cursor-pointer">{category.name}</span>
                            </Link>
                        ))}
                    </div>
                    {/*mobile button goes here*/}
                    <div className="md:hidden flex items-center">
                        <button onClick={mobileMenuButtonHandler}>
                            {showMobileMenu ?
                                <svg className="w-7 h-7 text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg> : <svg className="w-7 h-7 text-gray-100" xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 20 20"
                                              fill="currentColor">
                                    <path fill-rule="evenodd"
                                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                          clip-rule="evenodd"/>
                                </svg>
                            }
                        </button>
                    </div>
                </div>
            </div>
            {/*Mobile menu here*/}
            {showMobileMenu &&
            (
                <div className="">
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                                <span
                                    className="block py-2 px-4 text-gray-100 text-sm cursor-pointer hover:bg-blue-300"
                                    onClick={mobileMenuButtonHandler}
                                >
                                    {category.name}
                                </span>
                        </Link>
                    ))}
                </div>
            )
            }
        </nav>
    );
}

export default Navbar;