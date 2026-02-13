import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";

export default function UserFilter() {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
            {/* Search - Takes priority space */}
            <div className="flex-1 min-w-0">
                <SearchFilter
                    paramName="searchTerm"
                    placeholder="Search admins..."

                />
            </div>

            {/* Additional filters - Collapsible on mobile */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="hidden md:flex items-center gap-2">
                    <SearchFilter
                        paramName="email"
                        placeholder="Email"

                    />
                    <SearchFilter
                        paramName="contactNumber"
                        placeholder="Contact"

                    />

                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 ml-auto">
                    <RefreshButton />
                    <ClearFiltersButton preserveParams={["role"]} />
                </div>
            </div>
        </div>
    );
};
