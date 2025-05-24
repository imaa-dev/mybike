import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Building2,
    Handshake,
    Box,
    BookUser
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Panel',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Organización',
        href: '/dashboard',
        icon: Building2,
    },
    {
        title: 'Servicios',
        href: '/dashboard',
        icon: Handshake,
    },
    {
        title: 'Productos',
        href: '/dashboard',
        icon: Box,
    },
    {
        title: 'Clientes',
        href: '/dashboard',
        icon: BookUser,
    },

];

const footerNavItems: NavItem[] = [
//    {
//        title: 'Repository',
//        href: 'https://github.com/laravel/react-starter-kit',
//        icon: Folder,
//    },
//    {
//        title: 'Documentation',
//        href: 'https://laravel.com/docs/starter-kits#react',
//        icon: BookOpen,
//    },
];


export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
