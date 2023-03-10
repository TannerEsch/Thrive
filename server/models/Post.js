const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    UserID: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    group: String,
    content: String,
    likes: [{type: mongoose.Schema.Types.ObjectId,ref: 'Like' }],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    bookmarks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bookmark'}],
    sourced: [{type: mongoose.Schema.Types.ObjectId, ref: 'Resource'}],
    image: {type: String},
    niche: {type: String},
    subNiche: {type: String},
    date: {
        type: Date,
        default: Date.now()
    },
    
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;