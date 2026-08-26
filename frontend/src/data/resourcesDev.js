export const devMeta = { title: "Developer Resources", accent: "dev" };

export const devCategories = [
  {
    slug: "learn",
    label: "Learn",
    icon: "BookOpen",
    desc: "Structured paths for going from zero to shipping.",
    items: [
      { name: "The Odin Project", desc: "Free, full-curriculum, project-based path to full-stack web development.", url: "https://www.theodinproject.com", tag: "Free" },
      { name: "freeCodeCamp", desc: "Thousands of hours of free curriculum with certifications, from basics to machine learning.", url: "https://www.freecodecamp.org", tag: "Free" },
      { name: "MDN Web Docs", desc: "The definitive reference for HTML, CSS, and JavaScript — bookmark this one.", url: "https://developer.mozilla.org", tag: "Reference" },
      { name: "roadmap.sh", desc: "Visual, up-to-date learning roadmaps for nearly every dev discipline.", url: "https://roadmap.sh", tag: "Roadmaps" }
    ]
  },
  {
    slug: "practice",
    label: "Practice",
    icon: "Code2",
    desc: "Where to actually write code and get feedback.",
    items: [
      { name: "LeetCode", desc: "The standard for data-structures-and-algorithms practice and interview prep.", url: "https://leetcode.com", tag: "Practice" },
      { name: "Codewars", desc: "Bite-sized coding challenges (\"kata\") across many languages, ranked by difficulty.", url: "https://www.codewars.com", tag: "Practice" },
      { name: "Frontend Mentor", desc: "Real design files to build against — great for portfolio-quality frontend practice.", url: "https://www.frontendmentor.io", tag: "Projects" }
    ]
  },
  {
    slug: "tools",
    label: "Tools",
    icon: "Hammer",
    desc: "The everyday toolkit.",
    items: [
      { name: "GitHub", desc: "Where the bot's own source lives — version control, issues, and pull requests.", url: "https://github.com", tag: "Essential" },
      { name: "VS Code", desc: "The default editor for most of the community — free, extensible, cross-platform.", url: "https://code.visualstudio.com", tag: "Editor" },
      { name: "Postman", desc: "Build, test, and debug API requests without writing a client.", url: "https://www.postman.com", tag: "API Tooling" }
    ]
  },
  {
    slug: "botdev",
    label: "Discord Bot Dev",
    icon: "Bot",
    desc: "Building bots specifically — the exact stack TheSkull's own bot runs on.",
    items: [
      { name: "discord.js Guide", desc: "The official guide for discord.js — the exact library TheSkull's bot is built on.", url: "https://discordjs.guide", tag: "Bot Dev" },
      { name: "Discord Developer Portal", desc: "Where you register applications, bots, and manage OAuth for anything Discord.", url: "https://discord.com/developers/docs/intro", tag: "Bot Dev" }
    ]
  }
];
