import Image from 'next/image';
import HeroImg from '@assets/img/hero.jpg';

const HeroImage = () => {
    return (
        <section>
            <div className="mb-10">
                <Image src={HeroImg} alt="Hero image" className="w-full" priority />
            </div>
        </section>
    );
};

export default HeroImage;