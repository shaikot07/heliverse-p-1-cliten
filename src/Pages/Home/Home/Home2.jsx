
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Home2 = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();
    const [userss, setUserss] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        domain: [],
        gender: [],
        availability: []
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get('/users', {
                    params: {
                        name: searchTerm,
                        domain: filters.domain.join(','),
                        gender: filters.gender.join(','),
                        availability: filters.availability.join(','),
                        page: currentPage
                    }
                });
                setUserss(response.data.users);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchTerm, filters, currentPage]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleFilterChange = (event, filterType) => {
        const selectedFilters = Array.from(event.target.selectedOptions, option => option.value);
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: selectedFilters
        }));
        setCurrentPage(1); // Reset to first page when changing filters
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    // handle add to card 
    const handleAddToTeam = async (getUser) => {
        try {
            const { _id, ...getUserWithoutId } = getUser;
            const userWithExtraInfo = {
                ...getUserWithoutId,
                authorEmail: user.email,
                // Add more extra information as needed
            };

            // Send POST request to backend API endpoint
            const response = await axiosPublic.post('/add-to-team', userWithExtraInfo);
            console.log(response.data);
            if (response.data.insertedId) {
                // show success popup 
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Member added Successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            // Optionally, you can update the UI or show a success message to the user
        } catch (error) {
            console.error('Error adding to team:', error);
            // Optionally, you can show an error message to the user
        }
    };

    return (
        <div className="flex ">
            {/* Left side */}
            <div className="w-1/4 bg-[#40346A] h-screen p-4">
                <h2 className="text-lg font-semibold mb-2">Search and Filters</h2>
                {/* <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearch} className="border border-gray-300 rounded px-3 py-2 mb-2 w-full" /> */}
                <label className="input input-bordered flex items-center gap-2 bg-slate-500">
                    <input type="text" className="grow" placeholder="Search" value={searchTerm} onChange={handleSearch} />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
                <div className='mt-6'>
                    <h2 className='font-semibold'>Filter By Domain</h2>
                    <select onChange={(event) => handleFilterChange(event, 'domain')} className="select select-primary w-full max-w-xs bg-slate-500">
                        {/* <option disabled selected>Filter By Domain</option> */}
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>

                <div className='mt-6 '>
                    <h2 className='font-semibold'>Filter By Gender</h2>
                    <select onChange={(event) => handleFilterChange(event, 'gender')} className="select select-primary w-full max-w-xs bg-slate-500">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className='mt-6 '>
                    <select onChange={(event) => handleFilterChange(event, 'availability')} className="select select-primary w-full max-w-xs bg-slate-500">
                        <option value="Available">Available</option>
                        <option value="Busy">Busy</option>
                    </select>
                </div>
            </div>

            {/* Right side */}
            <div className="w-3/4 p-4">
                <h2 className="text-lg font-semibold mb-2">All User</h2>
                <div className="grid grid-cols-3 gap-4 ">
                    {userss?.map(getUser => (
                        <div key={getUser?._id} className="max-w-[300px] md:w-[350px] bg-white  p-2 md:p-1 shadow-md rounded-2xl space-y-8">
                            {/* profile image & bg  */}
                            <div className="relative">
                                <img className="w-full h-full rounded-2xl bg-gray-500" src="https://source.unsplash.com/350x150/?northern lights" alt="card navigate ui" />
                                <img className="w-[100px] h-[100px] absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-gray-400 border border-white" src={getUser?.avatar} alt="card navigate ui" />
                            </div>
                            {/* profile name & role */}
                            <div className="pt-1 text-center space-y-1">
                                <h1 className="text-xl md:text-2xl">Name: {getUser?.first_name}</h1>
                                <p className="text-gray-400 text-sm">Name: {getUser?.first_name}</p>
                                <p className="text-gray-400 text-sm">Email: {getUser.email}</p>
                                <p className="text-gray-400 text-sm">Domain: {getUser.domain}</p>
                                <p className="text-gray-400 text-sm">Gender: {getUser.gender}</p>
                                <p className="text-gray-400 text-sm">Availability: {getUser.available ? 'Available' : 'Busy'}</p>
                            </div>
                            {/* post , followers following  */}
                            <div className="text-center ">

                                <button onClick={() => handleAddToTeam(getUser)} className="hover:bg-[#0095FF] hover:scale-95 font-medium hover:text-white w-[50%] py-2 rounded-full hover:shadow-xl   text-gray-400 shadow-[0px_0px_10px_#E2DADA] t duration-500">
                                    Add to Team
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className="mt-4 flex justify-between">
                    <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed">Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed">Next</button>
                </div> */}
                <div className="mt-4 flex justify-between">
                    <nav aria-label="Page navigation example">
                        <ul className="flex items-center -space-x-px h-10 text-base">
                            <li>
                                <button onClick={handlePrevPage} disabled={currentPage === 1} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Previous</span>
                                    <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                    </svg>
                                </button>
                            </li>
                            {/* Render pagination buttons dynamically */}
                            {Array.from({ length: totalPages > 10 ? 10 : totalPages }, (_, index) => {
                                const pageNumber = currentPage > 5 ? currentPage - 5 + index : index + 1;
                                return (
                                    <li key={index}>
                                        <button onClick={() => setCurrentPage(pageNumber)} className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === pageNumber ? 'border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}>
                                            {pageNumber}
                                        </button>
                                    </li>
                                );
                            })}
                            <li>
                                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Next</span>
                                    <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>
        </div>
    );
};

export default Home2;