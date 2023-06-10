export const getPosts = () => {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    _id,
    name,
    content,
    _createdAt,
    avatar
  }`;
  return query;
};

export const getPost = (id: any) => {
  const query = `*[_type == "post" && _id == "${id}"] {
      _id,
      name,
      content,
      _createdAt,
      avatar,
      userId
    }`;
  return query;
};

export const getComments = (id: any) => {
  const query = `*[_type == "comment" && postId == "${id}"] | order(_createdAt desc) `;
  return query;
};

export const getUserPosts = (id: any) => {
  const query = `*[_type == "post" && userId == "${id}"] | order(_createdAt desc) {
    _id,
    name,
    content,
    _createdAt,
    avatar,
    userId
  }`;
  return query;
};
