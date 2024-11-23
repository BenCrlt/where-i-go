import { Earth } from 'lucide-react';

export const HeaderBar = () => {
    return (
        <header className="bg-gray-800">
            <nav className="flex p-2">
                <div className="flex gap-2 place-items-center text-white">
                    <Earth size={45} />
                    <span>WHERE I GO</span>
                </div>
            </nav>
        </header>
    );
};
