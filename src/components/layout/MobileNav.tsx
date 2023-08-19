import {usePathname} from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';
import {MAIN_MENU} from '@helpers/navigation';

interface MobileNavProps {
    isShown: boolean;
}

const MobileNav = ({isShown}: MobileNavProps) => {
    const currentRoute = usePathname() as string;

    return (
        <nav role="navigation" className={classNames('px-5 mb-10 lg:hidden', { 'hidden': !isShown })}>
            <ul className="flex-row space-y-2.5 text-slate-600 font-light text-xl">
                {MAIN_MENU.map(({route, text, isActive}) => (
                    <li key={route}>
                        <Link href={route} className={classNames(
                            'py-1 block',
                            isActive(currentRoute) ? 'text-emerald-500 font-normal' : ''
                        )}>{text}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MobileNav;