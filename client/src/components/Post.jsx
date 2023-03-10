import React, {useContext, useRef, useParams} from 'react'
import { DataContext } from '../App';
import defaultpfp from '../assets/defaultpfp.png'
import axios from 'axios';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import {BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { GrResources } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const Post = (props) => {
  //context
  const {currentUser} = useContext(DataContext)
  //props
  const {postID, niche, subNiche, image, posterID, displayName, username, bookmarks, comments, likes, datePosted, content, sourced, pfp} = props
  //refs
  const likeRef = useRef(<AiOutlineHeart />)
  const likeNum = useRef(likes?.length)
//  console.log(pfp)
  const bookmarkRef = useRef(<BsBookmark />)
  const bookmarkNum = useRef(bookmarks?.length)

  const commentsNum = useRef(comments?.length)
  const resourcesNum = useRef(sourced?.length)

  //navigate
  const navigate=useNavigate()
   
  function nav(id) {
    navigate(`/post/${id}`)
  }

  const handleLike = () => {
    likeRef.current = <AiFillHeart />
    likeNum.current = likeNum.current + 1
    axios.put(`http://localhost:8000/post/like/${postID}/${currentUser.id}/${posterID}`)
    navigate('/')
  }

  const handleAddResource = () => {
    const link = {'link':`http://127.0.0.1:5173/post/${postID}` }
    resourcesNum.current = resourcesNum.current + 1
    axios.put(`http://localhost:8000/post/resource/${postID}/${currentUser.id}/${posterID}`, link )
    navigate('/')
  }

  const handleBookmark = () => {
    bookmarkNum.current = bookmarkNum.current + 1
    bookmarkRef.current = <BsFillBookmarkFill />
    axios.put(`http://localhost:8000/post/bookmark/${postID}/${currentUser.id}/${posterID}`)
    navigate('/')
  }

  return (
    <>
    <div className='bg-white border-gray-400 border-[1px] h-fit z-10'>
    <div className='flex w-[100%] gap-2 m-5'>
      
    <img src={pfp? pfp.pfp? pfp.pfp:pfp:defaultpfp} alt='' onClick={(e) => navigate(`/profile/${posterID}`)} className='border-black border-[1px] h-16 w-16 rounded-[50%]'/>
    <div>
      <div className='flex gap-2'>
    <h2 onClick={(e) => navigate(`/profile/${posterID}`)} className='font-bold'>{username? username: null}</h2>
    {niche? niche == "false"? null: <h2 className={`font-semibold ${niche=="Math"?'bg-blue-300':niche == 'Engineering'? 'bg-orange-300': niche=="Science"? "bg-purple-300":niche=="Data"? "bg-red-400": 'bg-yellow-200'} rounded-xl text-sm p-1 text-center shadow-xl`}>{niche}</h2> : null}
    {subNiche? subNiche == "false"? null: <h2 className='font-semibold bg-green-300 rounded-xl text-sm p-1 text-center shadow-xl'>{subNiche}</h2> : null}
      </div>
    <h2 onClick={(e) => navigate(`/profile/${posterID}`)} className='font-semibold'>@{displayName? displayName: null}</h2>
    
    </div>
    <div className='ml-auto mr-8'><BsThreeDots /></div>
    </div>
    
    <div className="px-4 cursor-pointer" onClick={() => nav(postID) }>{content}</div>
    {image? <img src={image} className="w-[70%] mx-auto"/> : null}

    <div className='flex pl-4 gap-10 mt-4 mb-1 border-t-[1px] border-t-gray-200'>
    <div className='flex gap-2 text-xl'>
    <div className='mt-1 cursor-pointer' onClick={handleLike}>{likeRef.current}</div>
    <div className='text-sm'> {likeNum.current}</div>
    </div>
    <div className='flex gap-2 text-xl'>
    <div className='mt-1 cursor-pointer'><FaRegCommentDots/></div>
    <div className='text-sm'>{commentsNum.current}</div>
    </div>
    <div className='flex gap-2 text-xl'>
    <div className='mt-1 cursor-pointer' onClick={handleAddResource}><GrResources/></div>
    <div className='text-sm'>{resourcesNum.current}</div>
    </div>
    <div className='flex relative gap-2 text-xl'>
    <div className='mt-1 cursor-pointer' onClick={handleBookmark}>{bookmarkRef.current}</div>
    <div className='text-sm'>{bookmarkNum.current}</div>
    </div>
    </div>
    </div>


  
  
  </>
  )
}

export default Post