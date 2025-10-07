import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";

export default function PasswordInfoCard() {
  return (
    <div className="space-y-4">
      <Label className={"text-xs"}>Update Password</Label>
      <Item variant="destructive" className="-mt-2 max-w-lg">
        <ItemMedia>
          <InfoIcon className="text-warning-foreground size-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-warning-foreground">
            Password Change Disabled
          </ItemTitle>
          <ItemDescription>
            To change your password, please contact your administrator. This
            helps maintain security and ensures proper access control.
          </ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}
