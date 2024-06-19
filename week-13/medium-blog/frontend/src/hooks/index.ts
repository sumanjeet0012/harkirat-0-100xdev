import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBlog = (id: number) => {
    const [loading , setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTB9.2EiH7Zxs0v4r0LLFFBtb1FL4Ag6fnmy1BNM8yAA_e2o`
            }
        }).then((res) => {
            setBlog(res.data.blog);
            setLoading(false);
        })
    }, [])

    return { loading, blog };
}

export const useBlogs = () => {
    const [loading , setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTB9.2EiH7Zxs0v4r0LLFFBtb1FL4Ag6fnmy1BNM8yAA_e2o`
            }
        }).then((res) => {
            console.log(res.data.blog)
            setBlogs(res.data.blog);
            setLoading(false);
        })
    }, [])

    return { loading, blogs };
}