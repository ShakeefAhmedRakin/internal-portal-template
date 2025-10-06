import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { MoreVertical } from "lucide-react";

export default function UserTableActionsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon-sm" className="mt-2">
          <MoreVertical />
        </Button>
      </DialogTrigger>
    </Dialog>
  );
}
