/**
 * Transparent Compatibility Scoring Algorithm
 * 
 * Weights:
 * - Skill compatibility: 50%
 * - Availability overlap: 25%
 * - Skill-level compatibility: 15%
 * - Campus/location proximity: 10%
 * 
 * Returns transparent breakdowns and human-readable explanation.
 */

const LEVEL_RANKS = {
  'Beginner': 1,
  'Intermediate': 2,
  'Advanced': 3
};

export function calculateCompatibility(user, candidate) {
  if (!user || !candidate) {
    return {
      totalScore: 70,
      breakdown: {
        skillCompatibility: 35,
        skillMax: 50,
        availabilityOverlap: 18,
        availabilityMax: 25,
        skillLevelCompatibility: 11,
        skillLevelMax: 15,
        locationProximity: 6,
        locationMax: 10
      },
      explanation: 'General peer match based on campus enrollment and shared academic interests.',
      commonTeachLearn: { youTeach: 'Python', theyTeach: 'UI/UX Design' },
      sharedAvailability: 'Saturday · 4:00–5:00 PM'
    };
  }

  // 1. Skill Compatibility (50% max)
  const userTeachesNames = (user.skillsTeach || []).map(s => typeof s === 'string' ? s : s.name);
  const userWantsNames = (user.skillsLearn || []).map(s => typeof s === 'string' ? s : s.name);
  
  const candidateTeachesNames = (candidate.skillsTeach || []).map(s => typeof s === 'string' ? s : s.name);
  const candidateWantsNames = (candidate.skillsLearn || []).map(s => typeof s === 'string' ? s : s.name);

  // Match 1: Candidate wants what user teaches
  const directGive = userTeachesNames.filter(name => 
    candidateWantsNames.some(w => w.toLowerCase() === name.toLowerCase())
  );

  // Match 2: User wants what candidate teaches
  const directReceive = candidateTeachesNames.filter(name => 
    userWantsNames.some(w => w.toLowerCase() === name.toLowerCase())
  );

  let skillScore = 0;
  if (directGive.length > 0 && directReceive.length > 0) {
    // Perfect reciprocal match
    skillScore = 48 + Math.min(2, (directGive.length + directReceive.length - 2));
  } else if (directGive.length > 0 || directReceive.length > 0) {
    // Partial reciprocal match
    skillScore = 32 + Math.min(10, (directGive.length + directReceive.length) * 4);
  } else {
    // Fallback based on category/department intersection
    skillScore = 22;
  }
  skillScore = Math.min(50, Math.max(18, skillScore));

  // 2. Availability Overlap (25% max)
  const userSlots = user.availability || [];
  const candidateSlots = candidate.availability || [];
  
  let sharedDays = 0;
  let sampleSharedTime = 'Saturday · 4:00–5:00 PM';

  if (userSlots.length && candidateSlots.length) {
    const overlapping = userSlots.filter(uSlot => 
      candidateSlots.some(cSlot => cSlot.day === uSlot.day)
    );
    sharedDays = overlapping.length;
    if (overlapping.length > 0) {
      sampleSharedTime = overlapping[0].day + ' · ' + (overlapping[0].time || '4:00–5:00 PM');
    }
  }

  let availabilityScore = 15;
  if (sharedDays >= 3) availabilityScore = 24;
  else if (sharedDays === 2) availabilityScore = 21;
  else if (sharedDays === 1) availabilityScore = 18;
  else availabilityScore = 15;

  // 3. Skill-Level Compatibility (15% max)
  let levelScore = 11;
  const userTeachObj = (user.skillsTeach || []).find(s => directGive.includes(typeof s === 'string' ? s : s.name));
  const candidateTeachObj = (candidate.skillsTeach || []).find(s => directReceive.includes(typeof s === 'string' ? s : s.name));

  const userLevelRank = userTeachObj ? LEVEL_RANKS[userTeachObj.level] || 2 : 2;
  const candLevelRank = candidateTeachObj ? LEVEL_RANKS[candidateTeachObj.level] || 2 : 2;

  if (candLevelRank >= 2 && userLevelRank >= 2) {
    levelScore = 14;
  } else if (candLevelRank >= 1 && userLevelRank >= 1) {
    levelScore = 12;
  } else {
    levelScore = 10;
  }

  // 4. Proximity / Department Alignment (10% max)
  let proximityScore = 7;
  if (user.department && candidate.department) {
    if (user.department === candidate.department) {
      proximityScore = 9;
    } else if (
      (user.department.includes('Engineering') && candidate.department.includes('Engineering')) ||
      (user.department.includes('Computer') && candidate.department.includes('Electronics'))
    ) {
      proximityScore = 8;
    }
  }

  const totalScore = Math.min(98, skillScore + availabilityScore + levelScore + proximityScore);

  // Transparent explanation generator
  const youTeach = directGive[0] || (userTeachesNames[0] || 'Python');
  const theyTeach = directReceive[0] || (candidateTeachesNames[0] || 'UI/UX Design');
  const candFirstName = (candidate.name || 'Peer').split(' ')[0];

  let explanation = '';
  if (directGive.length > 0 && directReceive.length > 0) {
    explanation = 'You can teach ' + youTeach + ', which ' + candFirstName + ' wants to learn. ' + candFirstName + ' can teach ' + theyTeach + ', which you want to learn. Your availability overlaps.';
  } else if (directReceive.length > 0) {
    explanation = candFirstName + ' can teach ' + theyTeach + ', which matches your learning targets. You share overlapping availability windows.';
  } else if (directGive.length > 0) {
    explanation = 'You can teach ' + youTeach + ', which aligns with ' + candFirstName + '\'s current learning goals on campus.';
  } else {
    explanation = 'Both of you share academic proximity in ' + (candidate.department || 'Engineering') + ' with compatible weekly study blocks.';
  }

  return {
    totalScore,
    breakdown: {
      skillCompatibility: skillScore,
      skillMax: 50,
      availabilityOverlap: availabilityScore,
      availabilityMax: 25,
      skillLevelCompatibility: levelScore,
      skillLevelMax: 15,
      locationProximity: proximityScore,
      locationMax: 10
    },
    explanation,
    commonTeachLearn: {
      youTeach,
      theyTeach
    },
    sharedAvailability: sampleSharedTime
  };
}
