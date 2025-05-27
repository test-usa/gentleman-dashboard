import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const History = () => {
  return (
    <div>
      <Button onClick={() => toast.success("Settings saved successfully!")}>
      History
      </Button>
    </div>
  );
};

export default History;
