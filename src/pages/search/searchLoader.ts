import { decodePath } from "../../utils";
 import type { PackageSummary } from "../../api/types/packageSummary"
 import { searchPackages } from "../../api/queries/searchPackages"
 
 export interface SearchLoaderResult {
    searchResults: PackageSummary[]
 }
 
 export async function searchLoader ({request}: { request: Request}): Promise<SearchLoaderResult> {
    const { searchParams } = new URL(request.url)
    const term = searchParams.get("term")
 
    if (!term){
        throw new Error('Search term must be provided') 
    }
    
  const decodedTerm = decodePath(term);
  const results = await searchPackages(decodedTerm);
 
    return {
        searchResults: results
    }
}