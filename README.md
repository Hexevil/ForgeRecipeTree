HexVault

A recipe tree viewer for Hypixel SkyBlock forge items. Pick an item and an amount, and HexVault shows the whole ingredient tree, down to the raw materials.

Live site: LINK_TO_YOUR_GITHUB_PAGES_SITE

Features:

Searchable item dropdown with icons and rarity colors
Quantity input, with the tree updating live
Full recursive ingredient tree, with forge recipes and crafting ingredients
Collapsible branches
A checklist to tick off what you have gathered. Ticking a parent ticks everything under it, and unticking a child unticks its parents
Your item, quantity and progress are saved in the browser, so a refresh keeps them but closing the tab won't
A reset button for the checklist of the current recipe


Built with
React
TypeScript
Vite
Bootstrap
Font Awesome

Running it locally
You need Node.js 18 or newer.

```bash
git clone https://github.com/Hexevil/ForgeRecipeTree
cd YOUR_FOLDER_NAME
npm install
npm run dev
```

Then open the address that the terminal prints.

To make a production build:

```bash
npm run build
```

Data and credits
Recipe and item data comes from the NotEnoughUpdates-REPO community project.
Item rarities come from the official Hypixel SkyBlock API.
Item textures come from the Hypixel SkyBlock resource pack, used under its license for free, non-commercial, Hypixel-related websites.
Some textures come from Minecraft, which belongs to Mojang Studios and Microsoft.
Head and block icons were rendered with the free Skin Render and Block Render services.

Disclaimer
HexVault is not affiliated with Hypixel. Textures belong to Hypixel Inc. and to Mojang Studios.

NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.

License
GPL-3.0. See the [LICENSE](LICENSE) file.