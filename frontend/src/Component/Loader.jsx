import React from 'react'

const Loader = () => {
    return (
        <div className='flex w-full items-center justify-center py-20'>
            <div className='w-10 h-10 rounded-full border-4 border-[#E8E8EA] dark:border-[#242535] border-t-[#4B6BFB] animate-spin' />
        </div>
    )
}

export default Loader
