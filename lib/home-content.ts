export const whatWeDo = [
  {
    title: "Program Planning & Activation",
    href: "/#services",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&q=78",
    description: "From concept to execution, we bring your event to life.",
  },
  {
    title: "Distribution & Supplies",
    href: "/#services",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=640&q=78",
    description: "Reliable logistics and supplies for seamless events.",
  },
  {
    title: "Advertising & Promotion",
    href: "/#services",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=640&q=78",
    description: "Creative campaigns that amplify your message.",
  },
] as const;

export const events = [
  {
    name: "Conference",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=384&q=78",
  },
  {
    name: "Exhibitions",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=384&q=78",
  },
  {
    name: "Corporate Programs",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=384&q=78",
  },
  {
    name: "Annual Picnic",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=384&q=78",
  },
  {
    name: "Award Functions",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=384&q=78",
  },
] as const;

export const commitments = [
  {
    title: "Deep Customer Understanding",
    description:
      "We emphasize on understand your specific needs and goals for the event.",
  },
  {
    title: "Experience and Expertise",
    description:
      "Our team is qualified and experienced in handling events as you expected",
  },
  {
    title: "Results-Oriented Approach",
    description:
      "We focus on the outcomes to what we can deliver. We believe on result.",
  },
  {
    title: "Transparency and Communication",
    description:
      "Our commitment is to make transparent communication throughout the planning process, keeping you informed and involved.",
  },
  {
    title: "Creative Problem-Solving",
    description:
      "We have that ability to come up with innovative solutions to challenges, ensuring a smooth and successful event.",
  },
  {
    title: "Stress-free experience",
    description:
      "You can assure that we will handle everything, making the planning process smooth and enjoyable to you.",
  },
] as const;

// Max widths kept moderate so Next.js + CDN serve right size; AVIF/WebP + sizes handle per-network optimization
export const heroImage =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1440&q=82";

export const whyUsImage =
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=828&q=78";

export const contactImage =
  "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=828&q=78";

export const sparkleTaglineImage =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1080&q=75";

export const commitmentsImage =
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=78";

export const announcementImage =
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=828&q=78";

export const clientsSectionImage =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=78";

export const programVideoThumbnails = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&q=78",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=640&q=78",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=640&q=78",
] as const;

export const contact = {
  address: "267, West Monipur, Mirpur-2, Dhaka - 1216",
  phone1: "+880 1675-317964",
  phone2: "+88 01715-56 5353",
  email: "info@sparkle.com.bd",
  whatsapp: "https://api.whatsapp.com/send/?phone=+8801799802066",
} as const;

export const developerCredit = "GenAI BD LTD";

export const meetWithUs = {
  heading: "Meet With Us",
  address: contact.address,
} as const;
