import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateScreen from "./Component/PrivateScreen";
import Account from "./pages/Account/Account";
import BlogDescription from "./pages/BlogDescription/BlogDescription";
import Blogs from "./pages/Blogs/Blogs";
import CompleteProfile from "./pages/CompleteProfile/CompleteProfile";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import EditBlog from "./pages/EditBlog/EditBlog";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AuthorProfile from "./pages/MyBlogs/AuthorProfile";
import MyBlogs from "./pages/MyBlogs/MyBlogs";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Setting from "./pages/Setting/Setting";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import UpdateProfilePic from "./pages/UpdateProfilePic/UpdateProfilePic";
import { fetchBlogs } from "./Store/Slice/AllBlogsSlice";
import { fetchUserProfile } from "./Store/Slice/UserAuthentication";
import Search from "./pages/Search/Search";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const blog = useSelector((state) => state.blog);
  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(theme);
  }, [theme]);
  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchUserProfile());

  }, [blog]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/update/password" element={<UpdatePassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<PrivateScreen />}>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/myblogs" element={<MyBlogs />}></Route>
            <Route path="/account" element={<Account />}></Route>
            <Route path="/create" element={<CreateBlog />}></Route>
            <Route path="/setting" element={<Setting />}></Route>
            <Route path="/blog/:id" element={<BlogDescription />}></Route>
            <Route path="/author/:id" element={<AuthorProfile />}></Route>
            <Route
              path="/uploadProfilePic"
              element={<UpdateProfilePic />}
            ></Route>
            <Route
              path="/completeProfile"
              element={<CompleteProfile />}
            ></Route>
            <Route path="/blogs" element={<Blogs />}></Route>
            <Route path="/blog/edit/:id" element={<EditBlog />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
