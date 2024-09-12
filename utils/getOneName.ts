export const getOneName = (name: string): string => {
    name = name.trim();

    if (name.includes("   ")) {
        return name.split("   ")[0];
    }

    if (name.includes("-")) {
        return name.split("-")[0].trim();
    }
    return name;
}