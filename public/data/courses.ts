export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  instructor: string;
  instructorBio: string;
  instructorAvatar?: string;
  price: number;
  discountPrice?: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Development' | 'Design' | 'Business' | 'Marketing' | 'Data Science' | 'Computer Basics';
  duration: number; // hours
  totalClasses: number;
  rating: number;
  reviewCount: number;
  thumbnail?: string;
  curriculum: {
    title: string;
    content: string;
  }[];
  whatYouWillLearn: string[];
  requirements: string[];
  reviews: {
    id: string;
    user: string;
    avatar?: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const courses: Course[] = [
  {
    id: '7',
    slug: 'mern-stack-web-development',
    title: 'Complete MERN Stack Web Development',
    shortDescription:
      'Build modern full-stack applications using MongoDB, Express, React, and Node.js.',
    fullDescription:
      'This hands-on course teaches you how to build production-ready full-stack web applications using the MERN stack. You will learn REST API development, authentication with JWT, role-based access control, and deploy applications to cloud platforms.',
    instructor: 'Brad Traversy',
    instructorBio: 'Full-stack developer and instructor with 10+ years of experience.',
    price: 129.99,
    discountPrice: 59.99,
    level: 'Intermediate',
    category: 'Development',
    duration: 24,
    totalClasses: 80,
    rating: 4.8,
    reviewCount: 420,
    curriculum: [
      { title: 'Module 1: Backend with Node & Express', content: 'REST APIs, middleware, authentication.' },
      { title: 'Module 2: MongoDB & Mongoose', content: 'Schema design and database relationships.' },
      { title: 'Module 3: React Frontend', content: 'Hooks, routing, state management.' },
      { title: 'Module 4: Deployment', content: 'Deploy to Vercel, Render, and MongoDB Atlas.' }
    ],
    whatYouWillLearn: [
      'Build full-stack MERN applications',
      'Implement authentication & authorization',
      'Connect frontend with backend APIs',
      'Deploy production-ready apps'
    ],
    requirements: ['Basic JavaScript knowledge', 'Understanding of React basics'],
    reviews: [
      { id: 'r8', user: 'Rahim Uddin', rating: 5, comment: 'Very practical and project-based.', date: '2024-01-10' }
    ],
    faqs: [
      { question: 'Is this project-based?', answer: 'Yes, you will build multiple real-world projects.' }
    ]
  },
  {
    id: '8',
    slug: 'python-django-web-development',
    title: 'Python & Django Full Stack Development',
    shortDescription:
      'Build secure and scalable web applications using Python and Django.',
    fullDescription:
      'Learn backend web development with Python and Django. This course covers Django ORM, authentication, REST API development with Django REST Framework, and frontend integration.',
    instructor: 'Corey Schafer',
    instructorBio: 'Python educator and backend specialist.',
    price: 109.99,
    discountPrice: 49.99,
    level: 'Beginner',
    category: 'Development',
    duration: 22,
    totalClasses: 75,
    rating: 4.7,
    reviewCount: 310,
    curriculum: [
      { title: 'Module 1: Python Fundamentals', content: 'OOP, virtual environments.' },
      { title: 'Module 2: Django Basics', content: 'Models, views, templates.' },
      { title: 'Module 3: Authentication System', content: 'User login, registration, permissions.' },
      { title: 'Module 4: REST API', content: 'Django REST Framework and deployment.' }
    ],
    whatYouWillLearn: [
      'Build web apps using Django',
      'Work with databases using ORM',
      'Create REST APIs',
      'Deploy Django apps'
    ],
    requirements: ['Basic computer knowledge'],
    reviews: [
      { id: 'r9', user: 'Nusrat Jahan', rating: 5, comment: 'Perfect course for backend beginners.', date: '2024-02-02' }
    ],
    faqs: [
      { question: 'Do I need prior Python knowledge?', answer: 'Basic programming knowledge is helpful.' }
    ]
  },
  {
    id: '9',
    slug: 'basic-computer-course',
    title: 'Basic Computer & Office Applications',
    shortDescription:
      'Learn fundamental computer skills including MS Word, Excel, PowerPoint, and Internet basics.',
    fullDescription:
      'This beginner-friendly course is designed for students and job seekers who want to build strong computer fundamentals. Covers typing, file management, MS Office tools, email usage, and online safety.',
    instructor: 'John Smith',
    instructorBio: 'IT trainer with 15 years of teaching experience.',
    price: 39.99,
    discountPrice: 19.99,
    level: 'Beginner',
    category: 'Computer Basics',
    duration: 10,
    totalClasses: 40,
    rating: 4.6,
    reviewCount: 150,
    curriculum: [
      { title: 'Module 1: Computer Fundamentals', content: 'Hardware, software, operating systems.' },
      { title: 'Module 2: MS Word & Excel', content: 'Document creation and basic formulas.' },
      { title: 'Module 3: PowerPoint', content: 'Creating presentations.' },
      { title: 'Module 4: Internet & Email', content: 'Browsing, email writing, online safety.' }
    ],
    whatYouWillLearn: [
      'Operate a computer confidently',
      'Create documents and spreadsheets',
      'Use email professionally',
      'Understand internet safety'
    ],
    requirements: ['No prior experience required'],
    reviews: [
      { id: 'r10', user: 'Karim Hasan', rating: 4, comment: 'Very helpful for beginners.', date: '2024-01-15' }
    ],
    faqs: [
      { question: 'Is this suitable for complete beginners?', answer: 'Yes, it starts from scratch.' }
    ]
  },
  {
    id: '10',
    slug: 'professional-graphic-design',
    title: 'Professional Graphic Design Masterclass',
    shortDescription:
      'Master Photoshop, Illustrator, and branding design from beginner to advanced.',
    fullDescription:
      'This course teaches graphic design principles and industry-standard tools including Adobe Photoshop and Illustrator. Learn logo design, social media graphics, branding, and print design.',
    instructor: 'Daniel Scott',
    instructorBio: 'Adobe Certified Instructor and creative designer.',
    price: 119.99,
    discountPrice: 54.99,
    level: 'Beginner',
    category: 'Design',
    duration: 18,
    totalClasses: 65,
    rating: 4.9,
    reviewCount: 380,
    curriculum: [
      { title: 'Module 1: Design Principles', content: 'Color theory, typography, layout.' },
      { title: 'Module 2: Photoshop', content: 'Image editing and manipulation.' },
      { title: 'Module 3: Illustrator', content: 'Logo and vector design.' },
      { title: 'Module 4: Branding Project', content: 'Complete brand identity design.' }
    ],
    whatYouWillLearn: [
      'Design logos and branding materials',
      'Master Photoshop & Illustrator',
      'Create social media graphics',
      'Prepare files for print and web'
    ],
    requirements: ['No prior design experience needed'],
    reviews: [
      { id: 'r11', user: 'Sadia Rahman', rating: 5, comment: 'Very practical and creative course.', date: '2024-02-12' }
    ],
    faqs: [
      { question: 'Do I need Adobe subscription?', answer: 'Yes, Adobe Creative Cloud is recommended.' }
    ]
  },
  {
    id: '11',
    slug: 'professional-uiux-design',
    title: 'Professional UI/UX Design Career Track',
    shortDescription:
      'Become a job-ready UI/UX designer with real-world projects and portfolio building.',
    fullDescription:
      'Learn UI/UX from fundamentals to advanced prototyping. This course covers user research, wireframing, usability testing, Figma mastery, and portfolio preparation for job placement.',
    instructor: 'Mizko Hevery',
    instructorBio: 'UI/UX mentor and product designer.',
    price: 99.99,
    discountPrice: 44.99,
    level: 'Beginner',
    category: 'Design',
    duration: 16,
    totalClasses: 55,
    rating: 4.8,
    reviewCount: 260,
    curriculum: [
      { title: 'Module 1: UX Research', content: 'Personas, user journeys, problem solving.' },
      { title: 'Module 2: Wireframing', content: 'Low and high fidelity designs.' },
      { title: 'Module 3: Figma Advanced', content: 'Components, auto layout, prototyping.' },
      { title: 'Module 4: Portfolio & Case Study', content: 'Building job-ready portfolio.' }
    ],
    whatYouWillLearn: [
      'Conduct UX research',
      'Design modern UI interfaces',
      'Build interactive prototypes',
      'Create professional case studies'
    ],
    requirements: ['Basic computer knowledge'],
    reviews: [
      { id: 'r12', user: 'Arif Hossain', rating: 5, comment: 'Helped me land my first design job.', date: '2024-02-20' }
    ],
    faqs: [
      { question: 'Will I build a portfolio?', answer: 'Yes, portfolio projects are included.' }
    ]
  }

];