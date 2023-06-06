'use client'

import { useState } from "react"

export default function CreatePost(){
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    return(
        <form className="bg-white my-8 p-8 rounded-md">
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
                disabled={isDisabled}
                className="disabled:opacity-20 text-sm bg-teal-600 text-white py-2 px-4 rounded-md"
                type="submit"
                >Create post</button>
            </div>
        </form>
    )
}