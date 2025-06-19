import { router } from '@inertiajs/react';
import { List } from 'lucide-react';
interface ButtonListProps {
    route: string;
}
const ButtonList = ({route}: ButtonListProps) => {
    return (
        <div className="relative p-5">
            <button type="button" className="flex" onClick={() => router.visit(route)}>
                <List />
            </button>
        </div>
    )
}

export default ButtonList;
