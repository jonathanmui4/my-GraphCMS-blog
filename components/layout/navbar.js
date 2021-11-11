import Link from 'next/link';
import Logo from './logo';

function Navbar() {
    return (
        <header className="w-full h-24 bg-gray-700 flex justify-between items-center p-3">
            <Link href="/">
                <a className="text-gray-100 text-xs hover:text-gray-200 active:text-gray-200 lg:text-sm">
                    <Logo />
                </a>
            </Link>
            <nav>
                <ul className="list-none flex items-baseline m-0 p-2 lg:gap-2">
                    <li>Project</li>
                    <li>Test</li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;