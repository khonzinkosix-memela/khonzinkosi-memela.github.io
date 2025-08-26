document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section, hide others
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });

    // Numerology Calculator
    const calculateNumerologyBtn = document.getElementById('calculate-numerology');
    const numerologyResultBox = document.getElementById('numerology-result');

    calculateNumerologyBtn.addEventListener('click', function() {
        const fullName = document.getElementById('full-name').value.trim();
        const birthDate = document.getElementById('birth-date').value;
        
        if (!fullName || !birthDate) {
            alert('Please enter your full name and birth date.');
            return;
        }
        
        // Calculate numerology numbers
        const lifePathNumber = calculateLifePathNumber(birthDate);
        const destinyNumber = calculateDestinyNumber(fullName);
        const soulUrgeNumber = calculateSoulUrgeNumber(fullName);
        const personalityNumber = calculatePersonalityNumber(fullName);
        
        // Display results
        document.getElementById('life-path-number').textContent = lifePathNumber;
        document.getElementById('destiny-number').textContent = destinyNumber;
        document.getElementById('soul-urge-number').textContent = soulUrgeNumber;
        document.getElementById('personality-number').textContent = personalityNumber;
        
        // Display interpretation
        document.getElementById('numerology-interpretation').innerHTML = getNumerologyInterpretation(lifePathNumber);
        
        // Show results
        numerologyResultBox.classList.remove('hidden');
    });

    // Astrology Calculator
    const calculateAstrologyBtn = document.getElementById('calculate-astrology');
    const astrologyResultBox = document.getElementById('astrology-result');

    calculateAstrologyBtn.addEventListener('click', function() {
        const birthDate = document.getElementById('birth-date-astro').value;
        const birthTime = document.getElementById('birth-time').value;
        
        if (!birthDate) {
            alert('Please enter your birth date.');
            return;
        }
        
        // Calculate astrological signs
        const sunSign = calculateSunSign(birthDate);
        const moonSign = calculateMoonSign(birthDate); // Simplified for demo
        const risingSign = birthTime ? calculateRisingSign(birthDate, birthTime) : 'Need birth time';
        
        // Display results
        document.getElementById('sun-sign').textContent = sunSign;
        document.getElementById('moon-sign').textContent = moonSign;
        document.getElementById('rising-sign').textContent = risingSign;
        
        // Display interpretation
        document.getElementById('astrology-interpretation').innerHTML = getAstrologyInterpretation(sunSign);
        
        // Show results
        astrologyResultBox.classList.remove('hidden');
    });

    // Chinese Zodiac Calculator
    const calculateChineseZodiacBtn = document.getElementById('calculate-chinese-zodiac');
    const chineseZodiacResultBox = document.getElementById('chinese-zodiac-result');

    calculateChineseZodiacBtn.addEventListener('click', function() {
        const birthYear = document.getElementById('birth-year-chinese').value;
        
        if (!birthYear || birthYear < 1900 || birthYear > 2100) {
            alert('Please enter a valid birth year between 1900 and 2100.');
            return;
        }
        
        // Calculate Chinese zodiac
        const animalSign = calculateChineseAnimalSign(birthYear);
        const element = calculateChineseElement(birthYear);
        
        // Display results
        document.getElementById('chinese-animal-sign').textContent = animalSign;
        document.getElementById('chinese-element').textContent = element;
        
        // Display interpretation
        document.getElementById('chinese-zodiac-interpretation').innerHTML = getChineseZodiacInterpretation(animalSign, element);
        
        // Show results
        chineseZodiacResultBox.classList.remove('hidden');
    });

    // Daily Horoscope
    const getHoroscopeBtn = document.getElementById('get-horoscope');
    const horoscopeResultBox = document.getElementById('horoscope-result');

    getHoroscopeBtn.addEventListener('click', function() {
        const zodiacSign = document.getElementById('zodiac-sign').value;
        
        if (!zodiacSign) {
            alert('Please select your zodiac sign.');
            return;
        }
        
        // Get daily horoscope
        getDailyHoroscope(zodiacSign);
    });

    // Numerology Functions
    function calculateLifePathNumber(birthDate) {
        const dateObj = new Date(birthDate);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1; // Months are 0-indexed
        const year = dateObj.getFullYear();
        
        // Sum all digits and reduce to a single digit
        let sum = reduceToSingleDigit(day) + reduceToSingleDigit(month) + reduceToSingleDigit(year);
        return reduceToSingleDigit(sum);
    }

    function calculateDestinyNumber(name) {
        const nameValue = calculateNameValue(name);
        return reduceToSingleDigit(nameValue);
    }

    function calculateSoulUrgeNumber(name) {
        // Extract vowels and calculate their value
        let vowelValue = 0;
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        
        name.toLowerCase().split('').forEach(char => {
            if (vowels.includes(char)) {
                vowelValue += getLetterValue(char);
            }
        });
        
        return reduceToSingleDigit(vowelValue);
    }

    function calculatePersonalityNumber(name) {
        // Extract consonants and calculate their value
        let consonantValue = 0;
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        
        name.toLowerCase().split('').forEach(char => {
            if (char.match(/[a-z]/i) && !vowels.includes(char)) {
                consonantValue += getLetterValue(char);
            }
        });
        
        return reduceToSingleDigit(consonantValue);
    }

    function calculateNameValue(name) {
        let nameValue = 0;
        
        name.toLowerCase().split('').forEach(char => {
            if (char.match(/[a-z]/i)) {
                nameValue += getLetterValue(char);
            }
        });
        
        return nameValue;
    }

    function getLetterValue(letter) {
        const letterValues = {
            'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
            'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
            's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
        };
        
        return letterValues[letter] || 0;
    }

    function reduceToSingleDigit(number) {
        // Special cases for master numbers
        if (number === 11 || number === 22 || number === 33) {
            return number;
        }
        
        while (number > 9) {
            let sum = 0;
            while (number > 0) {
                sum += number % 10;
                number = Math.floor(number / 10);
            }
            number = sum;
        }
        
        return number;
    }

    function getNumerologyInterpretation(number) {
        const interpretations = {
            1: `<strong>Life Path 1: The Leader</strong>
                <p>As a Life Path 1, you embody the archetype of the pioneer and leader. You are here to develop independence, individuality, and innovative approaches to life. Your energy is dynamic, self-reliant, and forward-moving.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Natural Leadership:</strong> You possess an innate ability to take charge and inspire others through your confidence and vision.</li>
                    <li><strong>Pioneering Spirit:</strong> You're often the first to try new things, venture into unexplored territory, and initiate projects.</li>
                    <li><strong>Strong Individuality:</strong> You have a powerful sense of self and prefer to do things your own way rather than following others.</li>
                    <li><strong>Determination:</strong> Once you set a goal, you pursue it with remarkable persistence and drive.</li>
                    <li><strong>Originality:</strong> You think outside conventional boundaries and often develop innovative solutions to problems.</li>
                </ul>
                
                <h4>Life Lessons and Challenges:</h4>
                <p>Your primary life lessons revolve around balancing your strong individuality with cooperation and consideration for others. You may struggle with:</p>
                <ul>
                    <li><strong>Dominance:</strong> Learning when to lead and when to follow or collaborate.</li>
                    <li><strong>Stubbornness:</strong> Being open to others' ideas and perspectives even when they differ from your own.</li>
                    <li><strong>Impatience:</strong> Developing tolerance for processes that require time and the input of others.</li>
                    <li><strong>Self-centeredness:</strong> Recognizing the needs and contributions of those around you.</li>
                </ul>
                
                <h4>Career and Vocation:</h4>
                <p>You excel in roles that allow you to express your leadership, creativity, and individuality. Potential career paths include:</p>
                <ul>
                    <li>Entrepreneur or business owner</li>
                    <li>Executive or manager</li>
                    <li>Inventor or innovator</li>
                    <li>Independent artist or creative professional</li>
                    <li>Pioneer in your chosen field</li>
                </ul>
                
                <h4>Relationships:</h4>
                <p>In relationships, you value your independence while seeking partners who respect your need for autonomy. You're loyal and protective of those you love, though you may need to work on expressing vulnerability and sharing control. Your ideal partners are those who are secure in themselves and appreciate your strength without competing with it.</p>
                
                <h4>Spiritual Path:</h4>
                <p>Your spiritual journey involves recognizing your connection to others while honoring your unique path. You're here to learn that true strength comes not just from standing alone, but from knowing when to connect with and rely on others. Your greatest spiritual growth occurs when you use your leadership abilities to empower others rather than to dominate.</p>
                
                <h4>Life Path 1 Famous Figures:</h4>
                <p>Martin Luther King Jr., Tom Hanks, Lady Gaga, George Washington, and Steve Jobs are examples of Life Path 1 individuals who have used their pioneering spirit and leadership to make significant impacts in their fields.</p>`,
                
            2: `<strong>Life Path 2: The Diplomat</strong>
                <p>As a Life Path 2, you embody the archetype of the mediator and peacemaker. You are here to develop cooperation, partnership, and emotional intelligence. Your energy is harmonizing, intuitive, and relationship-oriented.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Diplomatic Nature:</strong> You have a natural ability to see all sides of a situation and find common ground between opposing viewpoints.</li>
                    <li><strong>Intuitive Understanding:</strong> You possess a deep emotional intelligence that allows you to sense what others are feeling, often before they express it.</li>
                    <li><strong>Cooperative Spirit:</strong> You thrive in partnerships and collaborative environments where harmony is valued.</li>
                    <li><strong>Patience:</strong> You understand that meaningful relationships and outcomes take time to develop.</li>
                    <li><strong>Detail-Oriented:</strong> You notice the small things that others miss, particularly in human interactions.</li>
                </ul>
                
                <h4>Life Lessons and Challenges:</h4>
                <p>Your primary life lessons revolve around finding your voice while maintaining harmony. You may struggle with:</p>
                <ul>
                    <li><strong>People-Pleasing:</strong> Learning to honor your own needs while caring for others.</li>
                    <li><strong>Hypersensitivity:</strong> Developing emotional resilience in the face of criticism or conflict.</li>
                    <li><strong>Indecisiveness:</strong> Trusting your own judgment rather than constantly seeking external validation.</li>
                    <li><strong>Passivity:</strong> Finding the courage to stand up for yourself and your beliefs when necessary.</li>
                </ul>
                
                <h4>Career and Vocation:</h4>
                <p>You excel in roles that utilize your interpersonal skills, attention to detail, and ability to create harmony. Potential career paths include:</p>
                <ul>
                    <li>Counselor or therapist</li>
                    <li>Mediator or diplomat</li>
                    <li>Human resources professional</li>
                    <li>Teacher or educator</li>
                    <li>Team coordinator or support specialist</li>
                </ul>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are devoted, attentive, and nurturing. You have a gift for making others feel understood and valued. You seek deep, meaningful connections and may struggle with partners who are emotionally unavailable or conflict-prone. Your challenge is to maintain your sense of self within relationships and to recognize that healthy relationships include occasional disagreement.</p>
                
                <h4>Spiritual Path:</h4>
                <p>Your spiritual journey involves finding balance between giving and receiving. You're here to learn that true harmony comes not from avoiding conflict but from navigating it with grace and authenticity. Your greatest spiritual growth occurs when you honor your own truth while helping others discover theirs.</p>
                
                <h4>Life Path 2 Famous Figures:</h4>
                <p>Barack Obama, Jennifer Aniston, Madonna, Mahatma Gandhi, and Oprah Winfrey are examples of Life Path 2 individuals who have used their diplomatic nature and intuitive understanding to connect with and influence others.</p>`,
                
            3: `<strong>Life Path 3: The Creative Communicator</strong>
                <p>As a Life Path 3, you embody the archetype of the artist and communicator. You are here to develop self-expression, creativity, and joy. Your energy is expressive, imaginative, and socially engaging.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Creative Expression:</strong> You have a natural ability to express yourself through various artistic and communication mediums.</li>
                    <li><strong>Social Charisma:</strong> You possess a magnetic personality that draws others to you and lights up social gatherings.</li>
                    <li><strong>Optimistic Outlook:</strong> You tend to see the positive side of situations and inspire others with your enthusiasm.</li>
                    <li><strong>Verbal Agility:</strong> You have a gift with words, whether written or spoken, and can articulate ideas with flair.</li>
                    <li><strong>Emotional Sensitivity:</strong> You feel emotions deeply and can translate these feelings into powerful creative works.</li>
                </ul>
                
                <h4>Life Lessons and Challenges:</h4>
                <p>Your primary life lessons revolve around channeling your creative energy productively. You may struggle with:</p>
                <ul>
                    <li><strong>Scattered Focus:</strong> Learning to commit to projects and see them through to completion.</li>
                    <li><strong>Superficiality:</strong> Developing depth and substance beneath your charming exterior.</li>
                    <li><strong>Self-Discipline:</strong> Creating structure and routine to support your creative endeavors.</li>
                    <li><strong>Emotional Reactivity:</strong> Managing your emotional responses and developing emotional maturity.</li>
                </ul>
                
                <h4>Career and Vocation:</h4>
                <p>You excel in roles that allow you to express your creativity, communicate with others, and bring joy. Potential career paths include:</p>
                <ul>
                    <li>Writer, journalist, or poet</li>
                    <li>Actor, musician, or performer</li>
                    <li>Designer or visual artist</li>
                    <li>Teacher or public speaker</li>
                    <li>Marketing or communications professional</li>
                </ul>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are entertaining, affectionate, and emotionally expressive. You bring joy and spontaneity to your partnerships but may struggle with consistency and emotional depth. Your challenge is to move beyond the initial excitement of relationships to develop lasting, meaningful connections that weather life's inevitable challenges.</p>
                
                <h4>Spiritual Path:</h4>
                <p>Your spiritual journey involves finding the deeper purpose behind your creative gifts. You're here to learn that true creativity comes from connecting with universal truths and expressing them in ways that uplift and inspire others. Your greatest spiritual growth occurs when you use your expressive talents to communicate messages of substance and meaning.</p>
                
                <h4>Life Path 3 Famous Figures:</h4>
                <p>John Lennon, Judy Garland, Jim Carrey, Salvador Dalí, and Jimi Hendrix are examples of Life Path 3 individuals who have used their creative expression and communication skills to leave lasting artistic legacies.</p>`,
                
            4: `<strong>Life Path 4: The Builder</strong>
                <p>As a Life Path 4, you embody the archetype of the builder and organizer. You are here to develop stability, order, and practical wisdom. Your energy is grounded, methodical, and results-oriented.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Practical Approach:</strong> You have a natural ability to see what needs to be done and create step-by-step plans to accomplish goals.</li>
                    <li><strong>Strong Work Ethic:</strong> You value diligence and are willing to put in consistent effort to achieve lasting results.</li>
                    <li><strong>Reliability:</strong> Others know they can count on you to follow through on commitments and be there when needed.</li>
                    <li><strong>Organizational Skills:</strong> You excel at creating systems, managing resources, and bringing order to chaos.</li>
                    <li><strong>Attention to Detail:</strong> You notice the small things that ensure quality and prevent future problems.</li>
                </ul>
                
                <h4>Life Lessons and Challenges:</h4>
                <p>Your primary life lessons revolve around finding balance between structure and flexibility. You may struggle with:</p>
                <ul>
                    <li><strong>Rigidity:</strong> Learning to adapt when plans need to change or unexpected situations arise.</li>
                    <li><strong>Overwork:</strong> Developing a healthy work-life balance and knowing when to rest.</li>
                    <li><strong>Perfectionism:</strong> Accepting that imperfection is part of life and knowing when good is good enough.</li>
                    <li><strong>Limited Perspective:</strong> Opening yourself to possibilities beyond the practical and tangible.</li>
                </ul>
                
                <h4>Career and Vocation:</h4>
                <p>You excel in roles that require organization, attention to detail, and the ability to build solid foundations. Potential career paths include:</p>
                <ul>
                    <li>Engineer, architect, or builder</li>
                    <li>Financial planner or accountant</li>
                    <li>Project manager or administrator</li>
                    <li>Craftsperson or artisan</li>
                    <li>Systems analyst or database manager</li>
                </ul>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are loyal, dependable, and committed. You show love through practical actions rather than flowery words. You seek stability and may struggle with partners who are unpredictable or overly emotional. Your challenge is to express your deeper feelings and to recognize that relationships sometimes require emotional risk-taking and spontaneity.</p>
                
                <h4>Spiritual Path:</h4>
                <p>Your spiritual journey involves finding the sacred in the ordinary. You're here to learn that true stability comes not just from external structures but from inner alignment with universal principles. Your greatest spiritual growth occurs when you build not just in the material world but also create a solid foundation for your spiritual life.</p>
                
                <h4>Life Path 4 Famous Figures:</h4>
                <p>Bill Gates, Oprah Winfrey, Arnold Schwarzenegger, Margaret Thatcher, and Michael Jordan are examples of Life Path 4 individuals who have used their practical approach and strong work ethic to build lasting legacies in their fields.</p>`,
                
            5: `<strong>Life Path 5: The Freedom Seeker</strong>
                <p>As a Life Path 5, you embody the archetype of the adventurer and change agent. You are here to develop freedom, adaptability, and progressive thinking. Your energy is dynamic, versatile, and experience-oriented.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Adaptability:</strong> You have a natural ability to adjust to new situations and thrive amid change and variety.</li>
                    <li><strong>Curiosity:</strong> You possess an insatiable desire to explore, learn, and experience life in all its dimensions.</li>
                    <li><strong>Progressive Thinking:</strong> You tend to be ahead of your time, embracing new ideas and challenging outdated systems.</li>
                    <li><strong>Persuasive Communication:</strong> You can articulate ideas in compelling ways that inspire others to embrace change.</li>
                    <li><strong>Resourcefulness:</strong> You excel at thinking on your feet and finding creative solutions to unexpected challenges.</li>
                </ul>
                
                <h4>Life Lessons and Challenges:</h4>
                <p>Your primary life lessons revolve around finding constructive expressions for your freedom-loving nature. You may struggle with:</p>
                <ul>
                    <li><strong>Restlessness:</strong> Learning to commit to people, places, and projects long enough to create depth and mastery.</li>
                    <li><strong>Excess:</strong> Developing moderation in your pursuit of sensory experiences and thrills.</li>
                    <li><strong>Inconsistency:</strong> Creating enough structure to support your goals without feeling trapped.</li>
                    <li><strong>Fear of Limitation:</strong> Recognizing that some boundaries and commitments actually expand rather than restrict your freedom.</li>
                </ul>
                
                <h4>Career and Vocation:</h4>
                <p>You excel in roles that offer variety, change, and the opportunity to use your adaptability. Potential career paths include:</p>
                <ul>
                    <li>Travel writer, tour guide, or foreign correspondent</li>
                    <li>Marketing or public relations professional</li>
                    <li>Entrepreneur or consultant</li>
                    <li>Sales representative or motivational speaker</li>
                    <li>Change management specialist or trend forecaster</li>
                </ul>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are exciting, unpredictable, and stimulating. You bring fresh energy and new experiences to your partnerships but may struggle with consistency and long-term commitment. Your challenge is to recognize that true freedom in relationships comes from choosing commitment rather than having it imposed, and that depth develops through weathering both exciting and routine periods together.</p>
                
                <h4>Spiritual Path:</h4>
                <p>Your spiritual journey involves finding freedom within rather than constantly seeking it externally. You're here to learn that true freedom comes not from avoiding commitment but from being fully present in each experience. Your greatest spiritual growth occurs when you channel your adventurous spirit into exploration of consciousness and universal truths.</p>
                
                <h4>Life Path 5 Famous Figures:</h4>
                <p>Abraham Lincoln, Angelina Jolie, Steven Spielberg, Mick Jagger, and Amelia Earhart are examples of Life Path 5 individuals who have used their adaptability and progressive thinking to push boundaries and inspire change.</p>`,
                
            6: `<strong>Life Path 6: The Nurturer</strong>
                <p>As a Life Path 6, you embody the archetype of the caretaker and harmonizer. You are here to develop responsibility, compassion, and balanced service. Your energy is nurturing, harmonious, and community-oriented.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Nurturing Nature:</strong> You have a natural ability to care for others and create environments where people feel safe and supported.</li>
                    <li><strong>Sense of Responsibility:</strong> You take your duties seriously and can be counted on to fulfill your obligations to family and community.</li>
                    <li><strong>Harmonizing Presence:</strong> You work to create beauty, balance, and peace in your surroundings and relationships.</li>
                    <li><strong>Compassionate Understanding:</strong> You empathize deeply with others' struggles and offer wise counsel and practical support.</li>
                    <li><strong>Idealistic Vision:</strong> You hold high standards for yourself and others, seeing the potential for perfection in all things.</li>
                </ul>
                
                <h4>Life Lessons and Challenges:</h4>
                <p>Your primary life lessons revolve around finding balance in your service to others. You may struggle with:</p>
                <ul>
                    <li><strong>Self-Sacrifice:</strong> Learning to care for yourself as diligently as you care for others.</li>
                    <li><strong>Perfectionism:</strong> Accepting imperfection in yourself, others, and life circumstances.</li>
                    <li><strong>Martyrdom:</strong> Recognizing when you're using service as a way to avoid your own growth or to control others.</li>
                    <li><strong>Boundaries:</strong> Developing healthy limits in relationships and knowing when to step back.</li>
                </ul>
                
                <h4>Career and Vocation:</h4>
                <p>You excel in roles that allow you to care for others, create harmony, and fulfill your sense of responsibility. Potential career paths include:</p>
                <ul>
                    <li>Teacher, counselor, or social worker</li>
                    <li>Healthcare provider or healer</li>
                    <li>Community organizer or non-profit leader</li>
                    <li>Interior designer or artist</li>
                    <li>Family lawyer or mediator</li>
                </ul>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are devoted, supportive, and nurturing. You create beautiful, harmonious home environments and take family responsibilities seriously. You may struggle with partners who don't share your values around commitment and service. Your challenge is to allow others their own journey without trying to fix or perfect them, and to receive care as willingly as you give it.</p>
                
                <h4>Spiritual Path:</h4>
                <p>Your spiritual journey involves finding the sacred balance between giving and receiving. You're here to learn that true service comes from a full heart, not an empty one, and that self-care is a necessary part of caring for others. Your greatest spiritual growth occurs when you recognize the divine in the everyday acts of service and in the imperfect beauty of human relationships.</p>
                
                <h4>Life Path 6 Famous Figures:</h4>
                <p>Albert Einstein, Mother Teresa, John Lennon, Meryl Streep, and Michael Jackson are examples of Life Path 6 individuals who have used their nurturing nature and sense of responsibility to make significant contributions to humanity.</p>`,
                
            7: `<strong>Life Path 7: The Seeker</strong>
                <p>As a Life Path 7, you embody the archetype of the philosopher and mystic. You are here to develop wisdom, analysis, and spiritual understanding. Your energy is contemplative, perceptive, and truth-seeking.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Analytical Mind:</strong> You have a natural ability to examine information critically and see beneath surface appearances.</li>
                    <li><strong>Spiritual Inclination:</strong> You possess a deep interest in the mysteries of life and the unseen realms of existence.</li>
                    <li><strong>Introspective Nature:</strong> You value time alone for reflection and recharge through solitude and quiet contemplation.</li>
                    <li><strong>Perfectionist Tendencies:</strong> You hold high standards for truth and accuracy in all areas of life.</li>
                    <li><strong>Intuitive Perception:</strong> You often know things without being able to explain how you know them.</li>
                </ul>
                
                <h4>Life Lessons and Challenges:</h4>
                <p>Your primary life lessons revolve around balancing intellectual analysis with faith and intuition. You may struggle with:</p>
                <ul>
                    <li><strong>Isolation:</strong> Learning to connect meaningfully with others while honoring your need for solitude.</li>
                    <li><strong>Skepticism:</strong> Developing trust in what cannot be proven through logic or evidence alone.</li>
                    <li><strong>Overthinking:</strong> Finding the balance between analysis and acceptance.</li>
                    <li><strong>Perfectionism:</strong> Embracing the imperfect nature of human existence and relationships.</li>
                </ul>
                
                <h4>Career and Vocation:</h4>
                <p>You excel in roles that require deep thinking, specialized knowledge, and independent work. Potential career paths include:</p>
                <ul>
                    <li>Researcher, scientist, or analyst</li>
                    <li>Writer, philosopher, or theologian</li>
                    <li>Technology specialist or inventor</li>
                    <li>Detective or investigator</li>
                    <li>Spiritual teacher or counselor</li>
                </ul>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are loyal, thoughtful, and value depth over superficial connections. You need partners who respect your need for space and who can engage with you intellectually and spiritually. You may struggle with expressing emotions and with the messiness of human interactions. Your challenge is to open your heart as fully as your mind and to recognize that perfect understanding is not a prerequisite for love.</p>
                
                <h4>Spiritual Path:</h4>
                <p>Your spiritual journey involves finding the balance between knowledge and wisdom. You're here to learn that true understanding comes not just from analysis but from direct experience and surrender to mystery. Your greatest spiritual growth occurs when you allow your intuition to guide your intellect rather than the other way around.</p>
                
                <h4>Life Path 7 Famous Figures:</h4>
                <p>Albert Einstein, Princess Diana, Eleanor Roosevelt, Leonardo da Vinci, and Nikola Tesla are examples of Life Path 7 individuals who have used their analytical minds and spiritual inclinations to expand human understanding.</p>`,
                
            8: `<strong>Life Path 8: The Powerhouse</strong>
                <p>As a Life Path 8, you embody the archetype of the executive and manifester. You are here to develop mastery of the material world, personal authority, and balanced power. Your energy is ambitious, practical, and results-driven.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Executive Ability:</strong> You have a natural talent for organization, management, and making things happen in the physical world.</li>
                    <li><strong>Financial Acumen:</strong> You understand the flow of resources and how to generate, manage, and invest wealth.</li>
                    <li><strong>Authoritative Presence:</strong> You command respect and naturally take charge in situations that require leadership.</li>
                    <li><strong>Practical Vision:</strong> You can see the potential in ideas and know how to transform them into tangible results.</li>
                    <li><strong>Resilience:</strong> You bounce back from setbacks with determination and often learn valuable lessons from challenges.</li>
                </ul>
                
                <h4>Life Lessons and Challenges:</h4>
                <p>Your primary life lessons revolve around using power and resources ethically and effectively. You may struggle with:</p>
                <ul>
                    <li><strong>Workaholic Tendencies:</strong> Learning to value aspects of life beyond achievement and material success.</li>
                    <li><strong>Control Issues:</strong> Developing trust in others and in the natural flow of life.</li>
                    <li><strong>Material Focus:</strong> Balancing material concerns with spiritual and emotional values.</li>
                    <li><strong>Power Dynamics:</strong> Using your authority to empower rather than dominate others.</li>
                </ul>
                
                <h4>Career and Vocation:</h4>
                <p>You excel in roles that allow you to exercise leadership, financial skill, and organizational ability. Potential career paths include:</p>
                <ul>
                    <li>Business owner or executive</li>
                    <li>Financial advisor or investment banker</li>
                    <li>Real estate developer or property manager</li>
                    <li>Judge, lawyer, or authority in your field</li>
                    <li>Producer or project manager</li>
                </ul>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are protective, generous, and committed. You show love by providing security and practical support. You may struggle with partners who are financially irresponsible or who challenge your authority. Your challenge is to bring vulnerability and emotional openness to your relationships and to value the intangible gifts that others offer.</p>
                
                <h4>Spiritual Path:</h4>
                <p>Your spiritual journey involves recognizing that true abundance includes but transcends material wealth. You're here to learn that authentic power comes from alignment with universal principles rather than control over external circumstances. Your greatest spiritual growth occurs when you use your manifesting abilities to create not just personal success but greater good for all.</p>
                
                <h4>Life Path 8 Famous Figures:</h4>
                <p>Warren Buffett, Oprah Winfrey, Martin Luther King Jr., Pablo Picasso, and Nelson Mandela are examples of Life Path 8 individuals who have used their executive ability and sense of authority to create significant impact in the material world.</p>`,
                
            9: `<strong>Life Path 9: The Humanitarian</strong>
                <p>As a Life Path 9, you embody the archetype of the humanitarian and the old soul. You are here to develop universal compassion, selfless service, and completion. Your energy is idealistic, compassionate, and globally conscious.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Compassionate Nature:</strong> You have a natural ability to empathize with the suffering of others and a desire to alleviate it.</li>
                    <li><strong>Visionary Perspective:</strong> You see the big picture and understand how individual actions affect the collective.</li>
                    <li><strong>Artistic Sensitivity:</strong> You possess a refined aesthetic sense and often express yourself through creative means.</li>
                    <li><strong>Old Soul Quality:</strong> You seem to carry wisdom beyond your years and may feel you've lived many lives.</li>
                    <li><strong>Idealistic Drive:</strong> You are motivated by high ideals and a vision of how the world could be.</li>
                </ul>
                
                <h4>Life Lessons and Challenges:</h4>
                <p>Your primary life lessons revolve around balancing selfless service with healthy boundaries. You may struggle with:</p>
                <ul>
                    <li><strong>Martyrdom:</strong> Learning to serve without sacrificing your own wellbeing.</li>
                    <li><strong>Detachment:</strong> Developing healthy emotional boundaries while maintaining compassion.</li>
                    <li><strong>Completion:</strong> Letting go of people, situations, and phases of life when their time has passed.</li>
                    <li><strong>Idealism vs. Reality:</strong> Reconciling your vision of what could be with what currently is.</li>
                </ul>
                
                <h4>Career and Vocation:</h4>
                <p>You excel in roles that allow you to make a difference, express your creativity, and work toward humanitarian ideals. Potential career paths include:</p>
                <ul>
                    <li>Non-profit leader or social activist</li>
                    <li>Artist, musician, or performer</li>
                    <li>Counselor, healer, or spiritual teacher</li>
                    <li>International relations or diplomacy professional</li>
                    <li>Writer or filmmaker focusing on social issues</li>
                </ul>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are romantic, giving, and seek deep connection. You look for partners who share your ideals and vision for a better world. You may struggle with possessiveness or with partners who don't match your level of giving. Your challenge is to recognize that sometimes the most loving thing you can do is to allow relationships to end when they have fulfilled their purpose.</p>
                
                <h4>Spiritual Path:</h4>
                <p>Your spiritual journey involves finding universal love within yourself rather than seeking it externally. You're here to learn that true compassion includes wise discernment and that completion is as sacred as initiation. Your greatest spiritual growth occurs when you embrace the full cycle of beginnings and endings in your own life.</p>
                
                <h4>Life Path 9 Famous Figures:</h4>
                <p>Gandhi, Mother Teresa, John Lennon, Morgan Freeman, and Bob Marley are examples of Life Path 9 individuals who have used their compassionate nature and visionary perspective to promote humanitarian ideals.</p>`,
                
            11: `<strong>Life Path 11: The Illuminator</strong>
                <p>As a Life Path 11, you embody the archetype of the spiritual messenger and intuitive. This master number gives you heightened sensitivity and the potential to bridge the material and spiritual worlds. Your energy is inspirational, visionary, and enlightening.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Heightened Intuition:</strong> You have an extraordinary ability to access information beyond the five senses and logical mind.</li>
                    <li><strong>Inspirational Presence:</strong> You naturally uplift others and can inspire them to connect with their higher potential.</li>
                    <li><strong>Spiritual Sensitivity:</strong> You are attuned to subtle energies and may have psychic or mediumistic abilities.</li>
                    <li><strong>Idealistic Vision:</strong> You hold a vision of human potential and spiritual evolution that guides your path.</li>
                    <li><strong>Nervous Energy:</strong> You often operate at a high vibrational frequency that can manifest as nervous sensitivity.</li>
                </ul>
                
                <h4>Life Lessons and Challenges:</h4>
                <p>Your primary life lessons revolve around grounding your spiritual insights in practical reality. You may struggle with:</p>
                <ul>
                    <li><strong>Nervous Tension:</strong> Learning to manage your heightened sensitivity and channel your energy constructively.</li>
                    <li><strong>Self-Doubt:</strong> Trusting your intuitive insights even when they contradict conventional wisdom.</li>
                    <li><strong>Escapism:</strong> Staying grounded in physical reality while maintaining your spiritual connection.</li>
                    <li><strong>Overwhelm:</strong> Setting boundaries with others who may drain your energy or demand too much of your healing presence.</li>
                </ul>
                
                <h4>Career and Vocation:</h4>
                <p>You excel in roles that allow you to inspire others, share spiritual insights, and bridge different worlds. Potential career paths include:</p>
                <ul>
                    <li>Spiritual teacher, counselor, or healer</li>
                    <li>Inspirational speaker or writer</li>
                    <li>Artist or musician with a spiritual message</li>
                    <li>Innovative therapist or alternative health practitioner</li>
                    <li>Visionary leader or social reformer</li>
                </ul>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are idealistic, compassionate, and seek deep spiritual connection. You need partners who understand your sensitivity and respect your intuitive nature. You may struggle with finding partners who can match your spiritual depth or who understand your need for solitude to recharge. Your challenge is to bring your spiritual awareness into everyday interactions and to recognize that human relationships, with all their imperfections, are also a path to the divine.</p>
                
                <h4>Spiritual Path:</h4>
                <p>Your spiritual journey involves learning to trust and express your intuitive gifts while maintaining balance in the physical world. You're here to serve as a bridge between dimensions and to help others awaken to their own spiritual nature. Your greatest growth occurs when you embrace both your humanity and your divinity, recognizing that enlightenment includes rather than transcends the human experience.</p>
                
                <h4>Life Path 11 Famous Figures:</h4>
                <p>Edgar Cayce, Michelle Obama, Wolfgang Amadeus Mozart, Bill Clinton, and Prince are examples of Life Path 11 individuals who have used their inspirational presence and intuitive insights to illuminate new possibilities for humanity.</p>`,
                
            22: `<strong>Life Path 22: The Master Builder</strong>
                <p>As a Life Path 22, you embody the archetype of the master builder and manifester of grand visions. This powerful master number gives you the practical ability to bring dreams into reality on a large scale. Your energy is visionary, structured, and transformative.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Visionary Pragmatism:</strong> You have the rare ability to see grand possibilities and the practical steps needed to manifest them.</li>
                    <li><strong>Organizational Mastery:</strong> You excel at creating systems, structures, and foundations that can support major undertakings.</li>
                    <li><strong>Leadership Capacity:</strong> You naturally inspire others to contribute their talents to collective endeavors.</li>
                    <li><strong>Material Spirituality:</strong> You understand how to bridge spiritual ideals with physical manifestation.</li>
                    <li><strong>Humanitarian Focus:</strong> Your work is typically oriented toward the greater good rather than personal gain.</li>
                </ul>
                
                <h4>Life Lessons and Challenges:</h4>
                <p>Your primary life lessons revolve around using your extraordinary capabilities for the highest good. You may struggle with:</p>
                <ul>
                    <li><strong>Overwhelm:</strong> Learning to pace yourself and manage the pressure of your own potential.</li>
                    <li><strong>Perfectionism:</strong> Accepting that even master builders must start with imperfect first steps.</li>
                    <li><strong>Responsibility:</strong> Balancing the weight of your capabilities with self-care and personal joy.</li>
                    <li><strong>Practicality vs. Vision:</strong> Maintaining your grand vision while attending to necessary details.</li>
                </ul>
                
                <h4>Career and Vocation:</h4>
                <p>You excel in roles that allow you to create lasting structures and implement large-scale visions. Potential career paths include:</p>
                <ul>
                    <li>Architect, urban planner, or environmental designer</li>
                    <li>Business leader or entrepreneur with a humanitarian focus</li>
                    <li>Educational reformer or institutional leader</li>
                    <li>Engineer or developer of innovative technologies</li>
                    <li>Philanthropist or founder of charitable organizations</li>
                </ul>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are committed, supportive, and oriented toward building something meaningful together. You need partners who understand your drive to create and who can participate in or support your vision. You may struggle with partners who demand too much emotional attention or who don't appreciate the importance of your work in the world. Your challenge is to bring the same care and attention to building your personal relationships as you do to your external projects.</p>
                
                <h4>Spiritual Path:</h4>
                <p>Your spiritual journey involves recognizing that your ability to manifest in the material world is itself a spiritual gift. You're here to learn that true mastery comes from surrendering your personal will to universal guidance while actively co-creating with it. Your greatest spiritual growth occurs when you recognize that you are a channel for divine creativity rather than the source of it.</p>
                
                <h4>Life Path 22 Famous Figures:</h4>
                <p>Bill Gates, Jacqueline Kennedy Onassis, the Dalai Lama, Paul McCartney, and Oprah Winfrey are examples of Life Path 22 individuals who have used their visionary pragmatism and organizational mastery to create structures that benefit humanity.</p>`,
                
            33: `<strong>Life Path 33: The Master Teacher</strong>
                <p>As a Life Path 33, you embody the archetype of the master teacher and nurturer. This rare and powerful master number gives you extraordinary compassion and the ability to uplift others through love and wisdom. Your energy is healing, transformative, and selflessly loving.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Profound Compassion:</strong> You have an exceptional capacity for empathy and unconditional love that extends to all beings.</li>
                    <li><strong>Healing Presence:</strong> Your very presence has a healing effect on others, often without conscious effort on your part.</li>
                    <li><strong>Spiritual Wisdom:</strong> You possess deep spiritual understanding that transcends intellectual knowledge.</li>
                    <li><strong>Selfless Service:</strong> You naturally put the needs of others and the greater good before your own desires.</li>
                    <li><strong>Creative Expression:</strong> You have gifts for expressing universal truths through various creative mediums.</li>
                </ul>
                
                <h4>Life Lessons and Challenges:</h4>
                <p>Your primary life lessons revolve around balancing your extraordinary giving nature with necessary boundaries. You may struggle with:</p>
                <ul>
                    <li><strong>Martyrdom:</strong> Learning to care for yourself as lovingly as you care for others.</li>
                    <li><strong>Boundaries:</strong> Developing healthy limits to prevent energy depletion and resentment.</li>
                    <li><strong>Expectation:</strong> Managing the high expectations that come with your master number.</li>
                    <li><strong>Overwhelm:</strong> Handling the intensity of your emotional and spiritual sensitivity.</li>
                </ul>
                
                <h4>Career and Vocation:</h4>
                <p>You excel in roles that allow you to teach, heal, and uplift others through compassionate service. Potential career paths include:</p>
                <ul>
                    <li>Spiritual teacher or religious leader</li>
                    <li>Healer, therapist, or healthcare provider</li>
                    <li>Artist or performer with a healing message</li>
                    <li>Humanitarian worker or peace activist</li>
                    <li>Counselor or guide for those in crisis</li>
                </ul>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are deeply nurturing, understanding, and forgiving. You see the highest potential in your loved ones and naturally support their growth. You may struggle with partners who take advantage of your giving nature or who cannot match your depth of compassion. Your challenge is to receive love as openly as you give it and to allow others to support and nurture you.</p>
                
                <h4>Spiritual Path:</h4>
                <p>Your spiritual journey involves recognizing that your compassion is a divine gift to be shared wisely rather than indiscriminately. You're here to learn that true spiritual service includes honoring your own needs and limitations. Your greatest spiritual growth occurs when you allow yourself to be both human and divine, embracing your imperfections while expressing your extraordinary capacity for love.</p>
                
                <h4>Life Path 33 Famous Figures:</h4>
                <p>Jesus Christ, Buddha, Mother Teresa, Mahatma Gandhi, and Martin Luther King Jr. are spiritual figures who embodied the Life Path 33 energy of selfless love and compassionate teaching, though numerological confirmation is not always possible for historical figures.</p>`
        };
        
        return interpretations[number] || "No interpretation available for this number.";
    }

    // Astrology Functions
    function calculateSunSign(birthDate) {
        const date = new Date(birthDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are 0-indexed
        
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
        return 'Pisces';
    }

    function calculateMoonSign(birthDate) {
        // This is a simplified version - actual moon sign calculation requires more complex algorithms
        // For a real app, you would use an astronomy library or API
        const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
        const date = new Date(birthDate);
        const dayOfYear = getDayOfYear(date);
        
        // This is just a placeholder algorithm - not astronomically accurate
        const index = Math.floor((dayOfYear % 365) / 30.5);
        return signs[index];
    }

    function calculateRisingSign(birthDate, birthTime) {
        // This is a simplified version - actual rising sign calculation requires location and complex algorithms
        // For a real app, you would use an astronomy library or API
        const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
        const [hours, minutes] = birthTime.split(':').map(Number);
        
        // This is just a placeholder algorithm - not astronomically accurate
        const index = Math.floor((hours * 60 + minutes) / 120);
        return signs[index % 12];
    }

    function getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }
    
    // Chinese Zodiac Functions
    function calculateChineseAnimalSign(year) {
        const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
        const index = (year - 1900) % 12;
        return animals[index];
    }

    function calculateChineseElement(year) {
        const elements = ['Metal', 'Water', 'Wood', 'Fire', 'Earth'];
        const baseYear = Math.floor((year - 1900) / 2) % 5;
        return elements[baseYear];
    }

    function getChineseZodiacInterpretation(animalSign, element) {
        const animalInterpretations = {
            'Rat': `<strong>Rat (鼠 - Shǔ)</strong>
                <p>As a Rat in Chinese astrology, you embody the archetype of the charmer and the opportunist. You are intelligent, adaptable, and quick-witted with strong intuition and keen observation skills.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Intelligent:</strong> You possess sharp intellect and learn quickly.</li>
                    <li><strong>Resourceful:</strong> You can make the most of any situation and find creative solutions.</li>
                    <li><strong>Adaptable:</strong> You adjust easily to new environments and circumstances.</li>
                    <li><strong>Charming:</strong> You have natural charisma that draws others to you.</li>
                    <li><strong>Ambitious:</strong> You work diligently toward your goals with determination.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves using your intelligence and resourcefulness to create opportunities and prosperity. You're here to learn about timing, adaptability, and how to balance self-interest with generosity. Your purpose often involves innovation, starting new ventures, and helping others see possibilities they might otherwise miss.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are loyal to those in your inner circle and can be quite generous. You seek partners who stimulate you intellectually and appreciate your cleverness. You may struggle with jealousy or possessiveness, as you value loyalty highly. Your ideal relationships provide both security and excitement while respecting your need for some independence.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve quick thinking, communication, or entrepreneurship. Potential fields include business, politics, sales, writing, or any role requiring adaptability and strategic thinking. Your natural talents include networking, spotting opportunities, resource management, and the ability to thrive under pressure.</p>
                
                <h4>Famous Rat Individuals:</h4>
                <p>William Shakespeare, Wolfgang Amadeus Mozart, George Washington, and Scarlett Johansson exemplify Rat qualities through their intelligence, opportunism, and ability to create lasting impact through their work.</p>`,
            
            'Ox': `<strong>Ox (牛 - Niú)</strong>
                <p>As an Ox in Chinese astrology, you embody the archetype of the steadfast worker and the reliable foundation. You are diligent, dependable, and determined with great strength and endurance.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Reliable:</strong> You are the person others count on in difficult times.</li>
                    <li><strong>Patient:</strong> You understand that meaningful achievements take time.</li>
                    <li><strong>Methodical:</strong> You approach tasks systematically and thoroughly.</li>
                    <li><strong>Strong-willed:</strong> You have remarkable determination and perseverance.</li>
                    <li><strong>Honest:</strong> You value integrity and straightforward communication.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing inner strength, reliability, and the ability to create lasting value through consistent effort. You're here to learn about patience, the dignity of work, and how to balance diligence with self-care. Your purpose often involves building stable foundations, whether in family life, organizations, or society, that others can rely upon.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are loyal, devoted, and protective. You seek partners who share your values of honesty and commitment. You may struggle with expressing emotions or adapting to change, as you prefer stability and routine. Your ideal relationships provide both security and appreciation for your steadfast nature while gently encouraging your emotional expression.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve reliability, attention to detail, or methodical work. Potential fields include agriculture, engineering, finance, management, or any role requiring persistence and thoroughness. Your natural talents include problem-solving, organization, endurance, and the ability to maintain quality standards under pressure.</p>
                
                <h4>Famous Ox Individuals:</h4>
                <p>Barack Obama, Walt Disney, Vincent van Gogh, and Margaret Thatcher exemplify Ox qualities through their determination, methodical approach to their work, and ability to create lasting impact through persistent effort.</p>`,
            
            'Tiger': `<strong>Tiger (虎 - Hǔ)</strong>
                <p>As a Tiger in Chinese astrology, you embody the archetype of the brave leader and passionate advocate. You are courageous, dynamic, and unpredictable with a strong sense of justice and personal authority.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Brave:</strong> You face challenges with courage and rarely back down.</li>
                    <li><strong>Passionate:</strong> You pursue your interests with intensity and enthusiasm.</li>
                    <li><strong>Independent:</strong> You value your freedom and resist control from others.</li>
                    <li><strong>Protective:</strong> You defend those you care about with fierce loyalty.</li>
                    <li><strong>Charismatic:</strong> You naturally draw others to you with your magnetic presence.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing courage, leadership, and the ability to fight for meaningful causes. You're here to learn about personal power, righteous action, and how to balance boldness with strategy. Your purpose often involves championing justice, inspiring others through brave example, and protecting the vulnerable from exploitation.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are passionate, expressive, and fiercely loyal. You seek partners who respect your independence while matching your emotional intensity. You may struggle with impatience or dominance, as you have strong opinions and desires. Your ideal relationships provide both excitement and enough space for your independent nature while channeling your protective instincts positively.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve leadership, advocacy, or creative expression. Potential fields include politics, law, military, performing arts, or any role requiring courage and decisive action. Your natural talents include crisis management, inspiring others, strategic thinking, and the ability to initiate necessary change.</p>
                
                <h4>Famous Tiger Individuals:</h4>
                <p>Queen Elizabeth II, Leonardo DiCaprio, Lady Gaga, and Usain Bolt exemplify Tiger qualities through their courage, charismatic leadership, and ability to make bold moves that capture public attention.</p>`,
            
            'Rabbit': `<strong>Rabbit (兔 - Tù)</strong>
                <p>As a Rabbit in Chinese astrology, you embody the archetype of the diplomat and the artist. You are gentle, refined, and thoughtful with a strong aesthetic sense and natural grace.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Gentle:</strong> You have a calm, soothing presence that puts others at ease.</li>
                    <li><strong>Diplomatic:</strong> You navigate social situations with tact and consideration.</li>
                    <li><strong>Artistic:</strong> You have a refined aesthetic sense and appreciation for beauty.</li>
                    <li><strong>Compassionate:</strong> You genuinely care about others' feelings and well-being.</li>
                    <li><strong>Detail-oriented:</strong> You notice subtleties that others often miss.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing refinement, diplomacy, and the ability to create harmony in your environment. You're here to learn about peace-making, the power of gentleness, and how to balance sensitivity with inner strength. Your purpose often involves bringing beauty and civility to the world, mediating conflicts, and creating spaces where people feel safe and valued.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are attentive, affectionate, and peace-seeking. You seek partners who share your values of harmony and mutual respect. You may struggle with conflict avoidance or people-pleasing, as you dislike discord. Your ideal relationships provide both emotional security and aesthetic pleasure while respecting your need for occasional solitude to recharge.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve diplomacy, aesthetics, or detailed work. Potential fields include diplomacy, design, counseling, education, or any role requiring tact and attention to detail. Your natural talents include conflict resolution, creating beautiful environments, clear communication, and the ability to make others feel valued and understood.</p>
                
                <h4>Famous Rabbit Individuals:</h4>
                <p>Albert Einstein, Angelina Jolie, Brad Pitt, and David Beckham exemplify Rabbit qualities through their diplomatic approach, aesthetic sensibilities, and ability to navigate complex social situations with grace.</p>`,
            
            'Dragon': `<strong>Dragon (龙 - Lóng)</strong>
                <p>As a Dragon in Chinese astrology, you embody the archetype of the charismatic leader and the visionary. You are powerful, confident, and ambitious with a natural flair for the dramatic and the extraordinary.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Charismatic:</strong> You have a magnetic presence that naturally commands attention.</li>
                    <li><strong>Confident:</strong> You believe in your abilities and inspire confidence in others.</li>
                    <li><strong>Visionary:</strong> You see possibilities beyond the current reality.</li>
                    <li><strong>Energetic:</strong> You approach life with vigor and enthusiasm.</li>
                    <li><strong>Independent:</strong> You forge your own path and resist conventional limitations.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing leadership, vision, and the ability to inspire others toward greatness. You're here to learn about personal power, responsible influence, and how to balance ambition with compassion. Your purpose often involves leading important initiatives, creating new paradigms, and helping others recognize and develop their own unique gifts.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are passionate, generous, and protective. You seek partners who appreciate your strength while having enough confidence to stand as your equal. You may struggle with dominance or impatience, as you have high standards and strong opinions. Your ideal relationships provide both excitement and mutual respect while allowing both partners to shine in their own ways.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve leadership, innovation, or performance. Potential fields include business leadership, politics, entertainment, entrepreneurship, or any role allowing you to create significant impact. Your natural talents include strategic vision, public speaking, crisis management, and the ability to inspire others to exceed their own expectations.</p>
                
                <h4>Famous Dragon Individuals:</h4>
                <p>Bruce Lee, John Lennon, Salvador Dalí, and Adele exemplify Dragon qualities through their charismatic presence, visionary work, and ability to transform their fields through bold, innovative approaches.</p>`,
            
            'Snake': `<strong>Snake (蛇 - Shé)</strong>
                <p>As a Snake in Chinese astrology, you embody the archetype of the mystic and the strategist. You are wise, intuitive, and private with a penetrating mind and natural elegance.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Wise:</strong> You possess deep insight and understanding beyond your years.</li>
                    <li><strong>Intuitive:</strong> You sense underlying currents and hidden motivations.</li>
                    <li><strong>Strategic:</strong> You plan carefully and move with purpose and precision.</li>
                    <li><strong>Private:</strong> You reveal yourself selectively and value your personal space.</li>
                    <li><strong>Elegant:</strong> You have natural refinement and sophisticated tastes.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing wisdom, intuition, and the ability to see beneath surface appearances. You're here to learn about transformation, the power of patience, and how to balance analysis with instinct. Your purpose often involves uncovering hidden truths, guiding others through complex situations, and bringing depth and nuance to whatever field you enter.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are devoted, perceptive, and sensual. You seek partners who engage you intellectually while respecting your need for privacy. You may struggle with jealousy or secretiveness, as you form deep attachments and guard your vulnerabilities. Your ideal relationships provide both intellectual stimulation and emotional security while honoring your mysterious nature.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve analysis, research, or strategic planning. Potential fields include science, medicine, psychology, investigation, or any role requiring depth of understanding and careful planning. Your natural talents include problem-solving, research, counseling, and the ability to maintain composure under pressure.</p>
                
                <h4>Famous Snake Individuals:</h4>
                <p>Abraham Lincoln, Oprah Winfrey, Bob Dylan, and Audrey Hepburn exemplify Snake qualities through their wisdom, strategic thinking, and ability to transform themselves and influence others with subtle power.</p>`,
            
            'Horse': `<strong>Horse (马 - Mǎ)</strong>
                <p>As a Horse in Chinese astrology, you embody the archetype of the free spirit and the adventurer. You are energetic, independent, and warm-hearted with a love of movement and a natural enthusiasm for life.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Energetic:</strong> You possess boundless vitality and approach life with vigor.</li>
                    <li><strong>Independent:</strong> You value your freedom and resist constraints.</li>
                    <li><strong>Sociable:</strong> You enjoy people and create a lively atmosphere around you.</li>
                    <li><strong>Straightforward:</strong> You communicate honestly and dislike manipulation.</li>
                    <li><strong>Adventurous:</strong> You seek new experiences and are willing to take risks.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing personal freedom, authenticity, and the ability to inspire others through your natural enthusiasm. You're here to learn about healthy independence, the joy of movement, and how to balance freedom with commitment. Your purpose often involves bringing energy to stagnant situations, motivating others through your example, and exploring territories (physical or metaphorical) that others hesitate to enter.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are passionate, direct, and loyal to those who respect your independence. You seek partners who share your zest for life while giving you room to move. You may struggle with restlessness or commitment fears, as you value your freedom highly. Your ideal relationships provide both excitement and enough space for your independent spirit while creating a home base you're happy to return to.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve movement, variety, or performance. Potential fields include sports, travel, sales, entertainment, or any role allowing physical activity and changing environments. Your natural talents include motivating teams, quick decision-making, public speaking, and the ability to adapt rapidly to new situations.</p>
                
                <h4>Famous Horse Individuals:</h4>
                <p>Nelson Mandela, Clint Eastwood, Emma Watson, and Rembrandt exemplify Horse qualities through their independent spirit, straightforward communication, and ability to inspire others through their authentic self-expression.</p>`,
            
            'Goat': `<strong>Goat (羊 - Yáng)</strong>
                <p>As a Goat in Chinese astrology, you embody the archetype of the artist and the peacemaker. You are gentle, creative, and compassionate with a strong aesthetic sense and natural empathy.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Creative:</strong> You have a rich imagination and artistic sensibility.</li>
                    <li><strong>Empathetic:</strong> You easily understand others' feelings and perspectives.</li>
                    <li><strong>Gentle:</strong> You move through the world with kindness and consideration.</li>
                    <li><strong>Peace-loving:</strong> You seek harmony and avoid conflict when possible.</li>
                    <li><strong>Sensitive:</strong> You are attuned to subtleties in environments and relationships.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing creativity, compassion, and the ability to bring beauty and harmony to your surroundings. You're here to learn about emotional sensitivity, the power of gentleness, and how to balance empathy with healthy boundaries. Your purpose often involves creating beautiful or healing environments, mediating conflicts, and reminding others of the importance of kindness and aesthetic pleasure in life.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are nurturing, romantic, and devoted. You seek partners who provide emotional security while appreciating your sensitive nature. You may struggle with dependency or worry, as you value harmony and security highly. Your ideal relationships provide both stability and beauty while offering the emotional support you need to thrive.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve creativity, caregiving, or creating harmonious environments. Potential fields include the arts, healing professions, counseling, interior design, or any role allowing you to express your aesthetic sense and empathy. Your natural talents include artistic expression, conflict resolution, creating comfortable spaces, and the ability to understand complex emotional dynamics.</p>
                
                <h4>Famous Goat Individuals:</h4>
                <p>Michelangelo, Mark Twain, Julia Roberts, and Steve Jobs exemplify Goat qualities through their creative vision, sensitivity to beauty, and ability to create work that emotionally resonates with others.</p>`,
            
            'Monkey': `<strong>Monkey (猴 - Hóu)</strong>
                <p>As a Monkey in Chinese astrology, you embody the archetype of the clever trickster and the problem-solver. You are intelligent, versatile, and witty with a playful spirit and remarkable adaptability.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Intelligent:</strong> You have a quick mind that grasps concepts easily.</li>
                    <li><strong>Versatile:</strong> You can adapt to new situations and learn new skills rapidly.</li>
                    <li><strong>Curious:</strong> You have an insatiable thirst for knowledge and experience.</li>
                    <li><strong>Humorous:</strong> You possess a playful wit and enjoy making others laugh.</li>
                    <li><strong>Resourceful:</strong> You find creative solutions to problems that stump others.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing mental agility, adaptability, and the ability to bring levity to serious situations. You're here to learn about the constructive use of intelligence, the value of play, and how to balance cleverness with wisdom. Your purpose often involves solving complex problems, bringing innovative approaches to stagnant systems, and helping others see situations from multiple perspectives.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are entertaining, stimulating, and affectionate. You seek partners who can keep up with your mental energy and appreciate your playful nature. You may struggle with consistency or focus, as you are easily attracted to new interests. Your ideal relationships provide both intellectual stimulation and enough variety to satisfy your curious mind while gently encouraging your emotional development.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve problem-solving, communication, or innovation. Potential fields include technology, entertainment, science, business, or any role requiring quick thinking and adaptability. Your natural talents include troubleshooting, negotiation, creative thinking, and the ability to lighten tense atmospheres with appropriate humor.</p>
                
                <h4>Famous Monkey Individuals:</h4>
                <p>Leonardo da Vinci, Tom Hanks, Will Smith, and Eleanor Roosevelt exemplify Monkey qualities through their versatile talents, problem-solving abilities, and capacity to approach serious matters with both intelligence and good humor.</p>`,
            
            'Rooster': `<strong>Rooster (鸡 - Jī)</strong>
                <p>As a Rooster in Chinese astrology, you embody the archetype of the perfectionist and the performer. You are meticulous, confident, and hardworking with a keen eye for detail and a flair for presentation.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Meticulous:</strong> You have an eye for detail and strive for perfection.</li>
                    <li><strong>Confident:</strong> You carry yourself with assurance and project capability.</li>
                    <li><strong>Honest:</strong> You value truth and are straightforward in your communication.</li>
                    <li><strong>Organized:</strong> You create order from chaos and maintain high standards.</li>
                    <li><strong>Observant:</strong> You notice details that others overlook.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing precision, integrity, and the ability to improve your environment. You're here to learn about excellence, honest communication, and how to balance high standards with self-acceptance. Your purpose often involves bringing order to chaotic situations, speaking truth when others remain silent, and demonstrating the value of doing things thoroughly and well.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are loyal, attentive, and protective. You seek partners who appreciate your honesty and share your values of quality and integrity. You may struggle with criticism or perfectionism, as you have high expectations for yourself and others. Your ideal relationships provide both mutual respect and appreciation for your attention to detail while gently helping you relax your standards when appropriate.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve precision, analysis, or performance. Potential fields include finance, quality control, design, performance arts, or any role requiring attention to detail and high standards. Your natural talents include problem identification, organization, public speaking, and the ability to improve systems and processes.</p>
                
                <h4>Famous Rooster Individuals:</h4>
                <p>Beyoncé, Jennifer Aniston, Jennifer Lopez, and Yoko Ono exemplify Rooster qualities through their meticulous attention to their craft, confident self-presentation, and ability to maintain high standards in their work.</p>`,
            
            'Dog': `<strong>Dog (狗 - Gǒu)</strong>
                <p>As a Dog in Chinese astrology, you embody the archetype of the loyal guardian and the just advocate. You are honest, faithful, and principled with a strong sense of fairness and a protective nature.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Loyal:</strong> You stand by those you care about through good times and bad.</li>
                    <li><strong>Honest:</strong> You value truth and integrity above social convenience.</li>
                    <li><strong>Just:</strong> You have a strong sense of fairness and fight for what's right.</li>
                    <li><strong>Protective:</strong> You watch over loved ones and defend the vulnerable.</li>
                    <li><strong>Reliable:</strong> You can be counted on to fulfill your responsibilities.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing loyalty, integrity, and the ability to stand up for what's right. You're here to learn about justice, faithful service, and how to balance vigilance with trust. Your purpose often involves protecting those who cannot protect themselves, creating more equitable systems, and demonstrating the power of unwavering loyalty and moral courage.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are devoted, supportive, and straightforward. You seek partners who share your values of honesty and commitment. You may struggle with worry or suspicion, as you take your protective role seriously. Your ideal relationships provide both security and mutual trust while respecting your need to serve causes beyond the relationship itself.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve service, protection, or advocacy. Potential fields include law, social work, healthcare, education, or any role allowing you to help others and uphold important principles. Your natural talents include problem-solving, crisis management, ethical decision-making, and the ability to create environments where people feel safe and fairly treated.</p>
                
                <h4>Famous Dog Individuals:</h4>
                <p>Mother Teresa, Madonna, Michael Jackson, and Winston Churchill exemplify Dog qualities through their loyalty to their causes, honest self-expression, and willingness to stand up for what they believe is right.</p>`,
            
            'Pig': `<strong>Pig (猪 - Zhū)</strong>
                <p>As a Pig in Chinese astrology, you embody the archetype of the generous host and the honest friend. You are kind, sincere, and pleasure-loving with a genuine heart and natural abundance.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Generous:</strong> You share freely and take pleasure in others' happiness.</li>
                    <li><strong>Honest:</strong> You are sincere in your dealings and expect the same from others.</li>
                    <li><strong>Kind:</strong> You have a gentle nature and avoid causing harm to others.</li>
                    <li><strong>Sociable:</strong> You enjoy company and create a welcoming atmosphere.</li>
                    <li><strong>Pleasure-loving:</strong> You appreciate life's comforts and sensual enjoyments.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing generosity, sincerity, and the ability to create abundance that benefits many. You're here to learn about material enjoyment without excess, honest communication, and how to balance giving to others with self-care. Your purpose often involves creating environments of comfort and plenty, demonstrating the joy of sharing, and showing others that material success and moral integrity can coexist.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are affectionate, supportive, and trustworthy. You seek partners who appreciate your generous nature and share your values of honesty and comfort. You may struggle with naivety or overindulgence, as you tend to see the best in others and enjoy life's pleasures. Your ideal relationships provide both emotional security and sensual enjoyment while respecting your need for sincerity in all interactions.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve service, hospitality, or creating comfort. Potential fields include culinary arts, hospitality, healthcare, entertainment, or any role allowing you to create enjoyable experiences for others. Your natural talents include creating welcoming environments, conflict resolution, practical problem-solving, and the ability to bring people together in harmony.</p>
                
                <h4>Famous Pig Individuals:</h4>
                <p>Albert Einstein, Hillary Clinton, Stephen King, and Magic Johnson exemplify Pig qualities through their generosity, honest communication, and ability to create abundance that benefits not just themselves but many others.</p>`
        };

        const elementInterpretations = {
            'Metal': `<h4>Metal Element Influence:</h4>
                <p>The Metal element adds qualities of precision, structure, and determination to your Chinese zodiac sign. Metal energy is associated with autumn, the west direction, and the color white. As a Metal ${animalSign}, you likely possess these additional characteristics:</p>
                <ul>
                    <li><strong>Structured:</strong> You appreciate clear systems and defined boundaries.</li>
                    <li><strong>Precise:</strong> You pay attention to details and strive for accuracy.</li>
                    <li><strong>Determined:</strong> Once committed, you pursue goals with unwavering focus.</li>
                    <li><strong>Principled:</strong> You have strong values and ethical standards.</li>
                    <li><strong>Self-reliant:</strong> You possess inner strength and resilience.</li>
                </ul>
                <p>Metal years include: 1900, 1901, 1910, 1911, 1920, 1921, 1930, 1931, 1940, 1941, 1950, 1951, 1960, 1961, 1970, 1971, 1980, 1981, 1990, 1991, 2000, 2001, 2010, 2011, 2020, 2021...</p>`,
            
            'Water': `<h4>Water Element Influence:</h4>
                <p>The Water element adds qualities of flexibility, intuition, and emotional depth to your Chinese zodiac sign. Water energy is associated with winter, the north direction, and the color black. As a Water ${animalSign}, you likely possess these additional characteristics:</p>
                <ul>
                    <li><strong>Adaptable:</strong> You flow around obstacles and find alternative paths.</li>
                    <li><strong>Intuitive:</strong> You sense underlying currents and unspoken feelings.</li>
                    <li><strong>Reflective:</strong> You have depth of thought and emotional understanding.</li>
                    <li><strong>Perceptive:</strong> You notice subtleties that others miss.</li>
                    <li><strong>Persistent:</strong> Like water, you can wear down resistance over time.</li>
                </ul>
                <p>Water years include: 1902, 1903, 1912, 1913, 1922, 1923, 1932, 1933, 1942, 1943, 1952, 1953, 1962, 1963, 1972, 1973, 1982, 1983, 1992, 1993, 2002, 2003, 2012, 2013, 2022, 2023...</p>`,
            
            'Wood': `<h4>Wood Element Influence:</h4>
                <p>The Wood element adds qualities of growth, creativity, and idealism to your Chinese zodiac sign. Wood energy is associated with spring, the east direction, and the color green. As a Wood ${animalSign}, you likely possess these additional characteristics:</p>
                <ul>
                    <li><strong>Growth-oriented:</strong> You continuously develop and expand your capabilities.</li>
                    <li><strong>Flexible:</strong> You can bend without breaking when facing challenges.</li>
                    <li><strong>Creative:</strong> You generate new ideas and innovative approaches.</li>
                    <li><strong>Compassionate:</strong> You have natural empathy and concern for others.</li>
                    <li><strong>Visionary:</strong> You see possibilities and potential for improvement.</li>
                </ul>
                <p>Wood years include: 1904, 1905, 1914, 1915, 1924, 1925, 1934, 1935, 1944, 1945, 1954, 1955, 1964, 1965, 1974, 1975, 1984, 1985, 1994, 1995, 2004, 2005, 2014, 2015, 2024, 2025...</p>`,
            
            'Fire': `<h4>Fire Element Influence:</h4>
                <p>The Fire element adds qualities of passion, expression, and dynamic energy to your Chinese zodiac sign. Fire energy is associated with summer, the south direction, and the color red. As a Fire ${animalSign}, you likely possess these additional characteristics:</p>
                <ul>
                    <li><strong>Passionate:</strong> You pursue your interests with enthusiasm and intensity.</li>
                    <li><strong>Expressive:</strong> You communicate with warmth and animation.</li>
                    <li><strong>Dynamic:</strong> You bring energy and transformation to situations.</li>
                    <li><strong>Inspiring:</strong> You naturally motivate others with your enthusiasm.</li>
                    <li><strong>Decisive:</strong> You take action quickly and confidently.</li>
                </ul>
                <p>Fire years include: 1906, 1907, 1916, 1917, 1926, 1927, 1936, 1937, 1946, 1947, 1956, 1957, 1966, 1967, 1976, 1977, 1986, 1987, 1996, 1997, 2006, 2007, 2016, 2017, 2026, 2027...</p>`,
            
            'Earth': `<h4>Earth Element Influence:</h4>
                <p>The Earth element adds qualities of stability, practicality, and nurturing to your Chinese zodiac sign. Earth energy is associated with late summer, the center direction, and the color yellow. As an Earth ${animalSign}, you likely possess these additional characteristics:</p>
                <ul>
                    <li><strong>Grounded:</strong> You maintain stability even in chaotic situations.</li>
                    <li><strong>Practical:</strong> You focus on realistic solutions and tangible results.</li>
                    <li><strong>Nurturing:</strong> You support the growth and well-being of others.</li>
                    <li><strong>Reliable:</strong> You provide consistency and dependability.</li>
                    <li><strong>Patient:</strong> You understand that meaningful growth takes time.</li>
                </ul>
                <p>Earth years include: 1908, 1909, 1918, 1919, 1928, 1929, 1938, 1939, 1948, 1949, 1958, 1959, 1968, 1969, 1978, 1979, 1988, 1989, 1998, 1999, 2008, 2009, 2018, 2019, 2028, 2029...</p>`
        };

        return animalInterpretations[animalSign] + elementInterpretations[element];
    }

    function getAstrologyInterpretation(sign) {
        const interpretations = {
            'Aries': `<strong>Aries (March 21 - April 19): The Pioneer</strong>
                <p>As an Aries, you embody the archetype of the warrior and pioneer. You are the first sign of the zodiac, representing the spark of life and new beginnings. Your ruling planet is Mars, the planet of action, energy, and desire.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Courageous:</strong> You face challenges head-on with bravery and determination.</li>
                    <li><strong>Energetic:</strong> Your abundant energy and enthusiasm are contagious to those around you.</li>
                    <li><strong>Independent:</strong> You value your freedom and prefer to forge your own path.</li>
                    <li><strong>Direct:</strong> You communicate honestly and straightforwardly, without hidden agendas.</li>
                    <li><strong>Competitive:</strong> You thrive on challenges and naturally seek to excel and win.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing courage, leadership, and the ability to initiate. You're here to learn about healthy assertiveness, constructive use of power, and how to balance independence with cooperation. Your purpose often involves pioneering new territories, whether literal or metaphorical, and inspiring others through your bold actions and leadership.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are passionate, direct, and loyal. You seek partners who can match your energy and independence while appreciating your protective nature. You may struggle with patience and compromise, as you prefer immediate action and resolution. Your ideal relationships allow space for your individuality while providing the excitement and stimulation you crave.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve leadership, physical activity, competition, or entrepreneurship. Potential fields include sports, military, emergency services, business leadership, sales, or any pioneering role. Your natural talents include quick decision-making, crisis management, motivating others, and taking initiative where others hesitate.</p>
                
                <h4>Growth Opportunities:</h4>
                <p>Your growth comes through developing patience, considering others' perspectives, and learning to channel your powerful energy constructively. Working on impulse control and anger management can help you maintain better relationships and make more strategic decisions. Learning to finish what you start before moving to the next exciting project is also valuable for your development.</p>
                
                <h4>Famous Aries Individuals:</h4>
                <p>Lady Gaga, Robert Downey Jr., Emma Watson, Leonardo da Vinci, and Maya Angelou exemplify Aries qualities through their pioneering work, courage in their fields, and ability to lead and inspire others through bold action.</p>`,
            
            'Taurus': `<strong>Taurus (April 20 - May 20): The Builder</strong>
                <p>As a Taurus, you embody the archetype of the builder and provider. You are the second sign of the zodiac, representing stability, sensuality, and material security. Your ruling planet is Venus, the planet of love, beauty, and values.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Reliable:</strong> You are dependable and consistent, a rock for others to lean on.</li>
                    <li><strong>Patient:</strong> You understand that worthwhile things take time and are willing to wait.</li>
                    <li><strong>Sensual:</strong> You have a deep appreciation for physical pleasures and beauty.</li>
                    <li><strong>Determined:</strong> Once committed to a path, you persevere with remarkable endurance.</li>
                    <li><strong>Practical:</strong> You have a natural understanding of how the material world works.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing stability, resourcefulness, and the ability to manifest abundance. You're here to learn about healthy relationship with the material world, the true nature of security, and how to balance persistence with flexibility. Your purpose often involves creating lasting structures, whether in the form of businesses, homes, artworks, or systems that provide practical value to others.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are loyal, affectionate, and sensual. You seek partners who offer stability and share your appreciation for life's pleasures. You may struggle with possessiveness and resistance to change, as you prefer consistency and security. Your ideal relationships provide both emotional and material security while honoring your need for physical expressions of love.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve creating tangible results, working with your hands, managing resources, or providing stability. Potential fields include finance, culinary arts, agriculture, real estate, music, or any craft requiring patience and precision. Your natural talents include resource management, aesthetic judgment, determination, and the ability to create comfortable environments.</p>
                
                <h4>Growth Opportunities:</h4>
                <p>Your growth comes through developing flexibility, embracing necessary change, and learning to distinguish between healthy attachment and unhealthy possessiveness. Working on stubbornness and materialistic tendencies can help you maintain more balanced relationships and spiritual perspective. Learning to share control and resources generously will also support your evolution.</p>
                
                <h4>Famous Taurus Individuals:</h4>
                <p>Adele, Dwayne "The Rock" Johnson, Audrey Hepburn, William Shakespeare, and Queen Elizabeth II exemplify Taurus qualities through their enduring work, sensual artistry, and ability to build lasting legacies through patient, determined effort.</p>`,
            
            'Gemini': `<strong>Gemini (May 21 - June 20): The Communicator</strong>
                <p>As a Gemini, you embody the archetype of the messenger and communicator. You are the third sign of the zodiac, representing duality, exchange of ideas, and mental agility. Your ruling planet is Mercury, the planet of communication, intellect, and movement.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Versatile:</strong> You adapt quickly to new situations and can play many roles.</li>
                    <li><strong>Curious:</strong> You have an insatiable thirst for information and new experiences.</li>
                    <li><strong>Communicative:</strong> You express yourself with clarity and enjoy the exchange of ideas.</li>
                    <li><strong>Quick-witted:</strong> Your mind processes information rapidly, making connections others miss.</li>
                    <li><strong>Sociable:</strong> You thrive on interaction and have a natural gift for conversation.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing mental flexibility, communication skills, and the ability to bridge different worlds. You're here to learn about the power of words, the nature of duality, and how to integrate different aspects of yourself and your knowledge. Your purpose often involves sharing information, connecting people and ideas, and bringing lightness and perspective to serious situations.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are intellectually stimulating, playful, and socially engaging. You seek partners who can keep up with your mental energy and provide the variety you crave. You may struggle with consistency and emotional depth, as you prefer to keep things light and moving. Your ideal relationships provide both intellectual stimulation and the freedom to explore multiple interests and social connections.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve communication, variety, and intellectual agility. Potential fields include journalism, teaching, sales, marketing, technology, or any role requiring adaptability and quick thinking. Your natural talents include verbal and written communication, networking, problem-solving, and the ability to explain complex concepts in accessible ways.</p>
                
                <h4>Growth Opportunities:</h4>
                <p>Your growth comes through developing focus, emotional awareness, and learning to follow through on your many initiatives. Working on scattered energy and superficiality can help you create more meaningful work and relationships. Learning to listen deeply rather than just waiting for your turn to speak will also enhance your already formidable communication skills.</p>
                
                <h4>Famous Gemini Individuals:</h4>
                <p>Angelina Jolie, Johnny Depp, Kanye West, Marilyn Monroe, and Morgan Freeman exemplify Gemini qualities through their versatility, expressive communication, and ability to reinvent themselves across different roles and creative pursuits.</p>`,
            
            'Cancer': `<strong>Cancer (June 21 - July 22): The Nurturer</strong>
                <p>As a Cancer, you embody the archetype of the mother and nurturer. You are the fourth sign of the zodiac, representing emotional depth, security, and caregiving. Your ruling celestial body is the Moon, which governs emotions, instincts, and the subconscious.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Nurturing:</strong> You have a natural ability to care for others and provide emotional support.</li>
                    <li><strong>Intuitive:</strong> You sense the emotional undercurrents that others miss.</li>
                    <li><strong>Protective:</strong> You fiercely defend those you consider family or part of your inner circle.</li>
                    <li><strong>Tenacious:</strong> Once committed to a person or cause, you hold on with remarkable determination.</li>
                    <li><strong>Empathetic:</strong> You easily understand and share the feelings of others.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing emotional intelligence, nurturing abilities, and creating security for yourself and others. You're here to learn about the nature of true emotional security, healthy attachment, and how to balance sensitivity with necessary boundaries. Your purpose often involves creating safe spaces for growth, whether literal homes or emotional environments where others can heal and flourish.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are devoted, supportive, and emotionally attuned. You seek partners who appreciate your nurturing nature and offer the security and loyalty you value. You may struggle with moodiness and tendency to withdraw when hurt, as you process emotions deeply. Your ideal relationships provide emotional safety while honoring your need for both connection and occasional retreat.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve caregiving, creating security, or working with the public's emotional needs. Potential fields include healthcare, counseling, food service, real estate, history, or family businesses. Your natural talents include emotional intelligence, memory, creating comfortable environments, and the ability to make others feel cared for and understood.</p>
                
                <h4>Growth Opportunities:</h4>
                <p>Your growth comes through developing healthy boundaries, direct communication about your needs, and learning to distinguish between helpful nurturing and enabling behaviors. Working on emotional reactivity and tendency to cling to the past can help you create more balanced relationships and forward movement. Learning to mother yourself as well as you mother others will support your evolution.</p>
                
                <h4>Famous Cancer Individuals:</h4>
                <p>Princess Diana, Tom Hanks, Meryl Streep, Ariana Grande, and Nelson Mandela exemplify Cancer qualities through their emotional depth, nurturing presence, and ability to create safe spaces for others through their work and public personas.</p>`,
            
            'Leo': `<strong>Leo (July 23 - August 22): The Sovereign</strong>
                <p>As a Leo, you embody the archetype of the king or queen and the creative performer. You are the fifth sign of the zodiac, representing self-expression, leadership, and vitality. Your ruling celestial body is the Sun, the center of our solar system, which governs life force, identity, and creative energy.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Generous:</strong> You share your resources, attention, and affection abundantly.</li>
                    <li><strong>Confident:</strong> You possess natural self-assurance and faith in your abilities.</li>
                    <li><strong>Charismatic:</strong> You naturally draw others to you with your warmth and presence.</li>
                    <li><strong>Creative:</strong> You express yourself with dramatic flair and artistic sensibility.</li>
                    <li><strong>Loyal:</strong> You stand by those you love with unwavering dedication.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing authentic self-expression, leadership abilities, and creative courage. You're here to learn about the responsible use of power, the nature of true recognition, and how to balance self-focus with genuine care for others. Your purpose often involves inspiring others through your creative expression, leadership, or ability to bring joy and vitality to any situation.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are passionate, demonstrative, and protective. You seek partners who admire your unique qualities and match your loyalty and generosity. You may struggle with pride and need for admiration, as you thrive on appreciation and recognition. Your ideal relationships provide both adoration and honest feedback, while giving you the spotlight you naturally deserve.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve leadership, performance, or creative self-expression. Potential fields include entertainment, management, education, politics, or any role where you can inspire others. Your natural talents include motivating teams, public speaking, artistic expression, and the ability to bring warmth and vitality to organizations and projects.</p>
                
                <h4>Growth Opportunities:</h4>
                <p>Your growth comes through developing humility, listening skills, and learning to share the spotlight generously. Working on sensitivity to criticism and tendency toward dramatic reactions can help you maintain more balanced relationships and perspective. Learning to value yourself from within rather than requiring constant external validation will support your evolution into truly noble leadership.</p>
                
                <h4>Famous Leo Individuals:</h4>
                <p>Barack Obama, Madonna, Jennifer Lopez, Arnold Schwarzenegger, and J.K. Rowling exemplify Leo qualities through their commanding presence, creative self-expression, and ability to lead and inspire others through their authentic, generous spirits.</p>`,
            
            'Virgo': `<strong>Virgo (August 23 - September 22): The Analyst</strong>
                <p>As a Virgo, you embody the archetype of the healer and the craftsperson. You are the sixth sign of the zodiac, representing analysis, service, and refinement. Your ruling planet is Mercury, which in Virgo expresses as discrimination, precision, and practical intelligence.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Analytical:</strong> You have a remarkable ability to break down complex systems into manageable parts.</li>
                    <li><strong>Detail-oriented:</strong> You notice subtleties and imperfections that others miss.</li>
                    <li><strong>Practical:</strong> You focus on useful solutions rather than abstract theories.</li>
                    <li><strong>Helpful:</strong> You derive satisfaction from being of service and improving situations.</li>
                    <li><strong>Methodical:</strong> You approach tasks with careful planning and systematic execution.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing discernment, practical wisdom, and healing abilities. You're here to learn about the integration of mind and body, the perfection found in natural systems, and how to balance critical analysis with acceptance. Your purpose often involves bringing order to chaos, healing through practical means, or refining systems and methods to serve greater efficiency and wellbeing.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are attentive, loyal, and thoughtfully supportive. You seek partners who appreciate your helpful nature and share your values of continuous improvement. You may struggle with criticism and overthinking, as you naturally see how things could be better. Your ideal relationships provide both intellectual stimulation and emotional security, while accepting your need for order and routine.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve analysis, problem-solving, or attention to detail. Potential fields include healthcare, editing, research, technology, nutrition, or any service-oriented profession. Your natural talents include troubleshooting, organization, research, and the ability to improve systems through careful analysis and practical adjustments.</p>
                
                <h4>Growth Opportunities:</h4>
                <p>Your growth comes through developing self-acceptance, flexibility, and learning to see the bigger picture beyond the details. Working on perfectionism and tendency to worry can help you maintain more peace of mind and balanced perspective. Learning to appreciate the messy process of growth rather than focusing only on flaws will support your evolution into holistic wisdom.</p>
                
                <h4>Famous Virgo Individuals:</h4>
                <p>Beyoncé, Warren Buffett, Mother Teresa, Michael Jackson, and Keanu Reeves exemplify Virgo qualities through their meticulous craftsmanship, service orientation, and ability to improve their fields through careful analysis and dedication to excellence.</p>`,
            
            'Libra': `<strong>Libra (September 23 - October 22): The Diplomat</strong>
                <p>As a Libra, you embody the archetype of the peacemaker and the judge. You are the seventh sign of the zodiac, representing balance, harmony, and relationships. Your ruling planet is Venus, which in Libra expresses as social grace, fairness, and appreciation of beauty.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Diplomatic:</strong> You have a natural ability to mediate conflicts and find common ground.</li>
                    <li><strong>Fair-minded:</strong> You consider all perspectives before making judgments.</li>
                    <li><strong>Partnership-oriented:</strong> You thrive in one-on-one relationships and collaborations.</li>
                    <li><strong>Aesthetic:</strong> You have a refined sense of beauty and harmony in all things.</li>
                    <li><strong>Charming:</strong> You interact with others with natural grace and consideration.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing balance, justice, and relational wisdom. You're here to learn about healthy interdependence, fair exchange, and how to balance consideration for others with self-advocacy. Your purpose often involves creating harmony in your environment, mediating conflicts, or bringing beauty and proportion to the world through art, design, or social structures.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are attentive, romantic, and equality-minded. You seek partners who appreciate your diplomatic nature and share your values of fairness and beauty. You may struggle with indecision and conflict avoidance, as you naturally see multiple sides to every situation. Your ideal relationships provide both intellectual stimulation and aesthetic pleasure, while accepting your need for harmony and balance.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve mediation, aesthetic judgment, or working with people. Potential fields include law, diplomacy, design, counseling, art, or any profession requiring fairness and social skills. Your natural talents include negotiation, creating beautiful environments, building consensus, and the ability to see patterns of balance and imbalance in systems and relationships.</p>
                
                <h4>Growth Opportunities:</h4>
                <p>Your growth comes through developing decisiveness, authenticity, and learning to value truth even when it disrupts harmony temporarily. Working on people-pleasing and avoidance of difficult emotions can help you develop more genuine relationships and inner peace. Learning to stand firmly for your own needs while still considering others will support your evolution into true wisdom.</p>
                
                <h4>Famous Libra Individuals:</h4>
                <p>Gandhi, Kim Kardashian, John Lennon, Julie Andrews, and Will Smith exemplify Libra qualities through their diplomatic approach, aesthetic sensibility, and ability to create harmony and balance in their respective fields.</p>`,
            
            'Scorpio': `<strong>Scorpio (October 23 - November 21): The Transformer</strong>
                <p>As a Scorpio, you embody the archetype of the detective and the phoenix. You are the eighth sign of the zodiac, representing transformation, power, and emotional depth. Your traditional ruling planet is Mars (shared with Aries), and your modern ruler is Pluto, both representing different aspects of power and transformation.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Intense:</strong> You experience and express emotions with remarkable depth and power.</li>
                    <li><strong>Perceptive:</strong> You see beneath surfaces to the hidden truths others miss.</li>
                    <li><strong>Resourceful:</strong> You find ways to survive and thrive in even the most challenging circumstances.</li>
                    <li><strong>Loyal:</strong> Once you commit, you remain steadfast with unmatched devotion.</li>
                    <li><strong>Transformative:</strong> You have the ability to reinvent yourself and facilitate profound change.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing emotional courage, transformative power, and psychological insight. You're here to learn about the cycles of death and rebirth, the responsible use of power, and how to transmute difficult emotions into wisdom. Your purpose often involves helping others through periods of profound change, uncovering hidden truths, or demonstrating the power of vulnerability and authentic emotional expression.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are passionate, loyal, and profoundly intimate. You seek partners who are willing to explore emotional depths and share authentic vulnerability. You may struggle with jealousy and control issues, as you desire complete merging and honesty. Your ideal relationships provide both emotional intensity and psychological safety, while accepting your need for truth and transformation.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve investigation, psychology, or transformation. Potential fields include research, psychology, medicine, crisis management, finance, or any profession requiring depth and resilience. Your natural talents include emotional healing, strategic thinking, resource management, and the ability to facilitate profound change in individuals and systems.</p>
                
                <h4>Growth Opportunities:</h4>
                <p>Your growth comes through developing trust, forgiveness, and learning to release control while maintaining healthy boundaries. Working on tendencies toward vengefulness and emotional manipulation can help you develop more healing relationships and inner peace. Learning to use your powerful perceptions for healing rather than as weapons will support your evolution into transformative wisdom.</p>
                
                <h4>Famous Scorpio Individuals:</h4>
                <p>Marie Curie, Bill Gates, Julia Roberts, Leonardo DiCaprio, and Katy Perry exemplify Scorpio qualities through their intensity, transformative impact, and ability to reinvent themselves while maintaining their core power and depth.</p>`,
            
            'Sagittarius': `<strong>Sagittarius (November 22 - December 21): The Explorer</strong>
                <p>As a Sagittarius, you embody the archetype of the philosopher and the adventurer. You are the ninth sign of the zodiac, representing expansion, wisdom, and exploration. Your ruling planet is Jupiter, the largest planet in our solar system, which governs growth, optimism, and higher learning.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Optimistic:</strong> You maintain a positive outlook even in challenging circumstances.</li>
                    <li><strong>Freedom-loving:</strong> You require space to explore and grow without constraints.</li>
                    <li><strong>Philosophical:</strong> You seek to understand the bigger meaning behind experiences.</li>
                    <li><strong>Adventurous:</strong> You eagerly pursue new experiences and horizons.</li>
                    <li><strong>Honest:</strong> You value truth and express it directly, sometimes bluntly.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing wisdom, expansive vision, and the courage to explore unknown territories. You're here to learn about the integration of diverse experiences into a coherent philosophy, the balance between freedom and commitment, and how to inspire others through your authentic truth. Your purpose often involves teaching, travel, publishing your ideas, or demonstrating how to live with joyful authenticity and faith in life's journey.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are enthusiastic, generous, and growth-oriented. You seek partners who share your thirst for adventure and truth, and who respect your need for independence. You may struggle with commitment and tact, as you value freedom and honesty above social niceties. Your ideal relationships provide both intellectual stimulation and shared adventures, while accepting your need for personal space and direct communication.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve teaching, travel, or expanding horizons. Potential fields include education, publishing, travel, sports, entrepreneurship, or any profession requiring optimism and big-picture thinking. Your natural talents include motivational speaking, cross-cultural communication, synthesizing diverse information, and the ability to inspire others with your vision and enthusiasm.</p>
                
                <h4>Growth Opportunities:</h4>
                <p>Your growth comes through developing follow-through, attention to detail, and learning to temper your honesty with compassion. Working on restlessness and tendency to overcommit can help you develop more sustainable projects and relationships. Learning to ground your expansive visions in practical reality will support your evolution into true wisdom that can benefit others.</p>
                
                <h4>Famous Sagittarius Individuals:</h4>
                <p>Taylor Swift, Brad Pitt, Jay-Z, Jane Austen, and Walt Disney exemplify Sagittarius qualities through their expansive vision, philosophical approach, and ability to inspire others through their authentic exploration of new territories in their respective fields.</p>`,
            
            'Capricorn': `<strong>Capricorn (December 22 - January 19): The Achiever</strong>
                <p>As a Capricorn, you embody the archetype of the elder and the builder of institutions. You are the tenth sign of the zodiac, representing ambition, responsibility, and mastery. Your ruling planet is Saturn, which governs structure, time, and earned wisdom through experience.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Ambitious:</strong> You set high goals and work persistently to achieve them.</li>
                    <li><strong>Responsible:</strong> You take your duties seriously and can be counted on to fulfill obligations.</li>
                    <li><strong>Disciplined:</strong> You understand the value of structure and self-control in achieving success.</li>
                    <li><strong>Practical:</strong> You focus on realistic solutions and tangible results.</li>
                    <li><strong>Patient:</strong> You take the long view and are willing to work steadily toward distant goals.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing mastery, integrity, and the wisdom that comes from overcoming challenges. You're here to learn about the responsible use of authority, the building of lasting structures, and how to balance ambition with genuine values. Your purpose often involves creating systems that stand the test of time, demonstrating excellence through disciplined effort, or providing stable leadership during difficult periods.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are loyal, committed, and steadily supportive. You seek partners who respect your work ethic and share your values of responsibility and integrity. You may struggle with emotional expression and work-life balance, as you naturally prioritize duties and achievements. Your ideal relationships provide both emotional depth and practical support, while accepting your need for structure and achievement.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve management, planning, or building lasting structures. Potential fields include business leadership, government, finance, architecture, academia, or any profession requiring reliability and long-term vision. Your natural talents include strategic planning, resource management, crisis leadership, and the ability to create systems that endure beyond your personal involvement.</p>
                
                <h4>Growth Opportunities:</h4>
                <p>Your growth comes through developing emotional awareness, playfulness, and learning to value the journey as much as the destination. Working on workaholic tendencies and excessive self-criticism can help you develop more balanced relationships and self-compassion. Learning that vulnerability is not weakness but strength will support your evolution into wise leadership that inspires rather than merely directs.</p>
                
                <h4>Famous Capricorn Individuals:</h4>
                <p>Michelle Obama, Martin Luther King Jr., Kate Middleton, LeBron James, and David Bowie exemplify Capricorn qualities through their disciplined approach, strategic leadership, and ability to build lasting legacies through persistent, responsible effort.</p>`,
            
            'Aquarius': `<strong>Aquarius (January 20 - February 18): The Visionary</strong>
                <p>As an Aquarius, you embody the archetype of the revolutionary and the humanitarian. You are the eleventh sign of the zodiac, representing innovation, community, and idealism. Your traditional ruling planet is Saturn (shared with Capricorn), and your modern ruler is Uranus, representing breakthrough, originality, and sudden change.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Innovative:</strong> You think outside conventional boundaries and envision new possibilities.</li>
                    <li><strong>Humanitarian:</strong> You care deeply about collective welfare and social progress.</li>
                    <li><strong>Independent:</strong> You value your uniqueness and resist conformity to social expectations.</li>
                    <li><strong>Intellectual:</strong> You approach life from a rational, conceptual perspective.</li>
                    <li><strong>Progressive:</strong> You naturally orient toward the future and embrace change.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing visionary thinking, social consciousness, and authentic individuality. You're here to learn about the balance between individual freedom and collective responsibility, the implementation of ideals in practical reality, and how to catalyze positive change while honoring necessary traditions. Your purpose often involves bringing new ideas into society, creating communities based on shared ideals, or demonstrating how authentic individuality can serve the greater good.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are intellectually engaging, loyal to your principles, and respectful of independence. You seek partners who appreciate your unique perspective and share your humanitarian values. You may struggle with emotional intimacy and predictability, as you naturally prioritize freedom and intellectual connection. Your ideal relationships provide both stimulating ideas and genuine acceptance of your unconventional nature, while respecting your need for personal space.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve innovation, technology, or social change. Potential fields include science, technology, social activism, psychology, astrology, or any profession requiring original thinking and future orientation. Your natural talents include problem-solving from new angles, networking diverse groups, technological aptitude, and the ability to envision and work toward better social systems.</p>
                
                <h4>Growth Opportunities:</h4>
                <p>Your growth comes through developing emotional awareness, practical implementation skills, and learning to value personal connections as much as abstract principles. Working on detachment and tendency toward theoretical rather than practical solutions can help you create more meaningful impact and relationships. Learning that true progress includes honoring the wisdom of the past will support your evolution into effective change agency.</p>
                
                <h4>Famous Aquarius Individuals:</h4>
                <p>Oprah Winfrey, Abraham Lincoln, Ellen DeGeneres, Mozart, and Bob Marley exemplify Aquarius qualities through their innovative thinking, humanitarian vision, and ability to transform society through their authentic expression of progressive ideals.</p>`,
            
            'Pisces': `<strong>Pisces (February 19 - March 20): The Mystic</strong>
                <p>As a Pisces, you embody the archetype of the mystic and the dreamer. You are the twelfth and final sign of the zodiac, representing spiritual connection, imagination, and transcendence. Your traditional ruling planet is Jupiter (shared with Sagittarius), and your modern ruler is Neptune, representing dreams, intuition, and the dissolution of boundaries.</p>
                
                <h4>Core Characteristics:</h4>
                <ul>
                    <li><strong>Compassionate:</strong> You feel others' pain and joy as if it were your own.</li>
                    <li><strong>Intuitive:</strong> You receive information through impressions and feelings beyond rational analysis.</li>
                    <li><strong>Imaginative:</strong> You have a rich inner world and creative vision.</li>
                    <li><strong>Adaptable:</strong> You flow with changing circumstances like water finding its path.</li>
                    <li><strong>Spiritual:</strong> You sense the interconnection of all things and the realms beyond the physical.</li>
                </ul>
                
                <h4>Life Path and Purpose:</h4>
                <p>Your life path involves developing spiritual awareness, compassionate service, and creative expression. You're here to learn about the balance between earthly responsibilities and spiritual connection, the power of imagination to shape reality, and how to maintain healthy boundaries while remaining open-hearted. Your purpose often involves healing through compassion, creating art that awakens spiritual awareness, or demonstrating how to live with both mystical connection and practical effectiveness.</p>
                
                <h4>Relationships:</h4>
                <p>In relationships, you are empathetic, accepting, and romantically idealistic. You seek partners who appreciate your sensitive nature and share your values of compassion and spiritual growth. You may struggle with boundaries and disillusionment, as you naturally see the highest potential in others. Your ideal relationships provide both emotional understanding and spiritual connection, while helping you maintain healthy separation between your feelings and others'.</p>
                
                <h4>Career and Talents:</h4>
                <p>You excel in careers that involve creativity, healing, or spiritual guidance. Potential fields include arts, healthcare, counseling, spiritual teaching, film, or any profession requiring empathy and imagination. Your natural talents include emotional healing, artistic expression, spiritual insight, and the ability to create environments where others feel safe to be vulnerable and authentic.</p>
                
                <h4>Growth Opportunities:</h4>
                <p>Your growth comes through developing healthy boundaries, practical skills, and learning to discern when to help and when to allow others their own journey. Working on escapist tendencies and martyrdom can help you create more sustainable service and creative work. Learning that true spirituality includes embodied presence in the physical world will support your evolution into effective mystical wisdom.</p>
                
                <h4>Famous Pisces Individuals:</h4>
                <p>Albert Einstein, Rihanna, Justin Bieber, Elizabeth Taylor, and George Harrison exemplify Pisces qualities through their imaginative vision, compassionate nature, and ability to transcend conventional boundaries through their intuitive connection to realms beyond the ordinary.</p>`
        };
        
        return interpretations[sign] || "No interpretation available for this sign.";
    }

    // Daily Horoscope Function
    function getDailyHoroscope(sign) {
        // In a real app, this would be an API call to a horoscope service
        // For this demo, we'll use placeholder horoscopes
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        document.getElementById('horoscope-date').textContent = formattedDate;
        
        // Placeholder horoscopes - in a real app, these would come from an API
        const horoscopes = {
            'aries': "Today is a day of new beginnings for Aries. Your natural leadership abilities are heightened, making it an excellent time to start projects or take initiative. Be mindful of impatience; not everyone moves at your pace. Romance may surprise you in unexpected ways.",
            'taurus': "Stability and comfort are highlighted for Taurus today. Financial matters may require your attention, and your practical approach will serve you well. Take time to enjoy sensory pleasures - perhaps a good meal or time in nature. A stubborn approach may not serve you in relationships today.",
            'gemini': "Communication flows easily for Gemini today. Your mind is particularly sharp, making it ideal for writing, speaking, or negotiating. Social connections bring unexpected opportunities. Avoid spreading yourself too thin; focus on quality over quantity in your interactions.",
            'cancer': "Emotional insights are strong for Cancer today. Your intuition guides you accurately, particularly regarding family matters. Home improvements or changes bring satisfaction. Take care not to retreat into your shell when faced with challenges; expressing your feelings constructively brings resolution.",
            'leo': "The spotlight finds you today, Leo. Creative projects thrive under your attention, and your natural charisma draws others to your side. Leadership opportunities may arise unexpectedly. Balance your desire for recognition with genuine appreciation for others' contributions.",
            'virgo': "Details matter more than usual today, Virgo. Your analytical skills help solve a persistent problem, particularly at work. Health routines benefit from small adjustments rather than complete overhauls. Allow yourself to see the bigger picture occasionally; not everything needs perfection.",
            'libra': "Harmony in relationships is highlighted for Libra today. Your diplomatic skills help resolve a conflict between others. Aesthetic pursuits bring particular pleasure. Decision-making may be challenging; trust your initial instincts rather than weighing options indefinitely.",
            'scorpio': "Transformation is the theme for Scorpio today. Something you've been working to change finally shifts, bringing a sense of empowerment. Financial matters may require your attention and strategic thinking. Allow others to see your vulnerability; it strengthens rather than weakens your connections.",
            'sagittarius': "Adventure calls to Sagittarius today. Learning opportunities expand your horizons, whether through formal education or spontaneous experiences. Travel plans may feature prominently. Your optimism inspires others, but ensure your enthusiasm doesn't override practical considerations.",
            'capricorn': "Professional matters take center stage for Capricorn today. Your disciplined approach earns recognition from authority figures. Long-term planning benefits from your practical perspective. Remember to balance work with personal time; achievements mean more when shared with loved ones.",
            'aquarius': "Innovation flows naturally for Aquarius today. Your unique perspective helps solve a community or group challenge. Friendships bring unexpected joy and support. While your focus on the future is valuable, don't forget to address present needs and emotional connections.",
            'pisces': "Intuitive insights guide Pisces today. Creative inspiration is particularly strong, making it ideal for artistic pursuits. Your compassion helps someone in need, though be mindful of maintaining healthy boundaries. Dreams may contain important messages; pay attention to recurring themes."
        };
        
        document.getElementById('horoscope-content').innerHTML = horoscopes[sign] || "Horoscope not available for this sign today.";
        horoscopeResultBox.classList.remove('hidden');
    }
});