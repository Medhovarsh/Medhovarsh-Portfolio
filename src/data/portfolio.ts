export const portfolioData = {
    personalInfo: {
        name: "Medhovarsh Bayyapureddi",
        title: "Solution Architect & AI Engineer",
        email: "medhovarshb@gmail.com",
        phone: "+1 (786)-483-0198",
        linkedin: "https://www.linkedin.com/in/medhovarsh-bayyapureddi/",
        github: "https://github.com/Medhovarsh",
        bio: "Bridging ML research and production — from medical imaging pipelines to real-time computer vision. MS in Technology Management from UIUC, with published work at Springer and IEEE."
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
                "Built end-to-end ML pipelines for crop yield prediction and plant disease detection, achieving 85–90% accuracy via Vision Transformers and GNNs.",
                "Developed a Graph Neural Network-based ontology to unify heterogeneous agricultural data sources and improve inference consistency.",
                "Published peer-reviewed findings in Springer and presented at ICICV-2024."
            ],
            link: {
                text: "View Springer Publication",
                url: "https://link.springer.com/chapter/10.1007/978-981-97-6995-7_31"
            }
        }
    ],
    projects: [
        {
            title: "Cervical Cancer Screening Platform",
            duration: "Aug 2024 - May 2025",
            description: "An automated colposcopy analysis tool designed to assist clinicians in early cancer detection. It processes cervical scans to identify pre-cancerous lesions with high precision, offering a second opinion that streamlines the diagnostic workflow.",
            technologies: ["Deep Learning", "Flask", "Python", "DeepLabV3"],
            link: "https://github.com/Medhovarsh/ScanCervixCancer",
            bullets: [
                "Built DeepLabV3-based segmentation pipeline to detect cervical cancer from colposcopy images with clinical-grade accuracy.",
                "Developed a Flask web interface for real-time inference — clinicians upload scans and receive instant diagnostic heatmaps.",
                "Deployed as a scalable cloud service, reducing preliminary screening time by 95%."
            ]
        },
        {
            title: "PersonaPal – AI Personalization Engine",
            duration: "Apr 2024 - Jul 2024",
            description: "A smart recommendation engine that moves beyond static rules to understand user intent. It dynamically adapts content delivery based on real-time interactions, creating a more personalized and engaging user journey.",
            technologies: ["MERN Stack", "OpenAI API", "MongoDB"],
            bullets: [
                "Architected a full-stack MERN chatbot powered by OpenAI APIs for contextual, user-aware personalization.",
                "Drove 40% engagement lift through clustering and matrix factorization-based user profiling.",
                "Designed RESTful APIs and optimized MongoDB schemas for scalable interaction handling."
            ]
        },
        {
            title: "Drone Intrusion Detection System",
            duration: "Nov 2023 - Jan 2024",
            description: "A security-focused computer vision system built to detect unauthorized UAVs in complex airspace. It leverages advanced segmentation techniques to distinguish small drones from birds and other aerial objects in real-time video feeds.",
            technologies: ["DeepLabV3+", "ResNet50", "DSPP", "PyTorch"],
            link: "https://github.com/Medhovarsh/Drone-Intrusion-Detection",
            bullets: [
                "Designed a novel architecture combining ResNet50, DeepLabV3+, and Dilated Spatial Pyramid Pooling (DSPP).",
                "Achieved 0.978 mAP vs. 0.66 baseline — dramatically reducing false positives in complex aerial backgrounds.",
                "Applied Focal Loss to handle extreme class imbalance in small-object detection scenarios."
            ]
        },
        {
            title: "Live-In-Labs",
            duration: "Jan 2024 - Feb 2024",
            description: "A community-driven engineering initiative focused on sustainable water solutions. We collaborated directly with rural residents to design and implement a rainwater harvesting system that addresses long-standing water scarcity issues.",
            technologies: ["Engineering Design", "Human-Centered Design"],
            bullets: [
                "Led a cross-functional team to design and deploy rainwater storage infrastructure for a rural community.",
                "Applied structured needs-assessment and Human-Centered Design methodology to deliver a scalable, lasting solution."
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
