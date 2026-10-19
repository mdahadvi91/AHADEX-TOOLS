import type { CVData } from "./types";

export const PROFESSION_PRESETS: Record<string, Partial<CVData>> = {
  "data-scientist": {
    summary: "Seeking an entry-level Data Scientist role where I can apply my analytical mindset, programming expertise, and problem-solving skills to real-world data challenges.",
    education: [
      {
        id: "edu-1", institution: "Carnegie Mellon University", degree: "B.S. in Data Science",
        field: "Data Science", location: "Pittsburgh, PA", startDate: "2018-08", endDate: "2022-05",
        description: "Minored in Machine Learning. Graduated with Honors."
      }
    ],
    experience: [
      {
        id: "exp-1", company: "Tech Solutions Inc.", position: "Data Analyst", location: "Remote",
        startDate: "2022-01", endDate: "", current: true,
        bullets: [
          "Analyzed large datasets to uncover actionable business insights.",
          "Designed and implemented predictive models to optimize performance metrics.",
          "Built automated data pipelines to streamline data processing."
        ]
      }
    ],
    skills: [
      { id: "s1", name: "Python", level: 5 }, { id: "s2", name: "SQL", level: 4 },
      { id: "s3", name: "Machine Learning", level: 4 }, { id: "s4", name: "Data Visualization", level: 5 }
    ]
  },
  "photographer": {
    summary: "Creative and detail-oriented Photographer with 5+ years of experience capturing stunning visuals. Expert in portrait, event, and commercial photography with a strong eye for composition and lighting.",
    education: [
      {
        id: "edu-1", institution: "New York Institute of Photography", degree: "Certificate in Professional Photography",
        field: "Photography", location: "New York, NY", startDate: "2017-01", endDate: "2018-05",
        description: "Specialized in studio lighting and digital retouching."
      }
    ],
    experience: [
      {
        id: "exp-1", company: "Freelance", position: "Lead Photographer", location: "New York, NY",
        startDate: "2019-05", endDate: "", current: true,
        bullets: [
          "Managed end-to-end photoshoots for over 50+ clients, including weddings and corporate events.",
          "Edited and retouched high-resolution images using Adobe Lightroom and Photoshop.",
          "Built a strong client portfolio resulting in 40% repeat business."
        ]
      }
    ],
    skills: [
      { id: "s1", name: "Adobe Lightroom", level: 5 }, { id: "s2", name: "Photoshop", level: 5 },
      { id: "s3", name: "Studio Lighting", level: 4 }, { id: "s4", name: "Portrait Photography", level: 5 }
    ]
  },
  "electrician": {
    summary: "Licensed Electrician with 8 years of experience in residential and commercial electrical systems. Dedicated to safety, precision, and delivering high-quality maintenance and installation services.",
    education: [
      {
        id: "edu-1", institution: "Chicago Technical College", degree: "Associate Degree in Electrical Technology",
        field: "Electrical Systems", location: "Chicago, IL", startDate: "2012-08", endDate: "2014-05",
        description: "Completed 2000+ hours of practical lab work and safety training."
      }
    ],
    experience: [
      {
        id: "exp-1", company: "PowerGrid Services", position: "Senior Electrician", location: "Chicago, IL",
        startDate: "2016-03", endDate: "", current: true,
        bullets: [
          "Installed and maintained electrical systems in over 200 residential units.",
          "Troubleshot complex wiring issues and ensured compliance with National Electrical Code (NEC).",
          "Trained junior apprentices in safety protocols and equipment handling."
        ]
      }
    ],
    skills: [
      { id: "s1", name: "Wiring & Installation", level: 5 }, { id: "s2", name: "Circuit Repair", level: 5 },
      { id: "s3", name: "Safety Protocols", level: 4 }, { id: "s4", name: "Blueprint Reading", level: 4 }
    ]
  },
  "software-engineer": {
    summary: "Passionate Software Engineer with expertise in full-stack web development. Proven track record of building scalable, high-performance applications using modern JavaScript frameworks.",
    education: [
      {
        id: "edu-1", institution: "University of California, Berkeley", degree: "B.S. in Computer Science",
        field: "Computer Science", location: "Berkeley, CA", startDate: "2017-08", endDate: "2021-05",
        description: "Focused on web technologies and human-computer interaction."
      }
    ],
    experience: [
      {
        id: "exp-1", company: "WebInnovate", position: "Frontend Developer", location: "Remote",
        startDate: "2021-08", endDate: "", current: true,
        bullets: [
          "Developed and maintained responsive user interfaces using React and Tailwind CSS.",
          "Improved application load time by 40% through code splitting and image optimization.",
          "Collaborated with backend engineers to design RESTful APIs."
        ]
      }
    ],
    skills: [
      { id: "s1", name: "React.js", level: 5 }, { id: "s2", name: "TypeScript", level: 4 },
      { id: "s3", name: "Node.js", level: 4 }, { id: "s4", name: "Tailwind CSS", level: 5 }
    ]
  },
  "accountant": {
    summary: "Detail-oriented Accountant with 5+ years of experience managing financial records, preparing tax returns, and ensuring compliance. Proficient in QuickBooks and advanced Excel.",
    experience: [
      {
        id: "exp-accountant", company: "Global Finance Corp", position: "Senior Accountant", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-accountant", institution: "State University", degree: "B.S. in Accounting",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-accountant-1", name: "Financial Reporting", level: 5 },
      { id: "s-accountant-2", name: "Tax Preparation", level: 4 },
      { id: "s-accountant-3", name: "QuickBooks", level: 4 },
      { id: "s-accountant-4", name: "Auditing", level: 5 }
    ]
  },
  "nurse": {
    summary: "Compassionate Registered Nurse with 6 years of experience in patient care, triage, and medical record management. Dedicated to providing high-quality healthcare and patient education.",
    experience: [
      {
        id: "exp-nurse", company: "City General Hospital", position: "Staff Nurse", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-nurse", institution: "Health Sciences University", degree: "B.S. in Nursing (BSN)",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-nurse-1", name: "Patient Care", level: 5 },
      { id: "s-nurse-2", name: "Vital Signs Monitoring", level: 4 },
      { id: "s-nurse-3", name: "EMR Systems", level: 4 },
      { id: "s-nurse-4", name: "IV Therapy", level: 5 }
    ]
  },
  "teacher": {
    summary: "Passionate Educator with 7 years of experience in curriculum development and student engagement. Committed to creating a positive learning environment and improving student outcomes.",
    experience: [
      {
        id: "exp-teacher", company: "Oakridge High School", position: "Mathematics Teacher", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-teacher", institution: "University of Education", degree: "M.Ed. in Secondary Education",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-teacher-1", name: "Lesson Planning", level: 5 },
      { id: "s-teacher-2", name: "Classroom Management", level: 4 },
      { id: "s-teacher-3", name: "Student Assessment", level: 4 },
      { id: "s-teacher-4", name: "EdTech", level: 5 }
    ]
  },
  "graphic-designer": {
    summary: "Creative Graphic Designer with 4 years of experience in branding, digital marketing, and UI/UX design. Skilled in Adobe Creative Suite and creating visually compelling designs.",
    experience: [
      {
        id: "exp-graphic-designer", company: "Creative Agency X", position: "Senior Graphic Designer", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-graphic-designer", institution: "Design Institute", degree: "B.A. in Graphic Design",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-graphic-designer-1", name: "Adobe Photoshop", level: 5 },
      { id: "s-graphic-designer-2", name: "Illustrator", level: 4 },
      { id: "s-graphic-designer-3", name: "Figma", level: 4 },
      { id: "s-graphic-designer-4", name: "Branding", level: 5 }
    ]
  },
  "mechanical-engineer": {
    summary: "Mechanical Engineer with expertise in CAD modeling, thermodynamics, and product development. Proven track record of optimizing manufacturing processes and reducing costs.",
    experience: [
      {
        id: "exp-mechanical-engineer", company: "AutoTech Innovations", position: "Design Engineer", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-mechanical-engineer", institution: "Institute of Technology", degree: "B.S. in Mechanical Engineering",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-mechanical-engineer-1", name: "SolidWorks", level: 5 },
      { id: "s-mechanical-engineer-2", name: "AutoCAD", level: 4 },
      { id: "s-mechanical-engineer-3", name: "Thermodynamics", level: 4 },
      { id: "s-mechanical-engineer-4", name: "Project Management", level: 5 }
    ]
  },
  "sales-manager": {
    summary: "Results-driven Sales Manager with 8 years of experience in B2B sales and team leadership. Proven ability to exceed revenue targets and build long-lasting client relationships.",
    experience: [
      {
        id: "exp-sales-manager", company: "Tech Sales Solutions", position: "Regional Sales Manager", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-sales-manager", institution: "Business School", degree: "B.B.A. in Marketing",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-sales-manager-1", name: "B2B Sales", level: 5 },
      { id: "s-sales-manager-2", name: "Negotiation", level: 4 },
      { id: "s-sales-manager-3", name: "CRM Software", level: 4 },
      { id: "s-sales-manager-4", name: "Team Leadership", level: 5 }
    ]
  },
  "chef": {
    summary: "Culinary expert with 10+ years of experience in high-volume restaurant kitchens. Skilled in menu creation, food cost control, and leading diverse culinary teams.",
    experience: [
      {
        id: "exp-chef", company: "The Gourmet Bistro", position: "Head Chef", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-chef", institution: "Culinary Institute", degree: "Diploma in Culinary Arts",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-chef-1", name: "Menu Planning", level: 5 },
      { id: "s-chef-2", name: "Food Safety", level: 4 },
      { id: "s-chef-3", name: "Kitchen Management", level: 4 },
      { id: "s-chef-4", name: "Recipe Development", level: 5 }
    ]
  },
  "web-developer": {
    summary: "Full-stack Web Developer with 5 years of experience building responsive and scalable web applications using React, Node.js, and MongoDB.",
    experience: [
      {
        id: "exp-web-developer", company: "WebTech Solutions", position: "Full Stack Developer", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-web-developer", institution: "Tech University", degree: "B.S. in Computer Science",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-web-developer-1", name: "JavaScript/TypeScript", level: 5 },
      { id: "s-web-developer-2", name: "React.js", level: 4 },
      { id: "s-web-developer-3", name: "Node.js", level: 4 },
      { id: "s-web-developer-4", name: "MongoDB", level: 5 }
    ]
  },
  "marketing-specialist": {
    summary: "Digital Marketing Specialist with a focus on SEO, content marketing, and paid advertising. Helped brands increase their online visibility and drive organic traffic.",
    experience: [
      {
        id: "exp-marketing-specialist", company: "Growth Hackers Inc", position: "Digital Marketing Specialist", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-marketing-specialist", institution: "State College", degree: "B.A. in Communications",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-marketing-specialist-1", name: "SEO/SEM", level: 5 },
      { id: "s-marketing-specialist-2", name: "Google Analytics", level: 4 },
      { id: "s-marketing-specialist-3", name: "Content Strategy", level: 4 },
      { id: "s-marketing-specialist-4", name: "Social Media Marketing", level: 5 }
    ]
  },
  "hr-manager": {
    summary: "Strategic HR Manager with 7 years of experience in talent acquisition, employee relations, and performance management. Focused on building a positive company culture.",
    experience: [
      {
        id: "exp-hr-manager", company: "People First Corp", position: "HR Manager", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-hr-manager", institution: "Business University", degree: "M.S. in Human Resources",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-hr-manager-1", name: "Talent Acquisition", level: 5 },
      { id: "s-hr-manager-2", name: "Employee Relations", level: 4 },
      { id: "s-hr-manager-3", name: "HRIS", level: 4 },
      { id: "s-hr-manager-4", name: "Conflict Resolution", level: 5 }
    ]
  },
  "civil-engineer": {
    summary: "Civil Engineer with experience in structural design, site management, and infrastructure projects. Committed to delivering safe and sustainable engineering solutions.",
    experience: [
      {
        id: "exp-civil-engineer", company: "BuildRight Construction", position: "Project Engineer", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-civil-engineer", institution: "Engineering College", degree: "B.S. in Civil Engineering",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-civil-engineer-1", name: "Structural Analysis", level: 5 },
      { id: "s-civil-engineer-2", name: "AutoCAD", level: 4 },
      { id: "s-civil-engineer-3", name: "Site Management", level: 4 },
      { id: "s-civil-engineer-4", name: "Project Estimation", level: 5 }
    ]
  },
  "architect": {
    summary: "Innovative Architect with expertise in residential and commercial design. Proficient in 3D modeling and passionate about sustainable architecture.",
    experience: [
      {
        id: "exp-architect", company: "Design Build Studio", position: "Architect", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-architect", institution: "School of Architecture", degree: "B.Arch",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-architect-1", name: "AutoCAD", level: 5 },
      { id: "s-architect-2", name: "Revit", level: 4 },
      { id: "s-architect-3", name: "3D Modeling", level: 4 },
      { id: "s-architect-4", name: "Sustainable Design", level: 5 }
    ]
  },
  "lawyer": {
    summary: "Experienced Corporate Lawyer specializing in contract law, mergers and acquisitions, and compliance. Strong analytical and negotiation skills.",
    experience: [
      {
        id: "exp-lawyer", company: "Smith & Associates", position: "Associate Lawyer", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-lawyer", institution: "Law School", degree: "Juris Doctor (J.D.)",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-lawyer-1", name: "Contract Law", level: 5 },
      { id: "s-lawyer-2", name: "Legal Research", level: 4 },
      { id: "s-lawyer-3", name: "Negotiation", level: 4 },
      { id: "s-lawyer-4", name: "Compliance", level: 5 }
    ]
  },
  "dentist": {
    summary: "Skilled Dentist dedicated to providing comprehensive oral healthcare. Experienced in restorative dentistry, root canals, and patient education.",
    experience: [
      {
        id: "exp-dentist", company: "Smile Dental Clinic", position: "General Dentist", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-dentist", institution: "Dental University", degree: "Doctor of Dental Surgery (DDS)",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-dentist-1", name: "Restorative Dentistry", level: 5 },
      { id: "s-dentist-2", name: "Root Canal Therapy", level: 4 },
      { id: "s-dentist-3", name: "Patient Care", level: 4 },
      { id: "s-dentist-4", name: "X-Ray Interpretation", level: 5 }
    ]
  },
  "plumber": {
    summary: "Licensed Plumber with 8 years of experience in residential and commercial plumbing. Expert in pipe fitting, leak detection, and heating system installation.",
    experience: [
      {
        id: "exp-plumber", company: "FlowFix Plumbing", position: "Master Plumber", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-plumber", institution: "Trade School", degree: "Plumbing Apprenticeship",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-plumber-1", name: "Pipe Fitting", level: 5 },
      { id: "s-plumber-2", name: "Leak Detection", level: 4 },
      { id: "s-plumber-3", name: "HVAC Systems", level: 4 },
      { id: "s-plumber-4", name: "Blueprint Reading", level: 5 }
    ]
  },
  "data-analyst": {
    summary: "Data Analyst with a strong background in statistical analysis and data visualization. Skilled in SQL, Python, and Tableau to drive business decisions.",
    experience: [
      {
        id: "exp-data-analyst", company: "Insight Analytics", position: "Data Analyst", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-data-analyst", institution: "State University", degree: "B.S. in Statistics",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-data-analyst-1", name: "SQL", level: 5 },
      { id: "s-data-analyst-2", name: "Python (Pandas)", level: 4 },
      { id: "s-data-analyst-3", name: "Tableau", level: 4 },
      { id: "s-data-analyst-4", name: "Data Cleaning", level: 5 }
    ]
  },
  "ux-designer": {
    summary: "User-centric UX/UI Designer with 4 years of experience designing intuitive digital experiences for web and mobile applications.",
    experience: [
      {
        id: "exp-ux-designer", company: "AppVenture", position: "Product Designer", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-ux-designer", institution: "Design College", degree: "B.F.A. in Interaction Design",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-ux-designer-1", name: "Figma", level: 5 },
      { id: "s-ux-designer-2", name: "User Research", level: 4 },
      { id: "s-ux-designer-3", name: "Wireframing", level: 4 },
      { id: "s-ux-designer-4", name: "Prototyping", level: 5 }
    ]
  },
  "project-manager": {
    summary: "PMP-certified Project Manager with 6 years of experience leading cross-functional teams to deliver software projects on time and within budget.",
    experience: [
      {
        id: "exp-project-manager", company: "Tech Delivery Inc", position: "IT Project Manager", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-project-manager", institution: "Tech University", degree: "B.S. in Information Systems",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-project-manager-1", name: "Agile/Scrum", level: 5 },
      { id: "s-project-manager-2", name: "Risk Management", level: 4 },
      { id: "s-project-manager-3", name: "Jira", level: 4 },
      { id: "s-project-manager-4", name: "Stakeholder Communication", level: 5 }
    ]
  },
  "content-writer": {
    summary: "Creative Content Writer with 5 years of experience producing engaging blog posts, SEO articles, and copy for B2B and B2C audiences.",
    experience: [
      {
        id: "exp-content-writer", company: "Wordsmith Agency", position: "Senior Content Writer", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-content-writer", institution: "Liberal Arts College", degree: "B.A. in English",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-content-writer-1", name: "SEO Writing", level: 5 },
      { id: "s-content-writer-2", name: "Copywriting", level: 4 },
      { id: "s-content-writer-3", name: "Editing", level: 4 },
      { id: "s-content-writer-4", name: "Content Strategy", level: 5 }
    ]
  },
  "pharmacist": {
    summary: "Licensed Pharmacist with experience in community pharmacy, medication dispensing, and patient counseling. Committed to safe medication practices.",
    experience: [
      {
        id: "exp-pharmacist", company: "CarePlus Pharmacy", position: "Staff Pharmacist", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-pharmacist", institution: "Pharmacy School", degree: "Doctor of Pharmacy (PharmD)",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-pharmacist-1", name: "Medication Dispensing", level: 5 },
      { id: "s-pharmacist-2", name: "Patient Counseling", level: 4 },
      { id: "s-pharmacist-3", name: "Pharmacotherapy", level: 4 },
      { id: "s-pharmacist-4", name: "Inventory Management", level: 5 }
    ]
  },
  "financial-analyst": {
    summary: "Financial Analyst with strong skills in forecasting, budgeting, and financial modeling. Adept at translating complex data into actionable business insights.",
    experience: [
      {
        id: "exp-financial-analyst", company: "Capital Investments", position: "Financial Analyst", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-financial-analyst", institution: "Business School", degree: "B.S. in Finance",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-financial-analyst-1", name: "Financial Modeling", level: 5 },
      { id: "s-financial-analyst-2", name: "Excel (VBA)", level: 4 },
      { id: "s-financial-analyst-3", name: "Forecasting", level: 4 },
      { id: "s-financial-analyst-4", name: "Valuation", level: 5 }
    ]
  },
  "mechanic": {
    summary: "Experienced Auto Mechanic with a strong understanding of engine repair, brake systems, and electrical diagnostics. Dedicated to quality workmanship.",
    experience: [
      {
        id: "exp-mechanic", company: "Speedy Auto Repair", position: "Senior Mechanic", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-mechanic", institution: "Technical Institute", degree: "Automotive Technology Diploma",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-mechanic-1", name: "Engine Repair", level: 5 },
      { id: "s-mechanic-2", name: "Brake Systems", level: 4 },
      { id: "s-mechanic-3", name: "Diagnostics", level: 4 },
      { id: "s-mechanic-4", name: "Customer Service", level: 5 }
    ]
  },
  "social-media-manager": {
    summary: "Creative Social Media Manager with a track record of growing brand presence on Instagram, TikTok, and LinkedIn through strategic content.",
    experience: [
      {
        id: "exp-social-media-manager", company: "ViralReach Media", position: "Social Media Lead", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-social-media-manager", institution: "State University", degree: "B.A. in Marketing",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-social-media-manager-1", name: "Content Creation", level: 5 },
      { id: "s-social-media-manager-2", name: "Community Management", level: 4 },
      { id: "s-social-media-manager-3", name: "Analytics", level: 4 },
      { id: "s-social-media-manager-4", name: "Paid Social", level: 5 }
    ]
  },
  "customer-service": {
    summary: "Dedicated Customer Service Representative with 4 years of experience resolving inquiries, managing complaints, and ensuring customer satisfaction.",
    experience: [
      {
        id: "exp-customer-service", company: "HelpDesk Solutions", position: "Customer Support Specialist", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-customer-service", institution: "Central High", degree: "High School Diploma",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-customer-service-1", name: "Conflict Resolution", level: 5 },
      { id: "s-customer-service-2", name: "CRM", level: 4 },
      { id: "s-customer-service-3", name: "Active Listening", level: 4 },
      { id: "s-customer-service-4", name: "Problem Solving", level: 5 }
    ]
  },
  "sales-associate": {
    summary: "Motivated Sales Associate with retail and customer-facing experience. Skilled in upselling, inventory management, and providing excellent service.",
    experience: [
      {
        id: "exp-sales-associate", company: "Retail Giant", position: "Sales Associate", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-sales-associate", institution: "Community College", degree: "Associate Degree",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-sales-associate-1", name: "Upselling", level: 5 },
      { id: "s-sales-associate-2", name: "Customer Engagement", level: 4 },
      { id: "s-sales-associate-3", name: "POS Systems", level: 4 },
      { id: "s-sales-associate-4", name: "Inventory Control", level: 5 }
    ]
  },
  "flight-attendant": {
    summary: "Safety-focused Flight Attendant with experience in commercial aviation. Excellent customer service, conflict resolution, and emergency management skills.",
    experience: [
      {
        id: "exp-flight-attendant", company: "Global Airways", position: "Flight Attendant", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-flight-attendant", institution: "Flight Academy", degree: "Aviation Safety Certificate",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-flight-attendant-1", name: "Customer Service", level: 5 },
      { id: "s-flight-attendant-2", name: "First Aid", level: 4 },
      { id: "s-flight-attendant-3", name: "Conflict Resolution", level: 4 },
      { id: "s-flight-attendant-4", name: "Safety Procedures", level: 5 }
    ]
  },
  "construction-worker": {
    summary: "Reliable Construction Worker with 6 years of experience in general construction, concrete work, and operating heavy machinery. Focused on safety and efficiency.",
    experience: [
      {
        id: "exp-construction-worker", company: "SolidBuild Construction", position: "Lead Construction Worker", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-construction-worker", institution: "Training Center", degree: "OSHA Safety Certification",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-construction-worker-1", name: "Heavy Machinery", level: 5 },
      { id: "s-construction-worker-2", name: "Concrete Work", level: 4 },
      { id: "s-construction-worker-3", name: "Blueprint Reading", level: 4 },
      { id: "s-construction-worker-4", name: "Safety Compliance", level: 5 }
    ]
  },
  "fitness-trainer": {
    summary: "Certified Personal Trainer with a passion for helping clients achieve their health and fitness goals through customized workout and nutrition plans.",
    experience: [
      {
        id: "exp-fitness-trainer", company: "FitLife Gym", position: "Personal Trainer", location: "City, State",
        startDate: "2020-01", endDate: "", current: true,
        bullets: [
          "Successfully managed key responsibilities to improve operational efficiency.",
          "Collaborated with cross-functional teams to deliver high-quality results.",
          "Implemented best practices and optimized workflows."
        ]
      }
    ],
    education: [
      {
        id: "edu-fitness-trainer", institution: "Fitness Academy", degree: "NASM Certification",
        field: "Major Field", location: "City, State", startDate: "2016-08", endDate: "2020-05",
        description: "Graduated with strong academic performance."
      }
    ],
    skills: [
      { id: "s-fitness-trainer-1", name: "Exercise Programming", level: 5 },
      { id: "s-fitness-trainer-2", name: "Nutrition Coaching", level: 4 },
      { id: "s-fitness-trainer-3", name: "Client Assessment", level: 4 },
      { id: "s-fitness-trainer-4", name: "Motivation", level: 5 }
    ]
  },
};
