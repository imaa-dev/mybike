import { NavItemDrop } from '@/types';
import { BellRing, BriefcaseMedical, Cog, Pencil, Trash2, Undo2 } from 'lucide-react';

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
        title: 'Reparar',
        icon: Cog,
    },
    {
        title: 'A Taller',
        icon: BellRing,
    },
    {
        title: 'Diagnosticar',
        icon: BriefcaseMedical,
    },
    {
        title: 'Regresar',
        icon: Undo2,
    },
];

