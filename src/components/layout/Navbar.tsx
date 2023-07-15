import Link from 'next/link';
import {usePathname} from 'next/navigation';
import classnames from 'classnames';
import {MAIN_MENU} from '@config/nav';

const Navbar = () => {
    const currentRoute = usePathname();

    return (
        <nav role="navigation" className="hidden lg:block">
            <ul className="flex items-center space-x-8 text-xl text-slate-600 font-light">
                {MAIN_MENU.map(({route, text, isActive}) => (
                    <li className="group" key={route}>
                        <Link href={route}>{text}</Link>
                        <div className={classnames(
                            'mt-0.5 mx-2 border-b-2 transition-color duration-200',
                            isActive(currentRoute) ? 'border-emerald-500' : 'border-transparent'
                        )}></div>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;