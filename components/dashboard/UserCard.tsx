const UserCard = ({ type }: { type: string }) => {
  return (
    <div className='rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1'>
      {type}
    </div>
  );
};
export default UserCard;
