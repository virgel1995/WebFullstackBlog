import Axios from "axios";
import { API, getToken } from "./";

export const SignIn = (name, password) => {
  return Axios.post(API + "/Login", {
    name,
    password,
  });
};

export const SignUp = (name, password, gender, age) => {
  return Axios.post(API + "/updateOrCreate", {
    name,
    password,
    gender,
    age,
  });
};
export const updateUser = (id, name, gender, age) => {
  return Axios.post(API + "/updateOrCreate", {
    id,
    name,
    gender,
    age,
  });
};
export const updatePassword = (id, name, password, gender, age) => {
  return Axios.post(API + "/updateOrCreate", {
    id,
    name,
    password,
    gender,
    age,
  });
};
export const getUserDetails = () => {
  return Axios.post(
    API + "/profile",
    {
      token: getToken(),
    },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

export const createPost = (title, desc) => {
  return Axios.post(
    API + "/Blogs/updateOrCreate",
    {
      title: title,
      text: desc,
    },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};
export const updatePost = (id, title, desc) => {
  return Axios.post(
    API + "/Blogs/updateOrCreate",
    {
      id: id,
      title: title,
      text: desc,
    },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

export const getPosts = () => {
  return Axios.get(API + `/Blogs`);
};

export const createComment = (id, comment) => {
  return Axios.post(
    API + "/Blogs/Comments/create",
    {
      blog_id: id,
      text: comment,
    },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

export const getComments = (Blog_id) => {
  return Axios.get(API + `/Blogs/Comments?Blog_id=${Blog_id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const tagAdd = (blog_id, tag) => {
  return Axios.post(
    API + `/Blogs/Tags/updateOrCreate`,
    {
      blog_id: blog_id,
      name: tag,
    },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

export const tagUpdate = (blog_id, tag, id) => {
  return Axios.post(
    API + `/Blogs/Tags/updateOrCreate`,
    {
      blog_id: blog_id,
      name: tag,
      id: id,
    },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};
