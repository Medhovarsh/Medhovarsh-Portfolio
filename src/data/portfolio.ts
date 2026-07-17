export const portfolioData = {
    personalInfo: {
        name: "Medhovarsh Bayyapureddi",
        title: "AI Engineer | Full-Stack & ML Engineer",
        email: "medhovarshb@gmail.com",
        phone: "+1 (786)-483-0198",
        linkedin: "https://www.linkedin.com/in/medhovarsh-bayyapureddi/",
        github: "https://github.com/Medhovarsh",
        bio: "AI Engineer building scalable AI applications and deploying robust ML/CV pipelines. Currently an AI Engineer Intern at AI Trusted Advisors, developing intelligent systems that bridge engineering and business. MS in Technology Management at UIUC."
    },
    education: [
        {
            school: "University of Illinois Urbana-Champaign",
            degree: "Master of Science in Technology Management",
            duration: "Aug 2025 - Aug 2026",
            details: ["GPA: 4.0", "Concentration: Information Technology & Control", "Gies College of Business"],
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
            company: "AI Trusted Advisors",
            role: "AI Engineer Intern",
            duration: "Jun 2026 - Present",
            location: "Champaign, IL",
            achievements: [
                "Developing scalable AI applications that integrate with enterprise workflows, optimizing data patterns and business performance metrics.",
                "Integrating Microsoft Copilot Studio for automated marketing campaign generation, streamlining content creation pipelines.",
                "Analyzing complex data patterns to drive actionable insights and optimize AI-powered business intelligence solutions.",
                "Bridging the gap between engineering and business stakeholders to deliver production-grade AI systems."
            ]
        },
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
            title: "ForkMind",
            duration: "May 2026 - Present",
            description: "An open-source, local-first LLM observability and debugging tool that treats AI context windows like a Git repository. Captures every LLM call, visualizes conversations as a DAG, lets you branch alternative prompts from any point in history, and offloads context into encrypted, restorable capsules. Free & local via Ollama, any OpenAI-compatible API, with MCP for agents. Zero config, no cloud, no account.",
            technologies: ["Node.js", "Express", "React Flow", "LangChain.js", "Vercel AI SDK", "Model Context Protocol (MCP)"],
            link: "https://medhovarsh.github.io/forkmind/",
            bullets: [
                "Built a lightweight Node.js/Express proxy that intercepts OpenAI-compatible wire protocol traffic and reconstructs real-time Server-Sent Events.",
                "Developed a local-first dashboard using React Flow to render complex conversation trees as a Directed Acyclic Graph (DAG).",
                "Authored drop-in SDK wrappers for LangChain.js and the Vercel AI SDK, enabling automatic sequential call chaining and state tracking.",
                "Engineered an MCP server to expose historical context to autonomous AI agents for self-correction and traced execution lineage.",
                "Implemented Context Capsules — AES-256-GCM-encrypted, immutable DAG snapshots that offload conversation context from the model window and restore it later with crypto-shredding deletion.",
                "Designed a CI-ready testing pipeline that pins known-good baseline states and guards against prompt degradation."
            ]
        },
        {
            title: "Togetherly",
            duration: "Mar 2026 - Jun 2026",
            description: "A free, open-source family care coordination Progressive Web App with passwordless authentication, built to provide a shared space for appointments, medications, and tasks.",
            technologies: ["Next.js", "TypeScript", "TailwindCSS", "Supabase", "PostgreSQL", "Docker"],
            link: "https://github.com/Medhovarsh/togetherly",
            bullets: [
                "Developed a Progressive Web App (PWA) with passwordless authentication and SMS-based sharing, allowing families to join seamlessly.",
                "Implemented a fairness engine that tracks task distribution to prevent caregiver burnout.",
                "Built TetherAI, a lightweight assistant that generates a weekly digest ('Sunday Note') and provides in-app chat assistance.",
                "Designed with strict privacy standards—no tracking, no ads, and private care pages excluded from search engines."
            ]
        },
        {
            title: "Market Matrix Dashboard",
            duration: "Apr 2026",
            description: "A business intelligence dashboard developed to turn massive amounts of complex global market data into a clear, visually engaging story that drives strategic decisions.",
            technologies: ["Product Strategy", "Agentic AI Development", "Data Visualization"],
            bullets: [
                "Designed a high-level visual summary of market performance across different regions using interactive global return on investment maps.",
                "Implemented daily AI-generated briefs to provide users with quick, automated summaries of critical market changes.",
                "Completely developed the dashboard using GitHub Copilot and agentic AI, allowing for rapid prototyping focused entirely on user experience and data strategy."
            ]
        },
        {
            title: "Airplane Management System",
            duration: "Sep 2022 - Mar 2023",
            description: "A comprehensive desktop application designed to manage airline fleet operations end-to-end, covering passenger bookings, flight schedules, and crew assignments.",
            technologies: ["Java", "Swing", "PostgreSQL", "JDBC", "SQL"],
            bullets: [
                "Built a responsive event-driven Java Swing graphical interface for a seamless user experience.",
                "Designed a normalized PostgreSQL database schema with efficient SQL queries to handle concurrent reads and writes.",
                "Implemented robust JDBC transaction handling ensuring full ACID compliance so bookings complete correctly or roll back cleanly."
            ]
        },
        {
            title: "Cervical Cancer Screening Platform",
            duration: "Aug 2024 - May 2025",
            description: "An automated colposcopy analysis tool designed to assist clinicians in early cancer detection. Processes cervical scans to identify pre-cancerous lesions with high precision, offering a second opinion that streamlines the diagnostic workflow.",
            technologies: ["Deep Learning", "Flask", "Python", "DeepLabV3", "PostgreSQL"],
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
            description: "An agentic LLM chatbot with RAG, FAISS-based retrieval, and Redis semantic caching. Features persona orchestration and a reinforcement layer to prevent context drift.",
            technologies: ["MERN Stack", "OpenAI API", "MongoDB", "FAISS", "Redis"],
            bullets: [
                "Architected a full-stack MERN chatbot powered by OpenAI APIs for contextual, user-aware personalization with RAG and FAISS-based retrieval.",
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
        { category: "Languages", items: ["Java", "Python", "C/C++", "SQL", "JavaScript", "TypeScript", "R"] },
        { category: "Frameworks", items: ["React", "Node.js", "Next.js", "Django", "Flask", "FastAPI", "TensorFlow", "PyTorch"] },
        { category: "AI / ML", items: ["Deep Learning", "Computer Vision", "RAG", "FAISS", "LangChain", "Feature Engineering"] },
        { category: "Databases", items: ["PostgreSQL", "MongoDB", "Redis"] },
        { category: "Tools", items: ["Git", "Docker", "Kubernetes", "Google Cloud Platform", "Celery", "Microsoft Copilot Studio"] },
        { category: "Concepts", items: ["Data Structures", "System Design", "API Development", "Machine Learning", "Agentic AI"] }
    ],
    achievements: [
        {
            text: "Squamous Cell Carcinoma Detection Using Multiscale Feature Refinement – ICICV 2025",
            year: "2025"
        },
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
