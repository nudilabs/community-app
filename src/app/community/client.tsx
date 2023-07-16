'use client';
import { CommunityCard } from '@/components/community-card';
import { Search } from '@/components/search';
import Sort from '@/components/sort';
import { Community } from '@/types/community';
import { useEffect, useState } from 'react';

export default function Client({ communities }: { communities: Community[] }) {
  const [search, setSearch] = useState('');
  const [filteredCommunities, setCommunities] = useState(communities);

  useEffect(() => {
    setCommunities(
      communities.filter((community) =>
        community.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);
  return (
    <div className="min-w:h-screen flex flex-col lg:px-40 px-8 py-4 gap-24">
      <div className="flex flex-col">
        <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex gap-4 items-center">
            <h1 className="text-xl md:text-3xl font-extrabold">Communities</h1>
            <p className="text-gray-400">{communities.length}</p>
          </div>
          <div className="flex gap-2">
            {/* <div className="hidden md:block">
              <Sort />
            </div> */}
            <div className="w-full md:w-auto">
              <Search setSearch={setSearch} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-8">
          {filteredCommunities.map((community, index) => (
            <div className="col-span-12 lg:col-span-3" key={index}>
              <CommunityCard community={community} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
