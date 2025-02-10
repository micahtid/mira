const Loader = () => {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="relative w-[100px] h-[100px]">
          <div
            className="absolute inset-0 border-[25px] border-gray-100 border-t-green-400 rounded-full animate-spin"
            style={{ animationDuration: '1.1s' }}
          ></div>
        </div>
      </div>
    );
  };
  
  export default Loader;