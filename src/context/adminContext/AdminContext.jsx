import React from 'react'
import {ApiClient} from "../Utils/ApiClient";

export function getUser() {
    const user = ApiClient.get("/user");

}