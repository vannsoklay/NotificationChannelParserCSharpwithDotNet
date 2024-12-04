import { AddTag } from "@/components/AddTag";
import NotificationForm from "@/components/NotificationForm";
import { Card, CardHeader, Chip } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [tags, setTags] = useState([]);
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:5062/api/notification/tags",
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      setTags(response.data);
      // console.log(JSON.stringify(response.data));
    })
    .catch((_) => {
      setTags([]);
    });

  return (
    <main className="container mx-auto p-4 h-screen flex items-center justify-center">
      <div className="space-y-4">
        <div className="flex justify-end">
          <AddTag />
        </div>
        <NotificationForm />
        <div className="space-x-2 space-y-4">
          <Card>
            <CardHeader className="font-semibold text-lg">Tags</CardHeader>
            <div className="flex space-x-2 pb-4 px-4">
              {tags.map((tag, idx) => (
                <Chip variant="flat" color="secondary" key={idx}>
                  {tag}
                </Chip>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
