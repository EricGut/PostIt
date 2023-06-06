'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, {AxiosError} from "axios"
import toast from 'react-hot-toast'
import { BeatLoader } from "react-spinners"
let toastPostId: string

export default function CreatePost(){
    const [title, setTitle] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // Create post
    const {mutate} = useMutation(
        async (title: String) => await axios.post('/api/posts/addPost', {title}),
        {
            onError: (error) => {
                console.log(error);
                if(error instanceof AxiosError){
                    toast.error(error?.response?.data.message, {id: toastPostId})
                }
                setIsLoading(false)
            },
            onSuccess: (data) =>{
                toast.success('Post has been made 🔥', {id: toastPostId})
                setTitle('')
                setIsLoading(false)
            }
        }
    )

    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault()
        toastPostId = toast.loading("Creating post", {id: toastPostId})
        setIsLoading(true)
        mutate(title)
    }
    return(
        <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea onChange={(e) => setTitle(e.target.value)} 
                name="title" 
                value={title} 
                id=""
                placeholder="What's on your mind?"
                className="p-4 text-lg rounded-md my-2 bg-gray-200 resize-none"
                ></textarea>
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className={`font-bold text-sm ${title.length > 100 ? "text-red-700" : "text-gray-700"}`}>{`${title.length}/100`}</p>
                <button
                className="disabled:opacity-20 text-sm bg-teal-600 text-white py-2 px-4 rounded-md"
                type="submit"
                >{isLoading? (<BeatLoader 
                    color="#ffff" 
                    size={6}
                />) : "Create post"}</button>
            </div>
        </form>
    )
}