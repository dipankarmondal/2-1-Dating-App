export const Hours = Array.from({ length: 23 }, (_, i) => ({
    key: i + 1,
    value: String(i + 1).padStart(2, "0"),
}));

export const Minutes = Array.from({ length: 4 }, (_, i) => ({
  key: i,
  value: String(i * 15).padStart(2, "0"),
}));

export const From = Array.from({ length: 71 }, (_, i) => {
    const num = i + 20;
    return { key: num, value: num.toString() };
});

export const PrivatePartyOptions = [
    { key: "yes", value: "Yes" },
    { key: "no", value: "No" },
];