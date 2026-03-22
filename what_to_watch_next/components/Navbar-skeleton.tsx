
const NavbarSkeleton = () => {
    return (
        <div className="
        bg-gradient-to-r from-white/20 via-white/40 to-white/20 
        animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]
        w-full fixed top-0 z-50 px-6 py-3 flex justify-between items-center
        backdrop-blur-3xl ">

            <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/30 rounded"></div>
                <div className="w-40 h-4 bg-white/30 rounded"></div>
            </div>

            <div className="flex gap-8">
                <div className="w-16 h-4 bg-white/30 rounded"></div>
                <div className="w-20 h-4 bg-white/30 rounded"></div>
                <div className="w-16 h-4 bg-white/30 rounded"></div>
            </div>

            <div className="flex gap-6 items-center">
                <div className="w-24 h-4 bg-white/30 rounded"></div>
                <div className="w-20 h-4 bg-white/30 rounded"></div>
                <div className="w-8 h-8 bg-white/30 rounded-full"></div>
            </div>
        </div>
    )
}

export default NavbarSkeleton;