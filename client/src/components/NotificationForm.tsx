import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function NotificationForm() {
  const [notificationText, setNotificationText] = useState("");
  const [parsedResult, setParsedResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (notificationText == "") {
      toast.error("Typing title for analyze");
      return;
    }
    setIsLoading(true);
    let data = JSON.stringify(notificationText);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5062/api/notification/parse",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setParsedResult(response.data);
        toast.success(`Receive channels: ${response.data}`);
        setIsLoading(false);
      })
      .catch((_) => {
        toast.error("Error to sent notification");
      });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-4">
      <CardHeader>
        <div>
          <div className="text-2xl font-semibold">
            Notification Channel Parser
          </div>
          <div>We will parse it in the background and show you the result.</div>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            type="text"
            size="lg"
            placeholder="Enter title for analyze"
            value={notificationText}
            onChange={(e) => setNotificationText(e.target.value)}
            required
          />
          <Button
            type="submit"
            disabled={isLoading}
            variant="solid"
            color="primary"
            size="lg"
          >
            {isLoading ? "Parsing..." : "Parse Notification"}
          </Button>
        </form>
      </CardBody>
      {parsedResult && (
        <CardFooter>
          <div className="w-full flex space-x-2">
            <h3 className="text-lg font-semibold mb-2">Receive channels:</h3>
            <p className="text-red-600 text-lg">{parsedResult}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
