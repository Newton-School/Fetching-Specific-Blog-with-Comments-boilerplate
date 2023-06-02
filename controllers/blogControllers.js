const Blog   = require("../models/blog.js");
const Comment= require("../models/comment.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'NEWTONSCHOOL';


const getAllBlog =async (req, res) => {

    const allBlog = await Blog.find({});
    res.status(200).json({
        status: "success",
        data: allBlog
    })
   
}

const createBlog = async (req, res) => {

    const {heading, body, tags, token } = req.body;
    try{
        if(!token){
            res.status(401).json({
                status: 'fail',
                message: 'Missing token'
            });
        }
        let decodedToken;
        try{
            decodedToken = jwt.verify(token, JWT_SECRET);
        }catch(err){
            res.status(401).json({
                status: 'fail',
                message: 'Invalid token'
            });
        }
        const newBlog = {
            heading,
            body,
            tags,
            creator_id : decodedToken.userId
        };
        const blog = await Blog.create(newBlog);
        res.status(200).json({
            message: 'Blog added successfully',
            blog_id: blog._id,
            status: 'success'
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}


const deleteBlog = async (req, res) => {

    const id = req.params.id;

    const blog = await Blog.findById(id);
    if(!blog)
    {
        res.status(404).json({
            status: 'fail',
            message: "Given Blog doesn't exist"
        })
    }

    try{
        await Blog.findByIdAndDelete(id);
        res.status(200).json({
            status: 'success',
            message: 'Blog deleted successfully'
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}

const updateBlog = async (req, res) => {

    const id = req.params.id;

    const blog = await Blog.findById(id);
    if(!blog)
    {
        res.status(404).json({
            status: 'fail',
            message: "Given Blog doesn't exist"
        })
    }

    try{
        await Blog.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Blog updated successfully'
        })
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    };

}

/*

getBlog Controller

Get the blog with given id in req.params.
The blog should contain an Array of comments object for that blog.
The comment object should contain _id, content, authorId, and blogId for every comment for that Blog.
Response --> 

1. Success

200 Status code
json = {
  status: 'success',
  data: {
    heading,
    body,
    creator_id,
    tags,
    comments:[
        {
            _id,
            content,
            authorId,
            blogId
        }
    ]
  }
}

2. Blog Doesnot exist

404 Status Code
json = {
    status: 'fail',
    message: "Given Blog doesn't exist"
}

3. Something went wrong

500 Status Code
json = {
    status: 'fail',
    message: 'Something went Wrong'
}

*/

const getBlog = async (req, res) => {

    const id = req.params.id;

    try{
        //Write your code here.
    }catch(err){
        res.status(200).json({
            status: 'fail',
            message: "Something went Wrong"
        })
    }

}

module.exports = { getAllBlog, getBlog, createBlog, deleteBlog, updateBlog };
