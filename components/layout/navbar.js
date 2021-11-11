import Link from 'next/link';
import Logo from './logo';
const categories = [
    {name: 'Projects', slug: 'projects'},
    {name: 'Student Life', slug: 'student-life'},
]

function Navbar() {
    return (
        <header className="w-full h-24 bg-gray-700 flex justify-between items-center p-3">
            <Link href="/">
                <a className="text-gray-100 text-xs hover:text-gray-300 active:text-gray-200 lg:text-sm">
                    <Logo/>
                </a>
            </Link>
            <nav className="hidden md:float-left md:contents">
                <ul className="list-none flex items-baseline text-gray-100 m-0 p-2 lg:gap-2">
                    {categories.map((category) => {
                        return (
                            <li>
                                <Link key={category.slug} href={`/category/${category.slug}`}>
                                    <span className="md:float-right mt-2 align-middle ml-4 font-semibold cursor-pointer">
                                        {category.name}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;