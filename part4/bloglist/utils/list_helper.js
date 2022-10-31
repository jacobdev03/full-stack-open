const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  let mostFavorited = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > mostFavorited.likes) {
      mostFavorited = blog;
    }
  });
  return mostFavorited;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
