const TOTAL_QUESTIONS = 200;
const EXAM_DURATION_SECONDS = 180 * 60; // 3 Hours

// Section map aligned with your provided questions
const SECTIONS = {
    'Aptitude': { start: 0, end: 49, name: "Aptitude & GK" },
    'Chemistry': { start: 50, end: 74, name: "Chemistry" },
    'English': { start: 75, end: 99, name: "English" },
    'Mathematics': { start: 100, end: 149, name: "Mathematics" },
    'Physics': { start: 150, end: 199, name: "Physics" }
};

let currentQIndex = 0;
let timeLeft = EXAM_DURATION_SECONDS;
let timerInterval;
let questionStatus = new Array(TOTAL_QUESTIONS).fill(0); 
let userAnswers = new Array(TOTAL_QUESTIONS).fill(null); 

// --- ALL 200 QUESTIONS EMBEDDED ---
const rawText = String.raw`
Mathematics & General Aptitude
1. The present ages of Reena and Usha are 24 and 36 yr. respectively. What was the ratio between the ages of Usha and Reena respectively 8 yr ago? 
a. 7:4 
b. 4:7 
c. 11:8 
d. 8:11 Correct Option: a 
2. The average salary of 20 workers in an office is 1900 per month. If the manager's salary is added, the average becomes 2000 per month. The manager's annual salary (in Rs.) is: 
a. 4000 
b. 25200 
c. 45600 
d. None of these Correct Option: d 
3. What is compound interest accrued on an amount of Rs. 45,000 in two years @ 9 p.c.p.a.? 
a. Rs. 8,600 
b. Rs. 8,565.40 
c. Rs. 8,464.50 
d. Rs. 8,540 Correct Option: c 
4. How many square tiles, each with side 4 decimetre, will be required to cover the floor of a room 8 m long and 6 m broad? 
a. 200 
b. 260 
c. 280 
d. 300 Correct Option: d 
5. If the length of the diagonal AC of a square ABCD is 5.2 cm, then the area of the square is: 
a. 15.12 
b. 13.52 
c. 12.62 
d. 10.00 Correct Option: b 
6. Find the surface area of a cuboid 16 m long, 14 m broad and 7 m high. 
a. 768 cm² 
b. 868 cm² 
c. 886 cm² 
d. 992 cm² Correct Option: b 
7. The ratio of cost price and selling of an article is 8:9. The profit percent is: 
a. 20 
b. 15 
c. 12.5 
d. 10 Correct Option: c 
8. If a:b = 7:9 and b:c = 15:7, then what is a:c? 
a. 5:3 
b. 3:5 
c. 7:21 
d. 7:15 Correct Option: a 
9. A and B can do a piece of work in 6 and 12 days, respectively. They (both) will complete the work in how many days? 
a. 9 days 
b. 18 days 
c. 6 days 
d. 4 days Correct Option: d 
10. If cost of 24 oranges is Rs. 72, then find out the cost of 120 oranges. 
a. 180 
b. 360 
c. 172 
d. 500 Correct Option: b 
11. Find the number of triangles in the given figure. 
a. 16 
b. 14 
c. 18 
d. 15 Correct Option: b 
12. Directions: select the related word from the given alternatives: House: Room:: World: ? 
a. Land 
b. Sun 
c. Air 
d. Nation Correct Option: d 
13. A is B's daughter. B is C's mother. D is C's brother. How is D related to A? 
a. Father 
b. Grandfather 
c. Brother 
d. Son Correct Option: c 
14. What is the angle between the two hands of a clock when the time shown by the clock is 6.30 pm? 
a. 0° 
b. 50° 
c. 30° 
d. 15° Correct Option: d 
15. If in a certain language, MADRAS is coded as NBESBT, how is BOMBAY coded in that code? 
a. CPNCBX 
b. CPNCBZ 
c. CPOCBZ 
d. CQOCBZ Correct Option: b 
16. Choose the alternative which closely resembles the mirror image of the given combination: 247596 
a. (1) 
b. (2) 
c. (3) 
d. (4) Correct Option: d 
17. A, B, C, D and E are sitting on a bench. A is sitting next to B, C is sitting next to D. D is not sitting with E who is on the left end of the bench. C is on the second position from the right. A is on the right of B and E. A and C are sitting together. In which position is A sitting? 
a. Between B and D 
b. Between B and C 
c. Between E and D 
d. Between C and E Correct Option: b 
18. A train 100 m long meets a man going in the opposite direction at 5 km/h and passes him in 7.2 sec. The speed of the train is... 
a. 50 km/h 
b. 40 km/h 
c. 55 km/h 
d. 45 km/h Correct Option: d 
19. If one student walk from his house to school at 5 km/ph, he late by 30 minutes. However, if he walks at 6 km/ph, he is late by 5 minutes only. The distance of his school from his house is... 
a. 2.5 km 
b. 3.6 km 
c. 5.5 km 
d. 12.5 km Correct Option: d 
20. A man can row three-quarters of a kilometer against the stream in 11 1/4 minutes and return in 7 1/2 minutes. The speed of the man in still water is: 
a. 2 km/ph 
b. 3 km/ph 
c. 4 km/ph 
d. 5 km/ph Correct Option: d 
General Knowledge & Science
21. The Central Rice Research Station is situated in? 
a. Cuttack 
b. Mumbai 
c. Delhi 
d. Dehradun Correct Option: a 
22. The hottest planet in the solar system? 
a. Venus 
b. Jupiter 
c. Mercury 
d. Saturn Correct Option: c 
23. How many union territories are there in India? 
a. 8 
b. 7 
c. 9 
d. 10 Correct Option: a 
24. The chief ore of Aluminium is? 
a. Bauxite 
b. Alumina 
c. Iron Ore 
d. Cryofite Correct Option: a 
25. Which material is used to make the lead of pencil? 
a. Wood 
b. Mica 
c. Carbon 
d. Graphite Correct Option: d 
26. The instrument used for finding out the wind direction is: 
a. Barometer 
b. Thermometer 
c. Anemometer 
d. Hygrometer Correct Option: c 
27. The ionosphere includes: 
a. Thermosphere and Exosphere 
b. Thermosphere and Ionosphere 
c. Magnetosphere 
d. Stratosphere Correct Option: a 
28. The winter solstice occurs on: 
a. 21st December 
b. 22nd December 
c. 21st September 
d. 21st January Correct Option: b 
29. At Greenwich, the time is 08:00, the time in India is: 
a. 13:30 
b. 12:30 
c. 5:30 
d. 2:30 Correct Option: a 
30. First president of India? 
a. Pandit Jawaharlal Nehru 
b. Dr. S. Radhakrishnan 
c. Rajendra Prasad 
d. Zakir Hussain Correct Option: c 
31. Country that is called as Land of Rising Sun? 
a. Japan 
b. China 
c. Thailand 
d. India Correct Option: a 
32. The intersecting lines drawn on maps and globes are: 
a. Latitude 
b. Longitude 
c. Geographic Grids 
d. None of the Above Correct Option: c 
33. Which of these rivers does not drain into the Arabian Sea? 
a. Godavari 
b. Narmada 
c. Tapti 
d. Sabarmati Correct Option: a 
34. The metal whose salts are sensitive to light is? 
a. Zinc 
b. Silver 
c. Copper 
d. Gold Correct Option: b 
35. Which planet is known as the "earth's twin"? 
a. Venus 
b. Mars 
c. Jupiter 
d. Mercury Correct Option: a 
36. The device used for measuring altitudes is: 
a. Barometer 
b. Sextant 
c. Ammeter 
d. Altimeter Correct Option: d 
37. The lines joining places having equal rainfall are called: 
a. Isohalines 
b. Isohyets 
c. Isobars 
d. Isotherms Correct Option: b 
38. The Gateway of India is in? 
a. Delhi 
b. Kolkata 
c. Mumbai 
d. Chennai Correct Option: c 
39. Which is considered as the biggest port of India? 
a. Gujarat Port 
b. Mumbai 
c. Chennai 
d. Kolkata Correct Option: b 
40. Entomology is the science that studies? 
a. Insects 
b. Earth 
c. DNA 
d. Plants Correct Option: a 
41. Which of the following planets does not have a moon? 
a. Mars 
b. Pluto 
c. Mercury 
d. Neptune Correct Option: c 
42. The first chairman of the Atomic Energy Commission was: 
a. Homi K. Bhabha 
b. Homi Bhabha 
c. Satya Bhabha 
d. Jacqueline Bhabha Correct Option: b 
43. "One People, One State, One Leader" was the policy of? 
a. Hitler 
b. Gandhi Ji 
c. Stalin 
d. Lenin Correct Option: a 
44. Which of the following rocks are formed from volcanoes? 
a. Sedimentary Rock 
b. Metamorphic Rock 
c. Igneous Rock 
d. None of the Above Correct Option: c 
45. The folk dance of Assam is called: 
a. Kathputli 
b. Bihu 
c. Ghoomar 
d. Kalbeliya Correct Option: b 
46. Which of the following is not a factor determining the climate of a place? 
a. Latitude 
b. Longitude 
c. Altitude 
d. None of the Above Correct Option: b 
47. Which state has the largest coastline in India? 
a. Odisha 
b. West Bengal 
c. Gujarat 
d. None of the Above Correct Option: c 
48. The light of the sun reaches the earth in about: 
a. 8 Minutes 20 Seconds 
b. 20 Minutes 8 Seconds 
c. 60 Seconds 
d. 4 Minutes 30 Seconds Correct Option: a 
49. Which among the following planets is called as a morning and evening star? 
a. Mercury 
b. Earth 
c. Uranus 
d. Venus Correct Option: d 
50. Deficiency of Iron leads to? 
a. Anemia 
b. Color Blindness 
c. Night Blindness 
d. Beri Beri Correct Option: a 
Chemistry Section
51. Which of the following environmentally hazardous refrigerant is responsible for ozone depletion in the stratosphere? 
a. CFCs (Chlorofluorocarbons) 
b. CFM 
c. CIC (Chloroiodocarbons) 
d. CIM (Chloroiodomethane) Correct Option: a 
52. Which of the following is not a mixture? 
a. Gasoline 
b. Distilled alcohol 
c. LPG 
d. Iodised table salt Correct Option: b 
53. Which of the following phenomenon is responsible for the television pictures? 
a. Chemiluminescence 
b. Fluorescence 
c. Luminescence 
d. Phosphorescence Correct Option: b 
54. An electronic arrangement is said to be stable if its outer shell consists: 
a. Doublet of electrons 
b. Triplet of electrons 
c. Octet of electrons 
d. Singlet of electrons Correct Option: c 
55. Attractive intermolecular forces is known as: 
a. Centrifugal forces 
b. Gravitational forces 
c. Van der Waals forces 
d. Mechanical forces Correct Option: b 
56. In thermodynamics, the sum of all energy of the system, is called: 
a. External energy 
b. Reversible energy 
c. Internal energy 
d. Irreversible energy Correct Option: c 
57. The rate of dissolution of sugar is equal to rate of crystallisation of sugar can be represented as: 
a. Sugar (solution) ⇌ sugar (solvent) 
b. Sugar (solution) ⇌ sugar (solid) 
c. None of the above 
d. Sugar (solvent) = sugar (solution) Correct Option: a 
58. Which of the following reactions represents redox process? 
a. Electrochemical process for extraction of reactive metals 
b. Manufacturing of caustic soda 
c. Corrosion of metals 
d. All of the above Correct Option: d 
59. Which of the following is the correct expanded form of LPG? 
a. Liquid petroleum gas 
b. Liquefied petroleum gas 
c. Liquefied petrol gas 
d. None of the above Correct Option: b 
60. Environmental chemistry deals with the study of the: 
a. Origin of chemical species in environment 
b. Effect of chemical species in environment 
c. Reactions of chemical species in environment 
d. All of the above Correct Option: d 
61. Pollutants can be found in the form of: 
a. Solid 
b. Liquid 
c. Gas 
d. All of the above Correct Option: d 
62. The geometry of the dimer of AlCl₃ is: 
a. Octahedral 
b. Square planar 
c. Tetrahedral 
d. Trigonal planar Correct Option: c 
63. Find out the alternative which will replace the questions mark: Methane: sp³ :: Ethane: ? 
a. sp 
b. sp² 
c. sp³ 
d. None of these Correct Option: c 
64. Select the correct statement: 
a. Matter can exist only in solid, liquid and gaseous states 
b. At low temperature, intermolecular forces are strong 
c. Combined effect of intermolecular forces and thermal energy 
d. All of the given statements are correct Correct Option: d 
65. Which of the following properties tends to keep the solid particles apart by making them move faster? 
a. Low temperature 
b. Intermolecular forces 
c. Thermal energy 
d. Both B and C Correct Option: c 
66. Which of the following is the correct example of solid solution in which the solute is in gas phase? 
a. Copper dissolved in gold 
b. Camphor in nitrogen gas 
c. Hydrogen in palladium 
d. All of these Correct Option: c 
67. Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) The above redox reaction is used in: 
a. Galvanic cell 
b. Daniell cell 
c. Voltaic cell 
d. All of these Correct Option: d 
68. Rate of which of the following reactions can be determined easily? 
a. Rusting of iron 
b. Hydrolysis of starch 
c. Reaction of silver nitrate with sodium chloride 
d. All of the above Correct Option: b 
69. The process by which sites of adsorbent are made free so that more adsorbate can occupy them is called: 
a. Sorption 
b. Desorption 
c. Unbalanced distribution 
d. Dissociation Correct Option: b 
70. Which of the following elements occur in free state? 
a. Iodine 
b. Sulphur 
c. Phosphorus 
d. Magnesium Correct Option: b 
71. The only element which does not show allotropy is: 
a. Nitrogen 
b. Phosphorus 
c. Arsenic 
d. Oxygen Correct Option: a 
72. The one which has incompletely filled d-orbitals in its ground state or in any one of its oxidation state is known as: 
a. Transition element 
b. s-block elements 
c. p-block element 
d. None of these Correct Option: a 
73. A complex compound in which the oxidation number of a metal is zero, is: 
a. [Ni(CO)₄] 
b. [Pt(NH₃)₄]Cl₂ 
c. K₃[Fe(CN)₆] 
d. K₄[Fe(CN)₆] Correct Option: a 
74. Which of the following compound containing hydroxyl group is used for polishing wooden furniture? 
a. Anisole 
b. Phenol 
c. Ethanol 
d. All of these Correct Option: c 
75. What is the common name of dimethyl ketone? 
a. Ether 
b. Acetone 
c. Acetophenone 
d. Benzophenone Correct Option: b 
English Language Section
76. ANTONYMS: Select the word which is most nearly opposite in meaning to the capital word: The COMPLAINANT was not supportive... 
a. Defendant 
b. Advocate 
c. Indulgence 
d. Servant Correct Option: a 
77. ANTONYMS: Select the word which is most nearly opposite in meaning to the capital word: Living a SOLITARY place... 
a. Limited 
b. Exotic 
c. Healthy 
d. Populous Correct Option: d 
78. ANTONYMS: Select the word which is most nearly opposite in meaning to the capital word: They spent a DISTURBED night... 
a. Restless 
b. Sleepless 
c. Mournful 
d. Peaceful Correct Option: d 
79. ANTONYMS: Select the word which is most nearly opposite in meaning to the capital word: We have CREATED a beautiful house... 
a. Destroyed 
b. Built 
c. Constructed 
d. Planned Correct Option: a 
80. ANTONYMS: Select the word which is most nearly opposite in meaning to the capital word: A large number of designer clothes are REVOLTING 
a. Inviting 
b. Beautiful 
c. Fashionable 
d. Delightful Correct Option: b 
81. SYNONYMS: Select the synonym of word: The convict's INGENUOUS explanation... 
a. Candid 
b. Secret 
c. Insincere 
d. Consistent Correct Option: a 
82. SYNONYMS: Select the synonym of word: The ENORMITY of the population problem... 
a. Intensity 
b. Vastness 
c. Cruelty 
d. Fragility Correct Option: b 
83. SYNONYMS: Select the synonym of word: EXAGGERATION of facts... 
a. Simplification 
b. Negation 
c. Emancipation 
d. Amplification Correct Option: d 
84. SYNONYMS: Select the synonym of word: After his father's death, he became INSOLVENT. 
a. Rich 
b. Poor 
c. Bankrupt 
d. Nonchalant Correct Option: c 
85. SYNONYMS: Select the synonym of word: He INDUCES human beings... 
a. Influences 
b. Dictates 
c. Persuades 
d. Appreciates Correct Option: c 
86. IDIOMS/PHRASES: Turned down 
a. Subject 
b. Object 
c. Reject 
d. Deject Correct Option: c 
87. IDIOMS/PHRASE: To hit below the belt 
a. To punish 
b. To tie with a belt 
c. To hit with a belt 
d. To attack unfairly Correct Option: d 
88. IDIOMS/PHRASES: Pot-luck dinner 
a. Dinner where everybody brings something to eat 
b. Dinner where everybody pays for his food 
c. Dinner where only soup is served 
d. Dinner where people eat and play games Correct Option: a 
89. IDIOMS/PHRASE: (To be under someone's thumb - Inferred) 
a. To attend a call 
b. To be helped by someone 
c. To be useful to someone 
d. To be dominated by someone Correct Option: d 
90. IDIOMS/PHRASES: To explore every avenue 
a. To search all streets 
b. To scout the wilderness 
c. To find adventure 
d. To try every opportunity Correct Option: d 
91. SPOTTING THE ERROR: Let us (a) / bring this discussion (b) / to close (c) / No error (d). 
Correct Option: c 
92. SPOTTING THE ERROR: Each of them (a) / have a different version (b) / of the crime (c) / No error (d). 
Correct Option: b 
93. SPOTTING THE ERROR: I and Gopal (a) / went to the meeting (b) / together (c) / No error (d). 
Correct Option: a 
94. SPOTTING THE ERROR: Latin is not only hard to write (a) / but also (b) / to read (c) / No error (d). 
Correct Option: a 
95. SPOTTING THE ERROR: In most villages (a) / the roads are rough (b) / isn't it (c) / no error (d). 
Correct Option: c 
96. Sentence Improvement: I don't remember exactly <u>when did I go</u> to Shimla last year. 
a. When I did go 
b. When I was going 
c. When I went 
d. No improvement Correct Option: c 
97. Sentence Improvement: <u>Even</u> he worked hard, he failed in the examination. 
a. Since 
b. Although 
c. For 
d. No improvement Correct Option: b 
98. Sentence Improvement: He was asked <u>to arbitrate with</u> two merchants in a dispute. 
a. To arbitrate between 
b. To arbitrate at 
c. To arbitrate 
d. No improvement Correct Option: a 
99. Sentence Improvement: <u>Among</u> the two. 
a. In 
b. Of 
c. Than 
d. No improvement Correct Option: b 
100. Sentence Improvement: He <u>is resembling</u> his father. 
a. Has resembled 
b. Was resembling 
c. Resembles 
d. No improvement Correct Option: c 
Mathematics Section II
101. Divide 64 into two parts such that the sum of cubes of two parts is minimum. 
a. 44, 20 
b. 16, 48 
c. 32, 32 
d. 50, 14 Correct Option: c 
102. The point (0, 5) is closest to the curve $x^{2}=2y$. 
a. $(2\sqrt{2}, 0)$ 
b. $(0, 0)$ 
c. $(2, 2)$ 
d. none of these Correct Option: d 
103. The base of the Decimal number system is: 
a. 2 
b. 5 
c. 10 
d. 4 Correct Option: c 
104. The 5th term in the expansion of $(x^{2}+2y)^{10}$ is: 
a. $10x^{2}y$ 
b. $32y^{2}$ 
c. $80x^{2}y^{4}$ 
d. None of these Correct Option: c 
105. If two circles $x^{2}+y^{2}+2gx+2fy=0$ and $x^{2}+y^{2}+2g_{1}x+2f_{1}y=0$ touch each other, then: 
a. $g^{2}=f_{1}^{2}+g_{1}^{2}$ 
b. $f/f_{1}=g/g_{1}$ 
c. $H=sg$ 
d. none of these Correct Option: c 
106. The tangent to the circle $x^{2}+y^{2}=5$ at point $(1, -2)$ also touches $x^{2}+y^{2}-8x+6y+20=0$ at: 
a. (-2, 1) 
b. (-3, 0) 
c. (-1, -1) 
d. (3, -1) Correct Option: d 
107. The distance between the foci of the ellipse $4x^{2}+5y^{2}=20$ is: 
a. 1 
b. 2 
c. 4 
d. 0 Correct Option: b 
108. $\int_{\pi/3}^{\pi/2} \text{cosec}(x) dx$: 
a. 1/2 log 2 
b. 1/2 log 3 
c. log 2 
d. None of these Correct Option: b 
109. The value of $\begin{vmatrix} \cos 15^{\circ} & \sin 15^{\circ} \\ \sin 15^{\circ} & \cos 15^{\circ} \end{vmatrix}$: 
a. 1 
b. 1/2 
c. $\sqrt{3}/2$ 
d. none of these Correct Option: c 
110. $i^{247} = ?$ 
a. 1 
b. -1 
c. $i$ 
d. -$i$ Correct Option: d 
111. $i^{68} = ?$ 
a. $i$ 
b. -1 
c. 1 
d. -$i$ Correct Option: a 
112. The eccentricity of the hyperbola $25x^{2} - 144y^{2} = 900$ is: 
a. 12/13 
b. 13/12 
c. 13/5 
d. 5/13 Correct Option: b 
113. The equation of the parabola whose focus is (-3, 0) and directrix $x+4=0$: 
a. $y^{2} = 4x+9$ 
b. $y^{2} = 3x-8$ 
c. $y^{2} = 2x+7$ 
d. $y^{2} = 2x-5$ Correct Option: c 
114. The equation of the parabola whose focus is origin and directrix is $2x+y-1=0$: 
a. $x^{2}+4y^{2}-4xy+2y+4x-1=0$ 
b. $x^{2}+4y^{2}+4xy-2y+4x-1=0$ 
c. $x^{2}+4y^{2}-4xy-2y-4x+1=0$ 
d. None of these Correct Option: a 
115. Differential equation of circles through origin with centers on y-axis: 
a. $dy/dx = (x^{2}+y^{2})/2xy$ 
b. $dy/dx = 2xy/(x^{2}+y^{2})$ 
c. $dy/dx = 2xy/(x^{2}-y^{2})$ 
d. None of these Correct Option: c 
116. If $y = \cos(x^{2})$ then $dy/dx = ?$ 
a. -sin x 
b. -2x sin x 
c. $-2x \sin(x^{2})$ 
d. None of these Correct Option: c 
117. Pole height 2√3 m, shadow length 2 m, angle of elevation: 
a. 30° 
b. 45° 
c. 60° 
d. 90° Correct Option: c 
118. 30 m ladder reaches top of 15 m wall. Angle with horizontal: 
a. 30° 
b. 45° 
c. 60° 
d. 90° Correct Option: a 
119. $\int \log(x) dx$: 
a. $1/x + C$ 
b. $1/2(\log x)^{2} + C$ 
c. $x(\log x - 1) + C$ 
d. None of these Correct Option: d 
120. $\int (\log x)/x^{2} dx = ?$ 
a. $-1/x(1+\log x) + C$ 
b. $-1/x + \log x + 1/x + C$ 
c. $1/x^{3} + 2x^{2} + C$ 
d. None of these Correct Option: a 
121. Principal value of $\text{cot}^{-1}(-1)$ is: 
a. $-\pi/4$ 
b. $3\pi/4$ 
c. $5\pi/4$ 
d. $\pi$ Correct Option: b 
122. Value of $\sin(\sin^{-1}x + \cos^{-1}x)$ is: 
a. 0 
b. 1 
c. -1 
d. None of these Correct Option: b 
123. $\lim_{x\to3} (x^{4}-81)/(x-3) = ?$ 
a. 0 
b. 27 
c. 108 
d. None of these Correct Option: c 
124. The value of $\log_{27} 9$ is: 
a. 3/2 
b. 3 
c. 1/3 
d. 2/3 Correct Option: d 
125. Matrices $A+B = \begin{pmatrix} 1 & 2 \\ 5 & -6 \end{pmatrix}$ and $A-B = \begin{pmatrix} -3 & 4 \\ -1 & -2 \end{pmatrix}$, find $AB$: 
a. $\begin{pmatrix} -7 & 5 \\ 8 & -6 \end{pmatrix}$ 
b. $\begin{pmatrix} 7 & -5 \\ -8 & 6 \end{pmatrix}$ 
c. $\begin{pmatrix} 7 & 5 \\ -8 & -6 \end{pmatrix}$ 
d. $\begin{pmatrix} 7 & -5 \\ 8 & -6 \end{pmatrix}$ Correct Option: b 
126. 75° measured in radians is: 
a. $3\pi/4$ 
b. $2\pi/3$ 
c. $12\pi/5$ 
d. None of these Correct Option: d 
127. (Mathematical expression with matrix/series - Inferred): 
a. $(7\pi/5)^{5}$ 
b. $(9\pi/5)^{6}$ 
c. $(8\pi/3)^{4}$ 
d. None of these Correct Option: b 
128. If $P_{r} = 6 \cdot P_{r-1}$ (Inferred condition), then $r$: 
a. 40 
b. 41 
c. 42 
d. 43 Correct Option: b 
129. If $nC_{6} : n-3C_{3} = 33 : 4$, then $n = ?$ 
a. 9 
b. 10 
c. 11 
d. None of these Correct Option: c 
130. Probability of getting a prime number on a die: 
a. 1/6 
b. 1/3 
c. 1/2 
d. 1 Correct Option: c 
131. Probability of heads in both trials if coin is tossed twice: 
a. 1/4 
b. 1/2 
c. 3/4 
d. 1 Correct Option: a 
132. In ΔABC if $a=2, b=\sqrt{6}, c=\sqrt{3}+1$, then $\angle A$: 
a. 30° 
b. 45° 
c. 60° 
d. 90° Correct Option: a 
133. Roots of equation $(x+3)(x-3) = 25$: 
a. 5, -5 
b. 3, -3 
c. √34, -√34 
d. 8, 2 Correct Option: c 
134. Value of $\sqrt{6+\sqrt{6+\sqrt{6...}}}$ is: 
a. 3 
b. $2\sqrt{3}$ 
c. √42 
d. 18 Correct Option: a 
135. Let $A = \{1, 2, 3\}$. Relation $R = \{(1, 1), (2, 2), (3, 3), (1, 2), (2, 1), (2, 3), (3, 2)\}$ is: 
a. Reflexive and transitive only 
b. Symmetric and transitive only 
c. Reflexive and symmetric only 
d. Equivalence relation Correct Option: c 
136. 23rd term of A.P. 7, 5, 3, 1...: 
a. 51 
b. 53 
c. 37 
d. -37 Correct Option: d 
137. Number of non-empty subsets of $\{a, b, c, d\}$ is: 
a. 3 
b. 4 
c. 15 
d. 16 Correct Option: c 
138. Source of data for primary investigations: 
a. Magazines 
b. Newspapers 
c. Government publications 
d. Questionnaires Correct Option: d 
139. Industry expenditure under different heads is best presented as a: 
a. Bar diagram 
b. Pie diagram 
c. Histogram 
d. Frequency polygon Correct Option: b 
140. Centers of circles touching $x^{2}+y^{2}-8x-8y-4=0$ externally and x-axis lie on: 
a. circle 
b. ellipse 
c. hyperbola 
d. parabola Correct Option: d 
141. Number of common tangents to circles $x^{2}+y^{2}-4x-6y-12=0$ and $x^{2}+y^{2}+6x+18y+26=0$: 
a. 1 
b. 2 
c. 3 
d. 4 Correct Option: c 
142. Distance between $A(1, -1, 3)$ and $B(2, 3, -5)$: 
a. 13 units 
b. √13 units 
c. 9 units 
d. none Correct Option: c 
143. Distance of $P(-8, 5, -6)$ from origin: 
a. 19 units 
b. √19 unit 
c. 5√5 unit 
d. none Correct Option: c 
144. If $\tan^{2}x + (1-\sqrt{3})\tan x - \sqrt{3} = 0$, then $x$: 
a. $n\pi + \pi/6$ 
b. $n\pi - \pi/3$ 
c. $n\pi + \pi/4$ 
d. $n\pi - \pi/4$ or $n\pi + \pi/3$ Correct Option: d 
145. Distance of point $A(2, 3, 4)$ from x-axis: 
a. 5 units 
b. √13 
c. 2√5 units 
d. none Correct Option: a 
146. $\int_{\pi/4}^{\pi/2} \text{cot}(x) dx = ?$ 
a. log 2 
b. 1/2 log 2 
c. 2 log 2 
d. None Correct Option: b 
147. Unit vector parallel to resultant of $(2i+4j-5k)$ and $(i+2j+3k)$: 
a. $(i+2j-8k)/49$ 
b. $(3i+6j-2k)/49$ 
c. $(i+2j-8k)/7$ 
d. $(3i+6j-2k)/7$ Correct Option: d 
148. Length of vector joining $A(3i+2j+k)$ and $B(i+j+k)$: 
a. √3 
b. √5 
c. √11 
d. none Correct Option: b 
149. Length of line segment joining $(2i-2j+3k)$ and $(5i+2j+3k)$: 
a. 2 
b. 3 
c. 6 
d. 5 Correct Option: d 
150. $\cos(-640^{\circ}) = ?$ 
a. -cos 80° 
b. cos 80° 
c. cos 140° 
d. none Correct Option: b 
Physics Section
151. Current in a conductor is due to: 
a. Motion of free electrons 
b. Motion of +ve ions 
c. Free electrons and holes 
d. Protons Correct Option: a 
152. Photoelectric effect was discovered by: 
a. Hallwachs 
b. Einstein 
c. Planck 
d. Bohr Correct Option: a 
153. Photoelectric effect was first explained by: 
a. Hallwachs 
b. Einstein 
c. Planck 
d. Bohr Correct Option: b 
154. Unit of electric charge: 
a. Coulomb 
b. Newton 
c. Volt 
d. Coulomb/volt Correct Option: a 
155. Strength of induced e.m.f. is independent of: 
a. Strength of magnet 
b. Number of turns 
c. Resistivity of wire 
d. Speed of magnet Correct Option: c 
156. Magnet moved towards coil quickly vs slowly: 
a. larger in case (i) 
b. Smaller in case (i) 
c. Equal 
d. radius dependent Correct Option: a 
157. Radius of stretched steel wire is doubled. Young's modulus: 
a. Remains unchanged 
b. becomes double 
c. Become half 
d. becomes four times Correct Option: a 
158. Most intense planet of the solar system? 
a. Saturn 
b. Mars 
c. Venus 
d. Mercury Correct Option: c 
159. Which is a scalar quantity? 
a. Velocity 
b. Force 
c. Momentum 
d. Electric current Correct Option: d 
160. Theoretical limit to the size of the universe: 
a. Ten million light years 
b. One million light years 
c. Hundred million light years 
d. Ten thousand million light years Correct Option: d 
161. Body travelling in a circle at constant speed: 
a. constant velocity 
b. not accelerated 
c. inward radial acceleration 
d. outward radial acceleration Correct Option: c 
162. Uniform motion does not have: 
a. Radial velocity/acceleration 
b. Radial velocity/transverse acceleration 
c. Transverse velocity/radial acceleration 
d. Transverse velocity/acceleration Correct Option: b 
163. Electric charge in uniform motion produces: 
a. Electric field only 
b. Magnetic field only 
c. Both 
d. No field Correct Option: c 
164. Unit of magnetic induction B: 
a. Weber 
b. Weber/metre 
c. Newton/(Amp x metre) 
d. Newton/metre Correct Option: b 
165. Ray of light enters glass slab from air: 
a. wavelength decreases 
b. wavelength increases 
c. frequency increases 
d. no change Correct Option: a 
166. Monochromatic wave air to glass: 
a. direction must change 
b. frequency must change 
c. wavelength increases 
d. wavelength decreases Correct Option: d 
167. Corpuscular theory of light based on: 
a. Newton's rings 
b. Rectilinear propagation 
c. Colour in thin films 
d. Dispersion Correct Option: b 
168. Locus of points in same state of vibration: 
a. half period zone 
b. wavefront 
c. ray 
d. Vibrator Correct Option: b 
169. Huygen's concept of secondary wave: 
a. thick lens focal length 
b. method to find wavefront 
c. velocity of light 
d. polarisation Correct Option: b 
170. Steady torque acting on a body: 
a. rest/uniform motion 
b. linear acceleration 
c. angular acceleration 
d. rotated constant speed Correct Option: c 
171. In insulators: 
a. valence band partially filled 
b. conduction band partially filled 
c. conduction filled, valence empty 
d. conduction empty, valence filled Correct Option: d 
172. No hole current in conductors because: 
a. full of electron gas 
b. large forbidden gap 
c. no valence bond 
d. overlapping bands Correct Option: a 
173. Condition for S.H.M.: 
a. Constant period 
b. Constant acceleration 
c. Accel. ∝ displacement from equilibrium 
d. Restoring force ∝ displacement from equilibrium Correct Option: d 
174. Particle in S.H.M. - true statement: 
a. total energy same 
b. max restoring force at extreme 
c. force towards fixed point 
d. All of the Above Correct Option: d 
175. 'celsius' is a unit: 
a. Electric Potential 
b. trignometric angle 
c. degree centigrade 
d. equivalent to K Correct Option: a 
176. Block at 140°F is what in Celsius? 
a. 60° 
b. 160° 
c. 140° 
d. 132° Correct Option: a 
177. Coefficient of restitution $e$ for elastic collision: 
a. 1 
b. 0 
c. 0.3 
d. -1 Correct Option: a 
178. One nanometre is: 
a. 10⁻⁹ mm 
b. 10⁻⁶ cm 
c. 10⁻⁷ cm 
d. 10⁻⁹ m Correct Option: c 
179. Car rest to 144 km/h in 20 sec. Distance: 
a. 20 m 
b. 400 m 
c. 1440 m 
d. 2980 m Correct Option: b 
180. Velocity for sphere to reach height of suspension: 
a. √gl 
b. √2gl 
c. √3gl 
d. 2gl Correct Option: d 
181. Cylinder 10 m/s, friction 1/4. Distance covered: 
a. 20 metre 
b. 30 metre 
c. 10 metre 
d. 15 metre Correct Option: b 
182. Ratio of linear momentum (m and 4m) with equal K.E.: 
a. 4:1 
b. 1:1 
c. 1:2 
d. 1:4 Correct Option: c 
183. Time period of pendulum in satellite: 
a. zero 
b. infinite 
c. 1 s 
d. same Correct Option: b 
184. Temperature at 40 km height - correct statement: 
a. fall continuously 
b. rise continuously 
c. reach constant 
d. fall, constant, then rise Correct Option: d 
185. Maximum density of H₂O temperature: 
a. 32°F 
b. 39.2°F 
c. 42°F 
d. 4°F Correct Option: b 
186. K.E. of oxygen vs hydrogen at same temperature T: 
a. 16 times 
b. 4 times 
c. Equal 
d. 1/4 Correct Option: c 
187. Heated metal plate with rough black spot taken to dark room: 
a. Spot brighter than plate 
b. Spot darker than plate 
c. equally bright 
d. not visible Correct Option: a 
188. Effective power of contact lenses (20 cm and 25 cm): 
a. 1/2 diopter 
b. 9 diopter 
c. 1/45 diopter 
d. 45 diopter Correct Option: b 
189. Change of phase on reflection at air/glass interface: 
a. zero 
b. π/2 
c. π 
d. 2π Correct Option: c 
190. Fundamental frequency open pipe 30 vib/s. If closed: 
a. 10 vib/sec 
b. 20 vib/sec 
c. 30 vib/sec 
d. 15 vib/sec Correct Option: d 
191. Potential difference to move 5 µC using 10 mJ from A to B: 
a. +2kV 
b. -2kV 
c. +200 V 
d. -200 V Correct Option: c 
192. Kirchoff's (first) law is based on: 
a. Conservation of charge 
b. Conservation energy 
c. Conservation of momentum 
d. Conservation of angular momentum Correct Option: a 
193. Wire of 12 ohms bent into circle. Effective resistance between diameter: 
a. 12 Ω 
b. 24 Ω 
c. 6 Ω 
d. 3 ohm Correct Option: d 
194. Force on charge q moving with v in field B: 
a. $q/(v \times B)$ 
b. $(v \times B)/q$ 
c. $q(v \times B)$ 
d. $q(v \cdot B)$ Correct Option: c 
195. Protons shot perpendicular to magnetic field: 
a. no influence 
b. same direction, gain momentum 
c. opposite direction, gain momentum 
d. bend in an arch of circle Correct Option: d 
196. Magnet M cut into two equal parts length. New moment: 
a. M 
b. 2M 
c. M/2 
d. zero Correct Option: c 
197. Total inductance of two parallel self-inductance L inductors: 
a. L 
b. 2L 
c. L/2 
d. L/4 Correct Option: c 
198. Frequency increase in L-C-R series circuit, impedance: 
a. Constant 
b. Increases 
c. Decreases 
d. Decreases, minimum, then increases Correct Option: d 
199. Electromagnetic waves nature: 
a. longitudinal 
b. Longitudinal stationary 
c. Transverse 
d. Transverse-stationary Correct Option: c 
200. Increase incident light intensity on metal surface: 
a. K.E. increases 
b. Number of emitted electrons increases 
c. both increase 
d. No Effect Correct Option: b
`;

// --- NEW AUTO-PARSER (Handles "1. ", "a. ", "b. ", format) ---
const questions = [];
const matches = rawText.matchAll(/(?:^|\n)\s*(\d+)\.\s+([\s\S]*?)(?=(?:\n\s*\d+\.\s+)|$)/g);

for (const match of matches) {
    let qNum = parseInt(match[1]);
    let block = match[2];

    let sectionName = "";
    if(qNum <= 50) sectionName = "Aptitude & GK";
    else if(qNum <= 75) sectionName = "Chemistry";
    else if(qNum <= 100) sectionName = "English";
    else if(qNum <= 150) sectionName = "Mathematics";
    else sectionName = "Physics";

    let correctMatch = block.match(/Correct Option:\s*([a-d])/i);
    let correctIndex = correctMatch ? (correctMatch[1].toLowerCase().charCodeAt(0) - 97) : 0;

    let textPart = block.split(/(?:^|\s+)a\.\s+/i)[0].trim();
    let optA = block.match(/(?:^|\s+)a\.\s+(.*?)(?=(?:^|\s+)b\.\s+)/is);
    let optB = block.match(/(?:^|\s+)b\.\s+(.*?)(?=(?:^|\s+)c\.\s+)/is);
    let optC = block.match(/(?:^|\s+)c\.\s+(.*?)(?=(?:^|\s+)d\.\s+)/is);
    let optD = block.match(/(?:^|\s+)d\.\s+(.*?)(?=Correct Option:)/is);

    questions.push({
        id: qNum - 1, 
        section: sectionName,
        text: textPart,
        options: [
            optA ? optA[1].trim() : "Option A",
            optB ? optB[1].trim() : "Option B",
            optC ? optC[1].trim() : "Option C",
            optD ? optD[1].trim() : "Option D"
        ],
        correct: correctIndex
    });
}

// --- EXAM LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    initTimer();
    renderPalette();
    loadQuestion(0);
});

function initTimer() {
    const display = document.getElementById("timer");
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitExam();
        } else {
            timeLeft--;
            let h = Math.floor(timeLeft / 3600);
            let m = Math.floor((timeLeft % 3600) / 60);
            let s = timeLeft % 60;
            display.innerText = `${pad(h)}:${pad(m)}:${pad(s)}`;
        }
    }, 1000);
}
function pad(n) { return n < 10 ? '0' + n : n; }

function renderPalette() {
    const container = document.getElementById("palette-container");
    container.innerHTML = "";
    questions.forEach((q, index) => {
        const btn = document.createElement("div");
        btn.className = `p-btn ${getStatusClass(questionStatus[index])}`;
        btn.innerText = index + 1;
        btn.onclick = () => { loadQuestion(index); };
        btn.id = `p-btn-${index}`;
        container.appendChild(btn);
    });
}

function getStatusClass(status) {
    if (status === 2) return "answer";
    if (status === 3) return "review";
    if (status === 1) return "not-answer";
    return "not-visit";
}

function loadQuestion(index) {
    if (questionStatus[currentQIndex] === 0) {
        questionStatus[currentQIndex] = 1;
        updatePaletteBtn(currentQIndex);
    }

    currentQIndex = index;
    document.querySelectorAll('.p-btn').forEach(b => b.classList.remove('active-q'));
    document.getElementById(`p-btn-${index}`).classList.add('active-q');

    document.getElementById("q-display-no").innerText = index + 1;
    document.getElementById("question-text").innerHTML = questions[index].text;

    const optsContainer = document.getElementById("options-container");
    optsContainer.innerHTML = "";
    questions[index].options.forEach((opt, i) => {
        const label = document.createElement("label");
        const inp = document.createElement("input");
        inp.type = "radio";
        inp.name = "opt";
        inp.value = i;
        if (userAnswers[index] === i) inp.checked = true;
        
        inp.onchange = () => {
             userAnswers[index] = i; 
             // Optional: automatically mark answered when selected
        };
        
        label.appendChild(inp);
        label.appendChild(document.createTextNode(opt));
        optsContainer.appendChild(label);
    });

    // Render MathJax dynamically
    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById('q-box-container')]).catch(function (err) {
            console.log(err.message);
        });
    }

    highlightSubjectTab(questions[index].section);
}

function saveAndNext() {
    const selected = document.querySelector('input[name="opt"]:checked');
    if (selected) {
        userAnswers[currentQIndex] = parseInt(selected.value);
        questionStatus[currentQIndex] = 2; 
    } else {
        questionStatus[currentQIndex] = 1; 
    }
    updatePaletteBtn(currentQIndex);
    nextQuestion();
}

function markForReview() {
    const selected = document.querySelector('input[name="opt"]:checked');
    if (selected) userAnswers[currentQIndex] = parseInt(selected.value);
    questionStatus[currentQIndex] = 3; 
    updatePaletteBtn(currentQIndex);
    nextQuestion();
}

function clearResponse() {
    userAnswers[currentQIndex] = null;
    const selected = document.querySelector('input[name="opt"]:checked');
    if (selected) selected.checked = false;
    questionStatus[currentQIndex] = 1; 
    updatePaletteBtn(currentQIndex);
}

function nextQuestion() { if (currentQIndex < TOTAL_QUESTIONS - 1) loadQuestion(currentQIndex + 1); }
function prevQuestion() { if (currentQIndex > 0) loadQuestion(currentQIndex - 1); }

function updatePaletteBtn(index) {
    const btn = document.getElementById(`p-btn-${index}`);
    btn.className = `p-btn ${getStatusClass(questionStatus[index])}`;
    if(index === currentQIndex) btn.classList.add('active-q');
}

function jumpToSection(sectionName) {
    const sec = SECTIONS[sectionName];
    if (sec) loadQuestion(sec.start);
}

function highlightSubjectTab(sectionName) {
    document.querySelectorAll('.sub-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.includes(sectionName)) btn.classList.add('active');
    });
}

function submitExam() {
    clearInterval(timerInterval);
    document.getElementById("exam-interface").style.display = "none";
    document.getElementById("result-interface").style.display = "block";
    
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;
    
    const reviewContainer = document.getElementById("detailed-review");
    reviewContainer.innerHTML = "";

    questions.forEach((q, i) => {
        let isCorrect = false;
        let isAttempted = userAnswers[i] !== null;
        let itemClass = "unattempted";

        if (!isAttempted) {
            unattemptedCount++;
        } else if (userAnswers[i] === q.correct) {
            correctCount++;
            score += 1;
            isCorrect = true;
            itemClass = "correct";
        } else {
            wrongCount++;
            score -= 0.25; 
            itemClass = "wrong";
        }

        let optionsHtml = "";
        q.options.forEach((opt, optIndex) => {
            let optClass = "review-opt";
            if (optIndex === q.correct) optClass += " is-correct"; 
            if (isAttempted && userAnswers[i] === optIndex && !isCorrect) optClass += " is-wrong"; 

            optionsHtml += `<div class="${optClass}">${['A', 'B', 'C', 'D'][optIndex]}. ${opt}</div>`;
        });

        reviewContainer.innerHTML += `
            <div class="review-item ${itemClass}">
                <h4>Q${i + 1} [${q.section}]: ${q.text}</h4>
                <div class="options-review">${optionsHtml}</div>
                <p><strong>Status:</strong> ${!isAttempted ? "Unattempted" : (isCorrect ? "Correct (+1)" : "Incorrect (-0.25)")}</p>
            </div>
        `;
    });

    document.getElementById("result-stats").innerHTML = `
        <p><strong>Total Marks:</strong> ${score} / 200</p>
        <p><strong>Correct Answers:</strong> ${correctCount}</p>
        <p><strong>Incorrect Answers:</strong> ${wrongCount}</p>
        <p><strong>Unattempted:</strong> ${unattemptedCount}</p>
    `;

    // Render MathJax for the results page
    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById('result-interface')]).catch(function (err) {
            console.log(err.message);
        });
    }
}