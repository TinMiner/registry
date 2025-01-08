// Utils:
import { encodePath } from '../utils';
 
// Navigation:
import { Link, useLocation } from 'react-router-dom';
 
// Types, interfaces and enumns:
import type { FC } from 'react';
//import type { PackageSummary } from '../api/types/index.types';
import type { PackageSummary } from '../api/types/packageSummary';
interface PackageListItemProps {
  packageSummary: PackageSummary;
}
 
const PackageListItem: FC<PackageListItemProps> = ({
  packageSummary: { name, description, version, keywords },
}) => {
  // Current location, to pass to DetailsPage:
  const { pathname, search } = useLocation();
  const searchPath: string = pathname + search;
  // console.log('searchPath from PackageListItem: ', searchPath);
 
  // Removing possible slashes from package name:
  const encodedName = encodePath(name);
 
  // JSX:
  const renderedKeywords = (keywords || []).map((kw, i) => (
    <span
      key={i + kw}
      className='border py-0.5 px-1 text-xs bg-slate-200 rounded w-max'
    >
      {kw}
    </span>
  ));
 
  return (
    <div className='border p-4 rounded flex justify-between items-center'>
      <div className='flex flex-col gap-2'>
        <Link
          to={`/packages/${encodedName}`}
          state={{ searchPath }}
          className='text-xl font-bold'
        >
          {name}
        </Link>
        <p className='text-sm text-gray-500'>{description}</p>
        <p className='text-m '>Latest version: {version}</p>
        <div className='flex gap-1 flex-wrap'> {renderedKeywords}</div>
      </div>
      <div className='mr-6'>
        <Link
          to={`/packages/${encodedName}`}
          state={{ searchPath }}
          className='py-2 px-3 rounded bg-black text-white text-lg'
        >
          View
        </Link>
      </div>
    </div>
  );
};
 
export default PackageListItem;