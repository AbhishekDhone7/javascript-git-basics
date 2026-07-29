import React from 'react';
import './PostCard.css';

function PostCard({ title, description, author, time, likes, comments, category, image }) {
  return (
    <article className="feed-post-card">
      <header>
        <div className="author-row">
          <img src={author?.profileImage || 'https://i.pravatar.cc/100?img=40'} alt={author?.name || 'user'} />
          <div>
            <h4>{author?.name || 'Unknown Author'}</h4>
            <p>{author?.department || 'Department'}</p>
          </div>
        </div>
        <span>{time}</span>
      </header>
      <h3>{title}</h3>
      <p>{description}</p>
      {image ? <img className="cover" src={image} alt={title} /> : null}
      <footer>
        <div className="meta">{likes} likes · {comments} comments</div>
        <span className="tag">{category}</span>
      </footer>
    </article>
  );
}

export default PostCard;