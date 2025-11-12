import CameraIcon from '@svgs/camera.svg'
import AlbumsIcon from '@svgs/albums.svg'
import ShareIcon from '@svgs/share.svg'
import ValidationIcon from '@svgs/validation_fill.svg'
import ValidationNullIcon from '@svgs/validation_null.svg'
import BookmarkNullIcon from '@svgs/bookmark_null.svg'
import BookmarkIcon from '@svgs/bookmark.svg'
import LikeIcon from '@svgs/like.svg'
import LikeNullIcon from '@svgs/like_null.svg'
import InviteIcon from '@svgs/setting/invite.svg'
import VideoIcon from '@svgs/appicon/live.svg'
import FriendsIcon from '@svgs/setting/friends.svg'
import FriendsFollowIcon from '@svgs/following.svg'
import { getAge } from '../../../utils/constant/Constant'

export const profileButtons = (data: any, isUser: boolean, Navigation: any, setActiveKey: (key: string) => void) => [

    ...(isUser
        ? [
            {
                id: 1,
                label: "Non-Adult",
                icon: CameraIcon,
                size: 13,
                onPress: () => setActiveKey("pictures"),
                count: 0,

            },
            {
                id: 2,
                label: "Adult",
                icon: CameraIcon,
                size: 13,
                onPress: () => setActiveKey("pictures"),
                count: 0,

            },
            {
                id: 3,
                label: "Videos",
                icon: VideoIcon,
                size: 16,
                onPress: () => setActiveKey("videos"),
                count: 0,

            },
            {
                id: 4,
                label: "Albums",
                icon: AlbumsIcon,
                size: 14,
                onPress: () => setActiveKey("album"),
                count: 0,
            },
            {
                id: 5,
                label: "All Friends",
                icon: FriendsIcon,
                size: 13,
                onPress: () => Navigation.navigate("FriendsScreen"),
                count: data?.friendCount ?? 0,
            },
            {
                id: 6,
                label: "Share",
                icon: ShareIcon,
                size: 13,
                onPress: () => console.log("Share pressed"),
                count: null,
            },
            {
                id: 7,
                label: "Invite",
                icon: InviteIcon,
                size: 11,
                onPress: () => console.log("Invite pressed"),
                count: 0,
            },
        ]
        : []),
    ...(!isUser
        ? [
            {
                id: 8,
                label: "Non-Adult",
                icon: CameraIcon,
                size: 13,
                onPress: () => console.log("Non-Adult pressed"),
                count: 0,

            },
            {
                id: 9,
                label: "Adult",
                icon: CameraIcon,
                size: 13,
                onPress: () => console.log("Adult pressed"),
                count: 0,

            },
            {
                id: 10,
                label: "Videos",
                icon: VideoIcon,
                size: 16,
                onPress: () => console.log("Videos pressed"),
                count: 0,

            },
            {
                id: 11,
                label: "Like",
                icon: LikeIcon,
                size: 12,
                onPress: () => console.log("Videos pressed"),
                count: null,
            },
            {
                id: 12,
                label: "Like",
                icon: LikeNullIcon,
                size: 13,
                onPress: () => console.log("Videos pressed"),
                count: null,
            },
            {
                id: 13,
                label: "Remembered",
                icon: BookmarkIcon,
                size: 13,
                onPress: () => console.log("Validation pressed"),
                count: null,
            },
            {
                id: 14,
                label: "Remembered",
                icon: BookmarkNullIcon,
                size: 13,
                onPress: () => console.log("Validation pressed"),
                count: null,
            },
            {
                id: 15,
                label: "Validation",
                icon: ValidationIcon,
                size: 13,
                onPress: () => console.log("Validation pressed"),
                count: null,
            },
            {
                id: 16,
                label: "Validation",
                icon: ValidationNullIcon,
                size: 13,
                onPress: () => console.log("Validation pressed"),
                count: null,
            },
            {
                id: 17,
                label: "Friends",
                icon: FriendsIcon,
                size: 13,
                onPress: () => console.log("Friends pressed"),
                count: null,
            },
            {
                id: 18,
                label: "Friends",
                icon: FriendsFollowIcon,
                size: 12,
                onPress: () => console.log("Friends pressed"),
                count: null,
            },
        ]
        : []),
];

const getExperienceLevel = (levelObj: any) => {
    if (!levelObj) return "--";
    const activeKey = Object.keys(levelObj).find(key => levelObj[key] === true);
    // Capitalize the first letter
    return activeKey ? activeKey.charAt(0).toUpperCase() + activeKey.slice(1) : "--";
};

export const ProfileContentData = (data: any) => [
    { label: "Age", char: getAge(data?.partner?.dateOfBirth), parm: getAge(data?.dateOfBirth) },
    { label: "Body Hair", char: data?.partner?.bodyHair?.length > 0 ? data?.partner?.bodyHair.join(", ") : "--", parm: data.bodyHair?.length > 0 ? data.bodyHair.join(", ") : "--" },
    { label: "Height", char: data?.partner?.height ?? "--", parm: data?.height ?? "--" },
    { label: "Weight", char: data?.partner?.weight ?? "--", parm: data?.weight ?? "--" },
    { label: "Body type", char: data?.partner?.bodyType ?? "--", parm: data?.bodyType ?? "--" },
    { label: "Ethnic background", char: data?.partner?.ethnicBackground ?? "--", parm: data?.ethnicBackground ?? "--" },
    { label: "Smoking", char: data?.partner?.smoking ?? "--", parm: data?.smoking ?? "--" },
    { label: "Piercings", char: data?.partner?.piercings ?? "--", parm: data?.piercings ?? "--" },
    { label: "Tattoos", char: data?.partner?.tattoos ?? "--", parm: data?.tattoos ?? "--" },
    { label: "Languages Spoken", char: data?.partner?.languagesSpoken?.length > 0 ? data?.partner?.languagesSpoken.join(", ") : "--", parm: data?.languagesSpoken?.length > 0 ? data?.languagesSpoken.join(", ") : "--" },
    { label: "Looks are important?", char: data?.partner?.looksAreImportant?.replaceAll("_", " ") ?? "--", parm: data?.looksAreImportant?.replaceAll("_", " ") ?? "--" },
    { label: "Intelligence is important?", char: data?.partner?.intelligenceIsImportant?.replaceAll("_", " ") ?? "--", parm: data?.intelligenceIsImportant?.replaceAll("_", " ") ?? "--" },
    { label: "Sexuality", char: data?.partner?.sexuality?.replaceAll("_", " ") ?? "--", parm: data?.sexuality?.replaceAll("_", " ") ?? "--" },
    { label: "Relationship status", char: data?.partner?.relationshipOrientation?.replaceAll("_", " ") ?? "--", parm: data?.relationshipOrientation?.replaceAll("_", " ") ?? "--" },
    { label: "Experience level", char: getExperienceLevel(data?.partner?.experienceLevel), parm: getExperienceLevel(data?.experienceLevel) },
];