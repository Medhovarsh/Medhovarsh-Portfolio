export const portfolioData = {
    personalInfo: {
        name: "Medhovarsh Bayyapureddi",
        title: "Software & Machine Learning Engineer",
        email: "medhovarshb@gmail.com",
        phone: "+1 (786)-483-0198",
        linkedin: "https://www.linkedin.com/in/medhovarsh-bayyapureddi/",
        github: "https://github.com/Medhovarsh",
        bio: "Software & Machine Learning Engineer specializing in designing scalable full-stack applications and deploying robust AI/CV pipelines. Proven track record of improving system latency and model accuracy. Incoming MS in Technology Management at UIUC."
    },
    education: [
        {
            school: "University of Illinois Urbana-Champaign",
            degree: "Master of Science in Technology Management",
            duration: "Aug 2025 - Aug 2026",
            details: ["GPA: 4.0", "Concentration: Information Technology & Control"],
            location: "Champaign, IL"
        },
        {
            school: "Amrita Vishwa Vidyapeetham",
            degree: "B.Tech in Computer Science Engineering",
            duration: "Aug 2021 - Jun 2025",
            details: ["GPA: 4.0", "Rank 9 University-wide"],
            location: "India"
        }
    ],
    experience: [
        {
            company: "Amrita Vishwa Vidyapeetham",
            role: "ACM Research Intern",
            duration: "Aug 2023 - Oct 2023",
            location: "India",
            achievements: [
                "Architected and deployed end-to-end ML pipelines for crop yield prediction and plant disease detection, improving prediction accuracy to 90% utilizing Vision Transformers and GNNs.",
                "Engineered a Graph Neural Network-based ontology to unify heterogeneous data streams, enhancing inference consistency by ~15% and streamlining data integration.",
                "Published peer-reviewed findings in Springer and presented at ICICV-2024."
            ],
            link: {
                text: "View Springer Publication",
                url: "https://link.springer.com/chapter/10.1007/978-981-97-6995-7_31"
            }
        },

    ],
    projects: [
        {
            title: "Cervical Cancer Screening Platform",
            duration: "Aug 2024 - May 2025",
            description: "An automated colposcopy analysis tool designed to assist clinicians in early cancer detection. Processes cervical scans to identify pre-cancerous lesions with high precision, offering a second opinion that streamlines the diagnostic workflow.",
            technologies: ["Deep Learning", "Flask", "Python", "DeepLabV3"],
            link: "https://github.com/Medhovarsh/ScanCervixCancer",
            bullets: [
                "Engineered a DeepLabV3-based semantic segmentation pipeline to detect pre-cancerous lesions from colposcopy images, achieving clinical-grade diagnostic accuracy.",
                "Developed and scaled a responsive Flask-based web infrastructure for real-time inference, enabling clinicians to generate instant diagnostic heatmaps.",
                "Deployed the model as a highly available cloud microservice, decreasing preliminary screening time by 95% and improving diagnostic workflow efficiency."
            ]
        },
        {
            title: "PersonaPal – AI Personalization Engine",
            duration: "Apr 2024 - Jul 2024",
            description: "A smart recommendation engine that dynamically adapts content delivery based on real-time interactions, creating a personalized and engaging user journey.",
            technologies: ["MERN Stack", "OpenAI API", "MongoDB"],
            bullets: [
                "Architected a full-stack MERN chatbot powered by OpenAI APIs for contextual, user-aware personalization.",
                "Drove a 40% lift in user engagement by implementing advanced clustering and matrix factorization algorithms for dynamic user profiling.",
                "Designed robust RESTful APIs and optimized MongoDB query performance and schemas to handle high-throughput concurrent user interactions."
            ]
        },
        {
            title: "Drone Intrusion Detection System",
            duration: "Nov 2023 - Jan 2024",
            description: "A security-focused computer vision system built to detect unauthorized UAVs in complex airspace in real-time video feeds.",
            technologies: ["DeepLabV3+", "ResNet50", "DSPP", "PyTorch"],
            link: "https://github.com/Medhovarsh/Drone-Intrusion-Detection",
            bullets: [
                "Designed a novel architecture combining ResNet50, DeepLabV3+, and Dilated Spatial Pyramid Pooling (DSPP).",
                "Boosted model performance to 0.978 mAP (up from a 0.66 baseline), significantly minimizing false positives across complex aerial environments.",
                "Implemented Focal Loss optimization to robustly handle extreme class imbalance, ensuring high-fidelity detection of small objects."
            ]
        },
        {
            title: "Live-In-Labs",
            duration: "Jan 2024 - Feb 2024",
            description: "A community-driven engineering initiative focused on sustainable water solutions addressing long-standing water scarcity issues.",
            technologies: ["Engineering Design", "Human-Centered Design"],
            bullets: [
                "Led a cross-functional team to design and deploy rainwater storage infrastructure for a rural community.",
                "Applied structured needs-assessment and Human-Centered Design methodology to deliver a scalable, lasting solution."
            ]
        },
        {
            title: "EnLightenTech Leadership",
            duration: "Aug 2023 - Sep 2023",
            description: "A dual-focus leadership initiative bridging the gap between advanced technology and rural communities, empowering 200+ students and local residents.",
            technologies: ["Leadership", "Public Speaking", "Curriculum Design", "Solar Energy Systems", "Ethical AI"],
            bullets: [
                "Led a rural development initiative focused on sustainable energy, simplifying Solar Energy technical concepts for local communities to drive adoption.",
                "Directed an 'Ethical AI' educational program for 200+ 10th-grade students, designing a curriculum that bridges the gap between complex algorithms and foundational understanding.",
                "Achieved a 90% workshop satisfaction rate by translating high-level engineering paradigms into accessible narratives."
            ]
        }
    ],
    skills: [
        { category: "Languages", items: ["Java", "Python", "C/C++", "SQL", "JavaScript", "R"] },
        { category: "Frameworks", items: ["React", "Node.js", "Django", "Flask", "TensorFlow", "PyTorch"] },
        { category: "Databases", items: ["PostgreSQL", "MongoDB"] },
        { category: "Tools", items: ["Git", "Docker", "Kubernetes", "Google Cloud Platform"] },
        { category: "Concepts", items: ["Data Structures", "System Design", "API Development", "Machine Learning", "Deep Learning"] }
    ],
    achievements: [
        {
            text: "Enhanced Bird Species Classification – IEEE International Conference Publication",
            link: "https://ieeexplore.ieee.org/abstract/document/10800982",
            year: "Dec 2024"
        },
        {
            text: "IBM Full Stack Software Developer Certification – Coursera",
            link: "https://coursera.org/share/9b047c6241288e6535f7a1ec4d3d1c70"
        },
        {
            text: "Co-founder, Zenith Student Development Club – Led 250+ members"
        },
        {
            text: "2nd Place, NASA NSS Space Settlement Contest",
            link: "https://nss.org/settlement/nasa/Contest/Results/2019/"
        }
    ]
};
