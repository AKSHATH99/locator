import React from 'react'

const SideBar = ({data}) => {
  return (
    <div className='flex flex-col max-h-96 overflow-y-auto'>
      {/* <p className='ml-3 text-[#92DE46]'>Results</p> */}
      <p className='text-sm ml-3 text-gray-500'>{data?.length} medical services nearby </p>
      {data.map((item) => (
        <div
          key={item.id}
          className="border-b border-gray-50 py-4 hover:bg-gray-100 hover:cursor-pointer transition-colors p-3"
        >
          <p className="text-lg font-medium text-[#92DE46] mb-2">{item.name}</p>

          {item.distance ? (
            <p className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 64 64"
                stroke-width="3"
                stroke="#9CA3AF"
                fill="none"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M17.94,54.81a.1.1,0,0,1-.14,0c-1-1.11-11.69-13.23-11.69-21.26,0-9.94,6.5-12.24,11.76-12.24,4.84,0,11.06,2.6,11.06,12.24C28.93,41.84,18.87,53.72,17.94,54.81Z"></path>
                  <circle cx="17.52" cy="31.38" r="4.75"></circle>
                  <path d="M49.58,34.77a.11.11,0,0,1-.15,0c-.87-1-9.19-10.45-9.19-16.74,0-7.84,5.12-9.65,9.27-9.65,3.81,0,8.71,2,8.71,9.65C58.22,24.52,50.4,33.81,49.58,34.77Z"></path>
                  <circle cx="49.23" cy="17.32" r="3.75"></circle>
                  <path d="M17.87,54.89a28.73,28.73,0,0,0,3.9.89"></path>
                  <path
                    d="M24.68,56.07c2.79.12,5.85-.28,7.9-2.08,5.8-5.09,2.89-11.25,6.75-14.71a16.72,16.72,0,0,1,4.93-3"
                    stroke-dasharray="7.8 2.92"
                  ></path>
                  <path d="M45.63,35.8a23,23,0,0,1,3.88-.95"></path>
                </g>
              </svg>
              {Math.trunc(item.distance)}m
            </p>
          ) : (
            ""
          )}

          {item.address && (
            <div className="flex items-start gap-2 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400 mt-0.5"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <p className="text-sm text-gray-600">{item.address}</p>
            </div>
          )}

          <div className="flex items-center gap-2 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <p className="text-sm text-gray-600">Phone: {item.phone}</p>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <p className="text-sm text-gray-600">
              Timing: {item.opening_hours}
            </p>
          </div>

          {item.website && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <a
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.website}
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SideBar
