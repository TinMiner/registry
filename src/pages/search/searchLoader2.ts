// Utils:
import { decodePath } from '../../utils';
// Queries:

import type { PackageSummary } from "../../api/types/packageSummary"
 import { searchPackages } from "../../api/queries/searchPackages"
 
// Types, interfaces and enumns:

interface PackageSearchLoaderArg {
  request: Request;
}
export interface SearchLoaderReturn {
  packages: PackageSummary[];
}

export interface SearchLoaderResult {
  searchResults: PackageSummary[]
}
 
export  async function searchLoader({
  request,
}: PackageSearchLoaderArg): Promise<SearchLoaderReturn | never> {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term');
 
  if (!term) {
    throw new Error('Search term must be provided.');
  }
 
  // Decoding term:
  const decodedTerm = decodePath(term);
 
  const packages = await searchPackages(decodedTerm);
 
  return { packages };
}