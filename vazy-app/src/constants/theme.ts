export const Fonts = {
	regular: "PoppinsRegular",
	medium: "PoppinsMedium",
	semibold: "PoppinsSemiBold",
	display: "Medel",
} as const;

export const Colors = {
	accent: "#3422F2",
	onAccent: "#FFFFFF",
	light: {
		text: "#000000",
		background: "#F8F8FF",
		backgroundElement: "#F0F0F3",
		backgroundSelected: "#E0E1E6",
		textSecondary: "#525252",
	},
	dark: {
		text: "#FFFFFF",
		background: "#000000",
		backgroundElement: "#212225",
		backgroundSelected: "#2E3135",
		textSecondary: "#B0B4BA",
	},
} as const;

export const Spacing = {
	half: 2,
	one: 4,
	two: 8,
	three: 16,
	four: 24,
	five: 32,
	six: 64,
} as const;

export const MaxContentWidth = 800;
