
interface NavItem {
    text: string;
    route: string;
    isActive: (current: string) => boolean;
}

export const MAIN_MENU: NavItem[] = [
    {
        route: '/',
        text: 'Home',
        isActive: (current) => current === '/'
    },
    {
        route: '/courses',
        text: 'Courses',
        isActive: current => current.startsWith('/courses')
    },
    {
        route: '/about',
        text: 'About',
        isActive: current => current === '/about'
    },
];