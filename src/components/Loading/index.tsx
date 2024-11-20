import { ThreeDots } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-screen w-screen fixed z-[1000] bg-gray-400/40'>
      <ThreeDots
        height="32"
        width="32"
        color="rgba(201, 205, 212, 1)"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
