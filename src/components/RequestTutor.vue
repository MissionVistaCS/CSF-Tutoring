<template>
<form class="form-style-7" method="POST">
    <ul>
        
    </ul>

    <h1>Peer Tutor Request Form (Spring 2018)</h1>
    <p>Tutoring is provided by students from the California Scholarship Federation MVHS chapter. Students will be paired with student tutors, who are members of CSF. The tutoring program won't begin until late January 2018, but you can start submitting requests now.</p>
    <ul>
        <li>
            <label for="mediator">Are you a...?</label>

            <input name="mediator" type="radio" id="mediator" value="STUDENT" required="required">Student</input> <br/>
            <input name="mediator" type="radio" value="PARENT" required="required" id="mediator1">Parent</input> <br/>
            <input name="mediator" type="radio" value="TEACHER" required="required" id="mediator2">Teacher</input> <br/>
        </li>

        <li>
            <label for="firstName"><strong>Student</strong> First Name</label>
            <input id="firstName" name="firstName" type="text" required="required" value=""/>
        </li>

        <li>
            <label for="lastName"><strong>Student</strong> Last Name</label>
            <input id="lastName" name="lastName" type="text" required="required" value=""/>
        </li>

        <li>
            <label for="cellNumber">Student <strong>Cellphone</strong> Number (Format: xxx-xxx-xxxx or without dashes)</label>
            <input id="cellNumber" name="cellNumber" type="tel" pattern="^ ?\(?\d{3}\)?-? ?\d{3}-? ?\d{4} ?" required="required" value=""/>
            <span>The student phone number is important. It is how the student and tutor will communicate. Make sure it is a mobile phone number capable of receiving text messages.</span>
        </li>

        <li>
            <label for="email">Student Email Address</label>
            <input id="email" name="email" type="email" required="required" value=""/>
        </li>

        <li>
            <label for="gender">Student Gender</label>

            <input name="gender" type="radio" id="gender" value="MALE" required="required">Boy</input> <br/>
            <input name="gender" type="radio" value="FEMALE" required="required" id="gender1">Girl</input> <br/>
        </li>

        <li>
            <label for="grade">Grade Level</label>

            <input name="grade" type="radio" id="grade" value="9" required="required">9th</input> <br/>
            <input name="grade" type="radio" value="10" required="required" id="grade1">10th</input> <br/>
            <input name="grade" type="radio" value="11" required="required" id="grade2">11th</input> <br/>
            <input name="grade" type="radio" value="12" required="required" id="grade3">12th</input> <br/>
        </li>

        <li>
            <label for="parentName">Parent Name</label>
            <input id="parentName" name="parentName" type="text" required="required" value=""/>
        </li>

        <li>
            <label for="parentEmail">Parent Email Address</label>
            <input id="parentEmail" name="parentEmail" type="email" required="required" value=""/>
        </li>

        <li>
            <label for="parentCellNumber">Parent <strong>Cellphone</strong> Number (Format: xxx-xxx-xxxx)</label>
            <input id="parentCellNumber" name="parentCellNumber" type="tel" pattern="^ ?\(?\d{3}\)?-? ?\d{3}-? ?\d{4} ?" required="required" value=""/>
            <span>The parent phone number is important, due to it being the first form of contact between the tutor and family.</span>
        </li>

        <li>
            <label for="onlyComm">I want a tutor that is asking for...</label>

            <input name="onlyComm" type="radio" id="onlyComm" value="false" required="required" checked="checked">Either Community Service Hours or Money/Cash</input> <br/>
            <input name="onlyComm" type="radio" value="true" required="required" id="onlyComm1">ONLY Community Service Hours</input> <br/>
            <span>Through the CSF tutoring program, tutors are eligible to receive community service hours or money as a form of payment ($10 per hour). Based on the form of payment you choose above, you will get a student accordingly.</span>
        </li>

        <li>
            <label>Please check all courses the student needs help in</label>
            <div>
                <p class="bold">English</p>
                <div>
                    <input type="checkbox" name="courseList" value="598f8d833ef52bb1d48f5a55"/>
                    <span>English 9</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8d8f3ef52bb1d48f5a56"/>
                    <span>English 9 Honors</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8d963ef52bb1d48f5a57"/>
                    <span>English 10</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8d9d3ef52bb1d48f5a58"/>
                    <span>English 10 Honors</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8dab3ef52bb1d48f5a59"/>
                    <span>English 11</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8dcf3ef52bb1d48f5a5a"/>
                    <span>AP English Language/Composition 11</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8de03ef52bb1d48f5a5b"/>
                    <span>English 12 ERW</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8df23ef52bb1d48f5a5c"/>
                    <span>AP English Literature</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8e183ef52bb1d48f5a5d"/>
                    <span>Academic Language and Literacy</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff0c03ef52bb1d48f5a78"/>
                    <span>Film Studies</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff0d33ef52bb1d48f5a79"/>
                    <span>Yearbook Production</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff0e33ef52bb1d48f5a7a"/>
                    <span>Beginning Speech &amp; Debate</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff0f53ef52bb1d48f5a7b"/>
                    <span>Advanced Speech &amp; Debate</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff1043ef52bb1d48f5a7c"/>
                    <span>Journalism in the Digital Age</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff10f3ef52bb1d48f5a7d"/>
                    <span>Creative Writing 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff1183ef52bb1d48f5a7e"/>
                    <span>Creative Writing 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff1283ef52bb1d48f5a7f"/>
                    <span>Creative Writing 3</span>
                    <br/>
                </div>

                <p class="bold">History</p>
                <div>
                    <input type="checkbox" name="courseList" value="598ff2ce3ef52bb1d48f5a89"/>
                    <span>World History 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff2dc3ef52bb1d48f5a8a"/>
                    <span>AP European History</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff2e63ef52bb1d48f5a8b"/>
                    <span>US History</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff2ef3ef52bb1d48f5a8c"/>
                    <span>AP US History</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff3073ef52bb1d48f5a8d"/>
                    <span>Economics/Government</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff3113ef52bb1d48f5a8e"/>
                    <span>AP Government</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff3213ef52bb1d48f5a8f"/>
                    <span>Intro to Ethnic Studies</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff32d3ef52bb1d48f5a90"/>
                    <span>Psychology</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff33f3ef52bb1d48f5a91"/>
                    <span>AP Psychology</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff35b3ef52bb1d48f5a92"/>
                    <span>Socio-Political History of Rock and Roll</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff3643ef52bb1d48f5a93"/>
                    <span>AP Human Geography</span>
                    <br/>
                </div>

                <p class="bold">Mathematics</p>
                <div>
                    <input type="checkbox" name="courseList" value="598f8e3b3ef52bb1d48f5a5e"/>
                    <span>Integrated Math 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8e423ef52bb1d48f5a5f"/>
                    <span>Integrated Math 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8e6e3ef52bb1d48f5a60"/>
                    <span>Financial Algebra with Applications</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8e773ef52bb1d48f5a61"/>
                    <span>Integrated Math 3</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8e823ef52bb1d48f5a62"/>
                    <span>Pre-Calculus</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8e8c3ef52bb1d48f5a63"/>
                    <span>Math Analysis Honors</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8ea03ef52bb1d48f5a64"/>
                    <span>AP Statistics</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8eb03ef52bb1d48f5a65"/>
                    <span>AP Calculus A/B</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8eba3ef52bb1d48f5a66"/>
                    <span>AP Calculus B/C</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8ed03ef52bb1d48f5a67"/>
                    <span>Quantitative Reasoning</span>
                    <br/>
                </div>

                <p class="bold">Science</p>
                <div>
                    <input type="checkbox" name="courseList" value="598f8eeb3ef52bb1d48f5a68"/>
                    <span>Academic Earth Sciences</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8eff3ef52bb1d48f5a69"/>
                    <span>Lab Biology 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8f0c3ef52bb1d48f5a6a"/>
                    <span>Lab Biology 1 Honors</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8f153ef52bb1d48f5a6b"/>
                    <span>Chemistry 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8f1f3ef52bb1d48f5a6c"/>
                    <span>Chemistry 1 Honors</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8f283ef52bb1d48f5a6d"/>
                    <span>Physics 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8f3b3ef52bb1d48f5a6e"/>
                    <span>Human Anatomy and Physiology</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8f4b3ef52bb1d48f5a6f"/>
                    <span>Astronomy</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8f553ef52bb1d48f5a70"/>
                    <span>AP Physics 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8f5d3ef52bb1d48f5a71"/>
                    <span>AP Physics 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8f693ef52bb1d48f5a72"/>
                    <span>AP Biology</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8f753ef52bb1d48f5a73"/>
                    <span>AP Chemistry</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598f8f853ef52bb1d48f5a74"/>
                    <span>AP Environmental Science</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff1683ef52bb1d48f5a80"/>
                    <span>BMS 1 - Principles of Biomedical Sciences</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff1743ef52bb1d48f5a81"/>
                    <span>BMS 2 - Human Body Systems</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff1833ef52bb1d48f5a82"/>
                    <span>BMS 3 - Medical Interventions</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff1b73ef52bb1d48f5a83"/>
                    <span>BMS 4 - Biomedical Innovation</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff2803ef52bb1d48f5a85"/>
                    <span>PLTW Intro to Engineering Design</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff2903ef52bb1d48f5a86"/>
                    <span>PLTW Principles of Engineering</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff2a13ef52bb1d48f5a87"/>
                    <span>PLTW Aerospace Engineering</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="598ff2ad3ef52bb1d48f5a88"/>
                    <span>PLTW Digital Electronics</span>
                    <br/>
                </div>

                <p class="bold">Languages</p>
                <div>
                    <input type="checkbox" name="courseList" value="5990cb5f3ef52bb1d48f5a95"/>
                    <span>Spanish 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cb683ef52bb1d48f5a96"/>
                    <span>Spanish 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cb703ef52bb1d48f5a97"/>
                    <span>Spanish 3</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cb763ef52bb1d48f5a98"/>
                    <span>Spanish 4</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cb873ef52bb1d48f5a99"/>
                    <span>Spanish for Spanish Speakers 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cba03ef52bb1d48f5a9a"/>
                    <span>Spanish for Spanish Speakers 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cba63ef52bb1d48f5a9b"/>
                    <span>French 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cbae3ef52bb1d48f5a9c"/>
                    <span>French 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cbb73ef52bb1d48f5a9d"/>
                    <span>French 3</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cbbd3ef52bb1d48f5a9e"/>
                    <span>ASL 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cbc13ef52bb1d48f5a9f"/>
                    <span>ASL 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cbc53ef52bb1d48f5aa0"/>
                    <span>ASL 3</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cbcb3ef52bb1d48f5aa1"/>
                    <span>ASL 4</span>
                    <br/>
                </div>

                <p class="bold">Visual & Performing Arts</p>
                <div>
                    <input type="checkbox" name="courseList" value="5990cf013ef52bb1d48f5aa2"/>
                    <span>Art 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cf073ef52bb1d48f5aa3"/>
                    <span>Art 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cf133ef52bb1d48f5aa4"/>
                    <span>Figurative Drawing and Design 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cf243ef52bb1d48f5aa5"/>
                    <span>3D Design/Sculpture</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cf2d3ef52bb1d48f5aa6"/>
                    <span>Studio Art</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cf3b3ef52bb1d48f5aa7"/>
                    <span>AP Studio Art: 2D Design</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cfa93ef52bb1d48f5aac"/>
                    <span>Guitar 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cfc03ef52bb1d48f5aad"/>
                    <span>Music Composition Technology 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cfc53ef52bb1d48f5aae"/>
                    <span>Music Composition Technology 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990cfc93ef52bb1d48f5aaf"/>
                    <span>Music Composition Technology 3</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d1383ef52bb1d48f5ab0"/>
                    <span>Beginning Choir</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d1dd3ef52bb1d48f5ab1"/>
                    <span>Concert Choir</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d1f13ef52bb1d48f5ab2"/>
                    <span>Advanced Choir</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d1fd3ef52bb1d48f5ab3"/>
                    <span>Treble Ensemble</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2143ef52bb1d48f5ab4"/>
                    <span>Steel Drum Ensemble 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2223ef52bb1d48f5ab5"/>
                    <span>Steel Drum Ensemble 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d22f3ef52bb1d48f5ab6"/>
                    <span>Drama 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2333ef52bb1d48f5ab7"/>
                    <span>Drama 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2353ef52bb1d48f5ab8"/>
                    <span>Drama 3</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d23a3ef52bb1d48f5ab9"/>
                    <span>Drama 4</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d24d3ef52bb1d48f5aba"/>
                    <span>Musical Theater Ensemble</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2583ef52bb1d48f5abb"/>
                    <span>Dance 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d25b3ef52bb1d48f5abc"/>
                    <span>Dance 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2603ef52bb1d48f5abd"/>
                    <span>Dance 3</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2633ef52bb1d48f5abe"/>
                    <span>Dance 4</span>
                    <br/>
                </div>

                <p class="bold">Career Tech Education</p>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2863ef52bb1d48f5abf"/>
                    <span>Digital Arts and Media 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d28d3ef52bb1d48f5ac0"/>
                    <span>Digital Arts and Media 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2933ef52bb1d48f5ac1"/>
                    <span>Graphic Design 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d29b3ef52bb1d48f5ac2"/>
                    <span>Graphic Design 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2a53ef52bb1d48f5ac3"/>
                    <span>Photo Imaging 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2b03ef52bb1d48f5ac4"/>
                    <span>Photo Imaging 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2b73ef52bb1d48f5ac5"/>
                    <span>Photo Imaging 3</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2c93ef52bb1d48f5ac6"/>
                    <span>Web Publishing/Media Design 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2d73ef52bb1d48f5ac7"/>
                    <span>ROP Web Publishing/Media Design 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2eb3ef52bb1d48f5ac8"/>
                    <span>Medical Pathway Introduction</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2f03ef52bb1d48f5ac9"/>
                    <span>First Responder</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d2f63ef52bb1d48f5aca"/>
                    <span>Sports Medicine</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d3103ef52bb1d48f5acb"/>
                    <span>Stagehand Technician 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d31e3ef52bb1d48f5acc"/>
                    <span>Stagehand Technician 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d3303ef52bb1d48f5acd"/>
                    <span>TV, Film, &amp; Digital Media 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d33c3ef52bb1d48f5ace"/>
                    <span>TV, Film, &amp; Digital Media 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d3483ef52bb1d48f5acf"/>
                    <span>Video Broadcasting</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d3593ef52bb1d48f5ad0"/>
                    <span>AP Computer Science Principles</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d35f3ef52bb1d48f5ad1"/>
                    <span>Computer Science 1</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d3653ef52bb1d48f5ad2"/>
                    <span>Computer Science 2</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d36b3ef52bb1d48f5ad3"/>
                    <span>Computer Game Programming</span>
                    <br/>
                </div>
                <div>
                    <input type="checkbox" name="courseList" value="5990d3733ef52bb1d48f5ad4"/>
                    <span>Web Programming</span>
                    <br/>
                </div>

                
                
            </div>
        </li>

        <li>
            <label>Ideas for Peer Tutor</label>
            <textarea name="ideas" id="ideas"></textarea>
            <span>Special interests, working style, issues or concerns</span>
        </li>

        <li>
            <label>Terms and Conditions</label>
            <input type="checkbox" required="required"/> <strong>If the option chosen is to pay CSF tutors, the student and their parents are responsible for and agree to the payment of $10.00 per hour for tutoring conducted OUTSIDE of school hours.</strong> <br/> <br/>
            <input type="checkbox" required="required"/> <strong>MVHS CSF Tutors are all Mission Vista High School students and members of the California Scholarship Federation.  In order to be a member of CSF, they must maintain a very high GPA in difficult courses.
            However, not all teaching/tutoring styles may be a good match for your son/daughter.  The student and parents are responsible and agree to interview prospective tutors to determine if they are a match for your son/daughter. </strong>
        </li>

        <div class="g-recaptcha col-sm-5" data-sitekey="6LcR9ysUAAAAAPiSQC1c4B7fPOGYpDPQowyTuh48"></div>
        <span id="captchaError" class="alert alert-danger col-sm-4"
              style="display:none"></span>

        <li>
            <button class="action" type="submit">Submit</button>
        </li>
    </ul>
</form>
</template>
