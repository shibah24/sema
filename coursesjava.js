document.addEventListener('DOMContentLoaded', function() {
    // Enhanced course data with more details
    const courses = [
        {
            id: 1,
            title: "Modern JavaScript Mastery",
            category: "Web Development",
            description: "Master ES6+ features, async programming, and modern frameworks in this comprehensive course.",
            imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
            level: "Advanced",
            duration: "8 Weeks",
            originalPrice: 199,
            price: 149,
            isPopular: true
        },
        {
            id: 2,
            title: "UI/UX Design Principles",
            category: "Design",
            description: "Learn to create intuitive interfaces and engaging user experiences from industry experts.",
            imageUrl: "https://images.unsplash.com/photo-1541462608143-67571c6738dd",
            level: "Beginner",
            duration: "6 Weeks",
            originalPrice: 179,
            price: 129,
            isPopular: false
        },
        {
            id: 3,
            title: "Flutter App Development",
            category: "Mobile",
            description: "Build cross-platform mobile applications with Google's Flutter framework.",
            imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
            level: "Intermediate",
            duration: "10 Weeks",
            originalPrice: 229,
            price: 189,
            isPopular: false
        },
        {
            id: 4,
            title: "Digital Marketing Strategy",
            category: "Business",
            description: "Develop comprehensive digital marketing campaigns across multiple platforms.",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
            level: "Beginner",
            duration: "5 Weeks",
            originalPrice: 159,
            price: 119,
            isPopular: false
        },
        {
            id: 5,
            title: "Python for Data Analysis",
            category: "Data Science",
            description: "Master Pandas, NumPy, and data visualization for effective data analysis.",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
            level: "Intermediate",
            duration: "7 Weeks",
            originalPrice: 209,
            price: 169,
            isPopular: false
        },
        {
            id: 6,
            title: "Cybersecurity Fundamentals",
            category: "Security",
            description: "Learn essential security principles and how to protect systems from threats.",
            imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
            level: "Advanced",
            duration: "8 Weeks",
            originalPrice: 239,
            price: 199,
            isPopular: false
        }
    ];

    // Get all unique course categories
    const categories = ["All", ...new Set(courses.map(course => course.category))];

    // Create search and filter UI elements
    function createFilterElements() {
        // Create search container if it doesn't exist
        let searchContainer = document.querySelector('.search-container');
        if (!searchContainer) {
            searchContainer = document.createElement('div');
            searchContainer.className = 'search-container';
            document.querySelector('.header').after(searchContainer);
        }

        // Clear existing content
        searchContainer.innerHTML = '';

        // Create search box
        const searchBox = document.createElement('div');
        searchBox.className = 'search-box';
        searchBox.innerHTML = `
            <input type="text" id="searchInput" placeholder="Search courses by title, category, or description...">
            <button id="searchButton">Search</button>
        `;
        searchContainer.appendChild(searchBox);

        // Create filter options
        const filterOptions = document.createElement('div');
        filterOptions.className = 'filter-options';
        
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.textContent = category;
            if (category === 'All') button.classList.add('active');
            button.dataset.category = category;
            filterOptions.appendChild(button);
        });
        
        searchContainer.appendChild(filterOptions);
    }

    // Function to render course cards
    function renderCourses(coursesToRender) {
        const courseContainer = document.querySelector('.course-container');
        courseContainer.innerHTML = '';
        
        if (coursesToRender.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>No courses found</h3>
                <p>Try adjusting your search or filters</p>
            `;
            courseContainer.appendChild(noResults);
            return;
        }

        coursesToRender.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <div class="course-image">
                    <img src="${course.imageUrl}" alt="${course.title}">
                    ${course.isPopular ? '<div class="course-badge">Popular</div>' : ''}
                </div>
                <div class="course-content">
                    <span class="course-category">${course.category}</span>
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <div class="course-meta">
                        <span><i class="far fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-user-graduate"></i> ${course.level}</span>
                    </div>
                    <div class="course-footer">
                        <div class="course-price">
                            <s>$${course.originalPrice}</s> $${course.price}
                        </div>
                        <a href="#" class="enroll-btn" data-course-id="${course.id}">Enroll Now</a>
                    </div>
                </div>
            `;
            courseContainer.appendChild(courseCard);
        });

        // Add event listeners to enroll buttons
        document.querySelectorAll('.enroll-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const courseId = this.dataset.courseId;
                const selectedCourse = courses.find(course => course.id == courseId);
                
                alert(`You've enrolled in: ${selectedCourse.title}\nThank you for choosing Break Through Academy!`);
                
                // You could redirect to a course details page or show a modal here
                // window.location.href = `course-details.html?id=${courseId}`;
            });
        });
    }

    // Search functionality
    function handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
        
        let filteredCourses = courses;
        
        // Filter by category if not "All"
        if (activeCategory !== 'All') {
            filteredCourses = filteredCourses.filter(course => course.category === activeCategory);
        }
        
        // Filter by search term
        if (searchTerm.trim() !== '') {
            filteredCourses = filteredCourses.filter(course => 
                course.title.toLowerCase().includes(searchTerm) || 
                course.description.toLowerCase().includes(searchTerm) || 
                course.category.toLowerCase().includes(searchTerm)
            );
        }
        
        renderCourses(filteredCourses);
    }

    // Initialize the page
    function initPage() {
        // Fix potential HTML structure issues
        // Make sure we only have one course container
        const containers = document.querySelectorAll('.course-container');
        if (containers.length > 1) {
            for (let i = 1; i < containers.length; i++) {
                containers[i].remove();
            }
        }
        
        createFilterElements();
        renderCourses(courses);
        
        // Set up event listeners
        document.getElementById('searchButton').addEventListener('click', handleSearch);
        
        document.getElementById('searchInput').addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
        
        // Add filter button functionality
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Apply filter
                handleSearch();
            });
        });
    }

    // Add animation to show courses on page load
    function animateCards() {
        const cards = document.querySelectorAll('.course-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }

    // Initialize everything
    initPage();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});