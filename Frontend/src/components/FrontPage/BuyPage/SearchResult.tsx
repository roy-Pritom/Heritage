"use client"
import Loader from "@/components/Common/Loader";
import { useGetAllPropertyQuery } from "@/components/Redux/api/propertyApi";
import { Button } from "@nextui-org/react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type TProps = {
    searchTerm: string;
    isSearch: boolean;
    setIsSearch: (value: boolean) => void;
    budget: string;
    location: string;
    type: string;
}

const SearchResult = ({ searchTerm, isSearch, setIsSearch, budget, location, type }: TProps) => {
    const query: Record<string, any> = {};

    // Add non-empty fields to the query object
    if (searchTerm) query['searchTerm'] = searchTerm;
    if (budget) query['maxPrice'] = budget;
    if (location) query['location'] = location; // Ensure location is added correctly
    if (type) query['category'] = type;  // Ensure category is added correctly

    const { data, isLoading } = useGetAllPropertyQuery(query);

    useEffect(() => {
        setIsSearch(false);
    }, [searchTerm, setIsSearch]);

    return (
        <div className={`mt-5 ${(isSearch && searchTerm.length !== 0) || (budget || location || type) ? 'block' : 'hidden'}`}>
                    <p className="text-lg font-bold mb-3">Results : {data?.data?.length}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg::grid-cols-3 gap-8 mx-4">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        {data?.data?.map((property: any) => (
                            <div
                                key={property._id}
                                className="bg-slate-50 p-4 rounded-lg cursor-pointer"
                            >
                                <Image
                                    src={property?.images[0]}
                                    alt={property?.title}
                                    width={500}
                                    height={500}
                                    className="w-full h-48 object-cover rounded-lg mb-1"
                                />
                                <div className="flex justify-between items-center">
                                    <p className="text-[#0059b1] bg-[#ecf5ff] px-2">{property?.category}</p>
                                    <p className="flex items-center">
                                        <span className="text-[#d95d0f] text-5xl font-bold -mt-8">
                                            .
                                        </span>
                                        Ready To Move
                                    </p>
                                </div>
                                <h2 className="text-xl font-semibold text-slate-800">
                                    {property?.title}
                                </h2>
                                <p className="text-slate-600 text-sm flex items-center gap-2">
                                    <MapPin className="text-[#d95d0f]" size={16} />{" "}
                                    {property?.location}
                                </p>
                                <div className="flex justify-between items-center">
                                    <p className="text-slate-800 font-semibold pt-3">
                                        $ {property?.price}
                                    </p>
                                    <Link href={`/property/${property._id}`}>
                                        <Button size="sm">Details</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchResult;
