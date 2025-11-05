export const CategoriesFilter = [
    { key: "social", value: "Social" },
    { key: "dating", value: "Dating" },
    { key: "events", value: "Events" },
    { key: "business", value: "Business" },
    { key: "lifestyle", value: "Lifestyle" },
    { key: "hobbies", value: "Hobbies" },
    { key: "other", value: "Other" },
];

export const GroupTypesFilter = [
    { key: "open", value: "Open" },
    { key: "closed", value: "Closed" },
    { key: "private", value: "Private" },
];

export const TargetAudienceFilter = [
    { key: "couples", value: "Couples" },
    { key: "females", value: "Females" },
    { key: "males", value: "Males" },
    { key: "transgender", value: "Transgender" },
    { key: "business", value: "Business" },
    { key: "everyone", value: "Everyone" },
];

export const SortOptionsFilter = [
    { key: "newest", value: "Newest" },
    { key: "oldest", value: "Oldest" },
    { key: "popular", value: "Popular" },
    { key: "activity", value: "Activity" },
    { key: "name", value: "Name" },
];

export const GropInfo = (data: any) => [
    {
        title: "Rules",
        value: data?.data?.group?.rules ?? "--"
    },
    {
        title: "Category",
        value: data?.data?.group?.category ?? "--"
    },
    {
        title: "Group Type",
        value: data?.data?.group?.groupType ?? "--"
    },
    {
        title: "Target Audience",
        value: data?.data?.group?.targetAudience ?? "--"
    },
    {
        title: "Description",
        value: data?.data?.group?.description ?? "--"
    },
    {
        title: "Tags",
        value: data?.data?.group?.tags?.join(", ") ?? "--"
    },
]