import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.api";

export function useUser(){
    return useQuery({
        queryKey:["currentUser"],
        queryFn:getCurrentUser,
    })
}