import CameraIcon from '@svgs/camera.svg'
import AlbumsIcon from '@svgs/albums.svg'
import ShareIcon from '@svgs/share.svg'
import InviteIcon from '@svgs/setting/invite.svg'
import VideoIcon from '@svgs/appicon/live.svg'
import FriendsIcon from '@svgs/setting/friends.svg'

export const profileButtons = [
  {
    id: 1,
    label: "Adult",
    icon: CameraIcon,
    size: 15,
    onPress: () => console.log("Adult pressed"),
  },
  {
    id: 2,
    label: "Non-Adult",
    icon: CameraIcon,
    size: 15,
    onPress: () => console.log("Non-Adult pressed"),
  },
  {
    id: 3,
    label: "Friends",
    icon: FriendsIcon,
    size: 15,
    onPress: () => console.log("Friends pressed"),
  },
  {
    id: 4,
    label: "Albums",
    icon: AlbumsIcon,
    size: 17,
    onPress: () => console.log("Albums pressed"),
  },
  {
    id: 5,
    label: "Videos",
    icon: VideoIcon,
    size: 20,
    onPress: () => console.log("Videos pressed"),
  },
  {
    id: 6,
    label: "Share",
    icon: ShareIcon,
    size: 15,
    onPress: () => console.log("Share pressed"),
  },
  {
    id: 7,
    label: "Invite",
    icon: InviteIcon,
    size: 14,
    onPress: () => console.log("Invite pressed"),
  },
];

export const ProfileContentData = [
    { label: "Age", char: "57", parm: "57" },
    { label: "Body Hair", char: "Shave, Smooth", parm: "Shave, Smooth" },
    { label: "Height", char: "5'4 - (163cm)", parm: "5'4 - (163cm)" },
    { label: "Weight", char: "148 lb (67 kg)", parm: "148 lb (67 kg)" },
    { label: "Body type", char: "Average", parm: "Average" },
    { label: "Ethnic background", char: "Indian", parm: "Indian" },
    { label: "Smoking", char: "No", parm: "No" },
    { label: "Piercings", char: "No", parm: "No" },
    { label: "Tattoos", char: "None", parm: "None" },
    { label: "Languages Spoken", char: "English", parm: "English" },
    { label: "Looks are important?", char: "Low Importance", parm: "Low Importance" },
    { label: "Intelligence is important?", char: "Very Important", parm: "Very Important" },
    { label: "Sexuality", char: "Bi-sexual", parm: "Bi-sexual" },
    { label: "Relationship status", char: "Swinger", parm: "Swinger" },
    { label: "Experience level", char: "Advanced", parm: "Advanced" },
];