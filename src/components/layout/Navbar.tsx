import Link from 'next/link';

const Navbar = () => {
    return (
        <nav role="navigation" className="hidden md:block">
            <ul className="flex items-center space-x-8 text-xl text-slate-600 font-light">
                <li className="group">
                    <Link href="/">Home</Link>
                    <div className="mt-0.5 mx-2 border-b-2 border-emerald-500 transition-color duration-200"></div>
                </li>
                <li className="group">
                    <Link href="/courses">Courses</Link>
                    <div className="mt-0.5 mx-2 border-b-2 border-transparent group-hover:border-emerald-500 transition-all duration-300"></div>
                </li>
                <li className="group">
                    <Link href="/about">About</Link>
                    <div className="mt-0.5 mx-2 border-b-2 border-transparent group-hover:border-emerald-500 transition-all duration-300"></div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;