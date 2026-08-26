const cyberMeta = { title: "Cybersecurity & Hacking", accent: "cyber" };

const cyberCategories = [
  {
    slug: "osint",
    label: "OSINT",
    icon: "Search",
    desc: "Open-source intelligence — gathering and analyzing public information.",
    items: [
      { name: "OSINT Framework", desc: "A categorized directory of nearly every OSINT tool and technique out there.", url: "https://osintframework.com", tag: "Directory" },
      { name: "Shodan", desc: "Search engine for internet-connected devices — see what's exposed before an attacker does.", url: "https://www.shodan.io", tag: "Tool" },
      { name: "Sherlock", desc: "Command-line tool that hunts down usernames across hundreds of social platforms.", url: "https://github.com/sherlock-project/sherlock", tag: "Tool" },
      { name: "Google Hacking Database", desc: "Curated search queries (\"dorks\") for finding exposed data and misconfigurations.", url: "https://www.exploit-db.com/google-hacking-database", tag: "Reference" }
    ]
  },
  {
    slug: "web",
    label: "Web Hacking",
    icon: "Globe",
    desc: "Finding and understanding vulnerabilities in web applications.",
    items: [
      { name: "PortSwigger Web Security Academy", desc: "Free, deep, structured labs on real web vulnerabilities — the industry standard.", url: "https://portswigger.net/web-security", tag: "Free" },
      { name: "OWASP Top 10", desc: "The most critical web application security risks, explained and ranked.", url: "https://owasp.org/www-project-top-ten/", tag: "Reference" },
      { name: "DVWA", desc: "Damn Vulnerable Web App — a deliberately insecure app to practice against, legally.", url: "https://github.com/digininja/DVWA", tag: "Practice" },
      { name: "PentesterLab", desc: "Hands-on exercises built around real CVEs and real-world bugs.", url: "https://pentesterlab.com", tag: "Practice" }
    ]
  },
  {
    slug: "network",
    label: "Network & Systems",
    icon: "Network",
    desc: "Understanding traffic, protocols, and how systems talk to each other.",
    items: [
      { name: "Wireshark", desc: "Network protocol analyzer — essential for understanding traffic at the packet level.", url: "https://www.wireshark.org", tag: "Tool" },
      { name: "Nmap", desc: "The standard network scanner for host discovery and service enumeration.", url: "https://nmap.org", tag: "Tool" },
      { name: "TryHackMe", desc: "Guided rooms covering networking fundamentals through to full attack chains.", url: "https://tryhackme.com", tag: "Interactive" },
      { name: "Practical Networking", desc: "Plain-language explanations of how networks actually work, from the ground up.", url: "https://www.practicalnetworking.net", tag: "Learn" }
    ]
  },
  {
    slug: "ctf",
    label: "CTF & Practice",
    icon: "Flag",
    desc: "Where to actually put hands on keyboard and test what you know.",
    items: [
      { name: "Hack The Box", desc: "Realistic vulnerable machines and challenges for practicing offensive security.", url: "https://www.hackthebox.com", tag: "CTF / Labs" },
      { name: "OverTheWire", desc: "Wargames like Bandit and Natas — the classic way to learn Linux and web exploitation basics.", url: "https://overthewire.org/wargames", tag: "Wargames" },
      { name: "PicoCTF", desc: "Beginner-friendly, always-available CTF built by Carnegie Mellon — great starting point.", url: "https://picoctf.org", tag: "CTF" },
      { name: "CTFtime", desc: "Calendar and rankings for live capture-the-flag competitions happening worldwide.", url: "https://ctftime.org", tag: "Events" }
    ]
  },
  {
    slug: "tools",
    label: "Tools",
    icon: "Wrench",
    desc: "The everyday toolkit.",
    items: [
      { name: "Kali Linux", desc: "The standard penetration-testing Linux distro, preloaded with security tooling.", url: "https://www.kali.org", tag: "OS" },
      { name: "Burp Suite Community", desc: "The go-to tool for intercepting and manipulating web traffic during testing.", url: "https://portswigger.net/burp/communitydownload", tag: "Tooling" },
      { name: "Metasploit", desc: "Framework for developing and executing exploit code against target systems.", url: "https://www.metasploit.com", tag: "Tooling" }
    ]
  },
  {
    slug: "careers",
    label: "Careers & Community",
    icon: "Briefcase",
    desc: "Beyond the labs — where the field talks shop and hires.",
    items: [
      { name: "MITRE ATT&CK", desc: "The industry-standard knowledge base of real-world adversary tactics and techniques.", url: "https://attack.mitre.org", tag: "Reference" },
      { name: "Cybrary", desc: "Free and paid courses spanning security fundamentals to certification prep.", url: "https://www.cybrary.it", tag: "Courses" },
      { name: "r/cybersecurity", desc: "Active community for career advice, news, and general discussion.", url: "https://www.reddit.com/r/cybersecurity", tag: "Community" }
    ]
  }
];

module.exports = { cyberMeta, cyberCategories };
