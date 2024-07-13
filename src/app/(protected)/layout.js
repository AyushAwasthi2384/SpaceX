"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../lib/features/auth/authSlice';

const ProtectedLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.userData === null && !auth.isLoading) {
      dispatch(fetchUser());
    }
  }, [auth.userData, auth.isLoading, dispatch]);

  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.status) {
        router.replace("/");
      } else {
        router.replace("/home");
      }
    }
  }, [auth.isLoading, auth.status, router]);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }
  if (!auth.status) {
    return null;
  }
  return children;
};

export default ProtectedLayout;

