import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setLoading, SetUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setopen }) => {
  const [loading, seLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, SetInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map(skill => skill) || "",
    file: user?.profile?.resume || "",
  });
  const dispatch = useDispatch();
  const Handleinput = (e) => {
    SetInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleFileData = (e) => {
    // 2️⃣ ?. (Optional Chaining) ka kya kaam hai? Yeh check karta hai ki e.target.files exist karta hai ya nahi.
    // Agar files undefined hai, to error throw nahi karega, balki undefined return karega.
    const file = e.target.files?.[0];
    SetInput({ ...input, file });
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
      formData.append("fullname", input.fullname),
      formData.append("email", input.email),
      formData.append("phoneNumber", input.phoneNumber),
      formData.append("bio", input.bio),
      formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      seLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(SetUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      seLoading(false);
    }
    setopen(false);
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setopen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={SubmitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name :
                </Label>
                <Input
                  onChange={Handleinput}
                  id="fullname"
                  type="text"
                  value={input.fullname}
                  placeholder="Enter Name"
                  name="fullname"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email :
                </Label>
                <Input
                  id="email"
                  type="email"
                  onChange={Handleinput}
                  value={input.email}
                  placeholder="Enter Email"
                  name="email"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Number :
                </Label>
                <Input
                  id="phoneNumber"
                  type="number"
                  onChange={Handleinput}
                  value={input.phoneNumber}
                  name="phoneNumber"
                  placeholder="Enter Number"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio :
                </Label>
                <Input
                  id="bio"
                  onChange={Handleinput}
                  value={input.bio}
                  name="bio"
                  placeholder="Enter Bio"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills :
                </Label>
                <Input
                  id="skills"
                  onChange={Handleinput}
                  value={input.skills}
                  name="skills"
                  placeholder="Enter Skills"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume :
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf" 
                  onChange={handleFileData}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
