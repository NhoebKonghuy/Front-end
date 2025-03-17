import { getUser } from "../context/user/UserAction";
import React from 'react'

const UseAuth = async () => {
    try {
        const res = await getUser();
        return (await res) !== undefined;
      } catch (error) {
        console.error("Error checking user authentication:", error);
        return false;
      }
}

export default UseAuth


