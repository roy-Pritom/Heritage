"use client"
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Search } from "lucide-react";
import React, { useState } from "react";
import SearchResult from "./SearchResult";
import { locations, propertyType } from "@/constants";

const BuySearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [isSearch, setIsSearch] = useState<boolean>(false);
  return (
    <div className="lg:w-1/2 w-full md:px-0 px-20 mx-auto">
      <div className="bg-white shadow md:p-12 p-3 py-5 space-y-3 rounded-md">
        <div className="flex items-center gap-3">
          <h1 className="text-base text-slate-800">Buy</h1>
          <h1 className="text-base text-slate-800">Rent</h1>
          <h1 className="text-base text-slate-800">PG</h1>
          <h1 className="text-base text-slate-800">Plot</h1>
        </div>
        <div>
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            startContent={<Search />}
            placeholder="Search Properties"
          />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          <div>
            <h1 className="text-base text-slate-800">Your Location</h1>
            <Select
              items={locations}
              placeholder="Select location"
              className="max-w-xs"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {(item) => <SelectItem value={item.label} key={item.label}>{item.label}</SelectItem>}
            </Select>
          </div>
          <div>
            <h1 className="text-base text-slate-800">Property Type</h1>
            <Select
              items={propertyType}
              placeholder="Select type"
              className="max-w-xs"
              value={type}
              onChange={(e) => setType(e.target.value)} // Correct handler to update state
            >
              {(item) => <SelectItem value={item.label} key={item.label}>{item.label}</SelectItem>}
            </Select>
          </div>
          <div>
            <h1 className="text-base text-slate-800">Budget</h1>
            <Input
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Max Price"
              type="number"
            />
          </div>
        </div>
        <button
          onClick={() => setIsSearch(true)}
          className="py-2 px-5 w-full bg-[#0059b1] rounded text-white flex items-center justify-center gap-3 mx-auto md:mx-0"
        >
          <Search /> Find Property
        </button>
      </div>
      <SearchResult
        searchTerm={searchTerm}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        budget={budget}
        location={location}
        type={type}
      />
    </div>
  );
};

export default BuySearch;
