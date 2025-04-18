import Image from 'next/image';

const Navbar = () => {
  return (
    <div className='flex flex-center justify-between p-4'>
      <div className='hidden md:flex items-center  gap-2 text-xs rounded-full ring-[1.5px] ring-gray-500 px-2'>
        <Image src='/search.png' alt='search' width={14} height={14} />
        <input
          className='outline-none width-[200px] p-2 bg-transparent'
          type='text'
          placeholder='Search...'
        />
      </div>

      <div className='flex items-center gap-6 justify-end w-full'>
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
          <Image src='/message.png' alt='message' width={20} height={20} />
        </div>
        <div className='relative bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
          <Image
            src='/announcement.png'
            alt='announcement'
            width={20}
            height={20}
          />
          <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white text-xs rounded-full'>
            1
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='text-xs leading-3 font-medium '>John Doe</span>
          <span className='text-[10px] text-gray-500 text-right'>Admin</span>
        </div>
        <Image
          src='/avatar.png'
          alt='avatar'
          width={36}
          height={36}
          className='rounded-full'
        />
      </div>
    </div>
  );
};
export default Navbar;
