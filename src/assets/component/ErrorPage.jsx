
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='w-[800px] mx-auto'>
            <h2 className='text-3xl text-red-500 text-center font-bold'>Oops data not found </h2>
            <div className=''>
                <img  className='w-[500px]' src="https://i.ibb.co/cYRJwZH/404.gif" alt="" />
            </div>
            <Link to="/" className='bg-red-700 py-2 px-6 rounded-lg hover:bg-black text-white'>Go TO Home</Link>
        </div>
    );
};

export default ErrorPage;