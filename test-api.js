const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('====================================================');
  console.log('🧪 STARTING COMPREHENSIVE END-TO-END CMS & API TESTS');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200 && healthData.status === 'online', 'GET /api/health returns online status');

    // 2. Visitor: GET /api/home
    const homeRes = await fetch(`${BASE_URL}/home`);
    const homeData = await homeRes.json();
    assert(homeRes.status === 200 && homeData.data?.name === 'PRIYA P', `GET /api/home returns profile for '${homeData.data?.name}'`);

    // 3. Visitor: GET /api/about
    const aboutRes = await fetch(`${BASE_URL}/about`);
    const aboutData = await aboutRes.json();
    assert(aboutRes.status === 200 && Array.isArray(aboutData.data?.cards) && aboutData.data?.cards.length === 4, `GET /api/about returns ${aboutData.data?.cards?.length} feature cards`);

    // 4. Visitor: GET /api/navbar
    const navRes = await fetch(`${BASE_URL}/navbar`);
    const navData = await navRes.json();
    assert(navRes.status === 200 && Array.isArray(navData.data?.items), `GET /api/navbar returns brand '${navData.data?.brandName}' and ${navData.data?.items?.length} items`);

    // 5. Visitor: GET /api/footer
    const footRes = await fetch(`${BASE_URL}/footer`);
    const footData = await footRes.json();
    assert(footRes.status === 200 && Boolean(footData.data?.copyrightText), `GET /api/footer returns footer config`);

    // 6. Visitor: GET /api/settings
    const setRes = await fetch(`${BASE_URL}/settings`);
    const setData = await setRes.json();
    assert(setRes.status === 200 && Boolean(setData.data?.websiteTitle), `GET /api/settings returns website title '${setData.data?.websiteTitle}'`);

    // 7. Visitor: GET /api/contact (Info)
    const cinfoRes = await fetch(`${BASE_URL}/contact`);
    const cinfoData = await cinfoRes.json();
    assert(cinfoRes.status === 200 && Boolean(cinfoData.data?.email), `GET /api/contact returns contact info (${cinfoData.data?.email})`);

    // 8. Visitor: GET /api/projects
    const projRes = await fetch(`${BASE_URL}/projects`);
    const projData = await projRes.json();
    assert(projRes.status === 200 && Array.isArray(projData.data) && projData.data.length >= 5, `GET /api/projects returns ${projData.data?.length} projects from MongoDB`);
    const firstProject = projData.data[0];

    // 9. Visitor: GET /api/projects/:id
    const singleProjRes = await fetch(`${BASE_URL}/projects/${firstProject._id}`);
    const singleProjData = await singleProjRes.json();
    assert(singleProjRes.status === 200 && singleProjData.data._id === firstProject._id, `GET /api/projects/:id returns '${singleProjData.data?.title}'`);

    // 10. Visitor: GET /api/skills
    const skillsRes = await fetch(`${BASE_URL}/skills`);
    const skillsData = await skillsRes.json();
    assert(skillsRes.status === 200 && skillsData.data.length >= 17, `GET /api/skills returns ${skillsData.data?.length} skills`);

    // 11. Visitor: GET /api/education
    const eduRes = await fetch(`${BASE_URL}/education`);
    const eduData = await eduRes.json();
    assert(eduRes.status === 200 && eduData.data.length >= 1, `GET /api/education returns ${eduData.data?.length} records`);

    // 12. Visitor: GET /api/certifications
    const certRes = await fetch(`${BASE_URL}/certifications`);
    const certData = await certRes.json();
    assert(certRes.status === 200 && certData.data.length >= 4, `GET /api/certifications returns ${certData.data?.length} credentials`);

    // 13. Visitor: GET /api/experience
    const expRes = await fetch(`${BASE_URL}/experience`);
    const expData = await expRes.json();
    assert(expRes.status === 200 && expData.data.length >= 2, `GET /api/experience returns ${expData.data?.length} records`);

    // 14. Visitor: POST /api/contact (submit visitor message)
    const contactPayload = {
      name: 'Visitor Tester',
      email: 'visitor@example.com',
      subject: 'Collaboration Inquiry',
      message: 'Hello Priya, looking forward to discussing UI/UX opportunities.'
    };
    const contactRes = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactPayload)
    });
    const contactData = await contactRes.json();
    assert(contactRes.status === 201 && contactData.message === 'Message sent successfully!', 'POST /api/contact stores visitor message in MongoDB');
    const createdMsgId = contactData.data?._id;

    // 15. Admin: POST /api/auth/login invalid credentials check
    const badLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@priya.dev', password: 'WrongPassword' })
    });
    assert(badLoginRes.status === 401, 'POST /api/auth/login rejects invalid password');

    // 16. Admin: POST /api/auth/login valid credentials check
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@priya.dev', password: 'Admin@12345' })
    });
    const loginData = await loginRes.json();
    assert(loginRes.status === 200 && Boolean(loginData.token), 'POST /api/auth/login succeeds and issues JWT token');
    const token = loginData.token;
    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // 17. Admin: GET /api/auth/me
    const meRes = await fetch(`${BASE_URL}/auth/me`, { headers: authHeaders });
    const meData = await meRes.json();
    assert(meRes.status === 200 && meData.user.email === 'admin@priya.dev', `GET /api/auth/me validates admin user '${meData.user?.name}'`);

    // 18. Admin: GET /api/stats
    const statsRes = await fetch(`${BASE_URL}/stats`, { headers: authHeaders });
    const statsData = await statsRes.json();
    assert(statsRes.status === 200 && statsData.data.totalProjects >= 5, `GET /api/stats reports ${statsData.data?.totalProjects} projects, ${statsData.data?.totalSkills} skills, ${statsData.data?.totalMessages} messages`);

    // 19. Admin CMS: PUT /api/home (Update & Revert)
    const origGreeting = homeData.data?.greeting;
    const updateHomeRes = await fetch(`${BASE_URL}/home`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({ ...homeData.data, greeting: "Hi, I'm Priya (Tested) 👋" })
    });
    const updateHomeData = await updateHomeRes.json();
    assert(updateHomeRes.status === 200 && updateHomeData.data?.greeting === "Hi, I'm Priya (Tested) 👋", 'Admin PUT /api/home updates Home CMS data in MongoDB');
    // revert
    await fetch(`${BASE_URL}/home`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({ ...homeData.data, greeting: origGreeting })
    });

    // 20. Admin CMS: PUT /api/about (Update & Revert)
    const updateAboutRes = await fetch(`${BASE_URL}/about`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({ ...aboutData.data, heading: 'About Priya P - Verified' })
    });
    const updateAboutData = await updateAboutRes.json();
    assert(updateAboutRes.status === 200 && updateAboutData.data?.heading === 'About Priya P - Verified', 'Admin PUT /api/about updates About CMS data');
    // revert
    await fetch(`${BASE_URL}/about`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify(aboutData.data)
    });

    // 21. Admin: POST /api/projects (CRUD Test: Create)
    const newProjRes = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Automated Test Project',
        description: 'Test project description for validation',
        category: 'UI/UX Design',
        technologies: ['Figma', 'TypeScript'],
        features: ['Feature 1', 'Feature 2'],
        githubUrl: 'https://github.com/test',
        liveDemoUrl: 'https://demo.com'
      })
    });
    const newProjData = await newProjRes.json();
    assert(newProjRes.status === 201 && newProjData.data?.title === 'Automated Test Project', 'Admin POST /api/projects creates project');
    const testProjId = newProjData.data?._id;

    // 22. Admin: PUT /api/projects/:id (CRUD Test: Update)
    const updateProjRes = await fetch(`${BASE_URL}/projects/${testProjId}`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({
        title: 'Updated Automated Project Title'
      })
    });
    const updateProjData = await updateProjRes.json();
    assert(updateProjRes.status === 200 && updateProjData.data?.title === 'Updated Automated Project Title', 'Admin PUT /api/projects/:id updates project');

    // 23. Admin: DELETE /api/projects/:id (CRUD Test: Delete)
    const delProjRes = await fetch(`${BASE_URL}/projects/${testProjId}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    assert(delProjRes.status === 200, 'Admin DELETE /api/projects/:id deletes project');

    // 24. Admin: POST /api/skills (CRUD Test: Create)
    const newSkillRes = await fetch(`${BASE_URL}/skills`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        name: 'Automated Test Skill',
        category: 'Programming',
        level: 95,
        icon: 'bi-cpu'
      })
    });
    const newSkillData = await newSkillRes.json();
    assert(newSkillRes.status === 201 && newSkillData.data?.name === 'Automated Test Skill', 'Admin POST /api/skills creates skill');
    const testSkillId = newSkillData.data?._id;

    // 25. Admin: DELETE /api/skills/:id (CRUD Test: Delete)
    const delSkillRes = await fetch(`${BASE_URL}/skills/${testSkillId}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    assert(delSkillRes.status === 200, 'Admin DELETE /api/skills/:id deletes skill');

    // 26. Admin: GET /api/messages, PUT /api/messages/:id/read, DELETE /api/messages/:id
    const msgListRes = await fetch(`${BASE_URL}/messages`, { headers: authHeaders });
    const msgListData = await msgListRes.json();
    assert(msgListRes.status === 200 && Array.isArray(msgListData.data), `Admin GET /api/messages retrieves ${msgListData.data?.length} messages`);

    if (createdMsgId) {
      const readMsgRes = await fetch(`${BASE_URL}/messages/${createdMsgId}/read`, {
        method: 'PUT',
        headers: authHeaders
      });
      const readMsgData = await readMsgRes.json();
      assert(readMsgRes.status === 200 && readMsgData.data?.read === true, 'Admin PUT /api/messages/:id/read marks message as read');

      const delMsgRes = await fetch(`${BASE_URL}/messages/${createdMsgId}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      assert(delMsgRes.status === 200, 'Admin DELETE /api/messages/:id deletes contact message');
    }

    console.log('\n====================================================');
    console.log(`🎉 ALL TESTS COMPLETED: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================\n');

    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
}

runTests();
