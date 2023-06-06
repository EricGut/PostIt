'use client'
import AddPost from "./components/AddPost"
import axios from "axios"
import {useQuery} from '@tanstack/react-query'
import Post from "./components/Posts"

// fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPost")
  return response.data
}


export default function Home() {
  const {data, error, isLoading} = useQuery({queryFn: allPosts, queryKey: ["posts"]})
  if(error) return error
  if(isLoading) return "loadingggg......"
  console.log(data);
  
  return (
    <main >
     <AddPost/>
     {data?.map((post) => (<Post key={post.id} name={post.user.name} avatar={post.user.image} id={post.id} postTitle={post.title}/>))}
    </main>
  )
}
