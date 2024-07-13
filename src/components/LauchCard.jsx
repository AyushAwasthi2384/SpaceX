import React from 'react';

export default function LaunchCard({ launch }) {
    return (
        <div className="card bg-gray-800 text-white p-4 rounded-lg shadow-lg flex">
            {launch.links.mission_patch && (
                <img
                    src={launch.links.mission_patch}
                    alt={`${launch.mission_name} mission patch`}
                    className="mt-4 w-16 h-16 object-cover mx-auto"
                />
            )}
            <div className='w-[60%]'>
                <h1 className="text-xl font-bold mb-2">{launch.mission_name}</h1>
                <p className="text-sm text-gray-400 mb-1">
                    <span className="font-semibold">Launch Date:</span> {new Date(launch.launch_date_local).toLocaleDateString('en-GB')}
                </p>
                <p className="text-sm text-gray-400 mb-1">
                    <span className="font-semibold">Rocket:</span> {launch.rocket.rocket_name}
                </p>
                <p className="text-sm text-gray-400 mb-1">
                    <span className="font-semibold">Launch Site:</span> {launch.launch_site.site_name}
                </p>
            </div>
        </div>
    );
}
