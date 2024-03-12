import React, { useEffect, useState } from "react";
// Bootstrap
import "../../../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

// import css
import "./css/userProfile.css";

// Data Fecthing Through API
import userData from "../../../data/usersData";
import { useDispatch, useSelector } from "react-redux";
import { Profile } from "../../../redux/UsersSlice";
import toast from "react-hot-toast";
import { token } from "../../../utils/GlobalFunctions";
import { Button, Input, Stack } from "@chakra-ui/react";

const UserProfile = () => {
 
  const url = process.env.REACT_APP_URL;

  const dispatch = useDispatch();

  const user = useSelector(state => state.users.user);
  const posts = useSelector(state => state.users.posts);

  console.log('user ',user);

  useEffect(() => {
    dispatch(Profile());
  }, [dispatch]);
  
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload =async () => {
    // You can now use the 'file' state to upload the file to your server
    // console.log('File:', file);

    const formData = new FormData();
    formData.append('file',file);

    const res = await fetch(`${url}/api/v1/user/update-profile`,{
      method : 'PUT',
      headers : {
        'auth-token':token
      },
      body : formData
    })

    const data = await res.json();

    console.log('data ',data);

    if(data?.success === false){
      toast.error(data?.msg);
      return;
    }

    toast.success(data?.msg);

    // setLoading(fals)
    setFile(null);

    Profile();

  };

  return (
    <div>
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7 ">
              <div className="card profile_card">
                <div
                  className="rounded-top text-white d-flex flex-row mannual_profile_header bg-dark"
                  style={{ backgroundColor: "#000", height: 300 }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: 150 }}
                  >
                    <img
                      src={user?.avatar?.url}
                      alt="random_images"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: 150, zIndex: 1 }}
                    />
                        <Stack spacing={4}>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Edit Pic</Button>
    </Stack>

                  </div>
                  <div className="ms-3" style={{ marginTop: 130 }}>
                    <h5>{user?.name}</h5>
                    <p>{user?.location}</p>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div className="px-3">
                      <p className="mb-1 h5">{posts?.length}</p>
                      <p className="small text-muted mb-0">Posts</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">{user?.connections?.length}</p>
                      <p className="small text-muted mb-0">Connections</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <p className="font-italic mb-1">{user?.experiences?.[0]}</p>
                      <p className="font-italic mb-1">Lives in {user?.location}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent Post</p>
                  </div>
                  <div className="row g-2">
                    {/* {posts?.map((post, index) => {
                      return (
                        <div className="col-xl-6 mb-2" key={index}>
                          <img
                            src={post?.a}
                            alt="img1"
                            className="w-100 rounded-3"
                          />
                        </div>
                      );
                    })} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
