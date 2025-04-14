import { Button } from '../ui/button';

const Pagination = () => {
  return (
    <div className='p-4 flex items-center justify-between text-gray-500'>
      <Button disabled className='bg-lamaPurple'>
        Prev
      </Button>
      <div className='flex items-center gap-2'>
        <Button className='px-2 bg-lamaSky rounded-sm'>1</Button>
        <Button className='px-2 bg-lamaSky rounded-sm'>2</Button>
        <Button className='px-2 bg-lamaSky rounded-sm'>10</Button>
      </div>
      <Button className='bg-lamaPurple'>Next</Button>
    </div>
  );
};
export default Pagination;
