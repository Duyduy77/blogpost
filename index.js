const express = require("express");
const cors = require("cors");
const { BlogPosts } = require("./BlogPosts");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/posts", (req, res) => {
  res.send(BlogPosts);
});

app.get("/api/posts/:slug", (req, res) => {
  const { slug } = req.params;

  const post = BlogPosts.find((p) => p.slug == slug);
  if (!post) {
    return res.status(404).send({ message: "Không tìm thấy bài viết" });
  }
  res.send(post);
});

app.post("/api/posts", (req, res) => {
  const { slug, description, title } = req.body;

  if (!slug || !title || !description) {
    return res.status(400).send({ message: "Thiếu thông tin bài viết" });
  }
  const newPost = { slug, title, description };
  BlogPosts.push(newPost);

  res.status(201).send({ message: "Đã thêm bài viết mới", post: newPost });
});

const user = {
  username: "admin",
  password: "123456",
};

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "Thiếu thông tin đăng nhập" });
  }
  if (username == user.username && password == user.password) {
    return res.send({ message: "Đăng nhập thành công" });
  }
  res.status(401).send({ message: "Sai tài khoản hoặc mật khẩu" });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
