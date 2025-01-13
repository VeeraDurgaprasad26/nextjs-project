'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const Dashboard = () => {
  const router = useRouter();
  const btnClick = () => {
    router.push('/user/signup');
  }
  const handleClick = () => {
    router.push('/user/login');
  }

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", fontSize: 30, fontWeight: "bold", marginBottom: 40 }}>
          Welcome to our world
        </h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button
          type="submit"
          onClick={btnClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Signup
        </button>
        <button
          type="submit"
          onClick={handleClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </div>
    </>
  );
}

export default Dashboard;
