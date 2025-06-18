import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { BreadcrumbItem, OrganizationData } from '@/types';
import { CirclePlus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Organización',
        href: '/organization/show',
    },
];
interface OrganizationDataProp {
    organization:  OrganizationData;
}

export default function Organization({ organization }: OrganizationDataProp) {
    console.log(organization);
    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Organizacion" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative">
                    <button type="button" className="flex" onClick={() => router.visit('/create/organization')}  >
                        <CirclePlus />
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
