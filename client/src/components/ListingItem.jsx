import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { useState } from 'react';

export default function ListingItem({ listing }) {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(7.5); // Default 7.5% interest
  const [years, setYears] = useState(20); // Default 20-year loan

  const price = listing.offer ? listing.discountPrice || 0 : listing.regularPrice || 0;

  const calculateEMI = () => {
    const monthlyInterest = interestRate / 100 / 12;
    const numPayments = years * 12;
    const emi =
      (price * monthlyInterest * Math.pow(1 + monthlyInterest, numPayments)) /
      (Math.pow(1 + monthlyInterest, numPayments) - 1);
    setLoanAmount(emi.toFixed(2));
  };

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>

      {/* ✅ Listing Details - Inside <Link> */}
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0] || 'default-image-url'}
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-800'>{listing.name}</p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>{listing.address}</p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
          <p className='text-slate-500 mt-2 font-semibold '>
            ₹{price.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds ` : `${listing.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1 ? `${listing.bathrooms} baths ` : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>

      {/* ✅ Loan Calculator Moved to Bottom (Outside <Link>) */}
      <div className='p-3 border-t mt-3'>
        <h3 className='text-lg font-semibold text-slate-800 mb-2'>Loan Calculator</h3>
        <div className='flex flex-col gap-2 text-sm text-gray-600 mb-3'>
          <label>
            Interest Rate: 
            <input
              type='number'
              value={interestRate}
              onChange={(e) => {
                e.stopPropagation(); // Prevents redirection
                setInterestRate(e.target.value);
              }}
              className='border p-1 rounded w-16 ml-2 mt-1'
            /> %
          </label>
          <label>
            Years: 
            <input
              type='number'
              value={years}
              onChange={(e) => {
                e.stopPropagation(); // Prevents redirection
                setYears(e.target.value);
              }}
              className='border p-1 rounded w-16 ml-2'
            />
          </label>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents redirection
              calculateEMI();
            }}
            className='bg-slate-700 text-white px-3 py-1 rounded mt-2 hover:bg-slate-600'
          >
            Calculate EMI
          </button>
          {loanAmount > 0 && (
            <p className='text-cyan-700 font-bold'>EMI: ₹{loanAmount} / month</p>
          )}
        </div>
      </div>

    </div>
  );
}
