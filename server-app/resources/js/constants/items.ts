import { NavItemDrop } from '@/types';
import { BriefcaseMedical, Pencil, Trash2 } from 'lucide-react';

export const mainNavItems: NavItemDrop[] = [
    {
        title: 'Editar',
        icon: Pencil,
    },
    {
        title: 'Eliminar',
        icon: Trash2,
    },
    {
        title: 'A Reparar',
        icon: BriefcaseMedical,
    },
    {
        title: 'A Diagnosticar',
        icon: BriefcaseMedical,
    },
];

