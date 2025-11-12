export const bodyHairOptions = [
    { key: "prefer_not_to_say", value: "Prefer not to say" },
    { key: "arms", value: "Arms" },
    { key: "bikini", value: "Bikini" },
    { key: "buns", value: "Buns" },
    { key: "tummy", value: "Tummy" },
    { key: "legs", value: "Legs" },
    { key: "everywhere", value: "Everywhere" },
    { key: "chest", value: "Chest" },
    { key: "treasure", value: "Treasure" },
    { key: "arm_pits", value: "Arm Pits" },
    { key: "shave", value: "Shave" },
    { key: "smooth", value: "Smooth" },
];

export const heightOptions = [
    { key: "prefer_not_to_say", value: "Prefer not to say" },
    { key: "4'6", value: "4'6\" (137cm)" },
    { key: "4'7", value: "4'7\" (140cm)" },
    { key: "4'8", value: "4'8\" (142cm)" },
    { key: "4'9", value: "4'9\" (145cm)" },
    { key: "4'10", value: "4'10\" (147cm)" },
    { key: "4'11", value: "4'11\" (150cm)" },
    { key: "5'0", value: "5'0\" (152cm)" },
    { key: "5'1", value: "5'1\" (155cm)" },
    { key: "5'2", value: "5'2\" (157cm)" },
    { key: "5'3", value: "5'3\" (160cm)" },
    { key: "5'4", value: "5'4\" (163cm)" },
    { key: "5'5", value: "5'5\" (165cm)" },
    { key: "5'6", value: "5'6\" (168cm)" },
    { key: "5'7", value: "5'7\" (170cm)" },
    { key: "5'8", value: "5'8\" (173cm)" },
    { key: "5'9", value: "5'9\" (175cm)" },
    { key: "5'10", value: "5'10\" (178cm)" },
    { key: "5'11", value: "5'11\" (180cm)" },
    { key: "6'0", value: "6'0\" (183cm)" },
    { key: "6'1", value: "6'1\" (185cm)" },
    { key: "6'2", value: "6'2\" (188cm)" },
    { key: "6'3", value: "6'3\" (190cm)" },
    { key: "6'4", value: "6'4\" (193cm)" },
    { key: "6'5", value: "6'5\" (195cm)" },
    { key: "6'6", value: "6'6\" (198cm)" },
    { key: "6'7", value: "6'7\" (200cm)" },
    { key: "6'8", value: "6'8\" (203cm)" },
    { key: "6'9", value: "6'9\" (205cm)" },
    { key: "6'10", value: "6'10\" (208cm)" },
    { key: "6'11", value: "6'11\" (210cm)" },
    { key: "7'0", value: "7'0\" (213cm)" },
    { key: "7'1", value: "7'1\" (215cm)" },
    { key: "7'2", value: "7'2\" (218cm)" },
    { key: "7'3", value: "7'3\" (220cm)" },
    { key: "7'4", value: "7'4\" (223cm)" },
    { key: "7'5", value: "7'5\" (225cm)" },
    { key: "7'6", value: "7'6\" (228cm)" },
    { key: "7'7", value: "7'7\" (230cm)" },
    { key: "7'8", value: "7'8\" (233cm)" },
    { key: "7'9", value: "7'9\" (235cm)" },
    { key: "7'10", value: "7'10\" (238cm)" },
    { key: "7'11", value: "7'11\" (240cm)" },
    { key: "8'0", value: "8'0\" (244cm)" },
];

const generateWeightOptions = () => {
    const baseData = [
        { lbs: "Prefer not to say", kg: null },
        { lbs: 80, kg: 36 }, { lbs: 82, kg: 37 }, { lbs: 84, kg: 38 },
        { lbs: 86, kg: 39 }, { lbs: 88, kg: 40 }, { lbs: 90, kg: 41 },
        { lbs: 92, kg: 42 }, { lbs: 94, kg: 43 }, { lbs: 96, kg: 44 },
        { lbs: 98, kg: 44.5 }, { lbs: 100, kg: 45 }, { lbs: 102, kg: 46 },
        { lbs: 104, kg: 47 }, { lbs: 106, kg: 48 }, { lbs: 108, kg: 49 },
        { lbs: 110, kg: 50 }, { lbs: 112, kg: 51 }, { lbs: 114, kg: 52 },
        { lbs: 116, kg: 53 }, { lbs: 118, kg: 54 }, { lbs: 120, kg: 54.5 },
        { lbs: 122, kg: 55 }, { lbs: 124, kg: 56 }, { lbs: 126, kg: 57 },
        { lbs: 128, kg: 58 }, { lbs: 130, kg: 59 }, { lbs: 132, kg: 60 },
        { lbs: 134, kg: 61 }, { lbs: 136, kg: 62 }, { lbs: 138, kg: 63 },
        { lbs: 140, kg: 64 }, { lbs: 142, kg: 65 }, { lbs: 144, kg: 66 },
        { lbs: 146, kg: 67 }, { lbs: 148, kg: 68 }, { lbs: 150, kg: 68 },
        { lbs: 152, kg: 69 }, { lbs: 154, kg: 70 }, { lbs: 156, kg: 71 },
        { lbs: 158, kg: 72 }, { lbs: 160, kg: 73 }, { lbs: 162, kg: 74 },
        { lbs: 164, kg: 75 }, { lbs: 166, kg: 76 }, { lbs: 168, kg: 77 },
        { lbs: 170, kg: 77 }, { lbs: 172, kg: 78 }, { lbs: 174, kg: 79 },
        { lbs: 176, kg: 80 }, { lbs: 178, kg: 81 }, { lbs: 180, kg: 82 },
        { lbs: 182, kg: 83 }, { lbs: 184, kg: 84 }, { lbs: 186, kg: 85 },
        { lbs: 188, kg: 86 }, { lbs: 190, kg: 86 }, { lbs: 192, kg: 87 },
        { lbs: 194, kg: 88 }, { lbs: 196, kg: 89 }, { lbs: 198, kg: 90 },
        { lbs: 200, kg: 91 }, { lbs: 205, kg: 93 }, { lbs: 210, kg: 95 },
        { lbs: 215, kg: 98 }, { lbs: 220, kg: 100 }, { lbs: 225, kg: 102 },
        { lbs: 230, kg: 104 }, { lbs: 235, kg: 107 }, { lbs: 240, kg: 109 },
        { lbs: 245, kg: 111 }, { lbs: 250, kg: 113 }, { lbs: 255, kg: 116 },
        { lbs: 260, kg: 118 }, { lbs: 265, kg: 120 }, { lbs: 270, kg: 122 },
        { lbs: 275, kg: 125 }, { lbs: 280, kg: 127 }, { lbs: 285, kg: 129 },
        { lbs: 290, kg: 132 }, { lbs: 295, kg: 134 }, { lbs: 300, kg: 136 },
        { lbs: 310, kg: 141 }, { lbs: 320, kg: 145 }, { lbs: 330, kg: 150 },
        { lbs: 340, kg: 154 }, { lbs: 350, kg: 159 }, { lbs: 360, kg: 163 },
        { lbs: 370, kg: 168 }, { lbs: 380, kg: 172 }, { lbs: 390, kg: 177 },
        { lbs: 400, kg: 181 },
    ];

    return baseData.map((item) => {
        if (item.lbs === "Prefer not to say") {
            return { key: "prefer_not_to_say", value: "Prefer not to say" };
        }
        return {
            key: `${item.lbs} lbs`,
            value: `${item.lbs} Lbs. (${item.kg} Kg.)`,
        };
    });
};

// Example usage
export const WeightOptions = generateWeightOptions();

export const bodyTypeOptions = [
    { key: "prefer_not_to_say", value: "Prefer not to say" },
    { key: "slim", value: "Slim" },
    { key: "athletic", value: "Athletic" },
    { key: "average", value: "Average" },
    { key: "nicely_shaped", value: "Nicely Shaped" },
    { key: "more_of_me_to_love", value: "More of me to love" },
    { key: "huggable_and_heavy", value: "Huggable and Heavy" }
];

export const ethnicOptions = [
    { key: "prefer_not_to_say", value: "Prefer not to say" },
    { key: "caucasian", value: "Caucasian" },
    { key: "hispanic_latin", value: "Hispanic / Latin" },
    { key: "black_african_american", value: "Black / African-American" },
    { key: "asian", value: "Asian" },
    { key: "indian", value: "Indian" },
    { key: "indigenous", value: "Indigenous" },
    { key: "middle_eastern", value: "Middle Eastern" },
    { key: "other", value: "Other" }
];

export const smokingOptions = [
    { key: "prefer_not_to_say", value: "Prefer not to say" },
    { key: "no", value: "No" },
    { key: "yes", value: "Yes" },
    { key: "occasionally", value: "Occasionally" }
];

export const piercingsOptions = [
    { key: "prefer_not_to_say", value: "Prefer not to say" },
    { key: "no", value: "No" },
    { key: "yes", value: "Yes" }
];

export const tattoosOptions = [
    { key: "prefer_not_to_say", value: "Prefer not to say" },
    { key: "none", value: "None" },
    { key: "one", value: "One" },
    { key: "a_few", value: "A few" },
    { key: "inked", value: "Inked" }
];

export const languagesOptions = [
    { key: "english", value: "English" },
    { key: "nederlands", value: "Nederlands" },
    { key: "deutsch", value: "Deutsch" },
    { key: "francais", value: "Francais" },
    { key: "espanol", value: "Español" },
    { key: "italiano", value: "Italiano" },
    { key: "portugues", value: "Português" }
];

export const looksOptions = [
    { key: "no", value: "No" },
    { key: "prefer_not_to_say", value: "Prefer not to say" },
    { key: "low_importance", value: "Low Importance" },
    { key: "medium_importance", value: "Medium Importance" },
    { key: "very_important", value: "Very Important" }
];
export const createStream = [
    { key: "comments", value: "Comments" },
    { key: "gifts", value: "Gifts" },
];

export const sexualityOptions = [
    { key: 'prefer_not_to_say', value: 'Prefer not to say' },
    { key: 'straight', value: 'Straight' },
    { key: 'bi_sexual', value: 'Bi-sexual' },
    { key: 'bi_curious', value: 'Bi-curious' },
    { key: 'gay', value: 'Gay' },
    { key: 'pansexual', value: 'Pansexual' },
];

export const relationshipOptions = [
    { key: 'swinger', value: 'Swinger' },
    { key: 'prefer_not_to_say', value: 'Prefer not to say' },
    { key: 'monogamous', value: 'Monogamous' },
    { key: 'open_minded', value: 'Open-Minded' },
    { key: 'polyamorous', value: 'Polyamorous' },
];
export const experienceLevel = [
    { key: "curious", value: "Curious" },
    { key: "intermediate", value: "Intermediate" },
    { key: "newbie", value: "Newbie" },
    { key: "advanced", value: "Advanced" }
]

