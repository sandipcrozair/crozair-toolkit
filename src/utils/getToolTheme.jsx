import { tools } from "../data/tools";

export const getToolTheme = (toolPath) => {
  const tool = tools.find((t) => t.path === toolPath);
  if (!tool) {
    return {
      accent: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      badgeColor: "bg-blue-100 text-blue-700 border border-blue-200",
    };
  }
  return tool;
};
