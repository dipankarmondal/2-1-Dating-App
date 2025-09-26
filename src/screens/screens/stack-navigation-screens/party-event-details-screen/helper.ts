import { ms } from "../../../../utils/helpers/responsive";
import LockIcon from "@svgs/setting/lock.svg";
import InviteIcon from "@svgs/setting/invite.svg";
import TimeIcon from "@svgs/setting/time.svg";
import MembershipIcon from "@svgs/setting/invite.svg";
import ShareIcon from "@svgs/share.svg";

export const Buttons = [
    {
        name: "Private Guest list",
        icon: LockIcon,
        size: ms(15),
        onPress: () => {
            console.log("Private Guest list pressed");
        }
    },
    {
        name: "Invite myself",
        icon: InviteIcon,
        size: ms(15),
        onPress: () => {
            console.log("Invite myself pressed");
        }
    },
    {
        name: "Share",
        icon: ShareIcon,
        size: ms(15),
        onPress: () => {
            console.log("Share pressed");
        }
    },
    {
        name: "Validations",
        icon: MembershipIcon,
        size: ms(15),
        onPress: () => {
            console.log("Validations pressed");
        }
    },
    {
        name: "Remember",
        icon: TimeIcon,
        size: ms(15),
        onPress: () => {
            console.log("Remember pressed");
        }
    },
];