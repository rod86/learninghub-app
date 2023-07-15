import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@assets/img/logo.png';
import Navbar from '@components/layout/Navbar';
import MobileMenuButton from '@components/layout/MobileMenuButton';
import MobileNav from '@components/layout/MobileNav';
import {useState} from 'react';

const Header = () => {
    const [isMobileNavShown, setIsMobileNavShown] = useState<boolean>(false);
    return (
        <header>
            <div className="container flex items-center justify-between mx-auto p-5">
                <Link href="/">
                    <Image src={logoImg} alt='Logo' className="w-3/4 md:w-72" priority />
                </Link>
                <Navbar />
                <MobileMenuButton
                    onClick={() => setIsMobileNavShown(!isMobileNavShown)} />
            </div>
            <MobileNav isShown={isMobileNavShown} />
        </header>
    );
};

export default Header;