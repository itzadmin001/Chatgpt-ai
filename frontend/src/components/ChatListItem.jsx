
export default function ChatListItem({ chat, active, onClick }) {

    return (
        <div
            onClick={onClick}
            className={`cursor-pointer p-3 rounded-md transition-colors flex items-center justify-between ${active ? 'bg-indigo-600/40' : 'hover:bg-white/5'}`}
        >
            <div className="flex-1">
                <div className="font-medium text-sm text-white truncate">{chat.title}</div>
                <div className="text-xs text-slate-300 truncate">{chat.model}</div>
            </div>
            <div className="text-xs text-slate-400">{new Date(chat.createdAt).toLocaleDateString()}</div>
        </div>
    )
}
