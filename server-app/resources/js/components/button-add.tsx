import { router } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';

interface ButtonAddProps {
    route: string;
}

const ButtonAdd = ({ route }: ButtonAddProps) => {
    return (
        <div className="relative p-5">
            <button type="button" className="flex" onClick={() => router.visit(route)}>
                <CirclePlus />
            </button>
        </div>
    );
};

export default ButtonAdd;
