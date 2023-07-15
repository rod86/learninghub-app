import {HiOutlineMenu} from 'react-icons/hi';

interface MobileMenuButtonProps {
    onClick: () => void;
}
const MobileMenuButton = ({onClick}: MobileMenuButtonProps) => {
    return (
        <div className="p-1 lg:hidden" onClick={onClick}>
            <HiOutlineMenu className="w-10 h-10 text-emerald-500" />
        </div>
    );
};

export default MobileMenuButton;