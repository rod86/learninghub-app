import Image from 'next/image';
import logoImg from '@assets/img/logo.png';
const Footer = () => {
    return (
        <footer className="mt-20 bg-slate-50">
            <div className="container mx-auto py-7">
                <div className="flex items-center justify-between">
                    <Image src={logoImg} alt="Logo" className="w-48" priority />
                    <div className="text-sm font-thin">
                        &copy; 2023 Learning Hub
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;