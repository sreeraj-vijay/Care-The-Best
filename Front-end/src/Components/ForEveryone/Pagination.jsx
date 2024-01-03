import React from "react";


const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center space-x-2 mt-4">
        {pages.map((page, index) => (
            <button
                key={index}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md 
                            ${page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
                {page}
            </button>
        ))}
    </div>
    
    );
};

export default Pagination;