import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  addDoc,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { toast } from 'sonner';

// Site Settings
export const getSiteSettings = async () => {
  if (!db) {
    console.warn('Firestore not configured');
    return null;
  }
  const docRef = doc(db, 'siteSettings', 'main');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateSiteSettings = async (data: any) => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  const docRef = doc(db, 'siteSettings', 'main');
  await setDoc(docRef, data, { merge: true });
};

// Page Content
export const getPageContent = async (pageId: string) => {
  if (!db) {
    console.warn('Firestore not configured');
    return null;
  }
  try {
    const docRef = doc(db, 'pages', pageId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.exists() ? docSnap.data() : null;
    console.log(`Retrieved page content for ${pageId}:`, data);
    return data;
  } catch (error) {
    console.error(`Error getting page content for ${pageId}:`, error);
    throw error;
  }
};

export const updatePageContent = async (pageId: string, data: any) => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  const docRef = doc(db, 'pages', pageId);
  await setDoc(docRef, data, { merge: true });
};

// Sections
export const getPageSections = async (pageId: string) => {
  if (!db) {
    console.warn('Firestore not configured');
    return [];
  }
  try {
    const q = query(
      collection(db, 'sections'), 
      where('pageId', '==', pageId),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const sections = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return sections;
  } catch (error) {
    console.error(`Error getting sections for ${pageId}:`, error);
    // If orderBy fails, try without ordering
    try {
      const q = query(
        collection(db, 'sections'), 
        where('pageId', '==', pageId)
      );
      const querySnapshot = await getDocs(q);
      const sections = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      return sections;
    } catch (retryError) {
      return [];
    }
  }
};

export const addSection = async (sectionData: any) => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  const docRef = await addDoc(collection(db, 'sections'), sectionData);
  return docRef;
};

export const updateSection = async (sectionId: string, data: any) => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  const docRef = doc(db, 'sections', sectionId);
  await updateDoc(docRef, data);
};

export const deleteSection = async (sectionId: string) => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  await deleteDoc(doc(db, 'sections', sectionId));
};

// Testimonials
export const getTestimonials = async () => {
  if (!db) {
    console.warn('Firestore not configured');
    return [];
  }
  const q = query(collection(db, 'testimonials'), orderBy('order', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addTestimonial = async (testimonialData: any) => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  return await addDoc(collection(db, 'testimonials'), testimonialData);
};

export const updateTestimonial = async (testimonialId: string, data: any) => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  const docRef = doc(db, 'testimonials', testimonialId);
  await updateDoc(docRef, data);
};

export const deleteTestimonial = async (testimonialId: string) => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  await deleteDoc(doc(db, 'testimonials', testimonialId));
};

// Form Submissions
export const addFormSubmission = async (formData: any) => {
  if (!db) {
    console.error('Firestore not configured');
    throw new Error('Database not available. Please check Firebase configuration.');
  }
  
  try {
    console.log('Submitting form data:', formData);
    const docRef = await addDoc(collection(db, 'formSubmissions'), {
      ...formData,
      createdAt: new Date(),
      status: 'new'
    });
    console.log('Form submission successful:', docRef.id);
    return docRef;
  } catch (error: any) {
    console.error('Form submission error:', error);
    if (error.code === 'permission-denied') {
      throw new Error('Permission denied. Please check Firestore security rules.');
    }
    throw new Error(`Submission failed: ${error.message}`);
  }
};

export const getFormSubmissions = async () => {
  if (!db) {
    console.warn('Firestore not configured');
    return [];
  }
  const q = query(collection(db, 'formSubmissions'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateFormSubmissionStatus = async (submissionId: string, status: string) => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  const docRef = doc(db, 'formSubmissions', submissionId);
  await updateDoc(docRef, { status });
};

// Navigation
export const getNavigation = async () => {
  if (!db) {
    console.warn('Firestore not configured');
    return [];
  }
  try {
    const q = query(collection(db, 'navigation'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting navigation:', error);
    // If orderBy fails, try without ordering
    const q = query(collection(db, 'navigation'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

export const updateNavigation = async (navData: any[]) => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  
  console.log('Clearing existing navigation...');
  // Delete ALL existing nav items first
  const q = query(collection(db, 'navigation'));
  const querySnapshot = await getDocs(q);
  
  // Delete all existing navigation items
  await Promise.all(querySnapshot.docs.map(doc => deleteDoc(doc.ref)));
  console.log(`Deleted ${querySnapshot.docs.length} existing navigation items`);
  
  // Add new nav items with proper ordering
  console.log('Adding new navigation items:', navData);
  await Promise.all(navData.map((item, index) => 
    addDoc(collection(db, 'navigation'), { ...item, order: index })
  ));
  console.log(`Added ${navData.length} new navigation items`);
};

// Documents
export const getDocuments = async () => {
  if (!db) {
    console.warn('Firestore not configured');
    return [];
  }
  try {
    const q = query(collection(db, 'documents'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting documents:', error);
    // If orderBy fails (missing index), try without ordering
    const q = query(collection(db, 'documents'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => {
        const aDate = a.lastModified?.toDate ? a.lastModified.toDate() : new Date(a.lastModified || 0);
        const bDate = b.lastModified?.toDate ? b.lastModified.toDate() : new Date(b.lastModified || 0);
        return bDate.getTime() - aDate.getTime();
      });
  }
};

export const addDocument = async (documentData: any) => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  const docRef = await addDoc(collection(db, 'documents'), {
    ...documentData,
    createdAt: new Date(),
    lastModified: new Date()
  });
  return docRef;
};

export const updateDocument = async (documentId: string, data: any) => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  const docRef = doc(db, 'documents', documentId);
  await updateDoc(docRef, {
    ...data,
    lastModified: new Date()
  });
};

export const deleteDocument = async (documentId: string) => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  await deleteDoc(doc(db, 'documents', documentId));
};

// Email Settings
export const getEmailSettings = async () => {
  if (!db) {
    console.warn('Firestore not configured');
    return null;
  }
  const docRef = doc(db, 'emailSettings', 'main');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateEmailSettings = async (data: any) => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  const docRef = doc(db, 'emailSettings', 'main');
  await setDoc(docRef, data, { merge: true });
};

// Clear all data before initialization
export const clearAllData = async () => {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  
  console.log('🧹 Clearing all existing data...');
  
  const collections = ['navigation', 'testimonials', 'sections'];
  
  for (const collectionName of collections) {
    try {
      const q = query(collection(db, collectionName));
      const querySnapshot = await getDocs(q);
       
       // Delete all documents in the collection
       await Promise.all(querySnapshot.docs.map(doc => deleteDoc(doc.ref)));
       console.log(`✅ Cleared ${querySnapshot.docs.length} documents from ${collectionName}`);
     } catch (error) {
       console.warn(`⚠️ Could not clear ${collectionName}:`, error);
    }
  }
  
  console.log('🧹 Data clearing completed!');
};