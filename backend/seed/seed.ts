import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { AdminUser } from '../src/models/AdminUser';
import { Home } from '../src/models/Home';
import { About } from '../src/models/About';
import { Project } from '../src/models/Project';
import { Skill } from '../src/models/Skill';
import { Education } from '../src/models/Education';
import { Certification } from '../src/models/Certification';
import { Experience } from '../src/models/Experience';
import { ContactInfo } from '../src/models/ContactInfo';
import { ContactMessage } from '../src/models/ContactMessage';
import { Navbar } from '../src/models/Navbar';
import { Footer } from '../src/models/Footer';
import { SiteSettings } from '../src/models/SiteSettings';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/priya_portfolio';

const seedData = async () => {
  try {
    console.log(`Connecting to MongoDB at ${MONGODB_URI}...`);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB. Starting database seed...');

    // 1. Clear existing collections
    await Promise.all([
      AdminUser.deleteMany({}),
      Home.deleteMany({}),
      About.deleteMany({}),
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Education.deleteMany({}),
      Certification.deleteMany({}),
      Experience.deleteMany({}),
      ContactInfo.deleteMany({}),
      ContactMessage.deleteMany({}),
      Navbar.deleteMany({}),
      Footer.deleteMany({}),
      SiteSettings.deleteMany({})
    ]);
    console.log('Cleared existing collections.');

    // 2. Seed Admin User
    const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@priya.dev';
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@12345';

    await AdminUser.create({
      name: 'Priya P',
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });
    console.log(`✅ Admin user created: ${adminEmail}`);

    // 3. Seed Home Section
    await Home.create({
      greeting: "Hi, I'm Priya 👋",
      name: 'PRIYA P',
      title: 'B.Tech Information Technology Student',
      subtitle: 'UI/UX Designer | App Developer | Python Enthusiast',
      description: 'I create user-friendly digital experiences and practical applications.',
      profileImage: '/assets/images/priya-profile.svg',
      resumeUrl: '/resume/Priya-Resume.pdf',
      availabilityText: 'Open to Internships & Opportunities',
      location: 'Chennai, Tamil Nadu, India',
      collegeText: 'Dhanalakshmi College of Engineering (2024–2028)',
      primaryButtonText: 'View My Projects',
      primaryButtonLink: '#projects',
      secondaryButtonText: 'Download Resume',
      secondaryButtonLink: '/resume/Priya-Resume.pdf',
      tertiaryButtonText: 'Contact Me',
      tertiaryButtonLink: '#contact',
      techPills: ['Figma', 'Python', 'React', 'Node.js', 'MongoDB']
    });
    console.log('✅ Seeded Home section CMS data.');

    // 4. Seed About Section
    await About.create({
      badge: 'Get To Know Me',
      heading: 'About Me',
      subheading: 'Bridging aesthetics and code to create digital experiences that delight users and solve practical real-world problems.',
      bioParagraph1: 'I am currently pursuing my Bachelor of Technology in Information Technology (Batch 2024 – 2028) at Dhanalakshmi College of Engineering, Chennai. My journey revolves around crafting intuitive, user-first interfaces and transforming those ideas into fully functional applications.',
      bioParagraph2: 'Whether I am orchestrating fluid micro-interactions in Figma, building responsive web applications using React & Node.js, or scripting intelligent automation and algorithmic problem solving with Python, I strive for clean architecture and thoughtful craftsmanship.',
      profileImage: '/assets/images/priya-profile.svg',
      careerInterests: ['UI/UX Design', 'Mobile Application Development', 'Python Programming', 'Web Technologies', 'Data Analytics'],
      location: 'Chennai, Tamil Nadu',
      degree: 'B.Tech – IT (2024–2028)',
      languages: 'English, Tamil',
      focusTitle: 'My Core Focus Areas',
      focusDescription: 'Committed to continuous learning across the entire product lifecycle—from user research and wireframing to backend database engineering.',
      focusPoints: [
        {
          title: 'User-Centric Interface Design',
          description: 'Focusing on wireframing, high-fidelity Figma prototypes, and accessibility standards.',
          icon: 'bi-check-lg'
        },
        {
          title: 'Modern Web & Mobile Development',
          description: 'Building reactive, cross-device interfaces using modern component frameworks and REST APIs.',
          icon: 'bi-check-lg'
        },
        {
          title: 'Python & Algorithmic Thinking',
          description: 'Automating workflows, exploring data analytics, and solving complex programmatic tasks.',
          icon: 'bi-check-lg'
        }
      ],
      cards: [
        {
          title: 'B.Tech IT',
          description: 'Building an engineering foundation in Data Structures, Database Systems, Computer Networks, and Object-Oriented Software Engineering at Dhanalakshmi College of Engineering.',
          icon: 'bi-mortarboard-fill',
          badge: '2024 – 2028',
          gradient: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
          order: 1
        },
        {
          title: 'UI/UX Design',
          description: 'Creating interactive mobile and web prototypes in Figma. Experienced in empathetic user research, wireframing, color theory, design systems, and micro-interactions.',
          icon: 'bi-palette-fill',
          badge: 'Figma & Prototyping',
          gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
          order: 2
        },
        {
          title: 'App Development',
          description: 'Designing and building mobile applications and full-stack web applications with responsive design, component modularity, and smooth state management.',
          icon: 'bi-phone-fill',
          badge: 'Android & React',
          gradient: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
          order: 3
        },
        {
          title: 'Python',
          description: 'Passionate about Python programming for algorithmic challenges, backend integration, web scraping, and exploring emerging data analytics workflows.',
          icon: 'bi-filetype-py',
          badge: 'Python 3 & Logic',
          gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          order: 4
        }
      ]
    });
    console.log('✅ Seeded About section CMS data.');

    // 5. Seed Skills
    const skills = [
      // UI/UX
      { name: 'Figma', category: 'UI/UX', level: 95, icon: 'bi-bezier2', description: 'Design systems, wireframing & clickable prototypes', order: 1 },
      { name: 'UI/UX Design', category: 'UI/UX', level: 92, icon: 'bi-palette', description: 'User-centered design, persona creation & workflows', order: 2 },
      { name: 'Wireframing', category: 'UI/UX', level: 90, icon: 'bi-layout-text-window', description: 'Low & high-fidelity architecture sketches', order: 3 },
      { name: 'Prototyping', category: 'UI/UX', level: 88, icon: 'bi-phone', description: 'Micro-interactions & screen transition logic', order: 4 },

      // Programming
      { name: 'Python', category: 'Programming', level: 90, icon: 'bi-filetype-py', description: 'OOP, data structures, algorithms & automation', order: 5 },
      { name: 'JavaScript', category: 'Programming', level: 86, icon: 'bi-filetype-js', description: 'Modern ES6+, async/await & DOM manipulation', order: 6 },
      { name: 'HTML', category: 'Programming', level: 95, icon: 'bi-filetype-html', description: 'Semantic HTML5, accessibility & SEO standards', order: 7 },
      { name: 'CSS', category: 'Programming', level: 92, icon: 'bi-filetype-css', description: 'Flexbox, CSS Grid, animations & variables', order: 8 },

      // Development
      { name: 'React', category: 'Development', level: 88, icon: 'bi-filetype-jsx', description: 'Component architecture, hooks & router', order: 9 },
      { name: 'Node.js', category: 'Development', level: 84, icon: 'bi-server', description: 'Express REST APIs & middleware engineering', order: 10 },
      { name: 'MongoDB', category: 'Development', level: 82, icon: 'bi-database', description: 'Mongoose schemas, aggregation & indexing', order: 11 },
      { name: 'Android Development', category: 'Development', level: 78, icon: 'bi-android2', description: 'Mobile app layouts & API integration', order: 12 },

      // Tools
      { name: 'VS Code', category: 'Tools', level: 95, icon: 'bi-code-square', description: 'Primary IDE & debugging workflows', order: 13 },
      { name: 'Git', category: 'Tools', level: 88, icon: 'bi-git', description: 'Branching, merging & commit management', order: 14 },
      { name: 'GitHub', category: 'Tools', level: 90, icon: 'bi-github', description: 'Open-source collaboration & code reviews', order: 15 },
      { name: 'Figma Tool', category: 'Tools', level: 95, icon: 'bi-vector-pen', description: 'Auto-layout, components & design tokens', order: 16 },
      { name: 'MongoDB Compass', category: 'Tools', level: 85, icon: 'bi-database-fill-gear', description: 'GUI query analysis & database monitoring', order: 17 }
    ];
    await Skill.insertMany(skills);
    console.log(`✅ Seeded ${skills.length} skills.`);

    // 6. Seed Projects
    const projects = [
      {
        title: 'Coffee Ordering App UI',
        shortDescription: 'Sleek and modern mobile application UI/UX designed for ordering specialty coffee.',
        description: 'A modern, intuitive mobile application interface crafted with precision in Figma. Designed specifically for coffee lovers with an aesthetic color palette, smooth navigational flows, and delightful micro-interactions.',
        image: '/assets/projects/coffee-app.svg',
        technologies: ['Figma', 'UI/UX', 'Mobile Design', 'Prototyping'],
        category: 'UI/UX Design',
        features: [
          'Secure Login & User Profile',
          'Interactive Home Screen with Trending Brews',
          'Detailed Coffee Customization (Beans, Milk, Temperature)',
          'Real-time Animated Cart Management',
          'Streamlined 3-Step Checkout Flow with Payment Confirmation'
        ],
        githubUrl: 'https://github.com/priyap/coffee-ordering-app-ui',
        liveDemoUrl: 'https://www.figma.com/community',
        startDate: '2024-11-01',
        endDate: '2024-12-15',
        featured: true,
        order: 1
      },
      {
        title: 'Food Ordering App UI',
        shortDescription: 'High-fidelity mobile app prototype for food discovery and live order tracking.',
        description: 'Vibrant and engaging mobile app interface for seamless food discovery and quick ordering. Emphasizes visual food hierarchy, customer reviews, dietary filters, and live delivery tracking status.',
        image: '/assets/projects/food-ui.svg',
        technologies: ['Figma', 'UI/UX', 'Design System', 'User Research'],
        category: 'UI/UX Design',
        features: [
          'Visual Categorization & Smart Search Filters',
          'Dish Customization with Portion & Add-on Controls',
          'Live Delivery Driver GPS Tracking Screen',
          'Customer Ratings, Reviews, and Wishlist Hub'
        ],
        githubUrl: 'https://github.com/priyap/food-ordering-app-ui',
        liveDemoUrl: 'https://www.figma.com/community',
        startDate: '2025-01-05',
        endDate: '2025-02-10',
        featured: true,
        order: 2
      },
      {
        title: 'Modern E-Commerce Website UI',
        shortDescription: 'Sophisticated, responsive desktop and tablet eCommerce web interface.',
        description: 'A sophisticated, clean, and fully responsive desktop and tablet e-commerce platform. Tailored for modern retail with sleek typography, dynamic product cards, and frictionless checkout optimization.',
        image: '/assets/projects/ecommerce-ui.svg',
        technologies: ['Figma', 'UI/UX', 'Web Design', 'Wireframing'],
        category: 'UI/UX Design',
        features: [
          'Mega Menu Navigation & High-Impact Hero Banners',
          'Advanced Multi-Facet Filtering (Price, Brand, Rating)',
          'Quick-View Product Modals with High-Res Image Sliders',
          'Responsive Breakpoints for Mobile, Tablet, and Desktop'
        ],
        githubUrl: 'https://github.com/priyap/ecommerce-website-ui',
        liveDemoUrl: 'https://www.figma.com/community',
        startDate: '2025-02-15',
        endDate: '2025-03-01',
        featured: true,
        order: 3
      },
      {
        title: 'Email Newsletter Design',
        shortDescription: 'Dynamic, high-engagement transactional and marketing email template design.',
        description: 'High-conversion, visually striking email newsletter layouts designed to captivate readers. Built with modular design components optimized for standard email clients and dark-mode rendering.',
        image: '/assets/projects/newsletter-ui.svg',
        technologies: ['Figma', 'UI/UX', 'Email Design', 'Typography'],
        category: 'UI/UX Design',
        features: [
          'Modular Drag-and-Drop Content Blocks',
          'High-Contrast Call-to-Action Buttons',
          'Cross-Client Compatibility & Mobile-First Stack Layout',
          'Integrated Social Proof and Brand Footer Components'
        ],
        githubUrl: 'https://github.com/priyap/email-newsletter-design',
        liveDemoUrl: 'https://www.figma.com/community',
        startDate: '2024-10-01',
        endDate: '2024-10-20',
        featured: false,
        order: 4
      },
      {
        title: 'Food Delivery Web Application',
        shortDescription: 'Full-stack dynamic web platform with menu browsing, persistent cart & admin portal.',
        description: 'A dynamic full-stack web application engineered using React, Node.js, Express, and MongoDB. Connects users with local eateries, provides cart persistence, and includes an administrative portal for menu and order management.',
        image: '/assets/projects/food-web-app.svg',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Bootstrap'],
        category: 'Full-Stack Development',
        features: [
          'Dynamic Menu Browsing with Category Filtering',
          'Persistent Shopping Cart & Real-Time Price Calculation',
          'Secure Authentication & Order History Tracking',
          'Admin Dashboard for Menu Items and Order Status Updates'
        ],
        githubUrl: 'https://github.com/priyap/food-delivery-webapp',
        liveDemoUrl: 'https://food-delivery-priya.vercel.app',
        startDate: '2025-03-05',
        endDate: 'Present',
        featured: true,
        order: 5
      }
    ];
    await Project.insertMany(projects);
    console.log(`✅ Seeded ${projects.length} projects.`);

    // 7. Seed Education
    const education = [
      {
        institution: 'Dhanalakshmi College of Engineering',
        degree: 'Bachelor of Technology – Information Technology',
        fieldOfStudy: 'Information Technology',
        duration: '2024 – 2028',
        startYear: '2024',
        endYear: '2028',
        location: 'Chennai, Tamil Nadu, India',
        grade: 'First Class (Pursuing)',
        description: 'Pursuing undergraduate degree in Information Technology with strong foundational training in algorithms, database design, software engineering, and modern web application development.',
        highlights: [
          'Core subjects: Data Structures, Object-Oriented Programming (Python/C++), DBMS, Web Technologies',
          'Active participant in intra-college hackathons and UI/UX design challenges',
          'Collaborative student development and technical community contributor'
        ],
        order: 1
      }
    ];
    await Education.insertMany(education);
    console.log('✅ Seeded Education data.');

    // 8. Seed Certifications
    const certifications = [
      {
        name: 'Google UX Design Professional Certificate',
        organization: 'Google / Coursera',
        date: '2024',
        description: 'Foundations of User Experience (UX) Design, empathizing with users, and wireframing in Figma.',
        image: '/assets/certifications/google-ux.svg',
        credentialUrl: 'https://coursera.org/verify/professional-cert/google-ux',
        skillsLearned: ['User Research', 'Wireframing', 'Figma Prototyping', 'Usability Studies'],
        order: 1
      },
      {
        name: 'Python for Everybody Specialization',
        organization: 'University of Michigan',
        date: '2024',
        description: 'Deep dive into Python data structures, networked application programs, and SQLite databases.',
        image: '/assets/certifications/python-cert.svg',
        credentialUrl: 'https://coursera.org/verify/specialization/python-for-everybody',
        skillsLearned: ['Python Programming', 'Data Structures', 'Web Scraping', 'SQL Databases'],
        order: 2
      },
      {
        name: 'Meta Front-End Developer Specialization',
        organization: 'Meta',
        date: '2025',
        description: 'Advanced React component lifecycle, responsive web styling, and modern JavaScript standards.',
        image: '/assets/certifications/meta-cert.svg',
        credentialUrl: 'https://coursera.org/verify/meta-front-end',
        skillsLearned: ['React.js', 'Responsive Web Design', 'JavaScript ES6+', 'Version Control'],
        order: 3
      },
      {
        name: 'MongoDB Associate Developer & Basics',
        organization: 'MongoDB University',
        date: '2025',
        description: 'Schema modeling, Mongoose ODM integration, and database aggregation query optimization.',
        image: '/assets/certifications/mongo-cert.svg',
        credentialUrl: 'https://learn.mongodb.com',
        skillsLearned: ['Mongoose ODM', 'Aggregation Pipelines', 'Schema Design', 'CRUD Optimization'],
        order: 4
      }
    ];
    await Certification.insertMany(certifications);
    console.log(`✅ Seeded ${certifications.length} certifications.`);

    // 9. Seed Experience
    const experience = [
      {
        position: 'UI/UX Design Intern',
        company: 'TechSprint Digital Studio',
        startDate: 'Jan 2025',
        endDate: 'Present',
        location: 'Chennai, India (Hybrid)',
        description: 'Collaborating on user research, wireframing, and interactive design systems for mobile and web clients. Designing responsive UI layouts in Figma and handing off production assets to developers.',
        technologies: ['Figma', 'Prototyping', 'Wireframing', 'Design Systems', 'User Research'],
        order: 1
      },
      {
        position: 'Student Developer & Tech Club Lead',
        company: 'Dhanalakshmi College of Engineering Tech Club',
        startDate: 'Aug 2024',
        endDate: 'Present',
        location: 'Chennai, Tamil Nadu, India',
        description: 'Organizing practical coding sessions on Python and Web Technologies, mentoring junior students, and building responsive internal event portals.',
        technologies: ['Python', 'JavaScript', 'HTML/CSS', 'Bootstrap', 'Git/GitHub'],
        order: 2
      }
    ];
    await Experience.insertMany(experience);
    console.log(`✅ Seeded ${experience.length} experience entries.`);

    // 10. Seed Contact Info
    await ContactInfo.create({
      heading: 'Get In Touch',
      description: 'Have a project in mind, an internship opportunity, or want to discuss UI/UX design & Python development? Drop a message below!',
      email: 'priya.p.it@dce.edu.in',
      phone: '+91 98765 43210',
      location: 'Chennai, Tamil Nadu, India',
      college: 'Dhanalakshmi College of Engineering',
      responseTimeNote: 'Currently responding within 24 hours',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      figma: 'https://figma.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com'
    });
    console.log('✅ Seeded Contact Info CMS data.');

    // 11. Seed Navbar
    await Navbar.create({
      brandName: 'Priya',
      brandHighlight: 'P',
      logoLetter: 'P',
      logoUrl: '',
      resumeButtonText: 'Resume',
      resumeButtonLink: '/resume/Priya-Resume.pdf',
      items: [
        { name: 'Home', href: '#home', visible: true, order: 1 },
        { name: 'About', href: '#about', visible: true, order: 2 },
        { name: 'Skills', href: '#skills', visible: true, order: 3 },
        { name: 'Projects', href: '#projects', visible: true, order: 4 },
        { name: 'Education', href: '#education', visible: true, order: 5 },
        { name: 'Certifications', href: '#certifications', visible: true, order: 6 },
        { name: 'Experience', href: '#experience', visible: true, order: 7 },
        { name: 'Contact', href: '#contact', visible: true, order: 8 }
      ]
    });
    console.log('✅ Seeded Navbar CMS data.');

    // 12. Seed Footer
    await Footer.create({
      brandName: 'Priya',
      brandHighlight: 'P',
      logoLetter: 'P',
      description: 'B.Tech Information Technology Student @ Dhanalakshmi College of Engineering, Chennai (2024–2028). Building intuitive digital experiences & modern software applications.',
      copyrightText: 'Priya P. All rights reserved. Crafted with React, TypeScript & MongoDB.',
      location: 'Chennai, Tamil Nadu, India 📍',
      email: 'priya.p.it@dce.edu.in',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    });
    console.log('✅ Seeded Footer CMS data.');

    // 13. Seed Site Settings
    await SiteSettings.create({
      websiteTitle: 'Priya P | UI/UX Designer & App Developer',
      metaDescription: 'Portfolio of Priya P - B.Tech IT Student, UI/UX Designer, App Developer, and Python Enthusiast from Chennai, India.',
      logo: '/favicon.svg',
      favicon: '/favicon.svg',
      primaryColor: '#4f46e5',
      secondaryColor: '#ec4899',
      defaultTheme: 'dark',
      footerText: 'Designed & Built with React, TypeScript & MongoDB'
    });
    console.log('✅ Seeded Site Settings CMS data.');

    // 14. Seed Contact Messages
    await ContactMessage.create({
      name: 'Tech Founder',
      email: 'founder@creativetech.io',
      subject: 'UI/UX Collaboration & App Project Opportunity',
      message: 'Hi Priya, I reviewed your portfolio and was thoroughly impressed by your Coffee App and Food Delivery designs. We would love to discuss a freelance or internship opportunity with our product team.',
      read: false
    });
    console.log('✅ Seeded initial contact message.');

    console.log('\n====================================================');
    console.log('🎉 COMPLETE CMS DATABASE SEED SUCCEEDED!');
    console.log(`👤 Admin Account: ${adminEmail}`);
    console.log(`🔑 Admin Password: ${adminPassword}`);
    console.log('====================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
};

seedData();
